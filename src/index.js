// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { MovieProvider } from './context/MovieContext';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <MovieProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </MovieProvider>,
  document.getElementById('root')
);
