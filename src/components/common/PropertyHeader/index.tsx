import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RNView from '@/custom/RNView';

import PropertyHeaderPercentage from '../PropertyHeaderPercentage';
import PropertyHeaderTick from '../PropertyHeaderTick';
import { styles } from './styles';

type Propertyheaderprop = {
  currentStep?: number;
  onpressgo?: () => void;
  goClearPost?: () => void;
  gotonext?: () => void;
  gotoprevious?: () => void;
  bubbleclick?: any;
  label?: string;
};

const PropertyHeader = ({
  currentStep,
  onpressgo,
  goClearPost,
  gotonext,
  gotoprevious,
  //bubbleclick,
  label,
}: Propertyheaderprop) => {
  // Assuming each step increments the progress by 20%
  const progress = currentStep * 20;
  // console.log('value : ', currentStep);

  return (
    <View style={[styles.headerViewStyle, styles.headerViewBottomElevationStyle]}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={onpressgo} style={styles.headerTouchableStyle}>
          {progress === 20 ? (
            <AntDesign name="close" size={20} color="black" />
          ) : (
            // <MaterialIcons name="arrow-back-ios" size={20} color="black" />
            // null
            <AntDesign name="close" size={20} color="black" />
          )}
          {/* <MaterialIcons name="arrow-back-ios" size={20} color="black" /> */}
        </TouchableOpacity>
        <Text style={styles.headerTextStyle}>{label}</Text>
        <TouchableOpacity onPress={goClearPost} style={styles.headerClearTouchable}>
          <Text style={styles.headerClearText}>Clear all</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.rowStryle}>
        <PropertyHeaderPercentage currentStep={currentStep} gotonext={gotonext} gotoprevious={gotoprevious} />
      </View>

      <RNView style={styles.rowStryle}>
        <PropertyHeaderTick
          currentStep={currentStep}
          //bubbleclick={bubbleclick}
        />
      </RNView>
    </View>
  );
};

export default PropertyHeader;
