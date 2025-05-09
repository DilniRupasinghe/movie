import React, { useState } from 'react';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useTheme } from '@mui/material/styles';

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');
  const theme = useTheme();

  const handleSearch = () => {
    if (onSearch) onSearch(query);
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
      />
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
