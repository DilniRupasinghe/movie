import React from 'react'; // Import React
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import components for routing
import { MovieProvider } from './context/MovieContext'; // Import the MovieProvider to manage movie-related state
import Navbar from './components/Navbar'; // Import the Navbar component
import Home from './pages/Home'; // Import the Home page component
import MovieDetailsPage from './pages/MovieDetailsPage'; // Import the Movie Details page component
import FavoritesPage from './pages/FavoritesPage'; // Import the Favorites page component
import Login from './pages/Login'; // Import the Login page component
import { CustomThemeProvider } from './context/ThemeContext'; // Import the CustomThemeProvider for theme management
import { useTheme } from '@mui/material/styles'; // Import the useTheme hook from Material UI for accessing the current theme

const App = () => {
  // useTheme hook allows you to access the current theme
  const theme = useTheme();

  return (
    // Set the background color dynamically based on the current theme's background color
    <div style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      
      {/* The CustomThemeProvider wraps the entire application to apply the theme */}
      <CustomThemeProvider>
        
        {/* The MovieProvider wraps the application to provide movie-related context */}
        <MovieProvider>
          
          {/* Navbar component that will be displayed across all pages */}
          <Navbar />
          
          {/* Set up routing for different pages */}
          <Routes>
            {/* Define the route for the login page */}
            <Route path="/" element={<Login />} />
            
            {/* Define the route for the home page */}
            <Route path="/home" element={<Home />} />
            
            {/* Define the route for movie details page, which takes an id as a parameter */}
            <Route path="/movie/:id" element={<MovieDetailsPage />} />
            
            {/* Define the route for the favorites page */}
            <Route path="/favorites" element={<FavoritesPage />} />
          </Routes>
          
        </MovieProvider>
      </CustomThemeProvider>
      
    </div>
  );
};

export default App;
