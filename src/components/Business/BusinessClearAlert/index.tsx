import React, { memo, useEffect } from 'react';
import { Alert, Keyboard, Modal, Pressable } from 'react-native';

import RNView from '@/custom/RNView';

import { styles } from './styles';

interface IncrementDecrementProp {
  showBusinessCancel?: boolean;
  setShowBusinessCancel?: (value: boolean) => void;
  title?: string;
  subtitle?: string;
  handleAlertOK?: () => void;
}

const BusinessClearAlert: React.FC<IncrementDecrementProp> = ({
  showBusinessCancel,
  setShowBusinessCancel,
  title,
  subtitle,
  handleAlertOK,
}) => {
  useEffect(() => {
    if (showBusinessCancel) {
      Alert.alert(title, subtitle, [
        {
          text: 'Cancel',
          onPress: () => {
            console.log('Cancel Pressed');
            setShowBusinessCancel(false); // Close the modal
          },
          style: 'cancel', // This gives the Cancel button a distinct style (iOS only)
        },
        {
          text: 'OK',
          onPress: () => {
            setShowBusinessCancel(false);
            handleAlertOK();
          },
        },
      ]);
    }
  }, [showBusinessCancel]);

  return <RNView style={styles.containerView}>{/* The rest of your UI components can go here */}</RNView>;
};

export default memo(BusinessClearAlert);
