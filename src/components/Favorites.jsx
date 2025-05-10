// Importing React and useContext to access global context data
import React, { useContext } from 'react';
// Importing the MovieContext to get access to favorite movies
import { MovieContext } from '../context/MovieContext';
// Importing Material-UI components for styling and layout
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
// Importing Link to navigate between pages without reloading
import { Link } from 'react-router-dom';

// This component displays the user's favorite movies
function FavoritesPage() {
  // Get the 'favorites' array from MovieContext using useContext hook
  const { favorites } = useContext(MovieContext);

  return (
    // Main container with padding
    <Box sx={{ padding: 4 }}>
      {/* Heading */}
      <Typography variant="h4" gutterBottom>My Favorite Movies</Typography>

      {/* Check if there are no favorites */}
      {favorites.length === 0 ? (
        // If favorites array is empty, show this message
        <Typography>No favorite movies yet.</Typography>
      ) : (
        // If there are favorite movies, display them in a grid layout
        <Grid container spacing={2}>
          {/* Loop through each favorite movie */}
          {favorites.map((movie) => (
            // Each movie gets its own grid item
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              {/* Link to the movie details page using its id */}
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                {/* Card component to display movie poster and title */}
                <Card>
                  {/* Display the movie poster image */}
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  {/* Display the movie title inside the card */}
                  <CardContent>
                    <Typography variant="h6">{movie.title}</Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
}

// Exporting the component so it can be used in other parts of the app
export default FavoritesPage;
