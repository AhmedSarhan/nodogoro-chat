import { Button } from "@mui/material";
import { auth } from "../../App";

const signOutHandler = () => {
  auth.signOut();
};
const SignOut = () => {
  return (
    <Button variant="outlined" onClick={signOutHandler} color="error">
      Sign Out
    </Button>
  );
};

export default SignOut;
