import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, Container, Grid } from '@mui/material';

// Function to generate a random background pattern
const getRandomPattern = () => {
  const patterns = [
    'linear-gradient(45deg, #f3ec78, #af4261)', // Gradient
    'url(https://www.transparenttextures.com/patterns/wood-pattern.png)', // Wood texture
    'url(https://www.transparenttextures.com/patterns/diag-stripes.png)', // Diagonal stripes
    'url(https://www.transparenttextures.com/patterns/asfalt.png)', // Asphalt texture
    'linear-gradient(135deg, #ff758c 0%, #ff7eb3 100%)', // Pink gradient
  ];
  return patterns[Math.floor(Math.random() * patterns.length)];
};

const ContactUs = () => {
  const [backgroundPattern, setBackgroundPattern] = useState('');

  useEffect(() => {
    setBackgroundPattern(getRandomPattern());
  }, []);

  return (
    <Box
      sx={{
        background: backgroundPattern, // Apply random background pattern
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
      }}
    >
      <Container maxWidth="sm" sx={{ backgroundColor: 'white', padding: 4, borderRadius: 2, boxShadow: 3 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Contact Us
        </Typography>
        
        <form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                type="email"
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Message"
                variant="outlined"
                fullWidth
                multiline
                rows={4}
                required
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                color="primary"
                fullWidth
                type="submit"
                sx={{ padding: '10px' }}
              >
                Send Message
              </Button>
            </Grid>
          </Grid>
        </form>
      </Container>
    </Box>
  );
};

export default ContactUs;
