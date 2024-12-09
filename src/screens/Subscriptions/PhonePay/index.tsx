import React, { useState } from 'react';
import { Alert } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import WebView from 'react-native-webview';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import { Container } from '@/custom/Container';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { updateLoginStatus } from '@/redux/login/loginReducer';
import { RootStackParamList } from '@/routes/RootNavigator';

const PhonePay = () => {
  const navigation = useNavigation();
  const [cangoback, setCangoBack] = useState(false);
  const dispatch = useAppDispatch();
  const toast = useToast();
  const route = useRoute<RouteProp<RootStackParamList, 'PHONE_PAY'>>();
  // console.log('route ===>', route?.params?.url);

  const getMagicResponse = response => {
    console.log('getMagicResponsegetMagicResponse+++', response);
  };
  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar label="Payment" backPress={() => navigation.goBack()} />
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
          const response = Alert.alert(event?.nativeEvent?.data);
          // console.log('response ======>', response);

          getMagicResponse(response);
        }}
        source={{
          uri: route?.params?.url,
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
          }
        }}
      />
    </Container>
  );
};

export default PhonePay;
