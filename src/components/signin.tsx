import Typography from "@mui/material/Typography";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Timestamp } from "firebase/firestore";
import { auth } from "../App";

const signInWithGoogle = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
};

const SignIn = ({
  isBanned,
  banDate,
}: {
  isBanned: boolean;
  banDate: Timestamp;
}) => {
  return (
    <>
      <button onClick={signInWithGoogle}>Sign In with Google</button>
      {isBanned ? (
        <Typography variant="h6" color="error" component="h6"></Typography>
      ) : null}
    </>
  );
};

export default SignIn;
