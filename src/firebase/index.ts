import { useDocumentData } from "react-firebase-hooks/firestore";

import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc, increment } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

export const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);

export const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      countActiveUsers(1);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

export const signOutHandler = async () => {
  countActiveUsers(-1);
  await auth.signOut();
};

const countActiveUsers = async (amount: number) => {
  const ref = doc(firestore, `counters/active-users`);
  return await setDoc(ref, { count: increment(amount) }, { merge: true });
};

export function useGetActiveUsersCount() {
  const userRef = doc(firestore, "counters/active-users");
  const [activeUsersCount] = useDocumentData(userRef);

  return [activeUsersCount];
}
