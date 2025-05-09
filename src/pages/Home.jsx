// Home.jsx

import React, { useContext } from 'react';
import SearchBar from '../components/SearchBar';
import TrendingMovies from '../components/TrendingMovies';
import MovieGrid from '../components/MovieGrid';
import { MovieContext } from '../context/MovieContext';
import { Container, Typography } from '@mui/material';

function Home() {
  const { movies } = useContext(MovieContext); // Get searched movies from context

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Discover Movies
      </Typography>

      {/* Search bar */}
      <SearchBar />

      {/* Trending movies */}
      <TrendingMovies />

      {/* Search results */}
      {movies.length > 0 && (
        <>
          <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
            Search Results
          </Typography>
          <MovieGrid movies={movies} />
        </>
      )}
    </Container>
  );
}

export default Home;
