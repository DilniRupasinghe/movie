// Import necessary React hooks and Material UI components
import React, { useState, useContext } from 'react';
import { TextField, Button, Box, InputAdornment } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search'; // Search icon for the input field
import { useTheme } from '@mui/material/styles'; // Theme hook to access the current theme
import { MovieContext } from '../context/MovieContext'; // Context to manage movie data

// SearchBar functional component
function SearchBar() {
  // State to store the search query
  const [query, setQuery] = useState('');
  // Access the current theme using the useTheme hook
  const theme = useTheme();

  // Destructure context values for movie search and clearing the search
  const { searchMovies, clearSearch, isSearchActive } = useContext(MovieContext);

  // Handle the search when the user clicks the search button or presses Enter
  const handleSearch = () => {
    if (!query.trim()) return; // If the search query is empty, do nothing
    searchMovies(query); // Trigger the searchMovies function passed from context
  };

  // Handle clearing the search query
  const handleClear = () => {
    setQuery(''); // Reset the search query state
    clearSearch(); // Trigger the clearSearch function passed from context
  };

  return (
    // Box to hold and center the search bar and buttons
    <Box display="flex" justifyContent="center" mt={2}>
      {/* TextField for the search input */}
      <TextField
        label="Search movies..." // Input label
        variant="outlined" // Outline style for the input field
        value={query} // Value of the search query
        onChange={(e) => setQuery(e.target.value)} // Update the query state as the user types
        sx={{
          width: '300px', // Set width of the input field
          mr: 2, // Margin to the right of the input field
          backgroundColor: theme.palette.mode === 'dark' ? '#424242' : '#fff', // Set background color based on theme
          borderRadius: '4px', // Rounded corners for the input field
          input: { color: theme.palette.text.primary }, // Set text color based on theme
          '& .MuiOutlinedInput-root': {
            '& fieldset': { borderColor: theme.palette.divider }, // Default border color
            '&:hover fieldset': { borderColor: theme.palette.text.primary }, // Border color on hover
            '&.Mui-focused fieldset': { borderColor: theme.palette.primary.main }, // Border color when focused
          },
        }}
        InputLabelProps={{ style: { color: theme.palette.text.primary } }} // Input label color
        InputProps={{
          // Start adornment for the input field: the search icon
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon sx={{ color: theme.palette.text.primary }} />
            </InputAdornment>
          ),
        }}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch(); // Trigger search when Enter key is pressed
        }}
      />
      {/* Search button to trigger the search */}
      <Button variant="contained" onClick={handleSearch}>
        Search
      </Button>
      {/* Clear button appears when a search is active */}
      {isSearchActive && (
        <Button variant="outlined" onClick={handleClear} sx={{ ml: 2 }}>
          Clear
        </Button>
      )}
    </Box>
  );
}

export default SearchBar;
