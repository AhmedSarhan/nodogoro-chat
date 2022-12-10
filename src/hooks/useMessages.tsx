import {
  collection,
  DocumentData,
  FirestoreDataConverter,
  limit,
  orderBy,
  query,
  QueryDocumentSnapshot,
  SnapshotOptions,
  WithFieldValue,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { firestore } from "../App";
import { Message } from "../types/messages";

const messagesConverter: FirestoreDataConverter<Message> = {
  toFirestore(message: WithFieldValue<Message>): DocumentData {
    return { ...message };
  },
  fromFirestore(
    snapshot: QueryDocumentSnapshot,
    options: SnapshotOptions
  ): Message {
    const data = snapshot.data(options);
    return {
      text: data.text,
      createdAt: data.createdAt,
      username: data.username,
      uid: data.uid,
      photoUrl: data.photoUrl,
      id: snapshot.id,
      isForbidden: data.forbidden,
    };
  },
};

export function useMessages() {
  const messageRef = collection(firestore, "messages").withConverter(
    messagesConverter
  );
  const messagesQuery = query(messageRef, orderBy("createdAt"), limit(50));
  const [messages] = useCollectionData(messagesQuery);

  return [messages];
}
