// /components/TrendingMovies.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieGrid from './MovieGrid';
import { Typography } from '@mui/material';

function TrendingMovies() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/week`, {
          params: { api_key: 'YOUR_API_KEY' },
        });
        setTrending(res.data.results);
      } catch (err) {
        console.error('Error fetching trending movies', err);
      }
    };
    fetchTrending();
  }, []);

  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
        Trending Movies
      </Typography>
      <MovieGrid movies={trending} />
    </>
  );
}

export default TrendingMovies;
