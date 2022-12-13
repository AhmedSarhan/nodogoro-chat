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
    banDate: null,
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
      await db
        .collection("users")
        .doc(uid)
        .update({ banned: true, banDate: Timestamp.now() });
    }
  });

export const removeBannedUsersScheduler = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    const tsToMillis = Timestamp.now().toMillis();
    const date48hAgoMillis = tsToMillis - 48 * 60 * 60 * 1000;
    const date48Ago = new Date(date48hAgoMillis);
    date48Ago.setUTCHours(0, 0, 0, 0);
    const data = await db
      .collection("users")
      .where("banned", "==", true)
      .where("banDate", "<=", date48Ago)
      .get();
    if (!data || data.empty) return;
    functions.logger.log("data", data?.docs);
    const batch = db.batch();
    data.docs.forEach((doc) => {
      const docRef = doc.ref;
      batch.update(docRef, { banned: false, banDate: null });
    });
    return await batch.commit();
  });

export const clearMessagesSchedular = functions.pubsub
  .schedule("every 24 hours")
  .onRun(async () => {
    const tsToMillis = Timestamp.now().toMillis();
    const date72hAgoMillis = tsToMillis - 72 * 60 * 60 * 1000;
    const date72hAgo = new Date(date72hAgoMillis);
    const data = await db
      .collection("messages")
      .where("createdAt", "<=", date72hAgo)
      .get();
    console.log("data", data);
    const batch = db.batch();
    data.docs.forEach((doc) => {
      const docRef = doc.ref;
      batch.delete(docRef);
    });
    batch.commit();
  });
