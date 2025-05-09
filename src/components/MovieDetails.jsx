// src/components/MovieDetails.jsx

import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        setMovie(res.data);
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
      });
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', md: 400 }, height: 'auto' }}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent sx={{ flex: '1' }}>
          <Typography variant="h4" gutterBottom>{movie.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>Release Date: {movie.release_date}</Typography>
          <Typography variant="subtitle1" gutterBottom>Rating: {movie.vote_average}</Typography>
          <Typography variant="body1" paragraph>{movie.overview}</Typography>
          <Button variant="contained" component={Link} to="/home">Back to Trending Movies</Button>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MovieDetails;
