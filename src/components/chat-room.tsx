import React, { useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  FirestoreDataConverter,
  Timestamp,
  WithFieldValue,
  DocumentData,
  QueryDocumentSnapshot,
  SnapshotOptions,
  doc,
  setDoc,
} from "firebase/firestore";
import "firebase/compat/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../App";
import MessageText from "./message-text";
import SignOut from "./sign-out";
import { Message } from "../types/messages";

const postConverter: FirestoreDataConverter<Message> = {
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
    };
  },
};

function useMessages() {
  const messageRef = collection(firestore, "messages").withConverter(
    postConverter
  );
  const messagesQuery = query(messageRef, orderBy("createdAt"), limit(50));
  const [messages] = useCollectionData(messagesQuery);

  return [messages];
}

const ChatRoom = () => {
  const [messages] = useMessages();
  const [message, setMessage] = useState("");
  const createMessage = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!message || message.trim() === "") return;
    const user = auth.currentUser;
    const { uid, photoURL, displayName } = user!;
    const newMessageRef = doc(collection(firestore, "messages"));
    const newMessage = {
      uid,
      photoUrl: photoURL,
      text: message,
      createdAt: Timestamp.fromDate(new Date()),
      username: displayName,
    };
    await setDoc(newMessageRef, newMessage);
    setMessage("");
  };
  return (
    <div>
      <SignOut />
      <h1>Chat Room</h1>
      <ul>
        {messages &&
          messages.map((message) => (
            <MessageText message={message} key={message.id} />
          ))}
      </ul>
      <form onSubmit={createMessage}>
        <input
          type="text"
          name="search"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default ChatRoom;
