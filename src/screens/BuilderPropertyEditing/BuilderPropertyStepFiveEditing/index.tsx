// Parent Component (PostProperty)
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import Loader from '@/components/common/Loader';
import PropertyHeader from '@/components/common/PropertyHeader';
import PropertyLayout from '@/components/common/PropertyLayout';
import PropertyAdditionalContact from '@/components/property/PropertyAdditionalContact';
import PropertyDescription from '@/components/property/PropertyDescription';
import PropertyDocument from '@/components/property/PropertyDocument';
import PropertyVerification from '@/components/property/PropertyVerification';
import TitledCheckBox from '@/components/property/TitledCheckBox';
import { ProperyListing_PayloadGenerator } from '@/constants/function/builder.payloadEditing';
import { updation_val } from '@/constants/function/property.helper';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { useUpdateBuilderPropertyApiMutation } from '@/redux/builder/builderService';
import { usePropertyListaddingMutation, useUpdatePropertyApiMutation } from '@/redux/listing/listingService';
import { getReloadData, getUserData } from '@/redux/login/loginReducer';
import { useGetPropertyDetailsQuery } from '@/redux/property/propertyService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

import { styles } from '../styles';

const BuilderPropertyStepFiveEditing = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY_FIVE_EDITING'>>();
  const selectedUserData = useAppSelector(getUserData);

  const dispatch = useAppDispatch();

  const iwant = route?.params?.post4?.iwant;
  const property_type = route?.params?.post4?.property_type;
  const property_sub_type = route?.params?.post4?.property_sub_type;

  const currentStep = 5;
  const toast = useToast();
  const [uploadListingMutation] = usePropertyListaddingMutation({});
  const [updatePropertyMutation, { status }] = useUpdateBuilderPropertyApiMutation({});

  const { data } = useGetPropertyDetailsQuery({ property: route?.params?.post4?.BasicData?._id });

  // console.log(' data --------->', data?.data?.property?.gallery);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [load, setLoad] = useState(true);

  const [propertyDiscription, setPropertyDiscription]: any = useState({
    property_description: data?.data?.property?.property_description || '',
    rera_number: data?.data?.property?.rera_number || '',
    is_rera_verified: data?.data?.property?.is_rera_verified || false,
    dtcp_number: data?.data?.property?.dtcp_number || '',
    is_dtcp_verified: data?.data?.property?.is_dtcp_verified || false,
    additional_contact_details: data?.data?.property?.additional_contact_details || '',
    property_documents: data?.data?.property?.property_documents || [],
    property_layout: data?.data?.property?.property_layout || [],
  });

  const [termsandCondition, setTermsandCondition] = useState(true);
  const [postloading, setPostLoading] = useState(false);

  //##################################################################################################

  const onSubmit = data => {
    console.log('submit value------>');

    let retvalfinal = 1;

    if (retvalfinal === 1) {
      setPostLoading(true);

      const payload_data = {
        ...route?.params?.post4,
        ...propertyDiscription,
        existing_gallery: data?.data?.property?.gallery ? data?.data?.property?.gallery : [],
        new_gallery: route?.params?.post4.gallery ? route?.params?.post4.gallery : [],

        property_owner: selectedUserData?._id,
      };

      // console.log(' payload data ------> ', payload_data);

      const retpayload = ProperyListing_PayloadGenerator(payload_data);
      console.log('return payload : ', retpayload);

      let retval = updation_val(iwant, property_type, property_sub_type);

      let payval = { property: propertyDiscription.id, [retval]: retpayload };

      const myJSON = JSON.stringify(payval);

      // console.log('payload for editing ----->', myJSON);

      // console.log('return payload : ', myJSON);

      updatePropertyMutation(payval).then(response => {
        if (response?.data?.status) {
          Alert.alert(
            'Property Listing', // Title
            'Property Updated successfully', // Message
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
          console.log(' error -------->', response?.error);

          toast.show('Property Listing', {
            type: 'custom_toast',
            animationDuration: 100,
            data: {
              title: response?.error?.message,
            },
            duration: 3000,
          });
        }
      });
    }
  };

  const gobackPost = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BOTTOM_TAB' }],
    });
  };

  const goClearPost = () => {
    setPropertyDiscription({
      property_description: '',
      rera_number: null,
      is_rera_verified: false,
      dtcp_number: null,
      is_dtcp_verified: false,
    });
  };

  const gotonext = () => {
    onSubmit(propertyDiscription);
  };

  const gotoprevious = () => {
    navigation.goBack();
  };

  const gotoPreview = () => {
    navigation.navigate('BUILDER_POST_PROPERTY_PREVIEW', {
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
  };

  // ############# useEffect

  useEffect(() => {
    setTimeout(() => {
      setPropertyDiscription({
        ...propertyDiscription,

        id: data?.data?.property?._id,
        property_description: String(data?.data?.property?.property_description) || '',
        rera_number: data?.data?.property?.rera_number || '',
        is_rera_verified: data?.data?.property?.is_rera_verified || false,
        dtcp_number: data?.data?.property?.dtcp_number || '',
        is_dtcp_verified: data?.data?.property?.is_dtcp_verified || false,
        additional_contact_details: data?.data?.property?.additional_contact_details || '',
        property_documents: data?.data?.property?.property_documents || [],
        property_layout: data?.data?.property?.property_layout || [],
      });

      setLoad(false);
    }, 800);
  }, [data]);

  if (load) {
    return <Loader size={'large'} />;
  }

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <PropertyHeader
        currentStep={currentStep}
        //bubbleclick={bubbleclick}
        onpressgo={gobackPost}
        goClearPost={goClearPost}
        gotonext={gotonext}
        gotoprevious={gotoprevious}
        label="Editing Builder Property"
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

            <PropertyLayout
              control={control}
              mandatory={false}
              controlConstraints={controlConstraints}
              details={propertyDiscription}
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
              title="Update !"
              disabled={termsandCondition === true ? false : true}
              style={[
                styles.buttonStyle,
                { backgroundColor: termsandCondition === true ? ColorTheme.primary : ColorTheme.gray2 },
              ]}
              textStyle={{ color: 'black' }}
              onPress={handleSubmit(onSubmit)}
            />
          </RNView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Container>
  );
};

export default BuilderPropertyStepFiveEditing;
