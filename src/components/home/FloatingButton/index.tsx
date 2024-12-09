import React, { memo, useEffect, useState } from 'react';
import { ActivityIndicator, Alert, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

import CustomAlertWrapper from '@/components/common/CustomAlertWrapper';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { clearPropertyLocationData } from '@/redux/listing/listingReducer';
import { getUserData } from '@/redux/login/loginReducer';
import { setLatLongData } from '@/redux/nearu/nearuReducer';
import { ColorTheme, SIZES } from '@/theme';

import { styles } from './styles';

type Props = {
  ListingPress?: () => void;
  ExpertPress?: () => void;
};
const FloatingButton: React.FC<Props> = ({ ListingPress, ExpertPress }) => {
  const navigation = useNavigation();
  const userData = useAppSelector(getUserData);
  const [showMenu, setShowMen] = useState(false);
  const [emailAlert, setEmailAlert] = useState(false);
  const dispatch = useAppDispatch();

  const setAutoLocation = useAppSelector(setLatLongData);

  // console.log('Floating button --->', setAutoLocation.lat);

  const handleEmailVeriedCheck = () => {
    if (userData?.isVerifiedEmail === false) {
      setEmailAlert(true);
    } else {
      setShowMen(!showMenu);

      dispatch(clearPropertyLocationData());

      ListingPress();
    }
  };
  const handleVerifyEmail = () => {
    setEmailAlert(false);
    setShowMen(!showMenu);
    navigation.navigate('EDIT_USER_EMAIL');
  };

  // useEffect(() => {
  //   if (data?.data[0]?.isSubscribed) {
  //     setSubscriptionAlert(false);
  //     console.log('issubscribed value from floating --> ', data?.data[0]?.isSubscribed);
  //   }
  // }, [data?.data[0]?.isSubscribed]);

  return (
    <RNView>
      {showMenu && (
        <RNView style={styles.menuItem}>
          <TouchableOpacity style={styles.menu} onPress={handleEmailVeriedCheck}>
            <RNImage style={styles.img} source={require('@/assets/images/customImage/property-insurance.png')} />
            <RNText style={styles.menuText}>List Property</RNText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.menu}
            onPress={() => {
              setShowMen(!showMenu);
              ExpertPress();
            }}>
            <RNImage style={styles.img} source={require('@/assets/images/customImage/customer-care.png')} />
            <RNText style={styles.menuText}>Ask Expert</RNText>
          </TouchableOpacity>
        </RNView>
      )}

      {setAutoLocation.lat ? (
        <TouchableOpacity onPress={() => setShowMen(!showMenu)} style={styles.button}>
          <RNView
            style={[
              styles.elem,
              {
                backgroundColor: showMenu ? ColorTheme.primary : ColorTheme.white,
              },
            ]}>
            {showMenu ? (
              <Entypo name="cross" size={34} color="black" />
            ) : (
              <AntDesign name="plus" size={34} color="black" />
            )}
          </RNView>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.button}>
          <RNView
            style={[
              styles.elem,
              {
                backgroundColor: showMenu ? ColorTheme.primary : ColorTheme.white,
              },
            ]}>
            {showMenu ? <ActivityIndicator /> : <ActivityIndicator />}
          </RNView>
        </TouchableOpacity>
      )}

      {/* <TouchableOpacity onPress={() => setShowMen(!showMenu)} style={styles.button}>
        <RNView
          style={[
            styles.elem,
            {
              backgroundColor: showMenu ? ColorTheme.primary : ColorTheme.white,
            },
          ]}>
          {showMenu ? (
            <Entypo name="cross" size={34} color="black" />
          ) : (
            <AntDesign name="plus" size={34} color="black" />
          )}
        </RNView>
      </TouchableOpacity> */}

      {emailAlert && (
        <CustomAlertWrapper
          onClose={() => setShowDeletePopup(false)}
          openModal={() => console.log('first')}
          text={'Please verify email address to proceed'}
          head={'Verify email'}>
          <PropertyCategoryChips
            item={{ label: 'Cancel', active: true }}
            containerStyle={{
              flex: 1,
            }}
            onPress={() => {
              setEmailAlert(false);
            }}
            style={{
              backgroundColor: 'white',
            }}
          />
          <PropertyCategoryChips
            item={{ label: 'Verify' }}
            containerStyle={{
              flex: 1,
            }}
            onPress={handleVerifyEmail}
            style={{
              backgroundColor: ColorTheme.primary,
            }}
            textStyle={{
              color: ColorTheme.black,
              fontWeight: 'bold',
            }}
          />
        </CustomAlertWrapper>
      )}
    </RNView>
  );
};

export default memo(FloatingButton);
