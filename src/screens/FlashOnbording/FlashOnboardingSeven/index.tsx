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

const FlashOnboardingSeven = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();

  const skipHandler = () => {
    dispatch(activeFlashOnboarding());

    navigation.navigate('Login');
  };

  const handleRegister = () => {
    navigation.navigate('FLASH_ONBOARDING_EIGHT');
  };

  return (
    <RNView style={onboardingstyles.PropertiesMainContainer}>
      <RNView style={onboardingstyles.mainView}>
        <RNView style={onboardingstyles.skipView}>
          <RNView style={onboardingstyles.ImageView}>
            <RNImage
              style={onboardingstyles.ImageStyle}
              source={require('../../../assets/images/FlashOnboarding/keys.png')}
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
              <RNText style={onboardingstyles.PropertiesTxtView}>Creditluk</RNText>
            </RNView>
            <RNView style={onboardingstyles.ExploreMainView}>
              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={onboardingstyles.ToTxtView}>Access </RNText>
                <RNText style={onboardingstyles.FyPView}>flexible financing</RNText>
              </RNView>

              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={onboardingstyles.FyPView}>options </RNText>
                <RNText style={onboardingstyles.ToTxtView}>to support your</RNText>
              </RNView>

              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={onboardingstyles.ToTxtView}>property purchases</RNText>
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

export default FlashOnboardingSeven;
