import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import MovieGrid from './MovieGrid';
import { Typography } from '@mui/material';

function Favorites() {
  const { favorites } = useContext(MovieContext);

  return (
    <div>
      <Typography variant="h4" align="center" mt={2}>My Favorites</Typography>
      {favorites.length === 0 ? (
        <Typography align="center">No favorites yet!</Typography>
      ) : (
        <MovieGrid movies={favorites} />
      )}
    </div>
  );
}

export default Favorites;
