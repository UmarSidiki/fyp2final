'use client';
import TravelSearch from '@/components/Home/Search';
import { cn } from '@/lib/utils';
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

type MapComponentProps = {
  initialDestination?: string;
  bounds?: google.maps.LatLngBoundsLiteral;
  center?: google.maps.LatLngLiteral;
  darkMapStyle?: google.maps.MapTypeStyle[];
  className?: string;
};

/**
 * A production-ready map component for displaying a Google Map with directions.
 * @param initialDestination - Initial destination to display on the map.
 * @param bounds - LatLng bounds to restrict the map (default: Pakistan).
 * @param center - Initial center of the map (default: Pakistan center).
 * @param darkMapStyle - Custom map styles for dark mode (default: DARK_MAP_STYLE).
 * @param className - Additional CSS classes for styling.
 */
const MapComponent = ({
  initialDestination = 'Quetta',
  bounds = PAKISTAN_BOUNDS,
  center = PAKISTAN_CENTER,
  darkMapStyle = DARK_MAP_STYLE,
  className,
}: MapComponentProps) => {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [destinationCoords, setDestinationCoords] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');
  const [mounted, setMounted] = useState(false);
  const [geocodeError, setGeocodeError] = useState<string | null>(null);
  const [, setGeocodeLoading] = useState(false);
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

  // Get user location within bounds
  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            if (
              latitude >= bounds.south
              && latitude <= bounds.north
              && longitude >= bounds.west
              && longitude <= bounds.east
            ) {
              setUserLocation({ lat: latitude, lng: longitude });
            } else {
              setUserLocation({ lat: 31.5497, lng: 74.3436 }); // Fallback: Lahore
            }
          },
          () => {
            setUserLocation({ lat: 31.5497, lng: 74.3436 }); // Fallback: Lahore
          },
          { timeout: 10000, maximumAge: 60000 },
        );
      } else {
        setUserLocation({ lat: 31.5497, lng: 74.3436 }); // Fallback: Lahore
      }
    };

    getUserLocation();
  }, [isLoaded, bounds]);

  // Calculate directions
  useEffect(() => {
    if (!isLoaded || !userLocation || !destinationCoords) {
      return;
    }

    if (
      destinationCoords.lat < bounds.south
      || destinationCoords.lat > bounds.north
      || destinationCoords.lng < bounds.west
      || destinationCoords.lng > bounds.east
    ) {
      setDirections(null);
      return;
    }

    const directionsService = new window.google.maps.DirectionsService();
    directionsService.route(
      {
        origin: userLocation,
        destination: destinationCoords,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK && result) {
          setDirections(result);
          if (result.routes?.[0]?.legs?.[0]) {
            const route = result.routes[0].legs[0];
            setDistance(route.distance?.text || '');
            setDuration(route.duration?.text || '');
          }
        } else {
          setDirections(null);
        }
      },
    );
  }, [isLoaded, userLocation, destinationCoords, bounds]);

  // Geocoding function to convert location name to coordinates
  const geocodeLocation = async (location: string) => {
    if (!location) {
      return null;
    }

    setGeocodeLoading(true);
    setGeocodeError(null);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(location)}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      );
      const data = await response.json();
      if (data.status === 'OK' && data.results.length > 0) {
        const { lat, lng } = data.results[0].geometry.location;
        return { lat, lng };
      }
      throw new Error(`Geocoding failed: ${data.status}`);
    } catch (error: any) {
      setGeocodeError(`Failed to geocode location: ${error.message || 'Unknown error'}. Please try a different destination.`);
      return null;
    } finally {
      setGeocodeLoading(false);
    }
  };

  // Handle destination change from TravelSearch
  const handleDestinationChange = async (destination: string) => {
    const coords = await geocodeLocation(destination);
    setDestinationCoords(coords);
  };

  // Handle form submission from TravelSearch (fetch suggestions)
  const handleSearchSubmit = async () => {
    // In production, this would be an API call to fetch suggestions
    // For now, return demo data (already filtered in TravelSearch)
    return Promise.resolve([]);
  };

  if (!mounted || !isLoaded) {
    return <div className="text-center">Loading map...</div>;
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
    <div className={cn('relative w-full md:max-w-[calc(70vw-70px)] mx-auto px-4 sm:px-0 shadow-2xl outline rounded-lg', className)}>
      {/* Map Container - Adjusted height to accommodate search bar on mobile */}
      <GoogleMap
        mapContainerClassName="w-full h-[80vh] sm:h-[85vh] md:h-[calc(70vh-70px)] rounded-lg shadow-md"
        center={userLocation || center}
        zoom={6}
        options={{
          restriction: {
            latLngBounds: bounds,
            strictBounds: true,
          },
          fullscreenControl: false,
          mapTypeControl: false,
          streetViewControl: false,
          zoomControl: false,
          disableDefaultUI: true,
          styles: theme === 'dark' ? darkMapStyle : undefined,
        }}
      >
        {userLocation && (
          <Marker
            position={userLocation}
            title="Your Location"
            icon="http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
          />
        )}
        {destinationCoords && (
          <Marker
            position={destinationCoords}
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

      {/* Geocoding Error */}
      {geocodeError && (
        <div className="absolute top-4 left-4 bg-red-500 text-white p-2 rounded-lg">
          {geocodeError}
        </div>
      )}

      {/* Travel Search Form - Mobile-friendly positioning */}
      <div
        className={cn(
          // Mobile: Fixed at bottom of viewport with minimal intrusion
          'fixed bottom-0 left-0 right-0 w-full',
          // Desktop: Positioned relative to map with overflow
          'sm:absolute sm:-bottom-16 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:w-auto sm:min-w-[80%] sm:max-w-3xl',
          // Always on top
          'z-20',
        )}
      >
        <TravelSearch
          initialDestination={initialDestination}
          onDestinationChange={handleDestinationChange}
          onSubmit={handleSearchSubmit}
          className="sm:transition-all sm:duration-300 sm:hover:-translate-y-1 sm:animate-fadeIn"
        />
      </div>

      {/* Distance and Duration Overlay */}
      {(distance || duration) && (
        <div className={cn(
          'absolute top-4 right-4 rounded-lg shadow-md p-2',
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-900',
        )}
        >
          {distance && (
            <p className="text-sm">
              Distance:
              {' '}
              {distance}
            </p>
          )}
          {duration && (
            <p className="text-sm">
              Duration:
              {' '}
              {duration}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
