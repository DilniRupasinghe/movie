import React from 'react';
import { Grid } from '@mui/material';
import MovieCard from './MovieCard';

function MovieGrid({ movies }) {
  return (
    <Grid container spacing={2} justifyContent="center">
      {movies.map((movie) => (
        <Grid item key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

export default MovieGrid;
