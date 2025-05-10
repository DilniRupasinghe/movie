// Import React and necessary components from Material UI
import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, IconButton, Button, Box } from '@mui/material';
// Import Material UI icons for light/dark mode toggle
import { Brightness4, Brightness7 } from '@mui/icons-material';
// Import ColorModeContext to handle the theme (light/dark mode)
import { ColorModeContext } from '../context/ThemeContext';
// Import useTheme hook to access the current theme settings
import { useTheme } from '@mui/material/styles';
// Import Link from react-router-dom to handle navigation between pages
import { Link } from 'react-router-dom';

// Navbar functional component
const Navbar = () => {
  // Use the useTheme hook to access the current theme
  const theme = useTheme();
  // Use context to access the color mode toggle function
  const colorMode = useContext(ColorModeContext);

  return (
    // AppBar component from Material UI to create the navigation bar
    <AppBar position="static">
      {/* Toolbar component to hold the content inside the AppBar */}
      <Toolbar>
        {/* Title of the app, which is a link to the homepage */}
        <Typography
          variant="h6"
          component={Link}
          to="/" // Navigate to home page
          sx={{ textDecoration: 'none', color: 'inherit', flexGrow: 1 }} // Remove default link styles and allow title to grow and fill space
        >
          Movie Explorer
        </Typography>

        {/* Box component to align buttons and icon on the right side */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          {/* Home button, links to the Home page */}
          <Button color="inherit" component={Link} to="/home">
            Home
          </Button>
          {/* Favorites button, links to the Favorites page */}
          <Button color="inherit" component={Link} to="/favorites">
            Favorites
          </Button>

          {/* IconButton to toggle between light and dark mode */}
          <IconButton color="inherit" onClick={colorMode.toggleColorMode}>
            {/* Depending on the current theme mode (light or dark), show the appropriate icon */}
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

// Export the Navbar component to be used in other parts of the app
export default Navbar;
