// src/components/FilterBar.jsx

// Import React and hooks for managing state and side effects
import React, { useState, useEffect, useContext } from 'react';
// Import Material-UI components for UI elements
import { Box, FormControl, InputLabel, Select, MenuItem, Button } from '@mui/material';
// Import axios for making HTTP requests
import axios from 'axios';
// Import the MovieContext to access shared data/functions
import { MovieContext } from '../context/MovieContext';

// API configuration
const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Get API key from environment variable
const BASE_URL = 'https://api.themoviedb.org/3'; // Base URL for TMDB API

function FilterBar() {
  // Store list of genres from API
  const [genres, setGenres] = useState([]);
  // Store selected filter values
  const [selectedGenre, setSelectedGenre] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedRating, setSelectedRating] = useState('');
  // Get setMovies function from MovieContext to update movie list globally
  const { setMovies } = useContext(MovieContext);

  // Runs once to fetch available genres from TMDB API
  useEffect(() => {
    axios
      .get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`)
      .then((res) => {
        setGenres(res.data.genres); // Save fetched genres into state
      })
      .catch((err) => console.error('Error fetching genres:', err));
  }, []);

  // Function to fetch movies with optional filters
  const fetchFilteredMovies = async () => {
    let query = `${BASE_URL}/discover/movie?api_key=${API_KEY}`;

    // Add filters to query if selected
    if (selectedGenre) query += `&with_genres=${selectedGenre}`;
    if (selectedYear) query += `&primary_release_year=${selectedYear}`;
    if (selectedRating) query += `&vote_average.gte=${selectedRating}`;

    try {
      const res = await axios.get(query);
      setMovies(res.data.results); // Update movie list with filtered results
    } catch (err) {
      console.error('Error fetching filtered movies:', err);
    }
  };

  // Fetch movies without filters when component first loads
  useEffect(() => {
    fetchFilteredMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Reset all filters and fetch default movies
  const handleReset = () => {
    setSelectedGenre('');
    setSelectedYear('');
    setSelectedRating('');
    fetchFilteredMovies(); // Refresh movie list
  };

  // Styles for the dropdown controls
  const formControlSx = {
    minWidth: 120,
    backgroundColor: 'background.paper',
    border: '1px solid',
    borderColor: 'divider',
    borderRadius: 1,
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      gap={2}
      my={2}
      flexWrap="wrap"
      p={2}
      sx={{
        backgroundColor: 'background.default',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
      }}
    >
      {/* Genre filter dropdown */}
      <FormControl sx={formControlSx}>
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

      {/* Year filter dropdown */}
      <FormControl sx={formControlSx}>
        <InputLabel>Year</InputLabel>
        <Select
          value={selectedYear}
          label="Year"
          onChange={(e) => setSelectedYear(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {/* Create a list of recent years */}
          {Array.from({ length: 26 }, (_, i) => 2025 - i).map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rating filter dropdown */}
      <FormControl sx={formControlSx}>
        <InputLabel>Rating</InputLabel>
        <Select
          value={selectedRating}
          label="Rating"
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <MenuItem value="">All</MenuItem>
          {[8, 7, 6, 5, 4, 3].map((rating) => (
            <MenuItem key={rating} value={rating}>
              {rating}+
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Filter and Reset buttons */}
      <Box display="flex" gap={1}>
        <Button variant="contained" color="primary" onClick={fetchFilteredMovies}>
          Filter
        </Button>
        <Button variant="outlined" color="secondary" onClick={handleReset}>
          Reset
        </Button>
      </Box>
    </Box>
  );
}

// Export the FilterBar component so it can be used elsewhere
export default FilterBar;
