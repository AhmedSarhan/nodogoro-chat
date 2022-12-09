import * as functions from "firebase-functions";
// import Filter from "bad-words";
import { initializeApp } from "firebase-admin/app";
import { getFirestore, Timestamp } from "firebase-admin/firestore";

const Filter = require("bad-words");

const admin = initializeApp();
const db = getFirestore(admin);

export const addUserToDB = functions.auth.user().onCreate(async (user) => {
  await db.collection("users").doc(user.uid).set({
    email: user.email,
    banned: false,
    bannedDate: null,
    displayName: user.displayName,
    phoneNumber: user.phoneNumber,
    photoURL: user.photoURL,
    uid: user.uid,
  });
});

export const detectBadWords = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const { text, uid } = doc.data();
    if (filter.isProfane(text)) {
      await doc.ref.update({ forbidden: true });
      await db.collection("users").doc(uid);
    }
  });

export const removeBannedUsersScheduler = functions.pubsub
  .schedule("every 48 hours")
  // .schedule("every 20 minutes")
  .onRun(async () => {
    const tsToMillis = Timestamp.now().toMillis();
    // const date48hAgo = tsToMillis - 10 * 1000;
    const date48hAgo = tsToMillis - 48 * 60 * 60 * 1000;
    const data = await db
      .collection("users")
      .where("banned", "==", true)
      .where("bannedDate", "<=", date48hAgo)
      .get();
    const batch = db.batch();
    console.log("Data", data);
    data.docs.forEach((doc) => {
      const docRef = doc.ref;
      batch.update(docRef, { banned: true, bannedDate: Timestamp.now() });
    });
    return await batch.commit();
  });

export const clearMessagesSchedular = functions.pubsub
  .schedule("every 72 hours")
  .onRun(async () => {
    const tsToMillis = Timestamp.now().toMillis();
    const date72hAgo = tsToMillis - 72 * 60 * 60 * 1000;
    const data = await db
      .collection("messages")
      .where("createdAt", "<=", date72hAgo)
      .get();
    const batch = db.batch();
    data.docs.forEach((doc) => {
      const docRef = doc.ref;
      batch.delete(docRef);
    });
    batch.commit();
  });
