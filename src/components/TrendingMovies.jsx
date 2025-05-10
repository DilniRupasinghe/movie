// Import necessary dependencies and components
import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';  // Import MovieContext to access movie data and functions
import { Box, Grid, Card, CardMedia, CardContent, Typography, CircularProgress } from '@mui/material'; // MUI components for styling
import { Link } from 'react-router-dom'; // For navigation links
import InfiniteScroll from 'react-infinite-scroll-component'; // For infinite scrolling functionality

function TrendingMovies() {
  // Use the context to retrieve the movies array, setMovies function, fetchMoreMovies function, and hasMore flag
  const { movies, fetchMoreMovies, hasMore } = useContext(MovieContext);  // Extract from context

  return (
    <Box sx={{ padding: 4 }}>
      {/* Title for the trending movies section */}
      <Typography variant="h4" gutterBottom>
        Trending Movies
      </Typography>

      {/* InfiniteScroll component to load more movies when the user scrolls down */}
      <InfiniteScroll
        dataLength={movies.length}  // Length of the current movies array
        next={fetchMoreMovies}  // Function to fetch more movies from the context
        hasMore={hasMore}  // Whether more movies are available to load
        loader={<CircularProgress sx={{ margin: '20px auto' }} />}  // Loader to show while fetching
        endMessage={  // Message to display when all movies have been loaded
          <Typography textAlign="center" sx={{ mt: 2 }}>
            You’ve reached the end of the list!
          </Typography>
        }
      >
        {/* Grid to display movie cards */}
        <Grid container spacing={2}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={movie.id}>
              {/* Link to navigate to the movie details page */}
              <Link to={`/movie/${movie.id}`} style={{ textDecoration: 'none' }}>
                {/* Movie card with hover effect */}
                <Card sx={{ cursor: 'pointer', '&:hover': { transform: 'scale(1.05)', transition: '0.3s' } }}>
                  {/* Movie poster image */}
                  <CardMedia
                    component="img"
                    height="300"
                    image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                    alt={movie.title}
                  />
                  <CardContent>
                    {/* Movie title */}
                    <Typography variant="h6" color="text.primary">{movie.title}</Typography>
                    {/* Movie rating */}
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
