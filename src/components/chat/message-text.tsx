import {
  Avatar,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Message } from "../../types/messages";

const MessageText = ({ message }: { message: Message }) => {
  const theme = useTheme();
  const { text, uid, username, photoUrl } = message;
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
              bgcolor: isYourMessage
                ? theme.palette.secondary["main"]
                : theme.palette.primary["main"],
              color: isYourMessage
                ? theme.palette.secondary["contrastText"]
                : theme.palette.primary["contrastText"],
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
