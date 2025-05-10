// Importing necessary hooks, components, and libraries
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; // For making API requests
import MovieCard from './MovieCard'; // Custom component for rendering individual movie cards
import { CircularProgress, Box } from '@mui/material'; // MUI components for loading spinner and layout

// API key for accessing the TMDB API from the environment variables
const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SearchResults = ({ query }) => {
  // State for storing the list of movies
  const [movies, setMovies] = useState([]);
  // State for managing loading state (whether the data is being fetched)
  const [loading, setLoading] = useState(false);
  // State for managing pagination (current page number)
  const [page, setPage] = useState(1);
  // State for checking if more movies are available for pagination
  const [hasMore, setHasMore] = useState(true);

  // 🏁 Function to fetch movies from the TMDB API
  const fetchMovies = useCallback(async (currentPage, currentQuery) => {
    // If already loading or query is empty, do not fetch data again
    if (loading || !currentQuery) return;

    setLoading(true); // Set loading to true before making the API request
    try {
      // Make the API request to fetch movies based on the query and page
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: currentQuery, // Search query
            page: currentPage // Page number for pagination
          }
        }
      );

      const newMovies = response.data.results; // Extract movie results from the response

      // Update the movies state by appending the new movies to the existing list
      setMovies(prevMovies => (currentPage === 1 ? newMovies : [...prevMovies, ...newMovies]));

      // If no more movies or less than 20 movies are returned, there are no more results
      if (newMovies.length === 0 || newMovies.length < 20) {
        setHasMore(false); // Set hasMore to false to indicate no more results
      }
    } catch (err) {
      console.error("Error fetching movies:", err); // Log any errors
    } finally {
      setLoading(false); // Set loading to false after fetching is complete
    }
  }, [API_KEY, loading]);

  //Effect to trigger fetch when the query changes
  useEffect(() => {
    setMovies([]); // Clear the current movie list when query changes
    setPage(1); // Reset the page number to 1
    setHasMore(true); // Reset the "has more" state to true

    // If there is a query, initiate the movie fetching process
    if (query) {
      fetchMovies(1, query); // Fetch the first page of movies based on the new query
    }
  }, [query, fetchMovies]); // Re-run when the query changes

  // Effect for infinite scrolling: Fetch more movies when user scrolls down
  useEffect(() => {
    const handleScroll = () => {
      // Check if the user has scrolled near the bottom of the page
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading && // Ensure loading is not in progress
        hasMore // Ensure there are more movies to load
      ) {
        setPage(prevPage => prevPage + 1); // Increment the page number to load more movies
      }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener when the component unmounts
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]); // Run when loading or hasMore changes

  // Effect to trigger fetch when the page number changes
  useEffect(() => {
    if (page !== 1 && query) { // If it's not the first page and there's a query
      fetchMovies(page, query); // Fetch more movies for the new page
    }
  }, [page, query, fetchMovies]); // Run when page or query changes

  return (
    <div>
      {/* Display the movies in a grid layout */}
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} /> // Render each movie using MovieCard component
        ))}
      </Box>

      {/* Show a loading spinner while the movies are being fetched */}
      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {/* Display a message when no more results are available */}
      {!hasMore && !loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <p>No more results</p>
        </Box>
      )}
    </div>
  );
};

export default SearchResults;
