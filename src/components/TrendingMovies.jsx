// src/components/TrendingMovies.jsx
import React, { useContext, useState } from 'react';
import { MovieContext } from '../context/MovieContext';  // ✅ Import context
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

function TrendingMovies() {
  const { movies, setMovies, fetchMoreMovies, hasMore } = useContext(MovieContext);  // ✅ use movies from context

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Trending Movies</Typography>

      <InfiniteScroll
        dataLength={movies.length}
        next={fetchMoreMovies}  // ✅ use fetch from context
        hasMore={hasMore}
        loader={<CircularProgress sx={{ margin: '20px auto' }} />}
        endMessage={
          <Typography textAlign="center" sx={{ mt: 2 }}>
            You’ve reached the end of the list!
          </Typography>
        }
      >
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                <Card sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.05)', transition: '0.3s' } }}>
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    <Typography variant="h6" color="text.primary">{movie.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      Rating: {movie.vote_average}
                    </Typography>
                  </CardContent>
                </Card>
              </Link>
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>
    </Box>
  );
}

export default TrendingMovies;
