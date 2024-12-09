// Parent Component (PostProperty)
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { KeyboardAvoidingView, Platform, SafeAreaView, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import Loader from '@/components/common/Loader';
import PropertyFeature from '@/components/common/PropertyFeature';
import PropertyHeader from '@/components/common/PropertyHeader';
import PropertyWaterSources from '@/components/common/PropertyWaterSources';
import SocietyFeature from '@/components/common/SocietyFeature';
import {
  propertyFeatures,
  propertyFeatures_educational,
  propertyFeatures_hospitality,
  propertyFeatures_industrial,
  propertyFeatures_rent_officespace,
  propertyFeatures_sell_officespace,
  propertyFeatures_shopesandretail,
  propertyWaterSources,
  societyFeatures,
} from '@/constants/function/property.helper';
import { activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { useGetPropertyDetailsQuery } from '@/redux/property/propertyService';
import { RootStackParamList } from '@/routes/RootNavigator';

import { styles } from '../styles';

const BuilderPropertyStepThreeEditing = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY_THREE_EDITING'>>();
  const currentStep = 3;
  const toast = useToast();

  const iwant = route?.params?.post2?.iwant;

  const property_sub_type = route?.params?.post2?.property_sub_type;

  const { data } = useGetPropertyDetailsQuery({ property: route?.params?.post2?.BasicData?._id });
  //const data = JSON.parse(JSON.stringify(dataretrive));

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [load, setLoad] = useState(true);

  const [propertyDiscription, setPropertyDiscription]: any = useState({
    floor_types: data?.data?.property?.floor_types || '',
    property_features: data?.data?.property?.property_features || '',
    society_features: data?.data?.property?.society_features || '',
    visitor_parking: data?.data?.property?.visitor_parking || 0,
    wheeler_2_parking: data?.data?.property?.wheeler_2_parking || 0,
    wheeler_4_parking: data?.data?.property?.wheeler_4_parking || 0,
    water_source: data?.data?.property?.water_source || '',
  });

  const [propertyFeature, setPropertyFeatures] = useState(
    property_sub_type === 'Hospitality'
      ? propertyFeatures_hospitality
      : iwant === 'Coliving'
        ? propertyFeatures_hospitality
        : property_sub_type === 'Educational'
          ? propertyFeatures_educational
          : property_sub_type === 'Industrial'
            ? propertyFeatures_industrial
            : property_sub_type === 'Office_Space' && iwant === 'Sell'
              ? propertyFeatures_sell_officespace
              : property_sub_type === 'Office_Space' && iwant === 'Rent'
                ? propertyFeatures_rent_officespace
                : property_sub_type === 'Shop_And_Retail'
                  ? propertyFeatures_shopesandretail
                  : propertyFeatures
  );

  const [propertywaterSource, setPropertyWaterSources] = useState(propertyWaterSources);
  const [societyFeature, setSocietyFeatures] = useState(societyFeatures);

  //##############################################################################

  const onSubmit = data => {
    let retvalfour = 1;

    if (propertyDiscription.property_features === '') {
      retvalfour = 0;
      toast.show('Property Listing', {
        type: 'warn_toast',
        animationDuration: 100,
        data: {
          title: 'Please Select Property Features',
        },
        duration: 3000,
      });
    }

    if (retvalfour === 1) {
      navigation.navigate('BUILDER_POST_PROPERTY_FOUR_EDITING', {
        post3: {
          ...route?.params?.post2,
          ...propertyDiscription,
          BasicData: route?.params?.post2?.BasicData,
        },
      });
    }

    //console.log(' navigate : ');
  };

  const gobackPost = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'BOTTOM_TAB' }],
    });
  };

  const goClearPost = () => {
    setPropertyDiscription({
      property_features: '',
      water_source: '',

      wheeler_2_parking: 0,
      wheeler_4_parking: 0,
      visitor_parking: 0,

      society_features: '',
      floor_types: '',
    });

    activateKeyForPropertyFeaturesClear();
    activateKeyForWaterSourcesClear();
    activateKeyForSocietyFeaturesClear();
  };

  const gotonext = () => {
    onSubmit(propertyDiscription);
  };

  const gotoprevious = () => {
    navigation.goBack();
  };

  //############################# Property Features #########################################################

  const activateKeyForPropertyFeatures = (item: any) => {
    const shallowCopy = [...propertyFeature];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);
    //console.log(newFiltered);

    setPropertyDiscription({
      ...propertyDiscription,
      property_features: newFiltered,
    });

    setPropertyFeatures(updatedArr);
  };

  const activateKeyForPropertyFeaturesEditing = (activelist: any[]) => {
    if (activelist.length > 0) {
      interface PropertyItem {
        active: boolean;
        key: string;
        label: string;
      }

      const updatedMainList = propertyFeature.map((item: PropertyItem) => ({
        ...item,
        active: activelist.some((activeItem: PropertyItem) => activeItem.key === item.key),
      }));
      setPropertyFeatures(updatedMainList);
    }
  };

  const activateKeyForPropertyFeaturesClear = () => {
    interface PropertyItem {
      active: boolean;
      key: string;
      label: string;
    }

    // Create a new array where all active properties are set to false
    const updatedMainList = propertyFeature.map((item: PropertyItem) => ({
      ...item,
      active: false,
    }));

    // Set the state with the updated list
    setPropertyFeatures(updatedMainList);
  };

  //################################ Water sources

  const activateKeyForWaterSources = (item: any) => {
    // console.log(key);
    const shallowCopy = [...propertywaterSource];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);
    //console.log(newFiltered[0]);

    setPropertyDiscription({
      ...propertyDiscription,
      water_source: newFiltered,
    });
    setPropertyWaterSources(updatedArr);
  };

  const activateKeyForWaterSourcesEditing = (activelist: any[]) => {
    if (activelist.length > 0) {
      interface PropertyItem {
        active: boolean;
        key: string;
        label: string;
      }

      //console.log("water items : ", activelist);

      const updatedMainList = propertywaterSource.map((item: PropertyItem) => ({
        ...item,
        active: activelist.some((activeItem: PropertyItem) => activeItem.key === item.key),
      }));

      //console.log("update main list :", updatedMainList);

      setPropertyWaterSources(updatedMainList);
    }
  };

  const activateKeyForWaterSourcesClear = () => {
    interface PropertyItem {
      active: boolean;
      key: string;
      label: string;
    }

    // Create a new array where all active properties are set to false
    const updatedMainList = propertywaterSource.map((item: PropertyItem) => ({
      ...item,
      active: false,
    }));

    // Set the state with the updated list
    setPropertyWaterSources(updatedMainList);

    //setPropertyWaterSources2(activelist);
  };

  //############################### Society Feature

  const activateKeyForSocietyFeatures = (item: any) => {
    //console.log(key);

    const shallowCopy = [...societyFeature];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);
    //society_features = newFiltered;
    //console.log("society feature : ", society_features);

    setPropertyDiscription({
      ...propertyDiscription,
      society_features: newFiltered,
    });
    setSocietyFeatures(updatedArr);
  };

  const activateKeyForSocietyFeaturesEditing = (activelist: any[]) => {
    if (activelist.length > 0) {
      interface PropertyItem {
        active: boolean;
        key: string;
        label: string;
      }

      const updatedMainList = societyFeature.map((item: PropertyItem) => ({
        ...item,
        active: activelist.some((activeItem: PropertyItem) => activeItem.key === item.key),
      }));

      //console.log("update main list :", updatedMainList);

      setSocietyFeatures(updatedMainList);
    }
    //console.log(key);
  };

  const activateKeyForSocietyFeaturesClear = () => {
    interface PropertyItem {
      active: boolean;
      key: string;
      label: string;
    }
    const updatedMainList = societyFeature.map((item: PropertyItem) => ({
      ...item,
      active: false,
    }));

    setSocietyFeatures(updatedMainList);
  };

  //########################################################################################
  const controlConstraints = {
    // level_count: {
    //   maxLength: { value: 5, message: 'Maximum length of 5 integer exceeded' },
    //   pattern: {
    //     value: /^\d{1,5}$/,
    //     message: 'Invalid number (maximum be 5 digits)',
    //   },
    // },
  };

  //############################## editing useEffect

  useEffect(() => {
    //console.log('data value : -------->', data?.data?.property);

    setTimeout(() => {
      setPropertyDiscription({
        ...propertyDiscription,
        floor_types: data?.data?.property?.floor_types || '',
        property_features: data?.data?.property?.property_features || '',
        society_features: data?.data?.property?.society_features || '',
        visitor_parking: data?.data?.property?.visitor_parking || 0,
        wheeler_2_parking: data?.data?.property?.wheeler_2_parking || 0,
        wheeler_4_parking: data?.data?.property?.wheeler_4_parking || 0,
        water_source: data?.data?.property?.water_source || '',
      });

      if (data?.data?.property?.property_features !== undefined) {
        activateKeyForPropertyFeaturesEditing(data?.data?.property?.property_features);
      }

      if (data?.data?.property?.water_source !== undefined) {
        activateKeyForWaterSourcesEditing(data?.data?.property?.water_source);
      }
      if (data?.data?.property?.society_features !== undefined) {
        activateKeyForSocietyFeaturesEditing(data?.data?.property?.society_features);
      }

      setLoad(false);
    }, 800);
  }, [data]);

  //#################################################

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
            <PropertyFeature
              control={control}
              mandatory={true}
              controlConstraints={controlConstraints}
              data={propertyFeature}
              checkingData={route?.params?.post2}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              errors={errors}
              activefunction={activateKeyForPropertyFeatures}
            />

            <PropertyWaterSources
              control={control}
              controlConstraints={controlConstraints}
              data={propertywaterSource}
              checkingData={route?.params?.post2}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              errors={errors}
              activefunction={activateKeyForWaterSources}
            />

            <SocietyFeature
              control={control}
              controlConstraints={controlConstraints}
              data={societyFeature}
              checkingData={route?.params?.post2}
              details={propertyDiscription}
              setDetails={setPropertyDiscription}
              errors={errors}
              activefunction={activateKeyForSocietyFeatures}
            />

            {/* //##################################################################### */}
          </ScrollView>

          <CommonButton
            title="Save & continue"
            style={styles.buttonStyle}
            textStyle={{ color: 'black' }}
            onPress={handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </Container>
  );
};

export default BuilderPropertyStepThreeEditing;
