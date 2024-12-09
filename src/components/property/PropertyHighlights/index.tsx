import React, { useEffect, useRef, useState } from 'react';
import { ScrollView } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import Divider from '@/components/common/Divider';
import Loader from '@/components/common/Loader';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import { highlightsDatas } from '@/constants/function/property.helper';
import { activateItemByKey } from '@/constants/function/property.helperFunction';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useGetAllHighlightsQuery } from '@/redux/property/propertyService';
import { ColorTheme, FONT } from '@/theme';
import { deviceWidth } from '@/utils';

import HighlightExpand from '../HighlightExpand';
import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const PropertyHighlights: React.FC<PropertyAreaProps> = ({ details }) => {
  const mapRef = useRef(null);
  const [highlightD, sethighlightD] = useState(highlightsDatas);
  const [highlightDetails, sethighlightDetails] = useState();
  const [payload, setPayload] = useState('');
  const [activeMarker, setActiveMarker] = useState(null);
  const [loading, setLoading] = useState(true);

  const [load, setloader] = useState(true);

  // Set the initial active state
  useEffect(() => {
    setTimeout(() => {
      const initialPayload = `${details?.coordinates[0]},${details?.coordinates[1]}&type=${highlightD[0].label}`;
      setPayload(initialPayload);
      const initialHighlightD = highlightD.map((item, index) => ({
        ...item,
        active: index === 0, // Make the first item active
      }));
      sethighlightD(initialHighlightD);
    }, 800);
  }, [details, highlightD.length]);

  useEffect(() => {
    // setTimeout(() => {
    setPayload(payload);
    sethighlightDetails(data);
    setloader(false);
    setLoading(false);

    // setLoading(false);
    // }, 800);
  }, [data, status, payload]);

  // Fetch data using the constructed payload
  const { data, status } = useGetAllHighlightsQuery(payload);

  const activateKeyForHighlight = (item: any) => {
    sethighlightDetails([]);
    const newPayload = `${details?.coordinates[0]},${details?.coordinates[1]}&type=${item.label}`;
    setPayload(newPayload);

    //console.log('Payload:', newPayload);

    const shallowCopy = [...highlightD];
    const updatedArr = activateItemByKey(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);
    sethighlightD(updatedArr);
  };

  const handleMarkerPress = (item: any) => {
    setActiveMarker(item);
  };

  if (load) {
    return <Loader size={'large'} />;
  }

  return (
    <RNView>
      <>
        <RNView style={styles.containerViewStyle}>
          <RNView>
            <RNText style={styles.selectionHeader}>Highlights</RNText>

            <RNText style={styles.selectionText}></RNText>
          </RNView>
        </RNView>

        <RNView style={styles.mapViewView}>
          <MapView
            provider={PROVIDER_GOOGLE}
            ref={mapRef}
            loadingEnabled={true}
            initialRegion={{
              latitude: details?.coordinates[0] ?? 17.44707484820716,
              longitude: details?.coordinates[1] ?? 78.35418918766196,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            zoomControlEnabled={true}
            style={styles.mapStyle}>
            {(details?.coordinates[0] !== null || details?.coordinates[0] !== undefined) && (
              <Marker
                coordinate={{
                  latitude: details?.coordinates[0] ?? 17.44707484820716,
                  longitude: details?.coordinates[1] ?? 78.35418918766196,
                }}
              />
            )}

            {/* Render markers for each highlight */}
            {highlightDetails &&
              Array.isArray(highlightDetails) &&
              highlightDetails.map((item, index) => (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: item.coordinates.lat,
                    longitude: item.coordinates.lng,
                  }}
                  title={item.name}
                  description={`Distance: ${item.distance}, Duration: ${item.duration}`}
                  onPress={() => handleMarkerPress(item)}
                  pinColor={ColorTheme.gray} // Change this to the color you desire
                />
              ))}

            {activeMarker && (
              <Marker
                // key={index}
                coordinate={{
                  latitude: activeMarker.coordinates.lat,
                  longitude: activeMarker.coordinates.lng,
                }}
                title={activeMarker.name}
                //image={require("../../assets/images/property/highlight_select.png")}
                description={`Distance: ${activeMarker.distance}, Duration: ${activeMarker.duration}`}
                pinColor={ColorTheme.primary}
              />
            )}
          </MapView>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingVertical: 5,
              paddingHorizontal: 5,
            }}>
            <RNView style={styles.highlightChipView}>
              {highlightD.map((item: any, i) => {
                return (
                  <PropertyCategoryChips
                    item={item}
                    key={i}
                    onPress={() => {
                      activateKeyForHighlight(item);
                    }}
                  />
                );
              })}
            </RNView>
          </ScrollView>

          <HighlightExpand data={data} loading={loading} onMarkerPress={handleMarkerPress} />
        </RNView>

        <Divider
          borderColor="#D9D6D6"
          dividerWidth={deviceWidth}
          style={{
            marginVertical: 10,
          }}
        />
      </>
    </RNView>
  );
};

export default PropertyHighlights;
