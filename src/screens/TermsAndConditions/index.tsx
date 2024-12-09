import WebView from 'react-native-webview';

import {useNavigation} from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import { Container } from '@/custom/Container';

const TermsAndConditions = () => {

  const navigation = useNavigation();

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar label="Terms And Conditions" backPress={() => navigation.goBack()} />
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
        // onMessage={event => {
        //   // console.log('onMessage+++', event);
        //   const response = Alert.alert(event?.nativeEvent?.data);
        //   // console.log('response ======>', response);

        //   getMagicResponse(response);
        // }}
        source={{
          uri: 'https://dev.nearluk.com/terms_and_condition',
        }}
        onError={e => console.log('error in webview ')}
      />
    </Container>
  );
};

export default TermsAndConditions;
