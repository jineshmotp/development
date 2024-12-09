import React from 'react';
import { Platform } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import { ColivingGender } from '@/components/global/Common/Constant/filterHelpers';
import { TAB_DATA, TAB_DATA_SUB } from '@/constants/userprofile';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getAppReview, getUserData, resetLogin } from '@/redux/login/loginReducer';
import { getFcToken } from '@/redux/Notification/notificationReducer';
import { useLogoutNotificationMutation } from '@/redux/Notification/notificationService';
import { builderStepOne, resetOnBoarding } from '@/redux/onboarding/onboardingReducer';
import { MMKV_KEYS, removeMMKVItem } from '@/utils/mmkv';

import TabsHoc from '../TabsHoc';
import { styles } from './styles';

type Props = {
  onPress?: () => void;
};
const ProfileTabs: React.FC<Props> = () => {
  const navigation = useNavigation();
  const userData = useAppSelector(getUserData);
  const fcmToken = useAppSelector(getFcToken);
  // console.log('fcmToken ======>', fcmToken);

  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutNotificationMutation();
  const reviewData = useAppSelector(getAppReview);

  // console.log('reviewData', reviewData);

  const tab_Data = reviewData ? TAB_DATA_SUB : TAB_DATA;

  const handleLogOut = () => {
    // console.log('payload ======>', payload);

    const payload = {
      userId: userData?._id,
      deviceType: Platform.OS,
      token: fcmToken,
    };

    logoutMutation(payload).then(res => {
      if (res?.data?.status) {
        console.log('logout notification');
      }
    });
    dispatch(resetOnBoarding({}));
    removeMMKVItem(MMKV_KEYS.ACCESS_TOKEN);
    removeMMKVItem(MMKV_KEYS.REFRESH_TOKEN);
    dispatch(resetLogin({}));
    // navigation.navigate('Login');
  };
  return (
    <RNView style={styles.topView}>
      {tab_Data?.map((item, i) => {
        if (item.label === 'Logout') {
          return <TabsHoc key={i} isButton={true} label="Logout" onPress={handleLogOut} />;
        }
        return (
          <TabsHoc
            key={i}
            isButton={false}
            label={item.label}
            rightIcon={true}
            onPress={() => {
              if (item?.link === 'MyPersonalINfo') {
                navigation.navigate('USER_EDIT_DETAILS');
              } else if (item?.link === 'MY_PROPERTY') {
                navigation.navigate(item?.link, { headerShow: true, userId: userData?._id });
              } else {
                navigation.navigate(item?.link);
              }
            }}
          />
        );
      })}
    </RNView>
  );
};

export default ProfileTabs;
