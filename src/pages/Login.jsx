import React, { useState } from 'react'; // Import React and the useState hook for managing form state
import { useNavigate } from 'react-router-dom'; // Import the useNavigate hook for navigation after login
import { Button, TextField, Container, Typography, Box } from '@mui/material'; // Import Material UI components

// Login component
const Login = () => {
  // State hooks to store the username and password entered by the user
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState('');
  
  // useNavigate hook from react-router-dom for navigating programmatically after login
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    // Check if both fields are filled
    if (username && password) {
      localStorage.setItem('username', username); // Save username in local storage (this is just for demo purposes)
      navigate('/home'); // Navigate to the home page after successful login
    } else {
      alert('Please enter both username and password'); // Alert if either field is empty
    }
  };

  return (
    <Container maxWidth="xs"> {/* Material UI Container to center the form */}
      <Box sx={{ mt: 8, p: 4, boxShadow: 3, borderRadius: 2 }}> {/* Box to style the form with padding, shadow, and rounded corners */}
        <Typography variant="h4" align="center" gutterBottom> {/* Title of the form */}
          Login
        </Typography>
        <form onSubmit={handleLogin}> {/* Form submission handler */}
          <TextField
            label="Username" // Label for the username input field
            fullWidth // Make the input field full width
            margin="normal" // Add margin around the input field
            value={username} // Set the value of the input field to the username state
            onChange={(e) => setUsername(e.target.value)} // Update the username state when user types
          />
          <TextField
            label="Password" // Label for the password input field
            type="password" // Hide the password input (mask text)
            fullWidth // Make the input field full width
            margin="normal" // Add margin around the input field
            value={password} // Set the value of the input field to the password state
            onChange={(e) => setPassword(e.target.value)} // Update the password state when user types
          />
          <Button variant="contained" fullWidth type="submit" sx={{ mt: 2 }}> {/* Submit button */}
            Login
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login; // Export the Login component to be used elsewhere in the app
