import React, { useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';



import { useNavigation } from '@react-navigation/native';



import { Container } from '@/custom/Container';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getSelectedRole } from '@/redux/onboarding/onboardingReducer';
import { useLazyGetSubscriptionPlansQuery } from '@/redux/Subscription/subscriptionService';



import BuilderStepFive from './BuilderStepFive';
import BuilderStepFour from './BuilderStepFour';
import BuilderStepOne from './BuilderStepOne';
import BuilderStepThree from './BuilderStepThree';
import BuilderStepTwo from './BuilderStepTwo';
import { styles } from './styles';


const Builder = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [step, setStep] = useState('1');
  const role = useAppSelector(getSelectedRole);
  // console.log('role getting for subscription ========>', role);

  const [subscriptionDataMutation] = useLazyGetSubscriptionPlansQuery();
  const [getPlans, setGetPlans] = useState([]);
  useEffect(() => {
    subscriptionDataMutation({ user_type: role }).then(res => {
      // console.log('res =======>', res?.data?.data);
      
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
  }, []);

  const builderStepHandler = () => {
    switch (step) {
      case '1':
        return <BuilderStepOne setStep={i => setStep(i)} />;
      case '2':
        return <BuilderStepTwo setStep={i => setStep(i)} />;
      case '3':
        return <BuilderStepThree setStep={i => setStep(i)} />;
      case '4':
        return <BuilderStepFour setStep={i => setStep(i)} />;
      case '5':
        return <BuilderStepFive setStep={i => setStep(i)} data={getPlans} />;
      default:
        break;
    }
  };

  return (
    <Container hasHeader={false} isTab={false} backgroundColor="white">
      {builderStepHandler()}
    </Container>
  );
};

export default Builder;