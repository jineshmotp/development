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
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { selectPropertyStepThreeData, setPropertyStepThreeData } from '@/redux/builder/builderReducer';
import { RootStackParamList } from '@/routes/RootNavigator';

import { styles } from '../styles';

const BuilderPostPropertyStepThree = () => {
  const dispatch = useAppDispatch();
  const toast = useToast();
  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY_THREE'>>();
  const currentStep = 3;

  const iwant = route?.params?.post2?.iwant;
  const property_sub_type = route?.params?.post2?.property_sub_type;

  const data = useAppSelector(selectPropertyStepThreeData);

  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [load, setLoad] = useState(true);

  const [propertyDiscription, setPropertyDiscription]: any = useState({
    floor_types: data?.floor_types || '',
    property_features: data?.property_features || '',
    society_features: data?.society_features || '',
    visitor_parking: data?.visitor_parking || 0,
    wheeler_2_parking: data?.wheeler_2_parking || 0,
    wheeler_4_parking: data?.wheeler_4_parking || 0,
    water_source: data?.water_source || '',
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
      let post_three = {
        ...propertyDiscription,
      };

      dispatch(setPropertyStepThreeData(post_three));

      navigation.navigate('BUILDER_POST_PROPERTY_FOUR', {
        post3: {
          ...route?.params?.post2,
          ...propertyDiscription,
        },
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

  const activateKeyForPropertyFeaturesLoading = (activelist: any[]) => {
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

  const activateKeyForWaterSourcesLoading = (activelist: any[]) => {
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

  const activateKeyForSocietyFeaturesLoading = (activelist: any[]) => {
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

  //################################# useEffect

  useEffect(() => {
    //console.log('data value : -------->', data?.data?.property);

    setTimeout(() => {
      setPropertyDiscription({
        ...propertyDiscription,
        floor_types: data?.floor_types || '',
        property_features: data?.property_features || '',
        society_features: data?.society_features || '',
        visitor_parking: data?.visitor_parking || 0,
        wheeler_2_parking: data?.wheeler_2_parking || 0,
        wheeler_4_parking: data?.wheeler_4_parking || 0,
        water_source: data?.water_source || '',
      });

      if (data?.property_features !== undefined) {
        activateKeyForPropertyFeaturesLoading(data?.property_features);
      }

      if (data?.water_source !== undefined) {
        activateKeyForWaterSourcesLoading(data?.water_source);
      }
      if (data?.society_features !== undefined) {
        activateKeyForSocietyFeaturesLoading(data?.society_features);
      }

      setLoad(false);
    }, 800);
  }, [data]);

  //########################################################################################
  const controlConstraints = {
    property_features: {
      required: false,
    },
  };

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
        label="Listing your property for Sale or Rent"
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

export default BuilderPostPropertyStepThree;
