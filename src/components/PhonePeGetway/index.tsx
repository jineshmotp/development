import React, { useState } from 'react';
import 'react-native';
import { useToast } from 'react-native-toast-notifications';
import WebView from 'react-native-webview';

import { useNavigation } from '@react-navigation/native';

import RNView from '@/custom/RNView';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { updateLoginStatus } from '@/redux/login/loginReducer';
import { deviceHeight, deviceWidth, px } from '@/utils';

import HeaderBar from '../common/HeaderBar';
import ModalWrapper from '../common/ModalWrapper';
import { styles } from './styles';
import { Alert } from 'react-native';

type Props = {
  paymentUrl?: string;
  openModal?: boolean;
  setOpenModal?: (val) => void;
};
const PhonePeGetway: React.FC<Props> = ({ paymentUrl, openModal, setOpenModal }) => {
  const [cangoback, setCangoBack] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const navigation = useNavigation();

  const getMagicResponse = response => {
    console.log('getMagicResponsegetMagicResponse+++', response);
  };

  return (
    <ModalWrapper
      animationType={'slide'}
      visible={openModal}
      onClose={() => {
        setOpenModal(false);
      }}
      modalHeight={deviceHeight}
      modalWidth={deviceWidth}
      header={true}>
      <HeaderBar
        backPress={() => {
          //   if (cangoback) {
          setOpenModal(false);
          //   }
        }}
        label="Payment"
      />
      <RNView style={styles.modalView}>
        <WebView
          originWhitelist={['*']}
          startInLoadingState={true}
          useWebKit={false}
          javaScriptEnabled={true}
          domStorageEnabled={true}
          // style={{ flex: 1 }}
          scalesPageToFit={true}
          automaticallyAdjustContentInsets={true}
          keyboardDisplayRequiresUserAction={true}
          //   injectedJavaScript={runFirst}
          onMessage={event => {
            // console.log('onMessage+++', event);
            const response = Alert(event?.nativeEvent?.data);
            // console.log('response ======>', response);

            getMagicResponse(response);
          }}
          source={{
            uri: paymentUrl,
          }}
          onError={e => console.log('error in webview payment')}
          onNavigationStateChange={webViewState => {
            // console.log('webViewState.url ========>', webViewState);
            setCangoBack(webViewState?.canGoBack);
            if (webViewState?.url?.includes('phonepe-redirect')) {
              // console.log('success+++++++++++++++');
              toast.show('Your Payment is Processed successfully', {
                type: 'success_toast',
                animationDuration: 100,
                data: {
                  title: 'Payment successfully',
                },
                duration: 3000,
              });
              dispatch(updateLoginStatus(true));
              navigation.navigate('BOTTOM_TAB');
              setOpenModal(false);
            }
            if (webViewState.url.includes('payment_failure')) {
              toast.show('Please try once again...', {
                type: 'error_toast',
                animationDuration: 100,
                data: {
                  title: 'Payment Failed',
                },
                duration: 3000,
              });
              setOpenModal(false);
            }
          }}
        />
      </RNView>
    </ModalWrapper>
  );
};

export default PhonePeGetway;
