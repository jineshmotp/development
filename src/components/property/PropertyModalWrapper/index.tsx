import React from 'react';
import { Modal, TextStyle, TouchableOpacity, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { StatusBar } from 'react-native-bars';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceHeight, deviceWidth } from '@/utils';

import { styles } from './styles';

type ModalProps = {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  modalWidth?: number;
  modalHeight?: number;
  header?: boolean;
  closeBtnStyle?: TextStyle;
  modalStyle?: ViewStyle;
};

const PropertyModalWrapper: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  modalWidth = deviceWidth,
  modalHeight = deviceHeight,
  header = false,
  closeBtnStyle,
  modalStyle,
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      {/* <StatusBar barStyle={'light-content'} translucent backgroundColor={'transparent'} /> */}
      <RNView style={styles.modalBackground}>
        <RNView style={[styles.modalContainer, modalStyle, { width: modalWidth, height: modalHeight }]}>
          {children}
        </RNView>
      </RNView>
    </Modal>
  );
};

export default PropertyModalWrapper;
