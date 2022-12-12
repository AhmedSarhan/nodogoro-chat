import { Button } from "@mui/material";
import { signOutHandler } from "../../firebase";

const SignOut = () => {
  return (
    <Button variant="outlined" onClick={signOutHandler} color="error">
      Sign Out
    </Button>
  );
};

export default SignOut;
