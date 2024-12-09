import React from 'react';
import { Text, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type Propertyheaderprop = {
  currentStep?: number;
  gotonext?: () => void;
  gotoprevious?: () => void;
};

const PropertyHeaderPercentage = ({ currentStep, gotonext, gotoprevious }: Propertyheaderprop) => {
  const progress = currentStep * 20;

  return (
    <RNView style={styles.mainView}>
      <RNView style={styles.subViewOne}>
        {currentStep !== 1 ? (
          <TouchableOpacity onPress={gotoprevious}>
            <AntDesign name="arrowleft" size={24} color="black" />
          </TouchableOpacity>
        ) : null}
      </RNView>

      <RNView style={styles.subViewTwo}>
        <RNView style={styles.progressViewTwo}>
          <RNView
            style={{
              width: `${progress}%`,
              backgroundColor: ColorTheme.primary,
              height: '100%',
              borderRadius: px(5),
            }}
          />
        </RNView>
      </RNView>

      <RNView style={styles.progressViewThree}>
        <Text style={styles.progressText}>{progress}%</Text>
      </RNView>

      <RNView style={styles.progressViewfour}>
        {currentStep !== 5 ? (
          <TouchableOpacity onPress={gotonext}>
            <AntDesign name="arrowright" size={24} color="black" />
          </TouchableOpacity>
        ) : null}
      </RNView>
    </RNView>
  );
};

export default PropertyHeaderPercentage;
