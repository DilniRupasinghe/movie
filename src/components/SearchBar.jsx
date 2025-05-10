// SearchBar.jsx
import React, { useState, useContext } from 'react';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';
import { MovieContext } from '../context/MovieContext';

function SearchBar() {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  const { searchMovies, clearSearch, isSearchActive } = useContext(MovieContext);

  const handleSearch = () => {
    if (!query.trim()) return;
    searchMovies(query);
  };

  const handleClear = () => {
    setQuery('');
    clearSearch();
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
        InputLabelProps={{ style: { color: theme.palette.text.primary } }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: theme.palette.text.primary }} />
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {isSearchActive && (
        <Button variant="outlined" onClick={handleClear} sx={{ ml: 2 }}>
          Clear
        </Button>
      )}
    </Box>
  );
}

export default SearchBar;
