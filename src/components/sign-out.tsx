import { auth } from "../App";

const signOutHandler = () => {
  auth.signOut();
};
const SignOut = () => {
  return <button onClick={signOutHandler}>Sign Out</button>;
};

export default SignOut;
