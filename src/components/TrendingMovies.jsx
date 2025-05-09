// src/components/TrendingMovies.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';  // ✅ import Link

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function TrendingMovies() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}`)
      .then((res) => {
        setMovies(res.data.results);
      })
      .catch((err) => {
        console.error('Error fetching trending movies:', err);
      });
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Trending Movies</Typography>
      <Grid container spacing={2}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
            <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>  {/* ✅ clickable */}
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
    </Box>
  );
}

export default TrendingMovies;
