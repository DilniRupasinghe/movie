import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);
  const [lastSearch, setLastSearch] = useState('');

  const addFavorite = (movie) => {
    setFavorites((prev) => [...prev, movie]);
  };

  const removeFavorite = (id) => {
    setFavorites((prev) => prev.filter((movie) => movie.id !== id));
  };

  return (
    <MovieContext.Provider value={{ favorites, addFavorite, removeFavorite, lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};
