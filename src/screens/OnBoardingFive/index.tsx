import React, { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import ToggleButton from 'react-native-toggle-button';

import { useNavigation } from '@react-navigation/native';

import SwiperWrapper from '@/components/common/SwiperWrapper';
import SubscriptionPlanCard from '@/components/SubscriptionPlanCard';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getSelectedRole } from '@/redux/onboarding/onboardingReducer';
import { useLazyGetSubscriptionPlansQuery } from '@/redux/Subscription/subscriptionService';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const OnBoardingFive = () => {
  const navigation = useNavigation();
  const toast = useToast();
  const role = useAppSelector(getSelectedRole);

  const [subscriptionDataMutation] = useLazyGetSubscriptionPlansQuery();
  const [getPlans, setGetPlans] = useState([]);
  const [userWant, setUserWant] = useState('SELL'); // Default value
  // console.log('userWant =====>', userWant);

  useEffect(() => {
    // Fetch subscription plans based on userWant state
    subscriptionDataMutation({ user_type: 'USER', user_want: userWant }).then(res => {
      // console.log('res =====>', res?.data?.data);

      if (res?.data?.status) {
        setGetPlans(res?.data?.data);
      } else {
        toast.show('Something went wrong in Subscription', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  }, [userWant]); // Execute whenever userWant changes

  const handleToggle = (isToggled: boolean) => {
    const newWant = isToggled ? 'SELL' : 'RENT';
    setUserWant(newWant);
  };

  return (
    <RNView style={styles.mainContainer}>
      <RNView style={styles.stepContainer}>
        <RNText style={styles.stepText}>Step 5 of 5</RNText>
      </RNView>
      <RNView style={styles.stepHeader}>
        <RNText style={styles.headerText1}>What is your subscription preference?</RNText>
        <RNText style={styles.headerText2}>
          Start with <RNText style={styles.freeText}>free trial</RNText>, upgrade or downgrade anytime
        </RNText>
      </RNView>
      <RNView style={styles.stepHeader}>
        <RNView style={styles.toggleView}>
          <ToggleButton
            primaryText="For Sale"
            secondaryText="For Rent"
            onPress={handleToggle}
            activeButtonStyle={styles.toggleActiveBtn}
            inactiveButtonStyle={styles.toggleInActiveBtn}
            activeTextStyle={styles.toggleActiveText}
            inactiveTextStyle={styles.toggleInActiveText}
            style={styles.toggleStyle}
          />
        </RNView>
      </RNView>
      <SwiperWrapper buttons={false} data={getPlans} style={styles.wrapper}>
        {getPlans?.map((item, index) => {
          return <SubscriptionPlanCard data={item} index={index} key={index} />;
        })}
      </SwiperWrapper>
      <RNView style={{ position: 'absolute', bottom: 50, alignSelf: 'center', elevation: 5 }}>
        <CommonButton
          title={'Back'}
          onPress={() => navigation.goBack()}
          style={{ backgroundColor: ColorTheme.onboardingButton }}
          textStyle={styles.SingleBtnStyle}
        />
      </RNView>
    </RNView>
  );
};

export default OnBoardingFive;
