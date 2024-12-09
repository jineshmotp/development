import { useEffect, useState } from 'react';

import Geolocation from '@react-native-community/geolocation';

import { useAppDispatch } from '@/hooks/reduxHooks';
import { setLocationStore } from '@/redux/nearu/nearuReducer';

interface Coordinates {
  latitude: number;
  longitude: number;
}

const useLocation = () => {
  const dispatch = useAppDispatch();
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

  // Geolocation.getCurrentPosition(info => console.log(info));

  const getLocation = async () => {
    await Geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords;

        setLocation({ latitude, longitude });
        // Fetch address using Google Maps Geocoding API
        // Alert.alert('before');
        fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBhjq9RPUB2ACFkLW-vpdXTBjtFTD3s2Xk`
        )
          .then(response => response.json())
          .then(data => {
            // Alert.alert('after');
            if (data.results && data.results.length > 0) {
              // console.log('getLocation+++', data.results[0]?.address_components);
              setAddress(data.results[0]);
            }
          })
          .catch(error => {
            // console.error('Error fetching address:', error);
          });
      },
      error => {
        // Alert.alert('hello ===>');
        console.error(error);
      },
      { enableHighAccuracy: false, timeout: 100000, maximumAge: 2000 }
    );
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if (address) {
      const parts = address.formatted_address.split(',');
      // console.log('address.address_components', address.address_components);
      const { city, state, country, pincode, subcity, street, road } = address.address_components.reduce(
        (acc, component) => {
          if (component.types.includes('locality')) acc.city = component.long_name;
          else if (component.types.includes('route')) acc.road = component.long_name;
          else if (component.types.includes('administrative_area_level_1')) acc.state = component.long_name;
          else if (component.types.includes('country')) acc.country = component.long_name;
          else if (component.types.includes('postal_code')) acc.pincode = component.long_name;
          else if (component.types.includes('sublocality') && component.types.includes('sublocality_level_1'))
            acc.subcity = component.long_name;
          else if (component.types.includes('sublocality') && component.types.includes('sublocality_level_2'))
            acc.street = component.long_name;
          return acc;
        },
        {}
      );
      setParsedAddress({ street, city, state, country, pincode, subcity, road });
      dispatch(
        setLocationStore({
          lat: location?.latitude,
          long: location?.longitude,
          street: street,
          city: city,
          state: state,
          road: road,
          subcity: subcity,
          country: country,
        })
      );
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
    subcity: parsedAddress?.subcity,
    road: parsedAddress?.road,
  };
};

export default useLocation;
