import React, { useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';

import axios from 'axios';

import PropertyModalWrapper from '@/components/property/PropertyModalWrapper';
import SectionHoc from '@/components/property/SectionHoc';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';
import { GOOGLE_MAPS_API } from '@/utils/apiKeys';

import { styles } from './styles';

interface LocationProps {
  activateKeyForSetCordinates?: any;
  initialRegionData?: any;
  ToogleModalMapView?: any;
  setToogleModalMapView?: any;
}

const ProfileLocationMap: React.FC<LocationProps> = ({
  activateKeyForSetCordinates,
  initialRegionData,
  ToogleModalMapView,
  setToogleModalMapView,
}) => {
  const mapRef = useRef(null);
  const autocompleteRef = useRef(null);

  // const [ToogleModalMapView, setToogleModalMapView] = useState(false);

  const [initialRegion, setInitialRegion] = useState(initialRegionData);
  const [completeAddr, setcompleteAddr] = useState('');
  const [googleAutocompleteShow, setGoogleAutocompleteShow] = useState({
    text: '',
    open: false,
  });
  const [isFocused, setIsFocused] = useState(false);

  //#############################################################

  const gotoMapView = () => {
    setToogleModalMapView(!ToogleModalMapView);
  };

  const clearautoinput = () => {
    autocompleteRef.current?.setAddressText('');
  };

  const handleAutocompleteFocus = () => {
    setIsFocused(true);
  };

  const handleAutocompleteBlur = () => {
    setIsFocused(false);
  };

  const fetchAddressDetailsFromPincode = async (formattedAddress: string, pincode: string) => {
    try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?components=postal_code:${pincode}&key=${GOOGLE_MAPS_API}`;
      const response = await axios.get(url);

      if (response.data.results.length > 0) {
        const addressDetails = response.data.results[0].formatted_address;
        setcompleteAddr(addressDetails);
        autocompleteRef.current?.setAddressText(addressDetails);
        let data = addressDetails.split(',');

        const trimmedData = data.map(item => item.trim());

        let location_length = trimmedData.length;

        const localityval = trimmedData.toString();

        const country = trimmedData[location_length - 1];

        const statePin = trimmedData[location_length - 2];

        let dataStatePin = statePin.split(' ');

        const state = dataStatePin[0];

        const pincode = dataStatePin[dataStatePin.length - 1];

        let location = [initialRegionData.latitude, initialRegionData.longitude];

        const city = trimmedData[location_length - 3];

        // setDetails({
        //   ...details,
        //   country: country,
        //   state: state,
        //   city: city,
        //   locality: localityval,
        //   pincode: pincode,
        //   location: location,
        // });

        return addressDetails;
      } else {
        return 'Address not found';
      }
    } catch (error) {
      console.error('Error fetching address details:', error.response);
      return 'Error fetching address details';
    }
  };

  const fetchNearbyPlaces = async (latitude: number, longitude: number) => {
    // console.log(' Latitude and Longitude : ', latitude, ' ', longitude);

    https: try {
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${GOOGLE_MAPS_API}`;
      // console.log("url ", url);

      const response = await axios.get(url);
      if (response.data.results.length > 0) {
        const addressComponents = response.data.results[0].address_components;

        const formattedAddress = addressComponents.map(component => component.long_name).join(', ');

        let addr = formattedAddress.split(', ');
        fetchAddressDetailsFromPincode(formattedAddress, addr[addr.length - 1]);
      } else {
        return 'Address not found';
      }
    } catch (error) {
      // console.error('Error fetching address:', error?.response);
      return 'Error fetching address';
    }
  };

  //################################################################

  const onRegionChanges = vals => {
    activateKeyForSetCordinates(vals);
    setInitialRegion(vals);
    fetchNearbyPlaces(vals.latitude, vals.longitude);
  };

  useEffect(() => {
    fetchNearbyPlaces(initialRegionData.latitude, initialRegionData.longitude);
  }, []);

  useEffect(() => {
    setInitialRegion(initialRegionData);
  }, [initialRegionData]);

  // useEffect(() => {
  //   setcompleteAddr(details.locality);
  // }, [details.locality]);

  return (
    <PropertyModalWrapper visible={ToogleModalMapView}>
      <RNView style={styles.modelInsideViewStyle}>
        <TouchableOpacity style={styles.topView} onPress={() => gotoMapView()}>
          {/* <Text>Close </Text> */}
          <Entypo name="cross" size={28} color="black" />
        </TouchableOpacity>
      </RNView>

      <RNView style={styles.mapView}>
        <MapView
          provider={PROVIDER_GOOGLE}
          mapType={'standard'}
          ref={mapRef}
          onMapReady={() => {
            autocompleteRef.current?.setAddressText(completeAddr);
            // console.log("onMapReady+++++++++++", completeAddr);
          }}
          userInterfaceStyle={'light'}
          loadingEnabled={true}
          showsUserLocation={true}
          // onRegionChange={onRegionChange}
          onRegionChangeComplete={onRegionChanges}
          initialRegion={initialRegion}
          zoomControlEnabled={true}
          minZoomLevel={20}
          onMarkerDragEnd={(e: any) => {
            activateKeyForSetCordinates(e.nativeEvent.coordinate);
          }}
          moveOnMarkerPress={true}
          style={styles.mapStyle}>
          {(initialRegion?.latitude !== null || initialRegion?.longitude !== null) && (
            <Marker
              draggable
              coordinate={{
                latitude: initialRegion?.latitude,
                longitude: initialRegion?.longitude,
              }}
            />
          )}
        </MapView>

        <RNView
          style={{
            left: px(10),
            right: px(10),
            flex: 1,
            zIndex: 99,
            position: 'absolute',
            backgroundColor: 'red',
            marginTop: isFocused ? px(150) : px(70),
          }}>
          <GooglePlacesAutocomplete
            ref={autocompleteRef}
            placeholder="Search your location..."
            currentLocation={true}
            fetchDetails={true}
            autoFillOnNotFound={true}
            onPress={(data, details = null) => {
              console.log(' Details Data : ', details);
              setIsFocused(false);
              // onPressHandler(data);
              const region = {
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
                latitudeDelta: 0.02,
                longitudeDelta: 0.02,
              };
              mapRef?.current?.animateToRegion(region, 100);
              activateKeyForSetCordinates({
                latitude: details?.geometry?.location?.lat || 0,
                longitude: details?.geometry?.location?.lng || 0,
              });

              // fetchNearbyPlaces(details?.geometry?.location?.lat, details?.geometry?.location?.lng);

              setGoogleAutocompleteShow({
                open: false,
                text: data?.description,
              });
            }}
            styles={{
              container: {
                position: 'absolute',
                top: px(100),
                left: px(10),
                right: px(10),
                zIndex: 99,
              },
            }}
            query={{
              key: GOOGLE_MAPS_API,
              language: 'en',
            }}
            onFocus={handleAutocompleteFocus}
            onBlur={handleAutocompleteBlur}
          />

          <TouchableOpacity
            style={styles.clear_button}
            onPress={() => {
              //setShow(false);
              clearautoinput();
            }}>
            <RNView style={{ justifyContent: 'center', alignContent: 'center' }}>
              <Entypo name="cross" size={24} color={ColorTheme.gray} />
            </RNView>
          </TouchableOpacity>
        </RNView>
      </RNView>

      <RNView style={styles.button_view}>
        <CommonButton
          title="Save & continue"
          style={styles.saveButton}
          textStyle={{ color: 'black' }}
          onPress={() => {
            gotoMapView();
          }}
        />
      </RNView>
    </PropertyModalWrapper>
  );
};

export default ProfileLocationMap;
