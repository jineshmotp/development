import React, { useEffect, useState } from 'react';
import { Animated, TouchableOpacity } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import DefaultProfile from '@/components/common/DefaultProfile';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getHideBottonTabs, getScrollToTop, hideBottomTabs, scrollTop } from '@/redux/home/homeReducer';
import { getUserData } from '@/redux/login/loginReducer';

import Business from '../Business';
import Home from '../Home';
import More from '../More';
import Nearu from '../Nearu';
import UserProfile from '../UserProfile';
import { style, styles } from './styles';

function MyTabBar({ state, descriptors, navigation, icon }) {
  const scrollData = useAppSelector(getScrollToTop);
  const [animation] = useState(new Animated.Value(0));
  const dispatch = useAppDispatch();

  useEffect(() => {
    Animated.spring(animation, {
      toValue: 1,
      useNativeDriver: true,
      speed: 5, // Adjust the speed as needed
    }).start();
  }, []);
  return (
    <Animated.View
      style={[
        style.animStyle,
        {
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [10, 0], // Adjust as needed for the desired height of the pop-up
              }),
            },
          ],
        },
      ]}>
      <RNView style={{ flexDirection: 'row' }}>
        {state.routes.map((route: any, index: any) => {
          const { options } = descriptors[route.key];

          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (route?.name === 'Home') {
              dispatch(scrollTop(!scrollData));
            }
            if (route?.name === 'NearU') {
              dispatch(scrollTop(!scrollData));
            }

            if (!isFocused && !event.defaultPrevented) {
              dispatch(hideBottomTabs(false));
              // console.log('abhabahbahb', route.name);
              if (route?.name === 'Home') {
                // dispatch(scrollTop(true));
                navigation.navigate(route.name);
              } else if (route?.name === 'NearU') {
                // dispatch(scrollTop(false));
                navigation.navigate(route.name);
              } else {
                dispatch(scrollTop(false));
                navigation.navigate(route.name);
              }
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          // Define styles for the active and inactive tabs

          return (
            <TouchableOpacity
              key={index}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={[styles.tab, { borderBottomWidth: isFocused ? 2 : 0 }]}>
              <RNView style={[isFocused ? style.floating : style.normalmenu]}>
                {options.tabBarIcon && options.tabBarIcon({ focused: isFocused })}
              </RNView>
              {isFocused && <RNText style={[isFocused && styles.isFocused]}>{label}</RNText>}
            </TouchableOpacity>
          );
        })}
      </RNView>
    </Animated.View>
  );
}

const Tab = createBottomTabNavigator();
type tabBarProps = { focused: boolean };

function BottomTab() {
  const selectedUserData = useAppSelector(getUserData);
  const isHideTabs = useAppSelector(getHideBottonTabs);
  // const [hide, setHide] = useState(false);
  // console.log('isHideTabs', isHideTabs);

  // useEffect(() => {
  //   setHide(isHideTabs);
  // }, [isHideTabs]);
  // console.log('isHideTabs+++', isHideTabs);
  return (
    <Container isTab={false} hasHeader={false} backgroundColor="white">
      <Tab.Navigator
        initialRouteName="Home"
        tabBar={props => {
          return false ? <RNView></RNView> : <MyTabBar {...props} />;
        }}
        screenOptions={{
          headerShown: false,
        }}>
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ focused }: any) => {
              return focused ? (
                <RNImage source={require('@/assets/images/bottomTab/logo.png')} style={styles.imgStyle} />
              ) : (
                <RNImage source={require('@/assets/images/bottomTab/logo.png')} style={styles.imgStyle} />
              );
            },
          }}
        />

        <Tab.Screen
          name="BusinessScreen"
          component={Business}
          options={{
            tabBarLabel: 'Business',
            tabBarIcon: ({ focused }: tabBarProps) => {
              return focused ? (
                <RNImage source={require('@/assets/images/business/booking-filled.png')} style={styles.imgStyle} />
              ) : (
                <RNImage source={require('@/assets/images/business/booking-outline.png')} style={styles.imgStyle} />
              );
            },
          }}
        />
        <Tab.Screen
          name="NearU"
          component={Nearu}
          options={{
            tabBarLabel: 'NearU',
            tabBarIcon: ({ focused }: tabBarProps) => {
              return focused ? (
                <RNImage source={require('@/assets/images/bottomTab/location.png')} style={styles.imgStyle} />
              ) : (
                <RNImage source={require('@/assets/images/bottomTab/location.png')} style={styles.imgStyle} />
              );
            },
          }}
        />

        <Tab.Screen
          name="UserProfile"
          component={UserProfile}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ focused }: tabBarProps) => {
              return focused ? (
                selectedUserData?.profile_pic ? (
                  <RNImage
                    source={{
                      uri: selectedUserData?.profile_pic,
                    }}
                    style={styles.Img}
                  />
                ) : (
                  <DefaultProfile
                    viewStyle={styles.defaultprofile}
                    textStyle={styles.FirstLetter2}
                    username={selectedUserData?.fname}
                  />
                )
              ) : selectedUserData?.profile_pic ? (
                <RNImage
                  source={{
                    uri: selectedUserData?.profile_pic,
                  }}
                  style={styles.Img}
                />
              ) : (
                <RNView style={styles.defaultprofile}>
                  <RNText style={styles.FirstLetter}>{selectedUserData?.fname?.toUpperCase()?.slice(0, 1)}</RNText>
                </RNView>
              );
            },
          }}
        />
        <Tab.Screen
          name="MenuScreen"
          component={More}
          options={{
            tabBarLabel: 'More',
            tabBarIcon: ({ focused }: tabBarProps) => {
              return focused ? (
                <RNImage source={require('@/assets/images/bottomTab/menu.png')} style={styles.moreImg} />
              ) : (
                <RNImage source={require('@/assets/images/bottomTab/menu.png')} style={styles.moreImg} />
              );
            },
          }}
        />
      </Tab.Navigator>
    </Container>
  );
}

export default BottomTab;
