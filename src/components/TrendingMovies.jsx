// src/components/TrendingMovies.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';  // ✅ import InfiniteScroll

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);  // Track current page
  const [hasMore, setHasMore] = useState(true);  // Track if more movies exist

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);
      if (response.data.results.length === 0) {
        setHasMore(false); // No more movies to load
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        setPage(page + 1);  // Increment page for next fetch
      }
    } catch (err) {
      console.error('Error fetching trending movies:', err);
    }
  };

  useEffect(() => {
    fetchMovies();  // Initial fetch on mount
  }, []);  // Empty dependency array ensures this runs once when the component mounts

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>Trending Movies</Typography>

      {/* Infinite scroll component */}
      <InfiniteScroll
        dataLength={movies.length}  // Total number of movies
        next={fetchMovies}  // Function to load more movies
        hasMore={hasMore}  // Check if there are more movies to load
        loader={<CircularProgress sx={{ margin: '20px auto' }} />}  // Loader while fetching
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
