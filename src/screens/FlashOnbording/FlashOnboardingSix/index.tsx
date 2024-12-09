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

const FlashOnboardingSix = () => {
  const navigation = useNavigation();

  const dispatch = useAppDispatch();

  const skipHandler = () => {
    dispatch(activeFlashOnboarding());

    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('FLASH_ONBOARDING_SEVEN');
  };

  return (
    <RNView style={onboardingstyles.PropertiesMainContainer}>
      <RNView style={onboardingstyles.mainView}>
        <RNView style={onboardingstyles.skipView}>
          <RNView style={onboardingstyles.ImageView}>
            <RNImage
              style={onboardingstyles.ImageStyle}
              source={require('../../../assets/images/FlashOnboarding/orderorder.png')}
            />
          </RNView>

          <TouchableOpacity style={onboardingstyles.SkipView} onPress={skipHandler}>
            <RNText style={onboardingstyles.SkipTxtView}>Skip</RNText>
          </TouchableOpacity>
        </RNView>
        <RNView style={onboardingstyles.whiteView}>
          <RNView style={onboardingstyles.PropertiesMianView}>
            <RNView style={onboardingstyles.BorderView}></RNView>
            <RNView style={onboardingstyles.PropertiesView}>
              <RNText style={onboardingstyles.PropertiesTxtView}>Auctions & Biddings</RNText>
            </RNView>
            <RNView style={onboardingstyles.ExploreMainView}>
              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={onboardingstyles.ToTxtView}>Join </RNText>
                <RNText style={onboardingstyles.FyPView}>auctions and bid </RNText>
                <RNText style={onboardingstyles.ToTxtView}>on</RNText>
              </RNView>

              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={onboardingstyles.FyPView}>properties to get the best</RNText>
              </RNView>

              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={onboardingstyles.FyPView}>deals</RNText>
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
    </RNView>
  );
};

export default FlashOnboardingSix;
