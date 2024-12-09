import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';
import { deviceWidth } from '@/utils';

import { morestyles } from '../morestyles';

const RentPayMore = () => {
  const navigation = useNavigation();
  const translateX = useSharedValue(0);

  const route = useRoute<RouteProp<RootStackParamList, 'CREDITLUK_SCREEN'>>();

  // console.log(' route params --->', route?.params);

  const navigateToNextScreen = () => {
    navigation.navigate('WAITLIST_SCREEN', {
      propertyType: route?.params?.propertyType,
      label: route?.params?.label,
      type: route?.params?.type,
    });
  };

  const swipeGesture = Gesture.Pan()
    .onUpdate(event => {
      translateX.value = event.translationX;
    })
    .onEnd(() => {
      if (translateX.value > 0) {
        translateX.value = withSpring(deviceWidth / 1.09 - 70);

        // Use runOnJS to call navigateToNextScreen outside the UI thread
        runOnJS(navigateToNextScreen)();
      } else {
        translateX.value = withSpring(0);
      }
    });

  // Animated style
  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <Container hasHeader={true} backgroundColor="white" isTab={false}>
      <RNView style={morestyles.container}>
        <RNView style={morestyles.TopView}>
          <RNView style={morestyles.imageView}>
            <RNImage style={morestyles.imageStyle} source={require('@/assets/images/More/creditLukImage.png')} />
          </RNView>
        </RNView>

        <RNView style={morestyles.BottomView}>
          <RNView style={morestyles.BottomSubView}>
            <RNText style={morestyles.DescriptionHeading}>RENTPAY</RNText>

            <RNText style={morestyles.DescriptionTxtView}>
              RentPay feature on NearLuk is a convenient and secure payment system for managing rental transactions,
              designed to simplify your rental payment process effortlessly.
            </RNText>

            <RNText style={morestyles.DescriptionTxtView}>
              With RentPay, enjoy hassle-free rental payments through our user-friendly interface, ensuring a smooth,
              secure, and efficient transaction experience for both tenants and landlords.
            </RNText>

            <RNView style={morestyles.CreditlukBoxView}></RNView>
          </RNView>

          <RNView style={morestyles.BottomWaitListView}>
            <LinearGradient style={morestyles.LinearGradientSliderView} colors={['#D8D8D8', '#FBFBFB']}>
              <GestureDetector gesture={swipeGesture}>
                <Animated.View style={[morestyles.WaitlistImageView, animatedStyle]}>
                  <TouchableOpacity>
                    <RNImage
                      style={morestyles.WaitlistImageIcon}
                      source={require('@/assets/images/More/waitlisticon.png')}
                    />
                  </TouchableOpacity>
                </Animated.View>
              </GestureDetector>

              <Animated.Text style={morestyles.LinearGradientSliderTxtView}> Join The Waitlist </Animated.Text>
              <RNImage style={morestyles.forwordImageView} source={require('@/assets/images/More/forwordsymbol.png')} />
            </LinearGradient>
          </RNView>
        </RNView>
      </RNView>
    </Container>
  );
};

export default RentPayMore;
