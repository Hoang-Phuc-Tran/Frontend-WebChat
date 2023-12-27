// Import necessary components and libraries from Material-UI and React.
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import React from "react";
import createMuiTheme from "../theme/theme";
import { ColorModeContext } from "../context/DarkModeContext";
import Cookies from "js-cookie";

// Define the props type for the ToggleColorMode component.
interface ToggleColorModeProps {
  children: React.ReactNode; // Children components wrapped by ToggleColorMode.
}

// Define the ToggleColorMode component as a functional component.
const ToggleColorMode: React.FC<ToggleColorModeProps> = ({ children }) => {
  // Retrieve the color mode stored in cookies or use the preferred dark mode setting.
  const storedMode = Cookies.get("colorMode") as "light" | "dark";
  const preferedDarkMode = useMediaQuery("([prefers-color-scheme: dark])");
  const defaultMode = storedMode || (preferedDarkMode ? "dark" : "light");

  // Define state to manage the current color mode.
  const [mode, setMode] = useState<"light" | "dark">(defaultMode);

  // Function to toggle between light and dark modes.
  const toggleColorMode = React.useCallback(() => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  }, []);

  // Store the selected color mode in cookies when it changes.
  useEffect(() => {
    Cookies.set("colorMode", mode);
  }, [mode]);

  // Create a colorMode object with the toggleColorMode function.
  const colorMode = useMemo(() => ({ toggleColorMode }), [toggleColorMode]);

  // Create a Material-UI theme based on the selected color mode.
  const theme = React.useMemo(() => createMuiTheme(mode), [mode]);

  // Log the retrieved color mode for debugging.
  console.log("Retrieved mode:", mode);

  // Render the ToggleColorMode component, providing context and theme to its children.
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

// Export the ToggleColorMode component as the default export.
export default ToggleColorMode;
