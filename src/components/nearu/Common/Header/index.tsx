import React, { memo, useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Platform, StyleSheet, TouchableOpacity } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import LinearGradient from 'react-native-linear-gradient';
import Entypo from 'react-native-vector-icons/Entypo';

import ModalWrapper from '@/components/common/ModalWrapper';
import useLocation from '@/custom/Location';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getLatLongData, setLatLongData, setLocation, setLocationStore } from '@/redux/nearu/nearuReducer';
import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';
import { GOOGLE_MAPS_API } from '@/utils/apiKeys';

import { styles } from './styles';

type props = {
  label: string;
  onPress?: () => void;
  open?: boolean;
};
const Header: React.FC<props> = ({ label, onPress, open }) => {
  const dispatch = useAppDispatch();
  const [openLocation, setOpenLocation] = useState(false);
  const getLocation = useAppSelector(getLatLongData);
  const setAutoLocation = useAppSelector(setLatLongData);

  // console.log(' Auto location -->', setAutoLocation);

  // console.log(' latvalye', setAutoLocation.lat);

  const { city, street, latitude, longitude, state, road, subcity } = useLocation();
  const [headerLocation, setHeaderLocation] = useState({
    city: '',
    street: '',
    latitude: 0,
    longitude: 0,
    state: state,
    road: road,
    homeStory: [subcity, city],
  });

  useEffect(() => {
    // console.log(' Location data --->', getLocation);

    setHeaderLocation((prev: any) => ({
      ...prev,
      city: getLocation?.city,
      street: getLocation?.street,
      state: getLocation?.state,
      lat: getLocation?.lat,
      long: getLocation?.long,
      homeStory: [getLocation?.subcity, getLocation?.city],
      road: getLocation?.road,
    }));
  }, [getLocation]);
  useEffect(() => {
    if (!headerLocation?.lat) {
      // console.log(' Set Auto Location data --->', setAutoLocation);

      setHeaderLocation((prev: any) => ({
        ...prev,
        city: setAutoLocation?.city,
        street: setAutoLocation?.street,
        state: setAutoLocation?.state,
        lat: setAutoLocation?.lat,
        long: setAutoLocation?.long,
        homeStory: [setAutoLocation?.subcity, setAutoLocation?.city],
        road: setAutoLocation?.road,
      }));
    }
  }, [setLocationStore]);

  const autocompleteRef = useRef(null);
  return (
    <>
      <RNView>
        <LinearGradient colors={['#00B2A7', '#0094B4']} style={{ height: px(100) }}>
          <RNView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <RNView style={{ height: px(100) }}>
              <RNText style={styles.nearuText} numberOfLines={1}>
                Near U
              </RNText>
              <TouchableOpacity onPress={() => setOpenLocation(true)} style={styles.rowView}>
                <RNView style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                  {setAutoLocation.lat ? (
                    <>
                      <RNView>
                        <RNText style={styles.locationText}>
                          {' '}
                          {headerLocation?.road || headerLocation?.street || headerLocation?.city}
                        </RNText>
                      </RNView>
                      <Entypo name="chevron-small-down" size={px(30)} color={ColorTheme.white} />
                    </>
                  ) : (
                    <RNView>
                      <ActivityIndicator />
                    </RNView>
                  )}
                </RNView>
              </TouchableOpacity>
            </RNView>

            {/* <RNView style={styles.navRight}>
              <TouchableOpacity style={styles.navButton}>
                <MaterialCommunityIcons name="bell-ring-outline" size={17} color="black" />
              </TouchableOpacity>
              <RNView>
                <TouchableOpacity style={styles.navButton} onPress={() => {}}>
                  <MaterialCommunityIcons name="bell-ring-outline" size={17} color="black" />
                </TouchableOpacity>
              </RNView>
            </RNView> */}
          </RNView>
        </LinearGradient>
        <ModalWrapper
          visible={openLocation}
          header={false}
          modalHeight={deviceHeight / 2}
          closeBtnStyle={{ marginBottom: px(100) }}
          onClose={() => {
            setOpenLocation(!openLocation);
          }}>
          <RNView style={styles.modelViewStyle}>
            <TouchableOpacity
              style={{
                width: deviceWidth / 1.12,
                height: px(70),
                borderWidth: 1,
                borderRadius: px(10),
                justifyContent: 'center',
                padding: px(20),
                marginTop: px(50),
              }}
              onPress={() => {
                setHeaderLocation({
                  city: city,
                  street: street,
                  state: state,
                  road: road,
                  homeStory: [subcity, city],
                  lat: latitude,
                  long: longitude,
                });
                dispatch(
                  setLocation({
                    lat: latitude,
                    long: longitude,
                    street: street,
                    city: city,
                    state: state,
                    road: road,
                    subcity: subcity,
                  })
                );

                setOpenLocation(false);
              }}>
              <RNText style={{ fontSize: px(18), color: 'black' }}>Get Current location</RNText>
              <RNText style={{ fontSize: px(12), color: 'black' }}>Using GPS</RNText>
            </TouchableOpacity>
            <GooglePlacesAutocomplete
              ref={autocompleteRef}
              placeholder="Search your location..."
              currentLocation={true}
              fetchDetails={true}
              autoFillOnNotFound={true}
              onPress={(data, details = null) => {
                // console.log(' Details Data : ', details);

                const locationValue = details?.formatted_address;

                const dataval = locationValue.split(',');

                // console.log(' data : ', dataval);
                setOpenLocation(!openLocation);
                const { subcity, city, street, state, road } = details.address_components.reduce((acc, component) => {
                  if (component.types.includes('locality')) acc.city = component.long_name;
                  else if (component.types.includes('sublocality') && component.types.includes('sublocality_level_1'))
                    acc.subcity = component.long_name;
                  else if (component.types.includes('administrative_area_level_1')) acc.state = component.long_name;
                  else if (component.types.includes('route')) acc.road = component.long_name;
                  else if (component.types.includes('sublocality') && component.types.includes('sublocality_level_2'))
                    acc.street = component.long_name;
                  return acc;
                }, {});
                const dataVal = details
                  ? {
                      ...headerLocation,
                      street: street,
                      city: city,
                      state: state,
                      homeStory: [subcity, city],
                      road: road,
                    }
                  : {
                      ...headerLocation,
                      street: street,
                      city: city,
                      state: state,
                      road: road,
                    };
                setHeaderLocation(dataVal);
                dispatch(
                  setLocation({
                    lat: details?.geometry?.location?.lat,
                    long: details?.geometry?.location?.lng,
                    street: street,
                    city: city,
                    state: state,
                    road: road,
                    subcity: subcity,
                  })
                );

                dispatch(
                  setLocationStore({
                    lat: latitude,
                    long: longitude,
                    street: street,
                    city: city,
                    state: state,
                    road: road,
                    subcity: subcity,
                  })
                );
              }}
              query={{
                key: GOOGLE_MAPS_API,
                language: 'en',
              }}
              styles={{
                textInput: {
                  height: px(38),
                  color: ColorTheme.black,
                  fontSize: SIZES.medium15,
                  borderWidth: 0.5,
                  marginTop: px(10),
                  width: deviceWidth / 1.09,
                },
                predefinedPlacesDescription: {
                  color: ColorTheme.black,
                },
              }}
            />
          </RNView>
        </ModalWrapper>
      </RNView>
    </>
  );
};

export default memo(Header);
