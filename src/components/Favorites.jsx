import React, { useContext } from 'react';
import { MovieContext } from '../context/MovieContext';

function Favorites() {
  const { favorites } = useContext(MovieContext);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Favorites ({favorites?.length ?? 0})</h2>
      {favorites && favorites.length > 0 ? (
        <ul>
          {favorites.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ul>
      ) : (
        <p>No favorites added yet.</p>
      )}
    </div>
  );
}

export default Favorites;
