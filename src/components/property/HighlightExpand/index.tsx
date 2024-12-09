import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type HighlightItem = {
  coordinates: {
    lat: number;
    lng: number;
  };
  distance: string;
  duration: string;
  id: number;
  name: string;
};

type PropsHighlighData = {
  data?: HighlightItem[];
  loading?: boolean;
  onMarkerPress?: (item: HighlightItem) => void;
};

const HighlightExpand = ({ data, loading, onMarkerPress }: PropsHighlighData) => {
  return (
    <RNView style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color={ColorTheme.primaryColor} />
      ) : data && data.length > 0 ? (
        data.map((item, index) => (
          <TouchableOpacity key={index} style={styles.itemContainer} onPress={() => onMarkerPress(item)}>
            <RNText style={styles.highlightName}>{item.name}</RNText>
            <RNText style={styles.highlightDetails}>
              Distance: {item.distance}, Duration: {item.duration}
            </RNText>
          </TouchableOpacity>
        ))
      ) : (
        <RNView style={styles.noDataContainer}>
          <RNText style={styles.noDataText}>No data available</RNText>
        </RNView>
      )}
    </RNView>
  );
};

export default HighlightExpand;
