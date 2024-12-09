import React from 'react';
import Pdf from 'react-native-pdf';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';

import { styles } from './styles';

const PdfView = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'PDF_VIEW'>>();
//   console.log('route =====>', route?.params?.uri);

  const navigation = useNavigation();
  const source = {
    uri: route?.params?.uri,
    cache: true,
  };
  return (
    <Container isTab={false} hasHeader={true} backgroundColor="#F0F0F0">
      <HeaderBar
        label="Preview"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <RNView style={styles.container}>
        <Pdf
          trustAllCerts={false}
          source={source}
          onLoadComplete={(numberOfPages, filePath) => {
            console.log(`Number of pages: ${numberOfPages}`);
          }}
          onPageChanged={(page, numberOfPages) => {
            console.log(`Current page: ${page}`);
          }}
          onError={error => {
            console.log(error);
          }}
          onPressLink={uri => {
            console.log(`Link pressed: ${uri}`);
          }}
          style={styles.pdf}
        />
      </RNView>
    </Container>
  );
};

export default PdfView;
