import * as functions from "firebase-functions";
// import Filter from "bad-words";
import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
const Filter = require("bad-words");

const admin = initializeApp();
const db = getFirestore(admin);

export const detectBadWords = functions.firestore
  .document("messages/{msgId}")
  .onCreate(async (doc, ctx) => {
    const filter = new Filter();
    const { text, uid } = doc.data();
    if (filter.isProfane(text)) {
      const cleaned = filter.clean(text);
      await doc.ref.update({ text: `I got Banned for saying ... ${cleaned}` });
      await db.collection("banned").doc(uid).set({});
    }
  });
