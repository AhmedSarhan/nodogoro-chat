import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { useAuthState } from "react-firebase-hooks/auth";

import ChatRoom from "./components/chat-room";
import SignIn from "./components/signin";

const firebaseConfig = {
  apiKey: "AIzaSyCx5k6DsBqiFDZpBq2AV7VmZQSFXcOkRhw",
  authDomain: "nodogoro-chat.firebaseapp.com",
  projectId: "nodogoro-chat",
  storageBucket: "nodogoro-chat.appspot.com",
  messagingSenderId: "105625459870",
  appId: "1:105625459870:web:48e508d4755a3c4bd2ef8f",
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
function App() {
  const [user] = useAuthState(auth);
  if (!firebaseApp) {
    return <></>;
  }
  return (
    <div className="App">
      <header className="App-header"></header>
      <section>{user ? <ChatRoom /> : <SignIn />}</section>
    </div>
  );
}

export default App;
