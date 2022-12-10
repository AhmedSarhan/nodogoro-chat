import { Grid } from "@mui/material";
import MessagesList from "./messages-list";
import NewMessage from "./new-message";

const ChatRoom = () => {
  return (
    <Grid
      container
      direction={"column"}
      justifyContent={"space-between"}
      sx={{ minHeight: "90vh" }}
      component="section"
    >
      <MessagesList />

      <NewMessage />
    </Grid>
  );
};

export default ChatRoom;
