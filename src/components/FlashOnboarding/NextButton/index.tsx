import React from 'react';
import { useState } from 'react';
import { Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type NextButtonParams = {
  handleRegister?: () => void;
};

const NextButton: React.FC<NextButtonParams> = ({ handleRegister }) => {
  const navigation = useNavigation();
  const [currentIndex, setCurrentIndex] = useState(0);
  return (
    <RNView style={styles.NextButtonMainView}>
      <TouchableOpacity style={styles.touchableViewOutside} onPress={handleRegister}>
        <RNView style={styles.touchableViewInside}>
          <AntDesign name="arrowright" style={styles.iconArrowStyle} size={px(20)} color={ColorTheme.white} />

          {/* <ImageBackground
            style={styles.ImageBackgroundView}
            source={require('../../../assets/images/FlashOnboarding/Ellipse407.png')}>
            <View style={{ alignSelf: 'center', paddingTop: 10 }}>
              <Image
                style={styles.ImageView2}
                source={require('../../../assets/images/FlashOnboarding/ion_arrow-up.png')}></Image>
            </View>
          </ImageBackground> */}
        </RNView>
      </TouchableOpacity>
    </RNView>
  );
};

export default NextButton;
