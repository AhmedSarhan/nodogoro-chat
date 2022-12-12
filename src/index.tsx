import React from "react";
import ReactDOM from "react-dom/client";

// import { ThemeProvider, CssBaseline } from "@mui/material";
// import  from "@mui/material/CssBaseline";

import App from "./App";
import { ColorModeProvider } from "./theme";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <ColorModeProvider>
      <App />
    </ColorModeProvider>
  </React.StrictMode>
);
