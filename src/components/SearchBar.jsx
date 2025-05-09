import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { MovieContext } from '../context/MovieContext';

function SearchBar() {
  const [query, setQuery] = useState('');
  const { setLastSearch } = useContext(MovieContext);

  const handleSearch = () => {
    setLastSearch(query);
    // API call logic will go here later
    console.log('Search for:', query);
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <TextField
        label="Search movies..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        sx={{ width: '300px', mr: 2 }}
      />
      <Button variant="contained" onClick={handleSearch}>Search</Button>
    </Box>
  );
}

export default SearchBar;
