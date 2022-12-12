import { useEffect, useState } from "react";
import { doc, Timestamp } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { auth, firestore } from "../firebase";

export function useAuth() {
  const [user] = useAuthState(auth);
  const [bannedState, setBanned] = useState<{
    banned: boolean;
    banDate: Timestamp;
  } | null>(null);
  const userId = user ? user.uid : "";
  const userRef = userId ? doc(firestore, "users", userId) : null;
  const [value] = useDocumentData(userRef);

  useEffect(() => {
    if (!value) return;
    if (value.banned) {
      setBanned({ banned: value.banned, banDate: value.banDate });
      auth.signOut();
      return;
    }
    setBanned(null);
  }, [value]);
  return { user: value, bannedState };
}
