import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import ChatRoom from "./components/chat/chat-room";
import Header from "./components/navigation/header";
import SignIn from "./components/signin";
import { useTheme } from "@mui/material/styles";
import { useAuth } from "./hooks/useAuth";
import { getUsers } from "./hooks/useUsers";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);

export const auth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
function App() {
  const theme = useTheme();
  const { user } = useAuth();
  if (!firebaseApp) {
    return <></>;
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ bgcolor: theme.palette.secondary["light"] }}>
        <Header />
        <>
          {user && !user?.banned ? (
            <ChatRoom />
          ) : (
            <SignIn isBanned={user?.banned} banDate={user?.bannedDate} />
          )}
        </>
      </Box>
    </Container>
  );
}

export default App;
