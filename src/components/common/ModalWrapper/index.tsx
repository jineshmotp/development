import React from 'react';
import { Modal, TextStyle, TouchableOpacity, TouchableWithoutFeedback, ViewStyle } from 'react-native';
import { StatusBar } from 'react-native-bars';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

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
  animationType?: string;
};

const ModalWrapper: React.FC<ModalProps> = ({
  visible,
  onClose,
  children,
  modalWidth = deviceWidth,
  modalHeight = deviceHeight,
  header = false,
  closeBtnStyle,
  modalStyle,
  animationType = '',
}) => {
  return (
    <Modal animationType={animationType || 'slide'} transparent={true} visible={visible} onRequestClose={onClose}>
      <StatusBar barStyle={'light-content'} translucent backgroundColor={'transparent'} />
      <RNView style={styles.modalBackground}>
        <RNView style={[styles.modalContainer, modalStyle, { width: modalWidth, height: modalHeight }]}>
          {!header && (
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              {/* You can replace 'X' with any close icon you prefer */}
              <RNView style={[styles.closeButtonText, closeBtnStyle]}>
                <AntDesign name="close" size={px(20)} color={ColorTheme.black} />
              </RNView>
            </TouchableOpacity>
          )}
          {children}
        </RNView>
      </RNView>
    </Modal>
  );
};

export default ModalWrapper;
