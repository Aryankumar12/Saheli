import React, { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import axios from 'axios';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';

mapboxgl.accessToken =  process.env.REACT_APP_MAPBOX_API_KEY;

function MapComponent() {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [originInput, setOriginInput] = useState('');
  const [destinationInput, setDestinationInput] = useState('');
  const [routeData, setRouteData] = useState(null); // State to store route data

  useEffect(() => {
    if (!map.current) {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [-98.5795, 39.8283], // Default center of the US
        zoom: 3, // Default zoom level
      });

      const geocoderOrigin = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: 'Enter origin',
      });

      const geocoderDestination = new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
        marker: false,
        placeholder: 'Enter destination',
      });

      map.current.addControl(geocoderOrigin);
      map.current.addControl(geocoderDestination);

      map.current.on('load', () => {
        geocoderOrigin.on('result', (event) => {
          setOriginInput(event.result.text);
        });

        geocoderDestination.on('result', (event) => {
          setDestinationInput(event.result.text);
        });
      });
    }
  }, []);

  const getRoute = async () => {
    try {
      const originCoordinates = await getCoordinates(originInput);
      const destinationCoordinates = await getCoordinates(destinationInput);

      const url = `https://api.mapbox.com/directions/v5/mapbox/driving/${originCoordinates[0]},${originCoordinates[1]};${destinationCoordinates[0]},${destinationCoordinates[1]}?geometries=geojson&access_token=${mapboxgl.accessToken}`;
      const response = await axios.get(url);
      const data = response.data.routes[0];

      setRouteData(data); // Update route data state

      if (map.current.getSource('route')) {
        map.current.removeLayer('route');
        map.current.removeSource('route');
      }

      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: data.geometry,
        },
      });

      map.current.addLayer({
        id: 'route',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round',
        },
        paint: {
          'line-color': '#3887be',
          'line-width': 8,
        },
      });

      // Fit map to the bounds of the route
      const bounds = new mapboxgl.LngLatBounds();
      data.geometry.coordinates.forEach((point) => {
        bounds.extend(point);
      });
      map.current.fitBounds(bounds, { padding: 100 });

    } catch (error) {
      console.error('Error fetching route:', error);
    }
  };

  const getCoordinates = async (place) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(place)}.json?access_token=${mapboxgl.accessToken}`;
    const response = await axios.get(url);
    return response.data.features[0].center;
  };

  return (
    <div>
      <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ marginRight: '10px' }}>
          <label style={{ marginBottom: '5px', display: 'block', color: '#555' }}>Origin:</label>
          <input
            type="text"
            value={originInput}
            onChange={(e) => setOriginInput(e.target.value)}
            placeholder="Enter origin"
            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <div style={{ marginRight: '10px' }}>
          <label style={{ marginBottom: '5px', display: 'block', color: '#555' }}>Destination:</label>
          <input
            type="text"
            value={destinationInput}
            onChange={(e) => setDestinationInput(e.target.value)}
            placeholder="Enter destination"
            style={{ padding: '10px', width: '300px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
        </div>
        <button
          type="button"
          onClick={getRoute}
          style={{ padding: '10px 20px', backgroundColor: '#3887be', color: '#fff', borderRadius: '5px', border: 'none', cursor: 'pointer' }}
        >
          Get Route
        </button>
      </div>
      <div ref={mapContainer} style={{ width: '100%', height: '600px', marginTop: '10px', borderRadius: '5px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }} />
      {routeData && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#f0f0f0', borderRadius: '5px', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
          <h2>Route Information</h2>
          <p>Distance: {(routeData.distance / 1000).toFixed(2)} kilometers</p>
        </div>
      )}
    </div>
  );
}

export default MapComponent;
