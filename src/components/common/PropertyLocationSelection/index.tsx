import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import SectionHoc from '@/components/common/SectionHoc';
import { locationresult } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { setPropertyLocationData } from '@/redux/listing/listingReducer';

import { styles } from './styles';

interface LocationProps {
  activateKeyForSetCordinates?: any;
  initialRegionData?: any;
  details?: any;
  setDetails?: any;
  gotoMap?: any;
}

const PropertyLocationSelection: React.FC<LocationProps> = ({
  activateKeyForSetCordinates,
  initialRegionData,
  details,
  setDetails,
  gotoMap,
}) => {
  const dispatch = useAppDispatch();

  const [initialRegion, setInitialRegion] = useState(initialRegionData);
  const [completeAddr, setcompleteAddr] = useState('');

  //#############################################################

  const calcLocation = (latitude: number, longitude: number) => {
    locationresult(latitude, longitude)
      .then(result => {
        //console.log('Result:', result);
        dispatch(setPropertyLocationData(result));
      })
      .catch(error => {
        console.error('Error:', error);
      });
  };

  useEffect(() => {
    // console.log(' initial Region data---> ', initialRegionData);

    calcLocation(initialRegionData.latitude, initialRegionData.longitude);
  }, []);

  useEffect(() => {
    setInitialRegion(initialRegionData);
    // calcLocation(initialRegionData.latitude, initialRegionData.longitude);
  }, [initialRegionData]);

  useEffect(() => {
    // console.log(' locality changed !', details.locality);

    setcompleteAddr(details.locality);
  }, [details?.locality]);

  

  return (
    <>
      <RNView style={styles.container}>
        <SectionHoc title="Property Location" mandatory={true}>
          <RNView style={styles.Container}>
            <RNView style={styles.completeAddressView}>
              <RNText style={styles.labeltext}>{details?.locality}</RNText>
            </RNView>

            <RNView style={styles.getLocationView}>
              {details?.locality && (
                <TouchableOpacity onPress={gotoMap} style={styles.locationButton}>
                  <RNText style={styles.buttontext}>Get Location</RNText>
                </TouchableOpacity>
              )}
            </RNView>
          </RNView>
        </SectionHoc>
      </RNView>
    </>
  );
};

export default PropertyLocationSelection;
