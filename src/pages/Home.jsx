import React from 'react';
import SearchBar from '../components/SearchBar';
import TrendingMovies from '../components/TrendingMovies';
import FilterBar from '../components/FilterBar';

function Home() {
  return (
    <div>
      <SearchBar />
      <FilterBar/>
      <TrendingMovies />
    </div>
  );
}

export default Home;
