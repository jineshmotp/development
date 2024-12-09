import React, { useCallback, useEffect, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import PDFView from 'react-native-pdf';

import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';
import { px } from '@/utils';

const DocumentComponentPreview = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'DOCUMENT_PREVIEW'>>();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [load, setLoad] = useState(true);
  const documents = route?.params?.images || [];

  const documentUri = documents[0];

  // console.log(' docuemnt uri-->', documentUri);

  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
    if (!isFocused) {
      StatusBar.setHidden(false, 'fade');
    }
  }, [isFocused]);

  const renderPDF = useCallback((uri: string) => {
    // console.log('Rendering PDF with URI:', uri);
    return (
      <PDFView
        source={{ uri }}
        style={{ flex: 1 }}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`Number of pages: ${numberOfPages}`);
          setLoad(false); // Set loading to false when done
        }}
        onError={error => {
          // console.error('PDF Load Error:', error);
          setLoad(false); // Set loading to false if there's an error
        }}
      />
    );
  }, []);

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      {route?.params?.hasHeader && (
        <RNView
          style={Platform.select({
            android: { position: 'absolute', top: px(30), zIndex: 3000 },
            ios: { position: 'absolute', top: px(30), zIndex: 3000 },
          })}>
          <HeaderBar
            backPress={() => navigation.goBack()}
            label={`${route?.params?.headerName ? route?.params?.headerName : 'Document'} (1 of 1)`}
            shadow={false}
          />
        </RNView>
      )}

      <PDFView
        source={{ uri: documentUri }}
        style={{ flex: 1 }}
        onLoadComplete={(numberOfPages, filePath) => {
          // console.log(`Number of pages: ${numberOfPages}`);
          setLoad(false); // Set loading to false when done
        }}
        onError={error => {
          // console.error('PDF Load Error:', error);
          setLoad(false); // Set loading to false if there's an error
        }}
      />
    </Container>
  );
};

export default DocumentComponentPreview;
