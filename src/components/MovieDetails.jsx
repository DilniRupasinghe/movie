// Import React and its hooks
import React, { useEffect, useState } from 'react';
// Import tools from react-router-dom for routing
import { useParams, Link } from 'react-router-dom';
// Import axios for HTTP requests
import axios from 'axios';
// Import Material UI components
import { Box, Typography, Card, CardMedia, CardContent, Button } from '@mui/material';

// API key and base URL for The Movie Database API (stored in environment variables)
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

// MovieDetails component (to show details of a specific movie)
function MovieDetails() {
  // Get the movie ID from the URL using useParams
  const { id } = useParams();
  // Create a state variable to hold the movie details
  const [movie, setMovie] = useState(null);

  // useEffect runs once when the component loads or when 'id' changes
  useEffect(() => {
    // Fetch movie details from the API
    axios
      .get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}`)
      .then((res) => {
        setMovie(res.data); // Store the response data in 'movie' state
      })
      .catch((err) => {
        console.error('Error fetching movie details:', err);
      });
  }, [id]); // Dependency array: triggers this effect when 'id' changes

  // Show a loading message if movie data hasn't been fetched yet
  if (!movie) return <Typography>Loading...</Typography>;

  // If movie is loaded, display the details
  return (
    <Box sx={{ padding: 4 }}>
      <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' } }}>
        {/* Movie poster image */}
        <CardMedia
          component="img"
          sx={{ width: { xs: '100%', md: 400 }, height: 'auto' }}
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
        {/* Movie information */}
        <CardContent sx={{ flex: '1' }}>
          <Typography variant="h4" gutterBottom>{movie.title}</Typography>
          <Typography variant="subtitle1" gutterBottom>Release Date: {movie.release_date}</Typography>
          <Typography variant="subtitle1" gutterBottom>Rating: {movie.vote_average}</Typography>
          <Typography variant="body1" paragraph>{movie.overview}</Typography>
          {/* Button to go back to trending movies page */}
          <Button variant="contained" component={Link} to="/home">
            Back to Trending Movies
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}

// Export the component so it can be used in other files
export default MovieDetails;
