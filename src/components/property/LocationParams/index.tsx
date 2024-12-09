import { useEffect, useState } from 'react';



import Geolocation from '@react-native-community/geolocation';


interface Coordinates {
  latitude: number;
  longitude: number;
}

const LocationParamsValue = (latitude: number, longitude: number) => {
  console.log(' Latitude and longitude ----------->', latitude, ' ', longitude);

  const [location, setLocation] = useState<Coordinates | null>(null);
  const [address, setAddress] = useState<any | null>(null);
  const [parsedAddress, setParsedAddress] = useState<{
    street: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    pincode: string | null;
  }>({
    street: null,
    city: null,
    state: null,
    country: null,
    pincode: null,
  });

  useEffect(() => {
    // Fetch address using Google Maps Geocoding API
    fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBhjq9RPUB2ACFkLW-vpdXTBjtFTD3s2Xk`
    )
      .then(response => response.json())
      .then(data => {
        if (data.results && data.results.length > 0) {
          // console.log(' result values : ', data.results[0]);

          setAddress(data.results[0]);
        }
      })
      .catch(error => {
        // console.error('Error fetching address:');
      });
  }, [latitude, longitude]);

  useEffect(() => {
    if (address) {
      const parts = address.formatted_address.split(',');
      const street = parts[1].trim();
      const { city, state, country, pincode } = address.address_components.reduce((acc, component) => {
        if (component.types.includes('locality')) acc.city = component.long_name;
        else if (component.types.includes('administrative_area_level_1')) acc.state = component.long_name;
        else if (component.types.includes('country')) acc.country = component.long_name;
        else if (component.types.includes('postal_code')) acc.pincode = component.long_name;
        return acc;
      }, {});
      setParsedAddress({ street, city, state, country, pincode });
    }
  }, [address]);

  return {
    latitude: location?.latitude,
    longitude: location?.longitude,
    street: parsedAddress?.street,
    city: parsedAddress?.city,
    state: parsedAddress?.state,
    country: parsedAddress?.country,
    pincode: parsedAddress?.pincode,
  };
};

export default LocationParamsValue;