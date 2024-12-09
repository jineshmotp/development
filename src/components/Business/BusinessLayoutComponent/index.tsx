import React from 'react';
import { Linking, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Pdf from 'react-native-pdf';
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import { LayourStyle } from './styles';

type BusinessLayoutProperty = {
  title: string;
  source: string; // Changed to string for URL
  downloadText: string;
  onButtonPress: () => void;
};

export default function BusinessLayoutComponent({
  title,
  source,
  downloadText,
  onButtonPress,
}: BusinessLayoutProperty) {
  // Check if the source is a PDF
  const isPDF = typeof source === 'string' && source.endsWith('.pdf');
  // console.log('isPDF ====>', source.includes('.pdf'));

  const navigation = useNavigation();

  const handlePDFPress = () => {
    Linking.openURL(source).catch(err => console.error('Failed to open PDF:', err));
  };

  return (
    <RNView>
      <RNText style={LayourStyle.lableTextStyle}>{title}</RNText>

      {isPDF ? (
        <TouchableOpacity onPress={() => navigation.navigate('PDF_VIEW', { uri: source })} style={LayourStyle.pdf}>
          <Pdf
            trustAllCerts={false}
            source={{ uri: source }}
            style={{ width: '100%', height: '100%' }}
            onLoadComplete={(numberOfPages, filePath) => {
              console.log(`number of pages: ${numberOfPages}`);
            }}
            onPageChanged={(page, numberOfPages) => {
              console.log(`current page: ${page}`);
            }}
            onPressLink={uri => {
              Linking.openURL(uri);
            }}
            onError={error => {
              console.error('PDF Error:', error);
            }}
          />
          <TouchableOpacity onPress={onButtonPress} style={LayourStyle.downloadView}>
            <RNView style={LayourStyle.viewDirection}>
              <RNText style={LayourStyle.whiteTextStyle}>{downloadText}</RNText>
              <Feather name="download" size={20} color="red" />
            </RNView>
          </TouchableOpacity>
        </TouchableOpacity>
      ) : (
        // Render Image for other types
        <RNView style={LayourStyle.layoutViewStyle}>
          <RNView style={LayourStyle.imagbackgroundStyle}>
            <RNImage source={{ uri: source }} style={LayourStyle.imagbackgroundStyle} resizeMode="contain" />
            <RNView style={LayourStyle.bottomView}>
              <TouchableOpacity onPress={onButtonPress} style={LayourStyle.downloadView}>
                <RNView style={LayourStyle.viewDirection}>
                  <RNText style={LayourStyle.whiteTextStyle}>{downloadText}</RNText>
                  <Feather name="download" size={20} color={ColorTheme.onboardingPrimary} />
                </RNView>
              </TouchableOpacity>
            </RNView>
          </RNView>
        </RNView>
      )}
    </RNView>
  );
}
