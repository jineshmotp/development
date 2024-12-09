import React, { useState } from 'react';
import { KeyboardAvoidingView, ScrollView, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import { signUpConstants } from '@/constants/login';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { selectedRole } from '@/redux/onboarding/onboardingReducer';
import { ColorTheme, FONT } from '@/theme';
import { deviceHeight, px } from '@/utils';

import { styles } from './styles';

const Category = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [pressedIndex, setPressedIndex] = useState(null);
  // console.log('pressedIndex =====>', pressedIndex);

  const handlePress = (index, role) => {
    dispatch(selectedRole(role));
    setPressedIndex(index);
    setTimeout(() => setPressedIndex(null), 500);
    navigation.navigate('SIGN_UP', { role });
    // navigation.navigate('BUILDER', { role });
  };

  return (
    <Container hasHeader={false}>
      <KeyboardAvoidingView style={styles.keyboardView} behavior={'height'}>
        <LinearGradient colors={['#F5FBFF', '#BCCBD7']} style={styles.gradientView}>
          <ScrollView style={{ height: deviceHeight }}>
            <RNView style={styles.logoView}>
              <RNImage
                source={require('@/assets/images/NearLuklogo/authentication_logo.png')}
                style={styles.logoStyle}
                resizeMode="contain"
              />
            </RNView>
            <RNView style={styles.mainContainer}>
              <RNView style={{ flex: 1 }}>
                <RNView style={{ flexDirection: 'row', marginTop: px(20) }}>
                  <RNView style={{ flex: 1 }}>
                    <Ionicons
                      onPress={() => navigation.goBack()}
                      style={{ alignSelf: 'center' }}
                      name="arrow-back"
                      size={24}
                      color="black"
                    />
                  </RNView>
                  <RNView style={{ flex: 3 }}>
                    <RNText style={styles.initialText}>Who are you ?</RNText>
                  </RNView>
                </RNView>
                <TouchableOpacity
                  onPress={() => handlePress(0, 'USER')}
                  style={[
                    styles.categoryContainer,
                    { borderColor: pressedIndex === 0 ? ColorTheme.primary : ColorTheme.gray },
                  ]}>
                  <RNView style={styles.rowContainer}>
                    <RNView style={styles.programmerView}>
                      <RNImage
                        source={require('@/assets/images/NearLuklogo/programmer.png')}
                        style={styles.programmerStyle}
                        resizeMode="contain"
                      />
                    </RNView>
                    <RNView style={styles.categoryView}>
                      <RNText style={styles.categoryText}>Owner / Tenant / Buyer</RNText>
                    </RNView>
                  </RNView>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePress(1, 'AGENT')}
                  style={[
                    styles.categoryContainer,
                    { borderColor: pressedIndex === 1 ? ColorTheme.primary : ColorTheme.gray },
                  ]}>
                  <RNView style={styles.rowContainer}>
                    <RNView style={styles.programmerView}>
                      <RNImage
                        source={require('@/assets/images/NearLuklogo/agent.png')}
                        style={styles.programmerStyle}
                        resizeMode="contain"
                      />
                    </RNView>
                    <RNView style={styles.categoryView}>
                      <RNText style={styles.categoryText}>Agent</RNText>
                    </RNView>
                  </RNView>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => handlePress(2, 'BUILDER')}
                  style={[
                    styles.categoryContainer,
                    { borderColor: pressedIndex === 2 ? ColorTheme.primary : ColorTheme.gray },
                  ]}>
                  <RNView style={styles.rowContainer}>
                    <RNView style={styles.programmerView}>
                      <RNImage
                        source={require('@/assets/images/NearLuklogo/builder.png')}
                        style={styles.programmerStyle}
                        resizeMode="contain"
                      />
                    </RNView>
                    <RNView style={styles.categoryView}>
                      <RNText style={styles.categoryText}>Builder</RNText>
                    </RNView>
                  </RNView>
                </TouchableOpacity>
                <RNView style={styles.SignUpContainer}>
                  <RNText
                    style={{
                      fontSize: px(14),
                      fontFamily: FONT.PoppinsRegular,
                      color: ColorTheme.gray,
                    }}>
                    {signUpConstants.accAlready}
                    <RNText
                      onPress={() => navigation.navigate('Login')}
                      style={{
                        fontSize: px(14),
                        fontFamily: FONT.PoppinsRegular,
                        color: ColorTheme.primaryColor,
                      }}>
                      {signUpConstants.login}
                    </RNText>
                  </RNText>
                </RNView>
              </RNView>
            </RNView>
            <RNView style={styles.imageView}>
              <RNImage
                source={require('@/assets/images/NearLuklogo/authentication_image.png')}
                style={styles.imageStyle}
                resizeMode="cover"
              />
            </RNView>
          </ScrollView>
        </LinearGradient>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default Category;
