import React from 'react';
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
import { Link } from 'react-router-dom';

function MovieCard({ movie }) {
  return (
    <Card sx={{ maxWidth: 200 }}>
      <CardActionArea component={Link} to={`/movie/${movie.id}`}>
        <CardMedia
          component="img"
          height="300"
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        <CardContent>
          <Typography variant="subtitle1" noWrap>{movie.title}</Typography>
          <Typography variant="body2">⭐ {movie.vote_average} | {movie.release_date?.slice(0, 4)}</Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default MovieCard;
