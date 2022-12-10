import {
  Avatar,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../App";
import { Message } from "../../types/messages";

const MessageText = ({ message }: { message: Message }) => {
  const { text, uid, username, id, photoUrl } = message;
  const [user] = useAuthState(auth);
  const isYourMessage = useMemo(() => uid === user?.uid, [uid, user?.uid]);
  return (
    <>
      <Grid
        item
        container
        component={ListItem}
        alignSelf={isYourMessage ? "flex-end" : "flex-start"}
        sx={{ width: "fit-content" }}
        direction={isYourMessage ? "row-reverse" : "row"}
      >
        <ListItemIcon>
          <Avatar src={photoUrl} alt={username} />
        </ListItemIcon>
        <ListItemText>
          <Typography
            variant="body1"
            component="p"
            sx={{
              bgcolor: "white",
              mx: isYourMessage ? 1 : -1,
              px: 2,
              py: 1,
              borderRadius: "15px",
            }}
          >
            {!message.isForbidden ? text : text.replace(/./g, "*")}
          </Typography>
        </ListItemText>
      </Grid>
      {message.isForbidden ? (
        <Typography
          variant="body2"
          component="p"
          sx={{ textAlign: "center" }}
          color="error"
        >
          You have been Banned for 48 hours for violation of rules
        </Typography>
      ) : null}
    </>
  );
};

export default MessageText;
