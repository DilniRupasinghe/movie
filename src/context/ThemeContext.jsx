// src/context/ThemeContext.jsx
import React, { createContext, useState, useMemo } from 'react'; // Importing necessary hooks and components from React
import { ThemeProvider, createTheme } from '@mui/material/styles'; // Importing MUI (Material UI) components for theming

// Creating a context to handle the color mode (light or dark theme) across the app
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// CustomThemeProvider component will wrap other components and provide them with the current theme and the toggle function
export const CustomThemeProvider = ({ children }) => {
  // State to store the current mode ('light' or 'dark')
  const [mode, setMode] = useState('light'); // Default mode is 'light'

  // `useMemo` is used to memoize the color mode toggle function (so it doesn’t get recreated every render)
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        // This function toggles between 'light' and 'dark' modes when called
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [] // Empty dependency array means this function won’t change unless the component is re-mounted
  );

  // `useMemo` is used to memoize the theme object, which depends on the `mode` state (light or dark)
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode, // Set the mode (light or dark) to the theme
          background: {
            default: mode === 'light' ? '#ffffff' : '#121212', // Set background color depending on the mode
          },
        },
      }),
    [mode] // Re-create the theme when the mode changes
  );

  return (
    // Provide the colorMode context (which includes the toggle function) to child components
    <ColorModeContext.Provider value={colorMode}>
      {/* Provide the current theme to the children components using MUI's ThemeProvider */}
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};
