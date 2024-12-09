import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Entypo from 'react-native-vector-icons/Entypo';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { locationresult } from '@/constants/function/property.helper';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setPropertyLocationData } from '@/redux/listing/listingReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';
import { GOOGLE_MAPS_API } from '@/utils/apiKeys';

import { styles } from './styles';

const PropertyLocationScreen = () => {
  const autocompleteRef = useRef(null);
  const mapRef = useRef(null);

  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'PROPERTY_LOCATION_SCREEN'>>();

  const navigation = useNavigation();

  const initialRegion = route?.params?.locationdata?.initialRegionData;

  // console.log('Location data: ', route?.params?.locationdata);
  // console.log('Initial Region: ', initialRegion);
  // console.log('locality : ', route?.params?.locationdata?.completeAddress);

  const [inputText, setInputText] = useState('');
  const [completeAddr, setCompleteAddress] = useState(route?.params?.locationdata?.completeAddress);

  const [locationRes, setLocationRes] = useState('');

  // const [googleAutocompleteShow, setGoogleAutocompleteShow] = useState({
  //   text: '',
  //   open: false,
  // });

  type coords = {
    latitude: number;
    longitude: number;
  };

  const [coordinates, setCoordinates] = useState<coords>({
    latitude: initialRegion?.latitude ? initialRegion?.latitude : 17.447340964470474,
    longitude: initialRegion?.longitude ? initialRegion?.longitude : 78.3539102379411,
  });

  const activateKeyForSetCordinates = (item: coords) => {
    setCoordinates({
      ...coordinates,
      latitude: item.latitude,
      longitude: item.longitude,
    });
  };

  const gotoBack = () => {
    navigation.goBack();
  };

  const saveData = () => {
    //navigation.goBack();
    // console.log(' Location Return data : ', locationRes);
    dispatch(setPropertyLocationData(locationRes));
    navigation.goBack();
  };

  const clearInput = () => {
    setInputText('');
    if (autocompleteRef.current) {
      autocompleteRef.current.setAddressText('');
    }
  };

  const calcLocation = (latitude: number, longitude: number) => {
    locationresult(latitude, longitude)
      .then(result => {
        console.log('Result:', result);
        setLocationRes(result);
        autocompleteRef.current.setAddressText(result?.completeAddr);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // autocompleteRef.current.setAddressText(completeAddr);
    calcLocation(coordinates.latitude, coordinates.longitude);
  }, []);

  return (
    <Container hasHeader={true} backgroundColor="white" isTab={false}>
      <MapView
        provider={PROVIDER_GOOGLE}
        mapType={'standard'}
        ref={mapRef}
        onMapReady={() => {
          autocompleteRef.current?.setAddressText(completeAddr);
          // console.log('onMapReady+++++++++++', completeAddr);
        }}
        userInterfaceStyle={'light'}
        loadingEnabled={true}
        showsUserLocation={false}
        initialRegion={initialRegion}
        zoomControlEnabled={true}
        minZoomLevel={20}
        onMarkerDragEnd={(e: any) => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          // console.log('Marker Drag End: ', latitude, longitude);
          // Update the coordinates here if needed
          activateKeyForSetCordinates({ latitude, longitude });
        }}
        moveOnMarkerPress={true}
        style={styles.mapStyle}
        onPress={e => {
          const { latitude, longitude } = e.nativeEvent.coordinate;
          // console.log('Map Pressed: ', latitude, longitude);
          activateKeyForSetCordinates({ latitude, longitude });
        }}>
        {coordinates?.latitude !== null && coordinates?.longitude !== null && (
          <Marker
            draggable
            coordinate={{
              latitude: coordinates.latitude,
              longitude: coordinates.longitude,
            }}
            onDragEnd={e => {
              const { latitude, longitude } = e.nativeEvent.coordinate;
              // console.log('Marker Drag End: ', latitude, longitude);
              // Update the coordinates here if needed
              activateKeyForSetCordinates({ latitude, longitude });
            }}
          />
        )}
      </MapView>

      <RNView style={styles.modelInsideViewStyle}>
        <TouchableOpacity style={styles.topView} onPress={() => gotoBack()}>
          <Entypo name="cross" size={28} color="black" />
        </TouchableOpacity>
      </RNView>

      <RNView style={styles.inputContainer}>
        <GooglePlacesAutocomplete
          currentLocation={true}
          autoFillOnNotFound={true}
          ref={autocompleteRef}
          placeholder="Search your location..."
          fetchDetails={true}
          textInputProps={{
            value: inputText,
            onChangeText: text => setInputText(text),
          }}
          onPress={(data, details = null) => {
            // console.log('Details Data: ', data);
            const latitude = details?.geometry?.location?.lat || 0;
            const longitude = details?.geometry?.location?.lng || 0;

            // console.log('Selected Location: ', latitude, longitude);

            if (mapRef.current) {
              mapRef.current.animateToRegion(
                {
                  latitude,
                  longitude,
                  latitudeDelta: 0.02,
                  longitudeDelta: 0.02,
                },
                1000
              );
            }

            activateKeyForSetCordinates({
              latitude: details?.geometry?.location?.lat || 0,
              longitude: details?.geometry?.location?.lng || 0,
            });

            calcLocation(details?.geometry?.location?.lat || 0, details?.geometry?.location?.lng || 0);
          }}
          styles={{
            container: {
              flex: 1,
            },
            textInput: {
              height: px(38),
              color: ColorTheme.AutocompleteText,
              fontSize: 16,
              borderWidth: 0.5,
              marginTop: px(10),
              width: deviceWidth,
            },
            predefinedPlacesDescription: {
              color: ColorTheme.AutoColpeteBlue,
            },
            listView: {
              backgroundColor: ColorTheme.white, // Background color of the autocomplete list
            },
            description: {
              color: ColorTheme.black, // Text color of each suggestion
            },
            separator: {
              height: 0.5,
              backgroundColor: ColorTheme.AutoColpeteSeperatorbg, // Color of the separator between suggestions
            },
          }}
          query={{
            key: GOOGLE_MAPS_API,
            language: 'en',
          }}
        />
        {inputText ? (
          <TouchableOpacity style={styles.clearButton} onPress={clearInput}>
            <Entypo name="cross" size={px(20)} color={ColorTheme.black} />
          </TouchableOpacity>
        ) : null}
      </RNView>

      <RNView style={styles.button_view}>
        <CommonButton
          title="Save & continue"
          style={styles.saveButton}
          textStyle={{ color: 'black' }}
          onPress={() => {
            saveData();
          }}
        />
      </RNView>
    </Container>
  );
};

export default PropertyLocationScreen;
