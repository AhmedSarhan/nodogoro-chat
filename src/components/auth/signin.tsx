import Box from "@mui/material/Typography";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import GoogleIcon from "@mui/icons-material/Google";
import { Timestamp } from "firebase/firestore";
import { signInWithGoogle, useGetActiveUsersCount } from "../../firebase";
import { getBanRemovalDate } from "../../utils/utils";
import { useState } from "react";

const SignIn = ({
  isBanned,
  banDate,
}: {
  isBanned?: boolean;
  banDate?: Timestamp;
}) => {
  const [isSigning, setIsSigning] = useState(false);
  const [isMax, setIsMax] = useState(false);
  const [activeUsersCount] = useGetActiveUsersCount();
  const signInHandler = async () => {
    setIsSigning(true);
    if (activeUsersCount && activeUsersCount.count === 4) {
      setIsMax(true);
      return;
    }
    signInWithGoogle();
    setIsSigning(false);
  };
  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        my: 2,
      }}
    >
      <Button
        onClick={signInHandler}
        disabled={isSigning}
        variant="contained"
        color="info"
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          py: 1.5,
        }}
      >
        <GoogleIcon sx={{ mr: 1 }} />
        <Typography component="span" variant="body1" sx={{ pt: 0.25 }}>
          Sign In with Google
        </Typography>
      </Button>
      {isBanned ? (
        <Typography
          variant="h6"
          color="error"
          component="p"
          align="center"
          sx={{ px: 2, my: 2 }}
        >
          You have been Banned for 48 hours for violating our rules ... please
          come back around{" "}
          {getBanRemovalDate(banDate).toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
            year: "numeric",
          })}
        </Typography>
      ) : null}
      {isMax ? (
        <Typography
          variant="h6"
          color="error"
          component="p"
          align="center"
          sx={{ px: 2, my: 2 }}
        >
          We are sorry the room is over crowded now ... come back again soon
        </Typography>
      ) : null}
    </Box>
  );
};

export default SignIn;
