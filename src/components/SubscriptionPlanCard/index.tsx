import React, { useState } from 'react';
import { Pressable, TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserData, updateLoginStatus } from '@/redux/login/loginReducer';
import { getBuilderData, getSelectedRole, getUserOnboardingData } from '@/redux/onboarding/onboardingReducer';
import { useUserOnboardingMutation } from '@/redux/onboarding/onboardingService';
import { getSelectedPlanIndex, selectPlanIndex } from '@/redux/Subscription/subscriptionReducer';
import { useGetBuilderPaymentUrlMutation, useGetPaymentUrlMutation } from '@/redux/Subscription/subscriptionService';
import { deviceHeight, deviceWidth, px } from '@/utils';

import ModalWrapper from '../common/ModalWrapper';
import SubscriptionPlanDetail from '../common/SubscriptionPlanDetail';
import PhonePeGetway from '../PhonePeGetway';
import { styles } from './styles';

type Props = { data?: any; index?: number };
const SubscriptionPlanCard: React.FC<Props> = ({ data, index }) => {
  const role = useAppSelector(getSelectedRole);
  // console.log('role =======>', role);
  const navigation = useNavigation();
  const totalData = useAppSelector(getBuilderData);
  const userData = useAppSelector(getUserData);
  // console.log('userData =======>', userData?.role);

  const wholeData = useAppSelector(getUserOnboardingData);
  const dispatch = useAppDispatch();
  const [onboardingMutation] = useUserOnboardingMutation();
  const [subpaymentMutation] = useGetPaymentUrlMutation();
  const [builderpaymentMutation] = useGetBuilderPaymentUrlMutation();
  const selectIndex = useAppSelector(getSelectedPlanIndex);
  const styleVal = selectIndex === index ? styles.topView : styles.topView1;
  const [showModal, setShowModal] = useState(false);
  // const [paymentModal, setPaymentModal] = useState(false);

  const changeColorByPlans = () => {
    switch (index) {
      case 0:
        return ['#05A78A', '#23E5C2'];
      case 1:
        return ['#EB7100', '#FFB45D'];
      case 2:
        return ['#47ADF7', '#1E54DF'];
      default:
        return ['#05A78A', '#23E5C2'];
    }
  };

  const convertObjectToArrStr = (arrData: any[]) => {
    return arrData?.map(item => item?.value);
  };

  const subscriptionPayment = data => {
    // console.log('data+++', data);
    const payload = {
      user: userData?._id,
      subscriptionPlan: data?._id,
      // subscriptionPlan: '65d33f213ff22b4bd48447e9',
      mobile_no: userData?.mobile_no,
    };
    // console.log('payload ====>', payload);
    subpaymentMutation(payload).then(response => {
      // console.log('response ======>', response);

      if (response) {
        navigation.navigate('PHONE_PAY', { url: response?.data?.phonepeURL });
      }
    });
  };
  const subscriptionBuilderPayment = data => {
    // console.log('data+++', data);
    const payload = {
      user: userData?._id,
      subscriptionPlan: data?._id,
      // subscriptionPlan: '65d33f213ff22b4bd48447e9',
      mobile_no: userData?.mobile_no,
    };
    // console.log('payload ====>', payload);
    builderpaymentMutation(payload).then(response => {
      // console.log('response ======>', response);

      if (response) {
        navigation.navigate('PHONE_PAY', { url: response?.data?.phonepeURL });
      }
    });
  };

  const postOnboarding = (val: boolean) => {
    let payload: any = {};

    if (role === 'USER') {
      payload = {
        user_sub_role: wholeData?.stepOneData?.userRole,
        looking_for: convertObjectToArrStr(wholeData?.stepTwoData?.userLooking),
        property_preference: convertObjectToArrStr(wholeData?.stepThreeData?.userPreference),
      };
    } else if (role === 'AGENT') {
      payload = {
        company_name: totalData?.stepOneData?.fname,
        bio: totalData?.stepOneData?.description,
        operating_since: totalData?.stepOneData?.optSince,
        languages: convertObjectToArrStr(totalData?.stepTwoData?.languages),
        rera_id: totalData?.stepTwoData?.rera ? totalData?.stepTwoData?.rera : null,
        AGENT: {
          deal_transaction_type: ['New'], // Modify as per your requirement
        },
        deal_property_type: convertObjectToArrStr(totalData?.stepThreeData?.propertyType),
        operating_location: [{ city: 'Hyderabad', locality: ['Abids', 'Afzal Gunj', 'Adikmet', 'Aghapura'] }],
        referral_code: totalData?.stepFourData?.refCode,
      };
    } else if (role === 'BUILDER') {
      payload = {
        company_name: totalData?.stepOneData?.fname,
        bio: totalData?.stepOneData?.description,
        operating_since: totalData?.stepOneData?.optSince,
        languages: convertObjectToArrStr(totalData?.stepTwoData?.languages),
        rera_id: totalData?.stepTwoData?.rera ? totalData?.stepTwoData?.rera : null,
        BUILDER: {
          builder_type: convertObjectToArrStr(totalData?.stepThreeData?.buildType),
        },
        deal_property_type: convertObjectToArrStr(totalData?.stepThreeData?.propertyType),
        operating_location: [{ city: 'Hyderabad', locality: ['Abids', 'Afzal Gunj', 'Adikmet', 'Aghapura'] }],
        referral_code: totalData?.stepFourData?.refCode,
      };
    }

    const convertRequiredPayload = (payload: any) => {
      // Example implementation to filter out empty or null values
      const filteredPayload: any = {};
      Object.keys(payload).forEach(key => {
        if (payload[key] !== undefined && payload[key] !== null) {
          filteredPayload[key] = payload[key];
        }
      });
      return filteredPayload;
    };

    const filteredPayload = convertRequiredPayload(payload);
    // console.log('filteredPayload =======>', filteredPayload);

    onboardingMutation(filteredPayload).then(res => {
      // console.log('res =======>', res);

      if (res?.data?.status) {
        if (val) {
          if (role === 'BUILDER' || userData?.role === 'BUILDER') {
            subscriptionBuilderPayment(data);
          } else {
            subscriptionPayment(data);
            // console.log('subscriptionPayment(data) ======>', data);
          }
        } else {
          dispatch(updateLoginStatus(true));
          // navigation.navigate('BOTTOM_TAB');
          // navigation.goBack();
        }
      } else {
        console.log('Error in onboarding builder', res);
      }
    });
  };

  const handleFreePlan = () => {
    postOnboarding(true);
    navigation.navigate('SUBSCRIPTIONS');
    setShowModal(false);
  };

  const handleGoldPlan = () => {
    setShowModal(false);

    postOnboarding(true);
  };

  const handlePlatinumPlan = () => {
    setShowModal(false);

    postOnboarding(true);
  };

  const handleSubscriptionApi = (ind: number) => {
    // console.log('ind ======>', ind);

    switch (ind) {
      case 0:
        handleFreePlan();
        break;
      case 1:
        handleGoldPlan();
        break;
      case 2:
        handlePlatinumPlan();
        break;
      default:
        handleFreePlan();
        break;
    }
  };

  const onPressClose = () => {
    setShowModal(!showModal);
  };

  return (
    <>
      <RNView style={styles.topOuterView}>
        <Pressable
          style={[styleVal]}
          onPress={() => {
            dispatch(selectPlanIndex(index));
            setShowModal(true);
          }}>
          <RNView style={styles.topHeader}>
            <RNText style={styles.topHeaderText}>{`${data?.subscription_type} Plan`}</RNText>
          </RNView>
          <RNView style={styles.gradintView1}>
            <LinearGradient colors={changeColorByPlans()} style={styles.gradintView}>
              <RNText style={styles.gradintText}>{data?.subscription_type}</RNText>
            </LinearGradient>
          </RNView>
          <RNView style={styles.infoView}>
            <RNText style={styles.infoText}>{data?.short_description}</RNText>
          </RNView>
          <RNView style={{ position: 'absolute', bottom: px(15) }}>
            <TouchableOpacity onPress={onPressClose}>
              <LinearGradient colors={changeColorByPlans()} style={styles.btnView}>
                <RNText style={styles.btnText}>View Details</RNText>
              </LinearGradient>
            </TouchableOpacity>
          </RNView>
        </Pressable>
        <LinearGradient colors={changeColorByPlans()} style={styles.topHiddenView}></LinearGradient>
      </RNView>
      <ModalWrapper
        visible={showModal}
        onClose={onPressClose}
        modalHeight={deviceHeight / 1.2}
        header={false}
        closeBtnStyle={styles.closeBtn}
        modalWidth={deviceWidth / 1.09}>
        <SubscriptionPlanDetail
          onPress={ind => handleSubscriptionApi(ind)}
          data={data}
          changeColorByPlans={() => changeColorByPlans()}
          index={index}
        />
      </ModalWrapper>
      {/* <PhonePeGetway paymentUrl={paymentUrl} openModal={paymentModal} setOpenModal={val => setPaymentModal(val)} /> */}
    </>
  );
};

export default SubscriptionPlanCard;
