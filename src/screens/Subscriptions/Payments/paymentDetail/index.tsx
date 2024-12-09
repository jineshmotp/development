import React from 'react';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceHeight, px } from '@/utils';

import PaymentCard from '../PaymentCard';
import { styles } from './styles';

type PaymentDetailProps = {
  isVisible?: boolean;
  onPressClose?: () => void;
  data?: any;
};

const PaymentDetail: React.FC<PaymentDetailProps> = ({ isVisible, onPressClose, data }) => {
  // console.log('dataaaaa', data);
  return (
    <ModalWrapper visible={isVisible} onClose={onPressClose} header={true} modalHeight={deviceHeight - px(100)}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar backPress={onPressClose} label="Payment Details" />
        <RNView style={styles.topView}>
          <RNText style={styles.headLeft}>{data?.subscriptionPlan?.subscription_type}</RNText>
          <RNView style={styles.billBorder}>
            <RNText style={styles.billHead}>Bill Details</RNText>
            <RNView style={styles.rowView}>
              <RNText style={styles.rowText}>Amount</RNText>
              <RNText style={styles.rowText}>₹ {data?.plan_price}</RNText>
            </RNView>
            <RNView style={styles.rowView}>
              <RNText style={styles.rowText}>GST (18%)</RNText>
              <RNText style={styles.rowText}>₹ {data?.gst_taken}</RNText>
            </RNView>
            <RNView style={styles.rowView}>
              <RNText style={styles.rowText}>Total</RNText>
              <RNText style={styles.rowText}>₹ {data?.paid_amount}</RNText>
            </RNView>
          </RNView>
        </RNView>
      </ScrollView>
    </ModalWrapper>
  );
};

export default PaymentDetail;
