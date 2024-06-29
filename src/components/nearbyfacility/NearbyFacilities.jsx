import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import axios from 'axios';
import { List, ListItem, ListItemText, ListItemAvatar, Avatar, Typography, Box } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LocalPoliceIcon from '@mui/icons-material/LocalPolice';

mapboxgl.accessToken =  process.env.REACT_APP_MAPBOX_API_KEY;

const NearbyFacilities = () => {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lng, setLng] = useState(-122.4194);
  const [lat, setLat] = useState(37.7749);
  const [zoom, setZoom] = useState(13);
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    if (map.current) return;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom,
    });

    const geocoder = new MapboxGeocoder({
      accessToken: mapboxgl.accessToken,
      mapboxgl: mapboxgl,
    });

    map.current.addControl(geocoder);

    geocoder.on('result', async (e) => {
      const coordinates = e.result.geometry.coordinates;
      setLng(coordinates[0]);
      setLat(coordinates[1]);
      map.current.flyTo({ center: coordinates, zoom: 14 });
      fetchNearbyFacilities(coordinates);
    });

    fetchNearbyFacilities([lng, lat]);
  }, []);

  const fetchNearbyFacilities = async (coordinates) => {
    try {
      const [lng, lat] = coordinates;
      const responses = await Promise.all([
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/police_station.json?proximity=${lng},${lat}&access_token=${mapboxgl.accessToken}`),
        axios.get(`https://api.mapbox.com/geocoding/v5/mapbox.places/hospital.json?proximity=${lng},${lat}&access_token=${mapboxgl.accessToken}`)
      ]);
      const policeStations = responses[0].data.features;
      const hospitals = responses[1].data.features;

      setPlaces([
        ...policeStations.map(place => ({ ...place, type: 'Police Station' })),
        ...hospitals.map(place => ({ ...place, type: 'Hospital' }))
      ]);

      policeStations.forEach((place) => {
        new mapboxgl.Marker({ color: 'blue' })
          .setLngLat(place.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(place.place_name))
          .addTo(map.current);
      });

      hospitals.forEach((place) => {
        new mapboxgl.Marker({ color: 'red' })
          .setLngLat(place.geometry.coordinates)
          .setPopup(new mapboxgl.Popup({ offset: 25 }).setText(place.place_name))
          .addTo(map.current);
      });
    } catch (error) {
      console.error('Error fetching facilities:', error);
    }
  };

  return (
    <Box display="flex">
      <Box flex={1} p={2}>
        <Typography variant="h5" gutterBottom>
          Nearby Police Stations and Hospitals
        </Typography>
        <List>
          {places.map((place, index) => (
            <ListItem key={index}>
              <ListItemAvatar>
                <Avatar>
                  {place.type === 'Police Station' ? <LocalPoliceIcon /> : <LocalHospitalIcon />}
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={place.place_name} secondary={place.type} />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box ref={mapContainer} flex={1} height="600px" />
    </Box>
  );
};

export default NearbyFacilities;
