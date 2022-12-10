import React from "react";
import { Box, Typography } from "@mui/material";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../App";
import SignOut from "./sign-out";
import { useTheme } from "@mui/material/styles";

const Header = () => {
  const [user] = useAuthState(auth);
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 2,
        py: 2,
        boxShadow: theme.shadows[5],
        bgcolor: "white",
        height: "10vh",
      }}
      component="header"
    >
      <Typography variant="h6" component="h6" color="primary">
        Nodogoro Chat
      </Typography>
      {user ? <SignOut /> : null}
    </Box>
  );
};

export default Header;
