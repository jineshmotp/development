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
import { deviceWidth, px } from '@/utils';

import { morestyles } from '../morestyles';

const AuctionsMore = () => {
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
            <RNText style={morestyles.DescriptionHeading}>AUCTIONS</RNText>

            <RNText style={morestyles.DescriptionTxtView}>
              Discover your financial potential with CreditLuk. Effortlessly check your credit score and explore
              personalized loan options just for you. Seamlessly integrated into our platform, CreditLuk simplifies
              financial decisions, ensuring a smoother property buying, renting, and selling experience.
            </RNText>

            <RNView style={[morestyles.ColvingRoundView, { marginTop: px(30) }]}>
              <RNView style={morestyles.ColvingRoundViewLeft}>
                <RNImage
                  style={morestyles.ColvingHomeImageView}
                  source={require('@/assets/images/More/auctionIcon.png')}
                />
              </RNView>

              <RNView style={morestyles.ColvingRoundViewRight}>
                <RNText style={morestyles.ColvingHomeImageTxt}>
                  Auction properties effortlessly through our user-friendly platform
                </RNText>
              </RNView>
            </RNView>

            <RNView style={morestyles.ColvingRoundView}>
              <RNView style={morestyles.ColvingRoundViewLeft}>
                <RNImage
                  style={morestyles.ColvingHomeImageView}
                  source={require('@/assets/images/More/auctionIcon.png')}
                />
              </RNView>

              <RNView style={morestyles.ColvingRoundViewRight}>
                <RNText style={morestyles.ColvingHomeImageTxt}>
                  Connect with potential buyers and bidders quickly and efficiently.
                </RNText>
              </RNView>
            </RNView>

            <RNView style={morestyles.ColvingRoundView}>
              <RNView style={morestyles.ColvingRoundViewLeft}>
                <RNImage
                  style={morestyles.ColvingHomeImageView}
                  source={require('@/assets/images/More/auctionIcon.png')}
                />
              </RNView>

              <RNView style={morestyles.ColvingRoundViewRight}>
                <RNText style={morestyles.ColvingHomeImageTxt}>
                  Ensure transparency and competitive pricing for all properties.
                </RNText>
              </RNView>
            </RNView>
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

export default AuctionsMore;
