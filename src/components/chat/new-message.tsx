import React, { useState } from "react";
import { Grid, TextField, IconButton, InputAdornment } from "@mui/material";
import useTheme from "@mui/material/styles/useTheme";
import SendIcon from "@mui/icons-material/Send";
import { auth, firestore } from "../../firebase";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

const NewMessage = () => {
  const theme = useTheme();
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
      createdAt: Timestamp.now(),
      username: displayName,
    };
    await setDoc(newMessageRef, newMessage);
    setMessage("");
  };
  return (
    <Grid
      item
      justifySelf={"flex-end"}
      sx={{ height: "9vh" }}
      component="form"
      container
      onSubmit={createMessage}
    >
      <TextField
        type="text"
        name="search"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something here..."
        size="medium"
        variant="filled"
        fullWidth
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                type="submit"
                size="medium"
                edge="end"
                sx={{ mb: "1px", color: theme.palette.secondary["main"] }}
              >
                <SendIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Grid>
  );
};

export default NewMessage;
