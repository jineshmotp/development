import React, { useState } from 'react';
import ToggleButton from 'react-native-toggle-button';

import { useNavigation } from '@react-navigation/native';

import SwiperWrapper from '@/components/common/SwiperWrapper';
import SubscriptionPlanCard from '@/components/SubscriptionPlanCard';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getBuilderData, getSelectedRole } from '@/redux/onboarding/onboardingReducer';
import { ColorTheme } from '@/theme';

import { styles } from '../styles';

type Props = {
  setStep?: (i) => void;
  data?: any;
};
const BuilderStepFive: React.FC<Props> = ({ setStep, data }) => {
  const navigation = useNavigation();
  const role = useAppSelector(getSelectedRole);
  // console.log('role for condition ========>', role);

  return (
    <RNView style={styles.mainContainer}>
      <RNView style={styles.stepContainer}>
        <RNText style={styles.stepText}>Step 5 of 5</RNText>
      </RNView>
      <RNView style={styles.stepHeader}>
        <RNText style={styles.headerText1}>What is your subscription preference?</RNText>
        <RNText style={styles.headerText2}>
          Start with <RNText style={styles.freeText}>free trail</RNText>, upgrade or downgrade anytime
        </RNText>
      </RNView>
     
      <SwiperWrapper buttons={false} data={data} style={styles.wrapper}>
        {data?.map((item, index) => {
          return <SubscriptionPlanCard data={item} index={index} key={index} />;
        })}
      </SwiperWrapper>

      <RNView style={{ position: 'absolute', bottom: 50, alignSelf: 'center', elevation: 5 }}>
        <CommonButton
          title={'Back'}
          onPress={() => ( setStep('4'))}
          style={{ backgroundColor: ColorTheme.onboardingButton }}
          textStyle={styles.SingleBtnStyle}
          // disabled={selectedOption === null} // Disable button if no option is selected
        />
      </RNView>
    </RNView>
  );
};

export default BuilderStepFive;
