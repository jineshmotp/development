import React from 'react';
import { Linking } from 'react-native';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  platform: string;
  acc_name: string;
};

const renderIcons = (icon: string) => {
  switch (icon) {
    case 'facebook':
      return (
        <RNView style={styles.main}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/facebook.png')} />
        </RNView>
      );
    case 'youtube':
      return (
        <RNView style={styles.main}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/youtube.png')} />
        </RNView>
      );
    case 'instagram':
      return (
        <RNView style={styles.main}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/instagram.png')} />
        </RNView>
      );
    case 'twitter':
      return (
        <RNView style={styles.main}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/twitter.png')} />
        </RNView>
      );
    case 'linkedin':
      return (
        <RNView style={styles.main}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/linkedin.png')} />
        </RNView>
      );

    default:
      break;
  }
};

const SocialMediaElement: React.FC<Props> = ({ platform, acc_name }) => {
  return (
    <RNView style={styles.sectionDetailPart}>
      <RNView style={styles.constainer}>
        {renderIcons(platform)}
        <RNView style={styles.textMain}>
          <RNText style={styles.sectionText} onPress={() => Linking.openURL(`https://${acc_name}`)}>
            {acc_name}
          </RNText>
        </RNView>
      </RNView>
    </RNView>
  );
};

export default SocialMediaElement;
