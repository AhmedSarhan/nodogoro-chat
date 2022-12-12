import Container from "@mui/material/Container";
import Box from "@mui/material/Box";

import ChatRoom from "./components/chat/chat-room";
import Header from "./components/navigation/header";
import SignIn from "./components/auth/signin";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";

import { useAuth } from "./hooks/useAuth";
import { useColorMode } from "./theme";
import { firebaseApp } from "./firebase";
import { useOnPageLeave } from "./hooks/useOnPageLeave";

function App() {
  useOnPageLeave();
  const { theme } = useColorMode();

  if (!firebaseApp || !theme) {
    return <></>;
  }
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer />
    </ThemeProvider>
  );
}

export default App;

const AppContainer = () => {
  const theme = useTheme();
  const { user, bannedState } = useAuth();
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          bgcolor:
            theme.palette.mode === "dark" ? theme.palette.info["main"] : "#fff",
        }}
      >
        <Header />
        <>
          {user && !user?.banned ? (
            <ChatRoom />
          ) : (
            <SignIn
              isBanned={bannedState?.banned}
              banDate={bannedState?.banDate}
            />
          )}
        </>
      </Box>
    </Container>
  );
};
