import React, { useState, useContext } from 'react';
import { TextField, Button, Box } from '@mui/material';
import { MovieContext } from '../context/MovieContext';
import SearchIcon from '@mui/icons-material/Search'; // Corrected icon import

function SearchBar() {
  const [query, setQuery] = useState('');
  const { setLastSearch } = useContext(MovieContext);  // Get the context for last search

  const handleSearch = () => {
    if (query.trim()) {
      setLastSearch(query);  // Save the search query in the context
      console.log('Search for:', query);
      // Here you can call the TMDb API to get search results, e.g.:
      // fetchMovies(query);
    } else {
      console.log('Please enter a search query');
    }
  };

  return (
    <Box display="flex" justifyContent="center" mt={2}>
      <TextField
        label="Search movies..."
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}  // Update the query state
        sx={{ width: '300px', mr: 2 }}
      />
      <Button 
        variant="contained" 
        onClick={handleSearch} 
        sx={{ display: 'flex', alignItems: 'center' }}
      >
        <SearchIcon sx={{ marginRight: 1 }} />
        Search
      </Button>
    </Box>
  );
}

export default SearchBar;
