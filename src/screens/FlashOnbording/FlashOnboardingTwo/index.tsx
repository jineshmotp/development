import React from 'react';
import { ImageBackground, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import NextButton from '@/components/FlashOnboarding/NextButton';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { activeFlashOnboarding } from '@/redux/home/homeReducer';

import { onboardingstyles } from '../onboardingstyles';
import { styles } from './styles';

const FlashOnboardingTwo = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const skipHandler = () => {
    dispatch(activeFlashOnboarding());

    navigation.navigate('Login');
  };

  const handleRegister = () => {
    console.log(' clicked');

    navigation.navigate('FLASH_ONBOARDING_THREE');
  };

  return (
    // <RNView style={onboardingstyles.PropertiesMainContainer}>
    <ImageBackground
      style={onboardingstyles.ImageBackgroundView}
      source={require('../../../assets/images/FlashOnboarding/rectangle3597.png')}>
      <RNView style={onboardingstyles.mainView}>
        <RNView style={onboardingstyles.skipView}>
          <TouchableOpacity style={onboardingstyles.SkipView} onPress={skipHandler}>
            <RNText style={onboardingstyles.SkipTxtView}>Skip</RNText>
          </TouchableOpacity>
        </RNView>
        <RNView style={onboardingstyles.whiteView}>
          <RNView style={onboardingstyles.PropertiesMianView}>
            <RNView style={onboardingstyles.BorderView}></RNView>
            <RNView style={onboardingstyles.PropertiesView}>
              <RNText style={onboardingstyles.PropertiesTxtView}>Properties</RNText>
            </RNView>
            <RNView style={onboardingstyles.ExploreMainView}>
              <RNText style={onboardingstyles.ExploreTxtView}>Explore Diverse Properties</RNText>
              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={onboardingstyles.ToTxtView}>To </RNText>
                <RNText style={onboardingstyles.FyPView}>Find Your Perfect</RNText>
              </RNView>
              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={onboardingstyles.HomeView}>Home </RNText>
                <RNText style={onboardingstyles.MoreView}>And More</RNText>
              </RNView>
            </RNView>

            <RNView style={onboardingstyles.NextSlideView}>
              <RNView style={onboardingstyles.BorderView1}></RNView>
              <RNView style={onboardingstyles.NextBtnView}>
                <NextButton handleRegister={handleRegister} />
              </RNView>
            </RNView>
          </RNView>
        </RNView>
      </RNView>
    </ImageBackground>
    // </RNView>
  );
};

export default FlashOnboardingTwo;
