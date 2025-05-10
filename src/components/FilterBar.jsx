// src/components/FilterBar.jsx
import React, { useState, useEffect, useContext } from 'react';
import { Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function FilterBar() {
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  const { setMovies } = useContext(MovieContext);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => {
        setGenres(res.data.genres);
      })
      .catch((err) => console.error('Error fetching genres:', err));
  }, []);

  const fetchFilteredMovies = async () => {
    let query = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

    if (selectedGenre) query += `&with_genres=${selectedGenre}`;
    if (selectedYear) query += `&primary_release_year=${selectedYear}`;
    if (selectedRating) query += `&vote_average.gte=${selectedRating}`;

    try {
      const res = await axios.get(query);
      setMovies(res.data.results);
    } catch (err) {
      console.error('Error fetching filtered movies:', err);
    }
  };

  useEffect(() => {
    fetchFilteredMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedGenre, selectedYear, selectedRating]);

  return (
    <Box display="flex" justifyContent="center" gap={2} my={2}>
      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Genre</InputLabel>
        <Select
          value={selectedGenre}
          label="Genre"
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {genres.map((genre) => (
            <MenuItem key={genre.id} value={genre.id}>
              {genre.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          label="Year"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {Array.from({ length: 26 }, (_, i) => 2025 - i).map((year) => (
            <MenuItem key={year} value={year}>{year}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl sx={{ minWidth: 120 }}>
        <InputLabel>Rating</InputLabel>
        <Select
          value={selectedRating}
          label="Rating"
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {[8, 7, 6, 5, 4, 3].map((rating) => (
            <MenuItem key={rating} value={rating}>{rating}+</MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}

export default FilterBar;
