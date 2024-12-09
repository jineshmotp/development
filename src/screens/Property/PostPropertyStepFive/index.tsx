// Parent Component (PostProperty)
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import ModalWrapper from '@/components/common/ModalWrapper';
import PropertyHeader from '@/components/common/PropertyHeader';
import PropertyAdditionalContact from '@/components/property/PropertyAdditionalContact';
import PropertyDescription from '@/components/property/PropertyDescription';
import PropertyDocument from '@/components/property/PropertyDocument';
import PropertyVerification from '@/components/property/PropertyVerification';
import TitledCheckBox from '@/components/property/TitledCheckBox';
import { ProperyListing_PayloadGenerator } from '@/constants/function/property.payloadFunction';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useBuilderListaddingMutation } from '@/redux/builder/builderService';
import { selectSubscriptionData } from '@/redux/listing/listingReducer';
import { useGetAllSubscriptionOptionsQuery, usePropertyListaddingMutation } from '@/redux/listing/listingService';
import { getReloadData, getUserData } from '@/redux/login/loginReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import Style from '@/screens/Property/styles';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import { styles } from '../styles';

const PostPropertyStepFive = () => {
  const selectedUserData = useAppSelector(getUserData);

  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'POST_PROPERTY_FIVE'>>();
  const currentStep = 5;
  const toast = useToast();
  const [uploadListingMutation, { status }] = usePropertyListaddingMutation({});
  const [uploadBuilderListingMutation] = useBuilderListaddingMutation({});
  // const { data } = useGetAllSubscriptionOptionsQuery({});

  const subscriptionData = useAppSelector(selectSubscriptionData);

  // console.log(' userData---->', selectedUserData);

  // console.log(' subscxription Data ---> ', subscriptionData);

  // console.log(' issubscription --->', subscriptionData?.data[0]?.isSubscribed);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [propertyDiscription, setPropertyDiscription]: any = useState({
    property_description: '',

    rera_number: null,
    is_rera_verified: false,

    dtcp_number: null,
    is_dtcp_verified: false,
    property_documents: [],
    additional_contact_details: '',
  });

  const [termsandCondition, setTermsandCondition] = useState(false);
  const [postloading, setPostLoading] = useState(false);

  const [planIndex, setPlanIndex] = useState(0);

  const [ViewSubscription, setViewSubscription] = useState(false);

  //##################################################################################################

  const onSubmit = data1 => {
    let retvalfinal = 1;

    if (retvalfinal === 1) {
      setPostLoading(true);

      const payload_data = {
        ...route?.params?.post4,
        ...propertyDiscription,
        property_owner: selectedUserData?._id,
      };

      const retpayload = ProperyListing_PayloadGenerator(payload_data);
      console.log('checking on the payload',JSON.stringify(payload_data));
      

      let newretpayload;

      //console.log(' checking subscription ', data?.data[0]?.isSubscribed);

      if (subscriptionData?.data.length > 1) {
        newretpayload = {
          ...retpayload,
          isSubscribed: subscriptionData?.data[planIndex]?.isSubscribed,
          subscription_id: subscriptionData?.data[planIndex]?.subscription_id,
          userSubscription_id: subscriptionData?.data[planIndex]?.userSubscription_id,
        };
      } else {
        if (subscriptionData?.data[0]?.isSubscribed) {
          newretpayload = {
            ...retpayload,
            isSubscribed: subscriptionData?.data[0]?.isSubscribed,
            subscription_id: subscriptionData?.data[0]?.subscription_id,
            userSubscription_id: subscriptionData?.data[0]?.userSubscription_id,
          };
        } else {
          //console.log(' else case-->');

          newretpayload = {
            ...retpayload,
            subscription_id: subscriptionData?.data[0]?.subscription_id,
            isSubscribed: subscriptionData?.data[0]?.isSubscribed,
          };
        }
      }

      // console.log(' final payload for rent-- > ', newretpayload);

      if (selectedUserData?.role !== 'BUILDER') {
        // console.log(' ifffffff');

        uploadListingMutation(newretpayload).then(response => {
          if (response?.data?.status) {
            Alert.alert(
              'Property Listing', // Title
              'Property Added successfully', // Message
              [
                // Buttons:
                {
                  text: 'OK',
                  onPress: () => {
                    dispatch(getReloadData({}));
                    setTimeout(() => {
                      navigation.navigate('BOTTOM_TAB');
                    }, 1000);
                  },
                },
              ]
            );
          } else {
            //console.log(' Error --->', response?.error);

            toast.show('Property Listing', {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: response?.error?.message,
              },
              duration: 3000,
            });
          }
        });
      } else {
        // console.log(' elseeeeeeeee');
        uploadBuilderListingMutation(newretpayload).then(response => {
          if (response?.data?.status) {
            Alert.alert(
              'Property Listing', // Title
              'Property Added successfully', // Message
              [
                // Buttons:
                {
                  text: 'OK',
                  onPress: () => {
                    dispatch(getReloadData({}));
                    setTimeout(() => {
                      navigation.navigate('BOTTOM_TAB');
                    }, 1000);
                  },
                },
              ]
            );
          } else {
            //console.log(' Error --->', response?.error);

            toast.show('Property Listing', {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: response?.error?.message,
              },
              duration: 3000,
            });
          }
        });
      }
    }
  };

  const getSubscriptionAll = () => {
    setViewSubscription(true);

    console.log(' subscription data--->', subscriptionData?.data);
  };

  const SelectSubscription = (item: any, i: number) => {
    toast.show('Subscription Selection', {
      type: 'info_toast',
      animationDuration: 100,
      data: {
        title: item?.subscriptionplan?.subscription_type,
      },
      duration: 3000,
    });
    setViewSubscription(false);
    setPlanIndex(i);

    // console.log(' Selected user Data --->', selectedUserData?.role);

    onSubmit(propertyDiscription);
  };

  const CloseSubscriptionAll = () => {
    setViewSubscription(false);
  };

  const gobackPost = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BOTTOM_TAB' }],
    });
  };

  const goClearPost = () => {
    setPropertyDiscription({
      additional_contact_details: '',
      property_description: '',
      rera_number: null,
      is_rera_verified: false,
      dtcp_number: null,
      is_dtcp_verified: false,
      property_documents: [],
    });
  };

  const gotonext = () => {
    onSubmit(propertyDiscription);
  };

  const gotoprevious = () => {
    navigation.goBack();
  };

  const gotoPreview = () => {
    navigation.navigate('POST_PROPERT_PREVIEW', {
      preview_data: {
        ...route?.params?.post4,
        ...propertyDiscription,
      },
    });
  };

  //###############################################################################################

  const controlConstraints = {
    rera_number: {
      maxLength: { value: 30, message: 'Maximum length of 30 integer exceeded' },
      pattern: {
        value: /^\d{1,30}$/,
        message: 'Invalid number (maximum be 30 digits)',
      },
    },
    dtcp_number: {
      maxLength: { value: 30, message: 'Maximum length of 30 integer exceeded' },
      pattern: {
        value: /^\d{1,30}$/,
        message: 'Invalid number (maximum be 30 digits)',
      },
    },

    property_description: {
      required: 'Description is required',
    },

    name: {
      required: false,
      maxLength: { value: 40, message: 'Maximum length of 40 characters exceeded' },
      validate: {
        noStartingSpace: value => {
          if (value.trimLeft() !== value) {
            return 'Property Name should not start with a space';
          }
          return true;
        },
      },
    },
    mobile_no: {
      required: false,
      maxLength: { value: 10, message: 'Maximum length of 6 characters exceeded' },
      pattern: {
        value: /^[0-9]{10}$/,
        message: 'Invalid mobile number',
      },
    },
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <PropertyHeader
        currentStep={currentStep}
        //bubbleclick={bubbleclick}
        onpressgo={gobackPost}
        goClearPost={goClearPost}
        gotonext={gotonext}
        gotoprevious={gotoprevious}
        label="Listing Property"
      />

      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          style={styles.keyboardAvoid}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          enabled>
          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 10 }}>
            <PropertyDescription
              control={control}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
              checkingData={route?.params?.post4}
              setDetails={setPropertyDiscription}
              errors={errors}
            />

            <PropertyDocument
              control={control}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              checkingData={route?.params?.post4}
              errors={errors}
            />

            <PropertyVerification
              control={control}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
              checkingData={route?.params?.post4}
              setDetails={setPropertyDiscription}
              errors={errors}
            />

            <PropertyAdditionalContact
              control={control}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              errors={errors}
            />

            <TitledCheckBox
              label="I agree to terms & conditions"
              checked={termsandCondition}
              setChecked={() => setTermsandCondition(!termsandCondition)}
            />
          </ScrollView>

          <RNView
            style={{
              elevation: 15,
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 10,

              marginHorizontal: 5,
            }}>
            <CommonButton
              title="Preview"
              style={styles.buttonPreviewStyle}
              textStyle={{ color: 'black' }}
              onPress={() => gotoPreview()}
            />

            <CommonButton
              title="List Now !"
              disabled={termsandCondition === true ? false : true}
              style={[
                styles.buttonStyle,
                { backgroundColor: termsandCondition === true ? ColorTheme.primary : ColorTheme.gray2 },
              ]}
              textStyle={{ color: 'black' }}
              // onPress={handleSubmit(onSubmit)}

              onPress={getSubscriptionAll}
            />
          </RNView>
        </KeyboardAvoidingView>

        <ModalWrapper
          visible={ViewSubscription}
          onClose={CloseSubscriptionAll}
          modalHeight={deviceHeight / 1.2}
          modalWidth={deviceWidth / 1.2}
          header={false}>
          {/* <ModalBackdrop /> */}
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ height: deviceHeight }}>
            <RNView style={styles.modelHeaderView}>
              <RNText style={styles.modelHeaderText}>Select a Plan for the listing</RNText>
            </RNView>

            <RNView style={styles.modelSelectionView}>
              <ScrollView showsVerticalScrollIndicator={true} style={{ flex: 1 }}>
                {subscriptionData?.data.map((item, i) => (
                  <>
                    <TouchableOpacity
                      key={item?._id}
                      style={styles.modelSectionStyle}
                      onPress={() => {
                        console.log('onClick of sub');
                        
                        SelectSubscription(item, i)}}>
                      <RNText style={styles.modelSubscriptionText}>{item?.subscriptionplan?.subscription_type}</RNText>

                      {selectedUserData?.role === 'BUILDER' ? (
                        <RNText style={styles.modelSubscriptionSubText}>
                          {`Available Leads : ${item?.available_leads}`}
                        </RNText>
                      ) : (
                        <RNText style={styles.modelSubscriptionSubText}>
                          {`Available Listing : ${item?.available_listing}`}
                        </RNText>
                      )}
                    </TouchableOpacity>
                  </>
                ))}
              </ScrollView>
            </RNView>
          </KeyboardAvoidingView>
        </ModalWrapper>
      </SafeAreaView>
    </Container>
  );
};

export default PostPropertyStepFive;
