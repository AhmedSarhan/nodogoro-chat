import { Timestamp } from "firebase/firestore";

export interface Message {
  text: string;
  createdAt: Timestamp;
  id: string;
  uid?: string;
  photoUrl?: string;
  username: string;
  isForbidden?: boolean;
}
