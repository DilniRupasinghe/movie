// Import React
import React from 'react';
// Import Material UI components
import { Card, CardMedia, CardContent, Typography, CardActionArea } from '@mui/material';
// Import Link from react-router-dom to make the card clickable as a link
import { Link } from 'react-router-dom';

// MovieCard component receives a "movie" object as a prop
function MovieCard({ movie }) {
  return (
    // The Card container with a maximum width of 200px
    <Card sx={{ maxWidth: 200 }}>
      {/* Make the whole card clickable to navigate to movie details page */}
      <CardActionArea component={Link} to={`/movie/${movie.id}`}>
        {/* Movie poster image */}
        <CardMedia
          component="img" // tell MUI to render an img element
          height="300" // height of the image
          image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} // image URL (concatenated from TMDB base + poster path)
          alt={movie.title} // alt text for accessibility
        />
        {/* Card content section (holds the text) */}
        <CardContent>
          {/* Movie title (subtitle1 style), noWrap prevents text from breaking into multiple lines */}
          <Typography variant="subtitle1" noWrap>
            {movie.title}
          </Typography>
          {/* Rating and release year (body2 style) */}
          <Typography variant="body2">
            ⭐ {movie.vote_average} | {movie.release_date?.slice(0, 4)}
            {/* slice to get only the year (first 4 characters of date) */}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// Export the component so it can be used elsewhere
export default MovieCard;
