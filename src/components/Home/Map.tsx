/* eslint-disable unused-imports/no-unused-vars */

'use client';
import {
  DirectionsRenderer,
  GoogleMap,
  Marker,
  useJsApiLoader,
} from '@react-google-maps/api';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

// Define Pakistan's bounding box
const PAKISTAN_BOUNDS = {
  north: 37.0841, // Northernmost latitude (Gilgit-Baltistan)
  south: 23.6345, // Southernmost latitude (Sindh coast)
  west: 60.8786, // Westernmost longitude (Balochistan)
  east: 77.8375, // Easternmost longitude (Kashmir)
};

// Center of Pakistan
const PAKISTAN_CENTER = { lat: 30.3753, lng: 69.3451 }; // Approx center (Quetta-ish)

// Dark mode map style
const DARK_MAP_STYLE = [
  { elementType: 'geometry', stylers: [{ color: '#212121' }] },
  { elementType: 'labels.icon', stylers: [{ visibility: 'off' }] },
  { elementType: 'labels.text.fill', stylers: [{ color: '#757575' }] },
  { elementType: 'labels.text.stroke', stylers: [{ color: '#212121' }] },
  { featureType: 'administrative', elementType: 'geometry', stylers: [{ color: '#757575' }] },
  { featureType: 'administrative.country', elementType: 'labels.text.fill', stylers: [{ color: '#9e9e9e' }] },
  { featureType: 'road', elementType: 'geometry.fill', stylers: [{ color: '#424242' }] },
  { featureType: 'road', elementType: 'labels.text.fill', stylers: [{ color: '#bdbdbd' }] },
  { featureType: 'water', elementType: 'geometry', stylers: [{ color: '#000000' }] },
  { featureType: 'water', elementType: 'labels.text.fill', stylers: [{ color: '#3d3d3d' }] },
];

const MapComponent = ({ destinationLat, destinationLng }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  // Load Google Maps API
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries: ['geometry'],
  });

  // Ensure component is mounted before rendering theme-dependent UI
  useEffect(() => {
    setMounted(true);
  }, []);

  // Get user location within Pakistan
  useEffect(() => {
    if (!isLoaded || typeof destinationLat !== 'number' || typeof destinationLng !== 'number') {
      if (!isLoaded) {
        setError('Google Maps API is not yet loaded.');
      }
      if (typeof destinationLat !== 'number' || typeof destinationLng !== 'number') {
        setError('Invalid destination coordinates provided.');
      }
      return;
    }

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (
              latitude >= PAKISTAN_BOUNDS.south
              && latitude <= PAKISTAN_BOUNDS.north
              && longitude >= PAKISTAN_BOUNDS.west
              && longitude <= PAKISTAN_BOUNDS.east
            ) {
              setUserLocation({ lat: latitude, lng: longitude });
              setError(null);
            } else {
              setError('Location outside Pakistan. Using fallback (Lahore).');
              setUserLocation({ lat: 31.5497, lng: 74.3436 }); // Lahore
            }
          },
          () => {
            setError('Unable to retrieve location. Using fallback (Lahore).');
            setUserLocation({ lat: 31.5497, lng: 74.3436 });
          },
          { timeout: 10000, maximumAge: 60000 },
        );
      } else {
        setError('Geolocation not supported. Using fallback (Lahore).');
        setUserLocation({ lat: 31.5497, lng: 74.3436 });
      }
    };

    getUserLocation();
  }, [isLoaded, destinationLat, destinationLng]);

  // Calculate directions within Pakistan
  useEffect(() => {
    if (!isLoaded || !userLocation || !destinationLat || !destinationLng) {
      return;
    }

    if (
      destinationLat < PAKISTAN_BOUNDS.south
      || destinationLat > PAKISTAN_BOUNDS.north
      || destinationLng < PAKISTAN_BOUNDS.west
      || destinationLng > PAKISTAN_BOUNDS.east
    ) {
      setError('Destination is outside Pakistan.');
      setDirections(null);
      setDistance('');
      setDuration('');
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: { lat: destinationLat, lng: destinationLng },
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
          const route = result.routes[0].legs[0];
          setDistance(route.distance.text);
          setDuration(route.duration.text);
          setError(null);
        } else {
          setError(`Unable to calculate route: ${status}`);
          setDistance('');
          setDuration('');
        }
      },
    );
  }, [isLoaded, userLocation, destinationLat, destinationLng]);

  if (!mounted || !isLoaded) {
    return <div className="text-center">Loading...</div>;
  }

  if (loadError) {
    return (
      <div className="text-red-500 text-center">
        Failed to load Google Maps:
        {' '}
        {loadError.message}
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto px-4 sm:px-0">
      <GoogleMap
        mapContainerClassName="w-full h-64 sm:h-72 md:h-80 rounded-lg shadow-md"
        center={userLocation || PAKISTAN_CENTER}
        zoom={6}
        options={{
          restriction: {
            latLngBounds: PAKISTAN_BOUNDS,
            strictBounds: true,
          },
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          disableDefaultUI: true,
          styles: theme === 'dark' ? DARK_MAP_STYLE : undefined, // Apply dark mode style
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            title="Your Location"
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}
        {destinationLat && destinationLng && (
          <Marker
            position={{ lat: destinationLat, lng: destinationLng }}
            title="Destination"
            icon="http://maps.google.com/mapfiles/ms/icons/red-dot.png"
          />
        )}
        {directions && (
          <DirectionsRenderer
            directions={directions}
            options={{
              polylineOptions: {
                strokeColor: theme === 'dark' ? '#4ade80' : '#22c55e',
                strokeWeight: 4,
              },
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
};

export default MapComponent;
