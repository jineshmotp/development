import React, { useState } from 'react';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import GalleryViewChips from '@/components/common/GalleryViewChips';
import HeaderBar from '@/components/common/HeaderBar';
import { activateItemByKey } from '@/constants/function/property.helperFunctions';
import { SubscriptionTabs } from '@/constants/userprofile';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import ActivePlans from './ActivePlans';
import BillingInformation from './BillingInformation';
import PricingPlans from './PricingPlans';
import { styles } from './styles';
import TaxInvoices from './TaxInvoices';
import Plans from './Plans';

const Subscriptions = () => {
  const navigation = useNavigation();
  const [subscriptionTab, setSubscriptionTab] = useState(SubscriptionTabs);

  const activateTabByKeyforGallery = item => {
    const shallow = [...subscriptionTab];
    const filterData = activateItemByKey(shallow, item.key);
    setSubscriptionTab(filterData);
  };

  const renderGalleryTabs = data => {
    switch (data.key) {
      case 'Active':
        return <ActivePlans />;
      case 'plans':
        return <Plans />;
      case 'tax':
        return <TaxInvoices />;
      case 'billing':
        return <BillingInformation />;
    }
  };
  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        backPress={() => {
          navigation.goBack();
        }}
        label="Subscriptions"
      />
      <RNView style={styles.container}>
        <ScrollView
          horizontal={true}
          style={styles.horizontalScroll}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.contentContainer}>
          {subscriptionTab.map((item, ind) => {
            return (
              <GalleryViewChips
                key={ind}
                item={item}
                onPress={() => activateTabByKeyforGallery(item)}
                style={styles.galleryViewStyle}
                textStyle={[styles.galleryText, { color: item?.active ? 'black' : '#9C9C9C' }]}
                containerStyle={[
                  styles.galleryContainer,
                  { borderBottomColor: item?.active ? ColorTheme.primary : 'white' },
                ]}
              />
            );
          })}
        </ScrollView>
        <ScrollView style={styles.containerScroll} showsVerticalScrollIndicator={false}>
          <RNView style={styles.containerView}>
            {renderGalleryTabs(subscriptionTab[0].active && subscriptionTab[0])}
            {renderGalleryTabs(subscriptionTab[1].active && subscriptionTab[1])}
            {/* {renderGalleryTabs(subscriptionTab[2].active && subscriptionTab[2])} */}
          </RNView>
                {/* <RNView style={{ marginTop: 150 , backgroundColor:'red'}} /> */}

        </ScrollView>
      </RNView>
    </Container>
  );
};

export default Subscriptions;
