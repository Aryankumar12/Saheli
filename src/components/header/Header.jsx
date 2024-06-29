import React from 'react';
import { Box, Typography } from '@mui/material';
import "./header.css";

const Header = () => {
  return (
    <div className='header'>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={80} // Adjust height as needed
        bgcolor=" rgb(245, 157, 212)" // Example background color
      >
        <Typography variant="h4" component="h1" className="heading-text">
          Saheli
        </Typography>
      </Box>
    </div>
  );
}

export default Header;
