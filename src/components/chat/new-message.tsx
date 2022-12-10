import React, { useEffect, useState } from "react";
import { Grid, TextField, Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { auth, firestore } from "../../App";
import { collection, doc, setDoc, Timestamp } from "firebase/firestore";

const NewMessage = () => {
  const [message, setMessage] = useState("");
  useEffect(() => {
    console.log("now", Timestamp.now());
  }, []);
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
        sx={{ width: "88%" }}
      />
      <Button
        type="submit"
        variant="contained"
        size="medium"
        sx={{ mb: "1px" }}
      >
        <SendIcon />
      </Button>
    </Grid>
  );
};

export default NewMessage;
