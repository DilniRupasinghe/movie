// Import React library
import React from 'react';
// Import Grid component from Material UI
import { Grid } from '@mui/material';
// Import the MovieCard component (which displays a single movie card)
import MovieCard from './MovieCard';

// MovieGrid component: receives 'movies' (array of movie objects) as a prop
function MovieGrid({ movies }) {
  return (
    // Create a responsive grid container
    <Grid container spacing={2} justifyContent="center">
      {/* Loop through the movies array and render a MovieCard for each movie */}
      {movies.map((movie) => (
        // Each Grid item holds one movie card
        <Grid item key={movie.id}>
          <MovieCard movie={movie} />
        </Grid>
      ))}
    </Grid>
  );
}

// Export the component so it can be used elsewhere
export default MovieGrid;
