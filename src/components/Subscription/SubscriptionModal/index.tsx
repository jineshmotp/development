import React from 'react';
import { Platform, ScrollView } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { TouchableOpacity } from 'react-native';

import Divider from '@/components/common/Divider';
import ModalWrapper from '@/components/common/ModalWrapper';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { FONT } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  subscriptionData?: any;
  ViewSubscription?: any;
  CloseSubscriptionAll?: any;
  SelectSubscription?: any;
}

const SubscriptionModal: React.FC<PropertyAreaProps> = ({
  subscriptionData,
  ViewSubscription,
  CloseSubscriptionAll,
  SelectSubscription,
}) => {
  const selectedUserData = useAppSelector(getUserData);
  // console.log(' subscription data--->', subscriptionData);

  return (
    <ModalWrapper
      visible={ViewSubscription}
      onClose={CloseSubscriptionAll}
      modalHeight={deviceHeight / 1.2}
      modalWidth={deviceWidth / 1.2}
      header={false}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ height: deviceHeight }}>
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
                  onPress={() => SelectSubscription(item, i)}>
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
  );
};

export default SubscriptionModal;
