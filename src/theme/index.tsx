import {
  useState,
  useCallback,
  useMemo,
  createContext,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { createTheme, Theme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";

export const ColorModeContext = createContext<{
  toggleColorMode: () => void;
  mode: "dark" | "light";
  theme: Theme | null;
}>({ toggleColorMode: () => {}, mode: "light", theme: null });

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const { mode, theme, toggleColorMode } = useCustomTheme();
  const colorMode = {
    mode,
    theme,
    toggleColorMode,
  };
  return (
    <ColorModeContext.Provider value={colorMode}>
      {children}
    </ColorModeContext.Provider>
  );
};

function useCustomTheme() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<"dark" | "light">(() =>
    prefersDarkMode ? "dark" : "light"
  );
  useEffect(() => {
    const themeMode = localStorage.getItem("theme");
    if (themeMode) {
      setMode(themeMode === "light" ? "light" : "dark");
    }
  }, []);
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                // palette values for light mode
                primary: {
                  main: "rgb(239, 243, 244)",
                  contrastText: "rgb(15, 20, 25)",
                },
                secondary: {
                  main: "rgb(120, 86, 255)",
                  contrastText: "rgb(255, 255, 255)",
                },
              }
            : {
                // palette values for dark mode
                primary: {
                  main: "rgb(61, 84, 102)",
                  contrastText: "rgb(255, 255, 255)",
                },
                secondary: {
                  main: "rgb(120, 86, 255)",
                  contrastText: "rgb(255, 255, 255)",
                },
                info: {
                  main: "rgb(21, 32, 43)",
                },
              }),
        },
      }),
    [mode]
  );

  const toggleColorMode = useCallback(() => {
    console.log("mode will change");
    setMode((prev) => {
      const newMode = prev === "dark" ? "light" : "dark";
      localStorage.setItem("theme", newMode);
      return newMode;
    });
  }, []);
  return { theme, mode, toggleColorMode };
}

export function useColorMode() {
  const colorModeContext = useContext(ColorModeContext);
  if (!colorModeContext) {
    throw new Error(
      "colorModeContext can be only used within the ColorModeProvider wrapper"
    );
  }
  return colorModeContext;
}
// export const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#556cd6",
//     },
//     secondary: {
//       main: "#19857b",
//     },
//     error: {
//       main: red.A400,
//     },
//   },
// });

// message -light - recieved
// rgb(239, 243, 244)
// rgb(15, 20, 25)
// message -light - sent
// rgb(120, 86, 255)
// white

// bg-dark
// rgb(21 32 43)
// message -dark - recieved
// rgb(61, 84, 102)
// white
// message -dark - sent
// rgb(120, 86, 255)
// white
