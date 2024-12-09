import React from 'react';

import { useNavigation } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const Agent = () => {
  const navigation = useNavigation();

  return (
    <Container hasHeader={false} isTab={false}>
      <RNView style={styles.mainContainer}>
        <RNView style={styles.stepContainer}>
          <RNText style={styles.stepText}>Step 1 of 5</RNText>
          <RNText style={styles.stepText}>AGENT</RNText>
        </RNView>

        <RNView style={{ position: 'absolute', bottom: 50, alignSelf: 'center', elevation: 5 }}>
          <CommonButton
            title={'Next Step'}
            onPress={() => navigation.navigate('ONBOARDING_TWO')}
            style={{ backgroundColor: ColorTheme.onboardingPrimary }}
            textStyle={styles.BtnStyle}
            // disabled={selectedOption === null} // Disable button if no option is selected
          />
        </RNView>
      </RNView>
    </Container>
  );
};

export default Agent;
