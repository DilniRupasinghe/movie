// MovieContext.jsx
import React, { createContext, useState, useEffect } from 'react'; // Importing necessary hooks and components from React
import axios from 'axios'; // Importing axios for making API requests

// Create a new context that will hold the movie data
export const MovieContext = createContext();

// API Key for making requests to the TMDB (The Movie Database) API
const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // Fetching the API key from environment variables
const BASE_URL = 'https://api.themoviedb.org/3'; // Base URL to use in API requests

// MovieProvider component will provide the movie data and functions to other components
export const MovieProvider = ({ children }) => {
  // State variables to manage the app's movie data
  const [movies, setMovies] = useState([]); // Stores the list of movies (either trending or search results)
  const [page, setPage] = useState(1); // Stores the current page number for pagination
  const [hasMore, setHasMore] = useState(true); // Whether there are more movies to load (pagination)
  const [isSearchActive, setIsSearchActive] = useState(false); // Whether the search mode is active
  const [searchQuery, setSearchQuery] = useState(''); // The search query string

  const [favorites, setFavorites] = useState([]); // Stores the list of favorite movies
  const [lastSearchedMovie, setLastSearchedMovie] = useState(''); // Stores the last movie that was searched

  // Function to fetch more movies, either trending or based on the search query
  const fetchMoreMovies = async () => {
    try {
      // Determine the API endpoint based on whether a search is active or not
      const endpoint = isSearchActive
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

      // Log the fetching status (just for debugging)
      console.log(`Fetching ${isSearchActive ? 'search' : 'trending'} page: ${page}`);

      // Make the API request to fetch the movies
      const response = await axios.get(endpoint);
      const newMovies = response.data.results; // Get the results from the API response

      // If no movies are returned, set `hasMore` to false to stop loading more
      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        // Otherwise, update the movie list and increment the page number
        setMovies((prev) => [...prev, ...newMovies]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      // Catch any errors that happen during the API request
      console.error('Error fetching movies:', err);
    }
  };

  // Function to initiate a new movie search
  const searchMovies = async (query) => {
    if (!query.trim()) return; // Don't search if the query is empty
    setSearchQuery(query); // Update the search query
    setIsSearchActive(true); // Set search mode to active
    setMovies([]); // Clear any previous search results
    setPage(1); // Reset the page to 1 (first page of search results)
    setHasMore(true); // Enable pagination again
    await fetchMoreMovies(); // Fetch the first page of search results
    saveLastSearchedMovie(query); // Save the last searched movie
  };

  // Function to clear the search and go back to the trending movies
  const clearSearch = () => {
    setIsSearchActive(false); // Turn off search mode
    setSearchQuery(''); // Clear the search query
    setMovies([]); // Clear the search results
    setPage(1); // Reset the page to 1
    setHasMore(true); // Enable pagination again
    fetchMoreMovies(); // Fetch the trending movies again
  };

  // useEffect hook to load trending movies when the component mounts
  useEffect(() => {
    fetchMoreMovies(); // Fetch the first set of trending movies when the app loads
  }, []); // Empty dependency array means this effect runs only once (on mount)

  // useEffect hook to load favorites and last searched movie from localStorage when the component mounts
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites'); // Get stored favorites from localStorage
    const storedLastSearch = localStorage.getItem('lastSearchedMovie'); // Get stored last searched movie from localStorage
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites)); // If favorites exist, load them into state
    if (storedLastSearch) setLastSearchedMovie(storedLastSearch); // If last searched exists, load it into state
  }, []); // This effect also runs only once on mount

  // useEffect hook to save the favorites list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Save favorites to localStorage
  }, [favorites]); // This effect runs whenever the `favorites` state changes

  // Function to save the last searched movie to both state and localStorage
  const saveLastSearchedMovie = (movieTitle) => {
    setLastSearchedMovie(movieTitle); // Update the last searched movie in state
    localStorage.setItem('lastSearchedMovie', movieTitle); // Save the last searched movie to localStorage
  };

  // Function to add a movie to the favorites list
  const addFavorite = (movie) => {
    // If the movie is not already in the favorites list, add it
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]); // Add the movie to the favorites list
    }
  };

  // Function to remove a movie from the favorites list
  const removeFavorite = (movieId) => {
    setFavorites(favorites.filter((fav) => fav.id !== movieId)); // Remove the movie with the given ID from favorites
  };

  // Function to check if a movie is in the favorites list
  const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId); // Return true if the movie is in favorites

  return (
    // The MovieContext.Provider will wrap around components that need access to this context
    <MovieContext.Provider
      value={{
        movies, // The list of movies (trending or search results)
        setMovies, // Function to set the movie list
        fetchMoreMovies, // Function to fetch more movies (for infinite scrolling)
        hasMore, // Boolean indicating if there are more movies to load
        favorites, // The list of favorite movies
        addFavorite, // Function to add a movie to favorites
        removeFavorite, // Function to remove a movie from favorites
        isFavorite, // Function to check if a movie is in favorites
        lastSearchedMovie, // The last searched movie title
        saveLastSearchedMovie, // Function to save the last searched movie
        isSearchActive, // Boolean indicating if search mode is active
        searchMovies, // Function to start a new movie search
        clearSearch, // Function to clear the search and go back to trending movies
      }}
    >
      {children} {/* Render the children components with access to the movie context */}
    </MovieContext.Provider>
  );
};
