import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Typography, Box } from '@mui/material';

function MovieDetails() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=YOUR_TMDB_API_KEY&append_to_response=credits,videos`);
        setMovie(res.data);
      } catch (err) {
        console.error('Error fetching movie details:', err);
      }
    };
    fetchDetails();
  }, [id]);

  if (!movie) return <Typography>Loading...</Typography>;

  return (
    <Box p={2}>
      <Typography variant="h4">{movie.title}</Typography>
      <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
      <Typography>{movie.overview}</Typography>
      <Typography>Genres: {movie.genres.map(g => g.name).join(', ')}</Typography>
      <Typography>Rating: ⭐ {movie.vote_average}</Typography>
    </Box>
  );
}

export default MovieDetails;
