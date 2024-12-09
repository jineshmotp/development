import React from 'react';
import { TouchableOpacity } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  onPress?: (ind) => void;
  changeColorByPlans?: () => void;
  data?: any;
  index?: number;
};

const SubscriptionPlanDetail: React.FC<Props> = ({ onPress, data, changeColorByPlans, index }) => {
  // console.log('data =====>', data);
  const gstPercentage = 0.18;

  // Calculate GST and total price
  const calculateTotalPrice = (price, applyGST) => {
    return applyGST ? price * (1 + gstPercentage) : price;
  };

  return (
    <RNView style={styles.topView}>
      <LinearGradient colors={changeColorByPlans()} style={styles.topBar}></LinearGradient>
      <RNView style={styles.subContainer}>
        <RNView style={styles.headerTop}>
          <RNView style={styles.headerTop}>
            <RNText style={styles.headerText}>{data?.subscription_type}</RNText>
          </RNView>
          <LinearGradient colors={changeColorByPlans()} style={styles.bottomBar}></LinearGradient>
        </RNView>
        <RNView style={styles.upperRow}>
          <RNText style={styles.rnText}>Listing</RNText>
          <RNText style={styles.rnText}>{data?.listing_limit === -1 ? 'Unlimited' : data?.listing_limit}</RNText>
        </RNView>
        <RNView style={styles.upperRow}>
          <RNText style={styles.rnText}>Leads per Listing</RNText>
          <RNText style={styles.rnText}>{data?.max_leads === -1 ? 'Unlimited' : data?.max_leads}</RNText>
        </RNView>
        <RNView style={styles.upperRow}>
          <RNText style={styles.rnText}>Listing Duration</RNText>
          <RNText style={styles.rnText}>{`${data?.Listing_duration} days`}</RNText>
        </RNView>
        <RNView style={styles.upperRow}>
          <RNText style={styles.rnText}>Plan Price</RNText>
          <RNText style={styles.rnText}>{`₹ ${data?.plan_price}`}</RNText>
        </RNView>
        {data?.listing_limit > 1 || data?.listing_limit === -1 ? (
          <RNView style={styles.upperRow}>
            <RNText style={styles.rnText}>GST</RNText>
            <RNText style={styles.rnText}>+ 18 %</RNText>
          </RNView>
        ) : null}
        {data?.listing_limit > 1 || data?.listing_limit === -1 ? (
          <RNView style={styles.upperRow}>
            <RNText style={styles.rnText}>Total Price</RNText>
            <RNText style={styles.rnText}>
              {' '}
              {`₹ ${calculateTotalPrice(data?.plan_price, data?.listing_limit > 1 || data?.listing_limit === -1).toFixed(2)}`}
            </RNText>
          </RNView>
        ) : null}

        <RNView style={styles.benefit}>
          <RNText style={styles.rnText}>Benefits</RNText>
        </RNView>
        <RNView>
          <RNText style={{ color: ColorTheme.black }}>{data?.long_description}</RNText>
        </RNView>
        {data?.subscription_type === 'FREE' ? (
          <RNView></RNView>
        ) : (
          <TouchableOpacity style={styles.btnView} onPress={() => onPress(index)}>
            <RNText style={styles.btnText}>Subscribe</RNText>
          </TouchableOpacity>
        )}
      </RNView>
    </RNView>
  );
};

export default SubscriptionPlanDetail;
