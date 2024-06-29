import React from 'react';
import { Box, Typography } from '@mui/material';
import { Typewriter } from 'react-simple-typewriter';
import './home.css';
import Header from '../header/Header';

function Home() {
  const words = ['Safety', 'Guardian', 'Protector', 'Sentinel', 'Shield', 'Watchdog'];

  return (
    <div className="home-container">
      <Header />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{
          flexDirection: { xs: 'column', md: 'row' },
          padding: 2,
        }}
      >
        <Box
          flex={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
          flexDirection="column"
          p={2}
          className="left-box"
        >
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold' }} color="black">
            Your Ultimate{' '}
            <span style={{ backgroundColor: 'black', padding: '0.2em' , color:'white'}}>
              <Typewriter
                words={words}
                loop={0}
                cursor
                cursorStyle="_"
                typeSpeed={130}
                deleteSpeed={50}
                delaySpeed={1000}
              />
            </span>{' '}
            
          </Typography>
          <Typography mt={2}>
            Saheli, meaning 'female best friend' in Hindi, is an innovative mobile application designed to ensure the
            safety and security of women, empowering them to navigate through various situations confidently.
          </Typography>
        </Box>
        <Box
          flex={1}
          display="flex"
          justifyContent="flex-end"
          alignItems="center"
          p={2}
          ml={10}
        >
          <div className='hero-img'>

          <img  width="600" height="600"  style={{ maxWidth: '100%', height: 'auto' }} src={require('../../assets/39552.jpg')} alt="" />
          </div>
        </Box>
      </Box>
    </div>
  );
}

export default Home;
