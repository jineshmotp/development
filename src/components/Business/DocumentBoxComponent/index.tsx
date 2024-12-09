import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Ionicons from 'react-native-vector-icons/Ionicons';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

interface IncrementDecrementProp {
  item?: any;
  deleteClick?: any;
  type?: boolean;
  loading?: boolean;

  handleClick?: any;
}
const DocumentBoxComponent: React.FC<IncrementDecrementProp> = ({
  item,
  deleteClick,
  type,
  loading,

  handleClick,
}) => {
  console.log(' url value --->', type);

  return (
    <TouchableOpacity style={styles.container} onPress={handleClick}>
      <RNView style={styles.uploadBox}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <>
            {type ? (
              <Image
                source={{ uri: item }}
                style={styles.imageStyle} // Ensure you have a defined style for the image
              />
            ) : (
              <RNView style={styles.documentIcon}>
                <Ionicons name="document-outline" size={30} color={ColorTheme.black} />
              </RNView>
            )}

            <TouchableOpacity style={styles.deleteCrossButton} onPress={deleteClick}>
              <Fontisto name="close-a" size={10} color={ColorTheme.white} />
            </TouchableOpacity>
          </>
        )}
      </RNView>
    </TouchableOpacity>
  );
};

export default memo(DocumentBoxComponent);
