import React, { useEffect, useRef, useState } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import { Modal, ModalBackdrop } from '@gluestack-ui/themed';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { GOOGLE_MAPS_API } from '@/utils/apiKeys';

import { styles } from './styles';

type coords = {
  latitude?: number;
  longitude?: number;
  latitudeDelta?: number;
  longitudeDelta?: number;
};
type Props = {
  onRegionChangeComplete?: (region: coords) => void;
  activateKeyForSetCordinates?: (item: any) => void;
  initialRegionData?: coords;
  onPressHandler?: (data: any) => void;
  onDataChange?: (location: string) => void;
  searchInputStyle?: ViewStyle;
  mapStyle?: ViewStyle;
  initialInput?: string;
};

const MapComponent: React.FC<Props> = ({
  onRegionChangeComplete,
  activateKeyForSetCordinates,
  initialRegionData,
  onPressHandler,
  onDataChange,
  searchInputStyle,
  mapStyle,
  initialInput,
}) => {
  const mapRef: any = useRef(null);
  const [initialRegion, setInitialRegion] = useState<coords>(initialRegionData);
  // const [openGoogleDrawer, setOpenGoogleDrawer] = useState(false);
  const [googleAutocompleteShow, setGoogleAutocompleteShow] = useState({
    text: initialInput ? initialInput : '',
    open: false,
  });
  // console.log("googleAutocompleteShow", initialRegion);
  //   useEffect(() => {
  //     onDataChange(googleAutocompleteShow.text);
  //     // console.log("googleAutocompleteShow.text+++++++++++");
  //   }, [googleAutocompleteShow]);

  const onRegionChange = (region: coords) => {
    // console.log("onRegionChange+++++++++++++++");
    setInitialRegion(region);
    // if (mapRef) {
    //   mapRef.current.animateToRegion({
    //     latitude: region.latitude,
    //     longitude: region.longitude,
    //     latitudeDelta: region.latitudeDelta,
    //     longitudeDelta: region.longitudeDelta,
    //   });
    // }
  };
  useEffect(() => {
    // console.log("initialRegionData", initialRegionData);
    setInitialRegion(initialRegionData);
  }, [initialRegionData]);
  useEffect(() => {
    setGoogleAutocompleteShow({
      text: initialInput,
      open: false,
    });
  }, [initialInput]);
  return (
    <RNView>
      <RNView>
        <TouchableOpacity
          style={searchInputStyle}
          onPress={() =>
            setGoogleAutocompleteShow({
              open: true,
              text: '',
            })
          }>
          <RNText
            numberOfLines={1}
            style={{
              color: 'gray',
            }}>
            {googleAutocompleteShow?.text ? googleAutocompleteShow?.text : 'Select location...'}
          </RNText>
        </TouchableOpacity>
        <RNView style={{ alignItems: 'center' }}>
          <RNView
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              gap: 10,
              marginTop: 10,
              borderRadius: 10,
            }}>
            <MapView
              provider={PROVIDER_GOOGLE}
              mapType={'standard'}
              ref={mapRef}
              userInterfaceStyle={'light'}
              loadingEnabled={true}
              showsUserLocation={true}
              // onRegionChange={onRegionChange}
              onRegionChangeComplete={onRegionChangeComplete}
              initialRegion={initialRegion}
              zoomControlEnabled={true}
              onMarkerDragEnd={(e: any) => {
                // console.log('eeeee', e.nativeEvent.coordinate);
                activateKeyForSetCordinates(e.nativeEvent.coordinate);
              }}
              moveOnMarkerPress={true}
              style={mapStyle}>
              {(initialRegion?.latitude !== null || initialRegion?.longitude !== null) && (
                <Marker
                  draggable
                  coordinate={{
                    latitude: initialRegion?.latitude,
                    longitude: initialRegion?.longitude,
                  }}
                  // onDragEnd={(e) => {
                  //   activateKeyForSetCordinates(e.nativeEvent.coordinate);
                  // }}
                />
              )}
            </MapView>
          </RNView>
        </RNView>
      </RNView>

      <Modal isOpen={googleAutocompleteShow.open} onClose={() => setGoogleAutocompleteShow({ open: false, text: '' })}>
        <ModalBackdrop />
        <RNView style={styles.main}>
          <GooglePlacesAutocomplete
            placeholder="Search your location..."
            onPress={(data, details = null) => {
              onPressHandler(data);
              const region = {
                latitude: details?.geometry?.location?.lat,
                longitude: details?.geometry?.location?.lng,
                latitudeDelta: 0.02, // Adjust the zoom level as desired
                longitudeDelta: 0.02, // Adjust the zoom level as desired
              };
              mapRef?.current?.animateToRegion(region, 100);
              activateKeyForSetCordinates({
                latitude: details?.geometry?.location?.lat || 0,
                longitude: details?.geometry?.location?.lng || 0,
              });
              setGoogleAutocompleteShow({
                open: false,
                text: data?.description,
              });
            }}
            styles={{
              container: {
                flex: 0,
              },
            }}
            fetchDetails={true}
            query={{
              key: GOOGLE_MAPS_API,
              language: 'en',
            }}
          />
        </RNView>
      </Modal>
    </RNView>
  );
};

export default React.memo(MapComponent);
