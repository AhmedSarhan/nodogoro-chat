import React from "react";
import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { useTheme } from "@mui/material/styles";
import { useAuthState } from "react-firebase-hooks/auth";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import { auth } from "../../firebase";
import SignOut from "./sign-out";
import { useColorMode } from "../../theme";

const Header = () => {
  const [user] = useAuthState(auth);
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        px: 2,
        py: 2,
        boxShadow: theme.shadows[5],
        bgcolor:
          theme.palette.mode === "light" ? "white" : theme.palette.info["main"],
        height: "10vh",
      }}
      component="header"
    >
      <Typography variant="h6" component="h6" color="secondary">
        Nodogoro Chat
      </Typography>
      <Box>
        <IconButton sx={{ ml: 1 }} onClick={toggleColorMode} color="inherit">
          {theme.palette.mode === "dark" ? (
            <Brightness7Icon color="secondary" />
          ) : (
            <Brightness4Icon color="secondary" />
          )}
        </IconButton>
        {user ? <SignOut /> : null}
      </Box>
    </Box>
  );
};

export default Header;
