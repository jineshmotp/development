import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserStepOne, userStepOne } from '@/redux/onboarding/onboardingReducer';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type StepOneProps = {
  userRole?: string;
};

const OnBoarding = () => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const navigation = useNavigation();
  const stepOneData = useAppSelector(getUserStepOne);
  // console.log('stepOneData ======>', stepOneData);

  const [stepOneDetails, setStepOneDetails] = useState<StepOneProps>({
    userRole: '',
  });
  const dispatch = useAppDispatch();

  const handlePress = (index: number) => {
    setSelectedOption(index === selectedOption ? null : index);

    const roles = ['OWNER', 'TENANT', 'BUYER'];
    const selectedRole = roles[index];
    setStepOneDetails({ userRole: selectedRole });
  };

  useEffect(() => {
    setStepOneDetails(stepOneData);
  }, [stepOneData]);

  const handleNext = () => {
    if (selectedOption !== null) {
      const roles = ['OWNER', 'TENANT', 'BUYER'];
      const selectedRole = roles[selectedOption];
      navigation.navigate('ONBOARDING_TWO', { subRole: selectedRole });
      dispatch(userStepOne(stepOneDetails));
    }
  };

  return (
    <Container hasHeader={false} isTab={false}>
      <RNView style={styles.mainContainer}>
        <RNView style={styles.stepContainer}>
          <RNText style={styles.stepText}>Step 1 of 4</RNText>
        </RNView>
        <RNView style={styles.secondContainer}>
          <RNText style={styles.secondText}>Who are you ?</RNText>
          <RNView style={{ flexDirection: 'row', gap: px(20), alignSelf: 'center', marginTop: px(20) }}>
            <TouchableOpacity
              style={[
                styles.touchableContainer,
                selectedOption === 0 && { backgroundColor: ColorTheme.onboardingPrimary },
              ]}
              onPress={() => handlePress(0)}
              activeOpacity={0.8}>
              <RNImage
                source={require('@/assets/images/onboarding/owner.png')}
                style={styles.programmerStyle}
                resizeMode="contain"
              />
              <RNText style={styles.imageText}>Owner</RNText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.touchableContainer,
                selectedOption === 1 && { backgroundColor: ColorTheme.onboardingPrimary },
              ]}
              onPress={() => handlePress(1)}
              activeOpacity={0.8}>
              <RNImage
                source={require('@/assets/images/onboarding/build.png')}
                style={styles.programmerStyle}
                resizeMode="contain"
              />
              <RNText style={styles.imageText}>Tenant</RNText>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.touchableContainer,
                selectedOption === 2 && { backgroundColor: ColorTheme.onboardingPrimary },
              ]}
              onPress={() => handlePress(2)}
              activeOpacity={0.8}>
              <RNImage
                source={require('@/assets/images/onboarding/buyer.png')}
                style={styles.programmerStyle}
                resizeMode="contain"
              />
              <RNText style={styles.imageText}>Buyer</RNText>
            </TouchableOpacity>
          </RNView>
        </RNView>
        <RNView style={{ position: 'absolute', bottom: 50, alignSelf: 'center', elevation: 5 }}>
          <CommonButton
            title={'Next Step'}
            onPress={handleNext}
            style={{ backgroundColor: selectedOption !== null ? ColorTheme.onboardingButton : '#dcdedc' }}
            textStyle={styles.BtnStyle}
            disabled={selectedOption === null} // Disable button if no option is selected
          />
        </RNView>
      </RNView>
    </Container>
  );
};

export default OnBoarding;
