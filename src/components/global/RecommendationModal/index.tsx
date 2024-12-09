import React from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

interface RecommendationModalProps {
  recommendations: Array<{ label: string }>;
  onSelect: (label: string) => void;
}

const RecommendationModal: React.FC<RecommendationModalProps> = ({ recommendations, onSelect }) => {
  return (
    <RNView style={styles.modalContainer}>
      <FlatList
        data={recommendations}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => onSelect(item.label)} style={styles.itemContainer}>
            <RNText style={styles.itemText}>{item.label}</RNText>
          </TouchableOpacity>
        )}
      />
    </RNView>
  );
};

export default RecommendationModal;
