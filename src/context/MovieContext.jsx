import React, { createContext, useState, useEffect } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState([]);  // trending/search results
  const [favorites, setFavorites] = useState([]);
  const [lastSearchedMovie, setLastSearchedMovie] = useState('');

  // Load favorites and last search from localStorage
  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    const storedLastSearch = localStorage.getItem('lastSearchedMovie');
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
    if (storedLastSearch) {
      setLastSearchedMovie(storedLastSearch);
    }
  }, []);

  // Persist favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // Persist last searched movie
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

  const isFavorite = (movieId) => {
    return favorites.some((fav) => fav.id === movieId);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        favorites,
        addFavorite,
        removeFavorite,
        isFavorite,
        lastSearchedMovie,
        saveLastSearchedMovie,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};
