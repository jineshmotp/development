import React, { useEffect, useState } from 'react';

import * as qs from 'qs';
import { useNavigation } from '@react-navigation/native';

import Loader from '@/components/common/Loader';
import { isArray } from '@/constants/function/isArray';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useLazySubscriptionHistoryQuery } from '@/redux/Subscription/subscriptionService';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const ActivePlans = () => {
  const navigation = useNavigation();

  const [getSubscription] = useLazySubscriptionHistoryQuery({});
  const [loading, setLoading] = useState(false);
  const [historyData, setHistoryData] = useState({});
  // console.log('historyData ======>', historyData?.data);
  useEffect(() => {
    const getData = () => {
      setLoading(true);
      getSubscription(getPaymentData())
        .then(res => {
          // console.log('cheking on the response=======>>>>', JSON.stringify(res?.data));
          setTimeout(() => {
            setHistoryData(res?.data);
            setLoading(false); // Stop loading after data is set
          }, 300);
        })
        .catch(err => {
          console.log('cheingon on errorr======>>>', JSON.stringify(err));
          setLoading(false);
        });
    };
    getData();
  }, []);
  const getPaymentData = category => {
    const paymentPayload = {
      category: category,
    };
    return qs.stringify(paymentPayload);
  };

  const goldPlanCount = historyData?.data?.filter(plan => plan.subscription_type === 'GOLD').length;
  // console.log('goldPlanCount =====>', goldPlanCount);

  const platinumPlanCount = historyData?.data?.filter(plan => plan.subscription_type === 'PLATINUM').length;
  // console.log('platinumPlanCount ======>', platinumPlanCount);

  return (
    <RNView>
      {/* <DetailSectionHeader Heading="Current plans" /> */}
      {loading && <Loader size={'small'} color={ColorTheme.primary} />}
      <RNView style={styles.cardView}>
        {historyData?.data?.length ? (
          <>
            <RNText style={styles.headText}>You are Active Plans</RNText>
            {goldPlanCount ? (
              <RNView style={styles.flexRow}>
                <RNText style={styles.planText}>Gold Plan</RNText>
                <RNText style={styles.planText}>{goldPlanCount}</RNText>
              </RNView>
            ) : null}

            {platinumPlanCount ? (
              <RNView style={styles.flexRow}>
                <RNText style={styles.planText}>Platinum Plan</RNText>
                <RNText style={styles.planText}>{platinumPlanCount}</RNText>
              </RNView>
            ) : null}
          </>
        ) : (
          <>
            <RNText style={styles.headText}>You are not currently subscribed to any plan</RNText>
            <RNText style={styles.subTitle}>Subscribe to NearLuk for sell and rent your property faster.</RNText>
          </>
        )}

        {historyData?.data?.length ? (
          <>
            <CommonButton
              title="Buy More Plans"
              disabled={false}
              loading={false}
              textStyle={styles.BtnTextStyle}
              style={styles.BtnStyle}
              onPress={() => navigation.navigate('PRICING_PLANS')}
            />
          </>
        ) : (
          <>
            <CommonButton
              title="Buy Now"
              disabled={false}
              loading={false}
              textStyle={styles.BtnTextStyle}
              style={styles.BtnStyle}
              onPress={() => navigation.navigate('PRICING_PLANS')}
            />
          </>
        )}
      </RNView>
      {historyData?.data?.length ? <RNText style={styles.detailText}>Plans Details</RNText> : null}
      {/* <ScrollView style={styles.modalContainer} contentContainerStyle={{ flex: 1 }}> */}
      {isArray(historyData?.data)
        ? historyData?.data?.map((item, ind) => {
            // console.log('cheking on the item first', JSON.stringify(item));
            return (
              <RNView key={ind} style={styles.activeCard}>
                <RNView style={styles.flexRow}>
                  <RNText style={styles.headText}>{item?.subscriptionplan?.subscription_type}</RNText>
                  <RNText style={styles.headText}>{item?.subscriptionplan?.plan_price}</RNText>
                </RNView>
                <RNView style={styles.flexRow}>
                  <RNText style={styles.planText}>Total Leads</RNText>
                  <RNText style={styles.planText}>{item?.total_leads}</RNText>
                </RNView>
                <RNView style={styles.flexRow}>
                  <RNText style={styles.planText}>Transaction Id</RNText>
                  <RNText style={styles.planText}>{item?.payment_txn_id}</RNText>
                </RNView>
              </RNView>
            );
          })
        : null}
      {/* </ScrollView> */}
    </RNView>
  );
};
export default ActivePlans;
