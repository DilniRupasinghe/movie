import React, { useState, useContext } from 'react';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import axios from 'axios';
import { MovieContext } from '../context/MovieContext';  // ✅ import MovieContext

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  const { setMovies, saveLastSearchedMovie } = useContext(MovieContext); // ✅ use context

  const handleSearch = async () => {
    if (!query.trim()) return;

    try {
      const res = await axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`);
      setMovies(res.data.results);  // ✅ update movie list in context
      saveLastSearchedMovie(query); // ✅ save last searched query
      if (onSearch) onSearch(query); // optional callback
    } catch (err) {
      console.error('Error searching movies:', err);
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <TextField
        label="Search movies..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{
          width: '300px',
          mr: 2,
          backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff',
          borderRadius: '4px',
          input: { color: theme.palette.text.primary },
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme.palette.divider },
            '&:hover fieldset': { borderColor: theme.palette.text.primary },
            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main },
          },
        }}
        InputLabelProps={{
          style: { color: theme.palette.text.primary },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: theme.palette.text.primary }} />
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch(); // Optional: search on Enter key
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
