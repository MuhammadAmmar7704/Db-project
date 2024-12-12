import React, { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Container,
  Grid,
} from "@mui/material";
// import Grid from "@mui/material";

const ContactUs = () => {
  return (
    <Box
      sx={{
        background: "#E8E8E8",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 2,
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          backgroundColor: "white",
          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          className="text-gray-600"
        >
          Contact Us
        </Typography>

        <form>
          <Grid container spacing={2} className="">
            <Grid item xs={12}>
              <TextField
                label="Name"
                variant="outlined"
                fullWidth
                required
                margin="normal"
                className=""
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
                sx={{ padding: "10px" }}
                className="hover:bg-[#005F73] bg-opacity-75 bg-[#007F9D]"
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
