import React from 'react';
import { Box, Typography } from '@mui/material';
import './footer.css'; // Import your CSS file for styling

const Footer = () => {
  return (
    <footer className="footer">
      <Box sx={{ backgroundColor: '#333', color: '#fff', py: 3, textAlign: 'center' }}>
        <Typography variant="body1">&copy; 2024 Saheli. All rights reserved.</Typography>
        <Typography variant="body2">Designed and Developed Freaking Team</Typography>
      </Box>
    </footer>
  );
};

export default Footer;
