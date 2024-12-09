import React from 'react';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import Loader from '@/components/common/Loader';
import { Container } from '@/custom/Container';
import { useGetPaymentDetailsQuery } from '@/redux/Subscription/subscriptionService';

import PaymentCard from './PaymentCard';

const Payments = () => {
  const navigation = useNavigation();
  const { data: paymentHistoryData, status, isLoading } = useGetPaymentDetailsQuery({});
  // console.log('paymentHistoryData =========>', paymentHistoryData?.data?.subscriptions);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar
        backPress={() => {
          navigation.goBack();
        }}
        label="Payment history"
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {paymentHistoryData?.data?.subscriptions?.length === (0 || undefined) ? (
          <ListEmptyComponent text="No payment history" />
        ) : (
          paymentHistoryData?.data?.subscriptions?.map((item, ind) => {
            return <PaymentCard key={ind} data={item} />;
          })
        )}
      </ScrollView>
    </Container>
  );
};

export default Payments;
