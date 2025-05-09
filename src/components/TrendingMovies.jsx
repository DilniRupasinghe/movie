import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieGrid from './MovieGrid';

function TrendingMovies() {
  const [movies, setMovies] = useState([]);
  const API_KEY = process.env.REACT_APP_TMDB_API_KEY;


  useEffect(() => {
    const fetchTrending = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`);
        setMovies(res.data.results);
      } catch (err) {
        console.error('Error fetching trending movies:', err);
      }
    };
    fetchTrending();
  }, [API_KEY]);

  return <MovieGrid movies={movies} />;
}

export default TrendingMovies;
