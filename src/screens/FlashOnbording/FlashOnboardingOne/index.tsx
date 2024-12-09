import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { activeFlashOnboarding, getisFlashOnboarding } from '@/redux/home/homeReducer';

import { onboardingstyles } from '../onboardingstyles';
import { styles } from './styles';

const FlashOnboardingOne = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const data = useAppSelector(getisFlashOnboarding);

  const skipHandler = () => {
    dispatch(activeFlashOnboarding());

    navigation.navigate('Login');
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (data === true) {
        navigation.navigate('Login');
      } else {
        navigation.navigate('FLASH_ONBOARDING_TWO');
      }
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigation, data]);

  return (
    <RNView style={styles.NearlukContainer}>
      <RNImage
        style={styles.ImageView}
        source={require('../../../assets/images/FlashOnboarding/nearlukPVersion.png')}
      />

      <TouchableOpacity style={onboardingstyles.SkipView} onPress={skipHandler}>
        <RNText style={onboardingstyles.SkipTxtView}>Skip</RNText>
      </TouchableOpacity>
    </RNView>
  );
};

export default FlashOnboardingOne;
