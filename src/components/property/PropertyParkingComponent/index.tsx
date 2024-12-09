import React, { memo } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { styles } from './styles';

interface ProptypeDetailsProps {
  setPropertyDiscriptionIncrement?: any;
  setPropertyDiscriptionDecrement?: () => void;
  label?: any;
  title?: string;
}

const PropertyParkingComponent: React.FC<ProptypeDetailsProps> = ({
  setPropertyDiscriptionIncrement,
  setPropertyDiscriptionDecrement,
  label,
  title,
}) => {
  return (
    <View style={styles.mainView}>
      <Text style={styles.labelText}>{title}</Text>

      <View style={styles.Subsection}>
        <View style={styles.subView}>
          <TouchableOpacity
            onPress={setPropertyDiscriptionDecrement}
            disabled={label === 0}
            style={styles.touchableStyle}>
            <AntDesign name="minus" size={15} color={label === 0 ? '#00000026' : 'black'} />
          </TouchableOpacity>
          <Text style={styles.countText}>{label || 0}</Text>
          <TouchableOpacity onPress={setPropertyDiscriptionIncrement} style={styles.touchableStyle}>
            <AntDesign name="plus" size={15} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default memo(PropertyParkingComponent);
