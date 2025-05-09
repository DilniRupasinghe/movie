import React from 'react';
import SearchBar from '../components/SearchBar';
import TrendingMovies from '../components/TrendingMovies';

function Home() {
  return (
    <div>
      <SearchBar />
      <TrendingMovies />
    </div>
  );
}

export default Home;
