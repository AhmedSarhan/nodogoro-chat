import { useEffect } from "react";
import { doc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../App";

export function useAuth() {
  const [user] = useAuthState(auth);
  const userId = user ? user.uid : "";
  const userRef = userId ? doc(firestore, "users", userId) : null;
  const [value] = useDocumentData(userRef);

  useEffect(() => {
    if (!value) return;
    if (value.banned) {
      auth.signOut();
    }
  }, [value]);
  return { user: value };
}
