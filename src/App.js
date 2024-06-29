import React, { useState, useEffect } from 'react';
import { LinearProgress, Box, Typography, Container } from '@mui/material';
import MapComponent from './components/map/MapComponent';
import Home from './components/home/Home';
import Features from  './components/features/Features'
import Footer from './components/footer/Footer';
import ChatbotComponent from './components/chatBotComponent/ChatbotComponent';
function App() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          clearInterval(timer);
          setLoading(false);
          return 100;
        }
        return prevProgress + 10; // Adjust the step as needed
      });
    }, 200); // Adjust the interval duration as needed

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="App">
      {loading ? (
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography variant="h6" gutterBottom>
            Loading...
          </Typography>
          <Box width="50%">  {/* Adjust the width here */}
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        </Box>
      ) : (
        <>
          {/* <header className="App-header">
            <h1>Search</h1>
          </header>
          <main>
            <MapComponent />
          </main> */}
          
          <Home></Home>
          <Features></Features>
          <Footer></Footer>
        </>
      )}
    </div>
  );
}

export default App;
