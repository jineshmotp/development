import React from 'react';
import { StyleSheet } from 'react-native';

import {
  Center,
  Heading,
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@gluestack-ui/themed';

import { RNText } from '@/custom/RNText';
import { SIZES } from '@/theme';

type Props = {
  openModal?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
  text?: string;
  head?: string;
};
const CustomAlertWrapper: React.FC<Props> = ({ openModal, onClose, children, text, head }) => {
  return (
    <Center h={'300'}>
      <Modal isOpen={openModal} onClose={onClose}>
        <ModalBackdrop />
        <ModalContent>
          {head && (
            <ModalHeader>
              <Heading size="lg">{head}</Heading>
              <ModalCloseButton>{/*  */}</ModalCloseButton>
            </ModalHeader>
          )}
          {text && (
            <ModalBody>
              <RNText style={{ fontSize: SIZES.small14 }}>{text}</RNText>
            </ModalBody>
          )}
          <ModalFooter
            style={{
              gap: 10,
            }}>
            {children}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Center>
  );
};

export default CustomAlertWrapper;

const styles = StyleSheet.create({});
