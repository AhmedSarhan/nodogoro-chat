import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../App";
import { Message } from "../types/messages";

const MessageText = ({ message }: { message: Message }) => {
  const { text, uid, username, id, photoUrl } = message;
  const [user] = useAuthState(auth);
  const isYourMessage = useMemo(() => uid === user?.uid, [uid, user?.uid]);
  return (
    <li
    //  style={{ float: isYourMessage ? "right" : "left" }}
    >
      {/* <img src={photoUrl} alt={username} /> */}
      <p>{text}</p>
      {/* <p>{username}</p> */}
    </li>
  );
};

export default MessageText;
