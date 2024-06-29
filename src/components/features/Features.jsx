import React, { useState } from 'react';
import { Box, Card, CardContent, Typography, Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import './features.css'; // Import your CSS file for styling

// Import images for each feature
import safetyImage from '../../assets/safety.png';
import facilitiesImage from '../../assets/facilities.png';
import routeImage from '../../assets/blockchain.jpg';
import MapComponent from '../map/MapComponent';
import chatImage from "../../assets/chatbot.jpg"
import NearbyFacilities from '../nearbyfacility/NearbyFacilities';

const Features = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedFeature, setSelectedFeature] = useState(null);

  const handleBlockchain = () => {
    window.open('http://localhost:9000', '_blank');
  };


  const handleExploreClick = (feature) => {
    setSelectedFeature(feature);
  };

  return (
    <div className='ff'>

    <div className='feature'>
      <Typography variant='h3' align='center' gutterBottom>Features</Typography>

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 10, // Adjust as needed
          padding: 4, // Adjust padding as needed
          backgroundColor: 'white',
          borderRadius: 10,
          
        }}
      >
        {/* Feature Cards */}
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: isSmallScreen ? '1fr' : 'repeat(auto-fill, minmax(240px, 1fr))',
            gap: 2,
            maxWidth: '100%',
            padding: 2,
          }}
        >
          {/* Card 1: Safety Rating of Place */}
          <Card className="feature-card">
          
            <img src={safetyImage} alt="Safety Rating" className="feature-image" />
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Safe Route - Safest and Shortest route
              </Typography>
              <Typography variant="body2" align="center">
                Navigate safely to your destination with the Saheli app's Safe Route feature, which leverages advanced technology to guide you along the most secure and efficient path.
              </Typography>
              <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={() => handleExploreClick('safeRoute')}>
                  Explore
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Card 2: Nearby Facilities */}
          <Card className="feature-card">
            <img src={facilitiesImage} alt="Nearby Facilities" className="feature-image" />
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                Nearby Facilities of Your Location
              </Typography>
              <Typography variant="body2" align="center">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus sodales urna et nulla varius, ac hendrerit dui posuere.
              </Typography>
              <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={() => handleExploreClick('nearbyFacilities')}>
                  Explore
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Card 3: AI integrated chatbot */}
          <Card className="feature-card">
            <img src={chatImage} alt="AI integrated chatbot" className="feature-image" />
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
                AI integrated chatbot
              </Typography>
              <Typography variant="body2" align="center">
                Access instant guidance and assistance with the Sakha Chatbot, an integrated AI feature trained specifically on women's safety, available within the Saheli app.
              </Typography>
              <Box mt={2} display="flex" justifyContent="center">
                <Button variant="contained" color="primary" onClick={() => handleExploreClick('aiChatbot')}>
                  Explore
                </Button>
              </Box>
            </CardContent>
          </Card>

          {/* Card 4: Example with image */}
          <Card className="feature-card">
            <img src={routeImage} alt="Example with image" className="feature-image" />
            <CardContent>
              <Typography variant="h5" align="center" gutterBottom>
               Witness safeLock
               <br />
              </Typography>
              <Typography variant="body2" align="center">
                By using Blockchain make your Witness immutable and then we can store files
              </Typography>
              <Box mt={2} display="flex" justifyContent="center" >
                <Button variant="contained" color="primary" onClick={handleBlockchain}>
                  Explore
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Conditional Sections */}
        {selectedFeature && (
          <Box
            sx={{
              marginTop: 4,
              padding: 4,
              backgroundColor: '#fff',
              borderRadius: 10,
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              width: '100%',
            }}
          >
            {selectedFeature === 'safeRoute' && (
              <Typography variant="h6" align="center"><MapComponent></MapComponent></Typography>
            )}
            {selectedFeature === 'nearbyFacilities' && (
              <Typography variant="h6" align="center"><NearbyFacilities></NearbyFacilities></Typography>
            )}
            {selectedFeature === 'aiChatbot' && (
              <Typography variant="h6" align="center">Details about AI integrated chatbot feature...</Typography>
            )}
            {selectedFeature === 'exampleFeature' && (
              <Typography variant="h6" align="center">Details about Example Feature...</Typography>
            )}
          </Box>
        )}
      </Box>
    </div>
    </div>
  );
};

export default Features;
