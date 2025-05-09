// src/context/MovieContext.jsx
import React, { createContext, useState } from 'react';

export const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [lastSearch, setLastSearch] = useState('');

  return (
    <MovieContext.Provider value={{ lastSearch, setLastSearch }}>
      {children}
    </MovieContext.Provider>
  );
};
