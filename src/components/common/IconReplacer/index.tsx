import React from 'react';
import { StyleSheet } from 'react-native';

import RNImage from '@/custom/RNImage';
import RNView from '@/custom/RNView';
import { styles } from './styles';
type Props = {
  iconName?: string;
  iconSize?: number;
};

const IconReplacer: React.FC<Props> = ({ iconName, iconSize }): React.ReactNode => {
  const checkImage = () => {
    switch (iconName) {
      case 'star':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/star.png')}
            />
          </RNView>
        );
      case 'categories':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/categories.png')}
            />
          </RNView>
        );
      case 'time':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/time.png')}
            />
          </RNView>
        );
      case 'calender':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/calender.png')}
            />
          </RNView>
        );
      case 'globe':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/globe.png')}
            />
          </RNView>
        );
      case 'info':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/info.png')}
            />
          </RNView>
        );
      case 'star1':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/star1.png')}
            />
          </RNView>
        );
      case 'infoSimple':
        return (
          <RNView>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/info.png')}
            />
          </RNView>
        );
      case 'phone':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/phone.png')}
            />
          </RNView>
        );
      case 'location':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/map.png')}
            />
          </RNView>
        );
      case 'mobile':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/mobile.png')}
            />
          </RNView>
        );
      case 'web':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/web.png')}
            />
          </RNView>
        );
      case 'Email':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/userProfile/mail.png')}
            />
          </RNView>
        );
      case 'high-school':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/high-school.png')}
            />
          </RNView>
        );
      case 'audit':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/audit.png')}
            />
          </RNView>
        );
      case 'user':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/userProfile/user.png')}
            />
          </RNView>
        );
      case 'link':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/userProfile/link.png')}
            />
          </RNView>
        );
      case 'birthday':
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/userProfile/birthday.png')}
            />
          </RNView>
        );
      case 'plusCircle':
        return (
          <RNView style={styles.main}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/plusCircle.png')}
            />
          </RNView>
        );

      default:
        return (
          <RNView style={styles.iconCircle}>
            <RNImage
              style={{ width: iconSize, height: iconSize }}
              source={require('@/assets/images/business/plusCircle.png')}
            />
          </RNView>
        );
    }
  };
  return <RNView>{checkImage()}</RNView>;
};

export default IconReplacer;
