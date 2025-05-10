import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const MovieContext = createContext();

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]); // trending or search results
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [favorites, setFavorites] = useState([]);
  const [lastSearchedMovie, setLastSearchedMovie] = useState('');

  // 🔥 fetch more movies (either trending or search)
  const fetchMoreMovies = useCallback(async () => {
    try {
      const endpoint = isSearchActive
        ? `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${encodeURIComponent(searchQuery)}&page=${page}`
        : `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`;

      console.log(`Fetching ${isSearchActive ? 'search' : 'trending'} page: ${page}`);

      const response = await axios.get(endpoint);
      const newMovies = response.data.results;

      if (newMovies.length === 0) {
        setHasMore(false);
      } else {
        setMovies((prev) => [...prev, ...newMovies]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
    }
  }, [isSearchActive, searchQuery, page]);

  // 🔥 start new search (reset state)
  const searchMovies = async (query) => {
    if (!query.trim()) return;
    setSearchQuery(query);
    setIsSearchActive(true);
    setMovies([]); // clear previous results
    setPage(1);
    setHasMore(true);
    await fetchMoreMovies();
    saveLastSearchedMovie(query);
    // fetch first search page
    // ❗️don't await → let `fetchMoreMovies` handle
  };

  // 🔥 clear search → return to trending
  const clearSearch = () => {
    setIsSearchActive(false);
    setSearchQuery('');
    setMovies([]);
    setPage(1);
    setHasMore(true);
    fetchMoreMovies();
  };

  // 🔥 load trending on first mount
  useEffect(() => {
    fetchMoreMovies();
  }, [fetchMoreMovies]); // Add fetchMoreMovies as a dependency here

  // load favorites & last search
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedLastSearch = localStorage.getItem('lastSearchedMovie');
    if (storedFavorites) setFavorites(JSON.parse(storedFavorites));
    if (storedLastSearch) setLastSearchedMovie(storedLastSearch);
  }, []);

  // save favorites
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const saveLastSearchedMovie = (movieTitle) => {
    setLastSearchedMovie(movieTitle);
    localStorage.setItem('lastSearchedMovie', movieTitle);
  };

  const addFavorite = (movie) => {
    if (!favorites.some((fav) => fav.id === movie.id)) {
      setFavorites([...favorites, movie]);
    }
  };

  const removeFavorite = (movieId) => {
    setFavorites(favorites.filter((fav) => fav.id !== movieId));
  };

  const isFavorite = (movieId) => favorites.some((fav) => fav.id === movieId);

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        fetchMoreMovies,
        hasMore,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        lastSearchedMovie,
        saveLastSearchedMovie,
        isSearchActive,
        searchMovies,
        clearSearch,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
