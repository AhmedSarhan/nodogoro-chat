import { useEffect, useRef } from "react";
import { Grid, List } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useMessages } from "../../hooks/useMessages";
import MessageText from "./message-text";

const MessagesList = () => {
  const theme = useTheme();
  const messageEl = useRef<HTMLUListElement>(null);
  const [messages] = useMessages();
  useEffect(() => {
    if (messageEl) {
      messageEl?.current?.addEventListener("DOMNodeInserted", (event) => {
        const target = event.currentTarget as HTMLUListElement;
        if (!target) return;
        target.scroll({ top: target.scrollHeight, behavior: "smooth" });
      });
    }
  }, []);
  return (
    <Grid
      ref={messageEl}
      item
      sx={{
        height: "80vh",
        maxHeight: "80vh",
        mt: "10vh 0 10vh",
        overflowY: "auto",
        "&::-webkit-scrollbar": {
          width: "0.25rem",
        },

        "&::-webkit-scrollbar-track": {
          bgcolor: theme.palette.secondary["light"],
        },

        "&::-webkit-scrollbar-thumb": {
          bgcolor: theme.palette.secondary["main"],
        },
      }}
      component={List}
      container
      direction={"column"}
      flexWrap="nowrap"
    >
      {messages &&
        messages.map((message) => (
          <MessageText message={message} key={message.id} />
        ))}
      {/* <div ref={ref}></div> */}
    </Grid>
  );
};

export default MessagesList;
