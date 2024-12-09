// Parent Component (PostProperty)
import React from 'react';
import { ScrollView, StatusBar } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import PropertyDescriptionDetails from '@/components/property/PropertyDescriptionDetails';
import PropertyDocumentDetails from '@/components/property/PropertyDocumentDetails';
import PropertyPicCarousel from '@/components/property/PropertyPicCarousel';
import PropertyVerificationDetails from '@/components/property/PropertyVerificationDetails';
import { isValidURL } from '@/constants/function/property.helper';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';

import DefaultPropertyImagePreview from '../../components/common/DefaultPropertyImagePreview';
import IndustryType from '../../components/property/IndustryType';
import PropertyAdditionalContactDetails from '../../components/property/PropertyAdditionalContactDetails';
import PropertyAdditionalDetails from '../../components/property/PropertyAdditionalDetails';
// import PropertyBasicDetails from '../../components/property/PropertyBasicDetails';
import PropertyBasicPreviewDetails from '../../components/property/PropertyBasicPreviewDetails';
import PropertyDetails from '../../components/property/PropertyDetails';
import PropertyFeatureDetails from '../../components/property/PropertyFeatureDetails';
import PropertyImageBackgroundPreview from '../../components/property/PropertyImageBackgroundPreview';
import PropertyListDetails from '../../components/property/PropertyListingDetails';
import PropertyPriceDetails from '../../components/property/PropertyPriceDetails';
import ShopandRetailType from '../../components/property/ShopandRetailType';
import SocietyFeatureDetails from '../../components/property/SocietyFeatureDetails';
import WaterSourcesDetails from '../../components/property/WaterSourcesDetails';

const BuilderPropertyPreview = () => {
  const navigation = useNavigation();
  const goBack = () => {
    navigation.goBack();
  };

  const route = useRoute<RouteProp<RootStackParamList, 'BUILDER_POST_PROPERTY_PREVIEW'>>();

  console.log(' Preview Data : ', route?.params?.preview_data);

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <RNView>
        <StatusBar hidden={true} />
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 50,
          }}
          showsVerticalScrollIndicator={false}>
          {route?.params?.preview_data?.gallery?.length ? (
            isValidURL(route?.params?.preview_data?.gallery[0]?.url) ? (
              <PropertyPicCarousel
                details={route?.params?.preview_data}
                Photos={route?.params?.preview_data?.gallery}
              />
            ) : (
              <PropertyImageBackgroundPreview
                details={route?.params?.preview_data}
                goBack={() => navigation.goBack()}
                url={route?.params?.preview_data?.gallery[0]?.url}
                category={route?.params?.preview_data?.gallery[0]?.category}
              />
            )
          ) : (
            <DefaultPropertyImagePreview
              details={route?.params?.preview_data}
              goBack={() => navigation.goBack()}
              url={route?.params?.preview_data?.gallery[0]?.url}
            />
          )}

          <PropertyBasicPreviewDetails details={route?.params?.preview_data} />

          {/* <PropertyOwnderDisplayDetails details={route?.params?.preview_data} /> */}
          <PropertyListDetails details={route?.params?.preview_data} />
          <PropertyVerificationDetails details={route?.params?.preview_data} />
          <PropertyAdditionalContactDetails details={route?.params?.preview_data} />
          <PropertyDetails details={route?.params?.preview_data} />
          <PropertyAdditionalDetails details={route?.params?.preview_data} />
          <PropertyPriceDetails details={route?.params?.preview_data} />
          <ShopandRetailType details={route?.params?.preview_data} />
          <IndustryType details={route?.params?.preview_data} />
          {/* <PropertyFurnishingStatus details={route?.params?.preview_data} /> */}
          <SocietyFeatureDetails details={route?.params?.preview_data} />
          <PropertyFeatureDetails details={route?.params?.preview_data} />
          <WaterSourcesDetails details={route?.params?.preview_data} />
          {/* <ParkingDetails details={route?.params?.preview_data} /> */}
          <PropertyDocumentDetails details={route?.params?.preview_data} />
          <PropertyDescriptionDetails details={route?.params?.preview_data} />
        </ScrollView>
      </RNView>
    </Container>
  );
};

export default BuilderPropertyPreview;
