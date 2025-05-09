// /components/SearchBar.jsx

import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';

function SearchBar() {
  const [query, setQuery] = useState('');
  const { setMovies } = useContext(MovieContext);

  const handleSearch = async () => {
    if (!query) return;
    try {
      const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
        params: {
          api_key: 'YOUR_API_KEY', // replace with your TMDb API Key
          query,
        },
      });
      setMovies(res.data.results);
    } catch (err) {
      console.error('Error fetching movies', err);
      alert('Something went wrong while searching!');
    }
  };

  return (
    <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
      <TextField
        label="Search for a movie"
        variant="outlined"
        fullWidth
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Box>
  );
}

export default SearchBar;
