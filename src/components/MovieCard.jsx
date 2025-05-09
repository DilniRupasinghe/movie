// /components/MovieCard.jsx

import React from 'react';
import { Card, CardMedia, CardContent, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
        <CardMedia
          component="img"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          height="300"
        />
        <CardContent>
          <Typography variant="subtitle1" noWrap>{movie.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {movie.release_date?.split('-')[0]} | ⭐ {movie.vote_average}
          </Typography>
        </CardContent>
      </Link>
    </Card>
  );
}

export default MovieCard;
