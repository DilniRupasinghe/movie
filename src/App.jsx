// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MovieProvider } from './context/MovieContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FavoritesPage from './pages/FavoritesPage';
import Login from './pages/Login';
import { CustomThemeProvider } from './context/ThemeContext';
import { useTheme } from '@mui/material/styles';

const App = () => {
  const theme = useTheme();

  return (
    <div style={{backgroundColor: theme.palette.background.default, minHeight: '100vh'}}>
      <CustomThemeProvider>
      <MovieProvider>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home/>} />
          <Route path="/movie/:id" element={<MovieDetailsPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
    </MovieProvider>
    </CustomThemeProvider>
    </div>
    
    
  );
};

export default App;
