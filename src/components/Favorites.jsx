import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function FavoritesPage() {
  const { favorites } = useContext(MovieContext);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>My Favorite Movies</Typography>
      {favorites.length === 0 ? (
        <Typography>No favorite movies yet.</Typography>
      ) : (
        <Grid container spacing={2}>
          {favorites.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                <Card>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
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

export default FavoritesPage;
