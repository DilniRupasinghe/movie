// src/components/SearchResults.jsx
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MovieCard from './MovieCard';
import { CircularProgress, Box } from '@mui/material';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;

const SearchResults = ({ query }) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // 🏁 Fetch movies function
  const fetchMovies = useCallback(async (currentPage, currentQuery) => {
    if (loading || !currentQuery) return;

    setLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie`,
        {
          params: {
            api_key: API_KEY,
            query: currentQuery,
            page: currentPage
          }
        }
      );

      const newMovies = response.data.results;

      setMovies(prevMovies => (currentPage === 1 ? newMovies : [...prevMovies, ...newMovies]));

      if (newMovies.length === 0 || newMovies.length < 20) {
        setHasMore(false);
      }
    } catch (err) {
      console.error("Error fetching movies:", err);
    } finally {
      setLoading(false);
    }
  }, [API_KEY, loading]);

  // 🕵️ Fetch on query change
  useEffect(() => {
    setMovies([]);
    setPage(1);
    setHasMore(true);

    if (query) {
      fetchMovies(1, query);
    }
  }, [query, fetchMovies]);

  // 🏃‍♀️ Infinite scroll
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
        !loading &&
        hasMore
      ) {
        setPage(prevPage => prevPage + 1);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loading, hasMore]);

  // 🕑 Fetch on page change
  useEffect(() => {
    if (page !== 1 && query) {
      fetchMovies(page, query);
    }
  }, [page, query, fetchMovies]);

  return (
    <div>
      <Box display="flex" flexWrap="wrap" gap={2} justifyContent="center">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <CircularProgress />
        </Box>
      )}

      {!hasMore && !loading && (
        <Box display="flex" justifyContent="center" mt={2}>
          <p>No more results</p>
        </Box>
      )}
    </div>
  );
};

export default SearchResults;
