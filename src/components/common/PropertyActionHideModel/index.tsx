import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  ActionsheetItem,
  Box,
} from '@gluestack-ui/themed';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceWidth, px } from '@/utils';

import BottomSheetWrapper from '../BottomSheetWrapper';
import ModalWrapper from '../ModalWrapper';
import { styles } from './styles';

type Item = {
  label: string;
  child?: any[];
};

type Props = {
  showModal?: boolean;
  setShowModal?: (val) => void;
  data?: Item[];
  placeholder?: string;
  onPressItem?: (item: Item) => void;
};

const PropertyActionHideModel: React.FC<Props> = ({ data, showModal, setShowModal, placeholder, onPressItem }) => {
  return (
    <ModalWrapper
      header={false}
      visible={showModal}
      modalHeight={data?.length === 1 ? px(120) : data?.length ? data?.length * px(80) : 10}
      modalWidth={deviceWidth - px(50)}
      onClose={() => setShowModal(false)}>
      <RNView style={styles.initialContainer}>
        <RNText style={styles.holderText}>{placeholder}</RNText>
      </RNView>
      {data?.map(item => (
        <ActionsheetItem
          key={item.key} // Assuming item has a unique identifier called 'id'
          onPress={() => {
            setShowModal(false); // Ensuring setShowModal is defined before calling it
            onPressItem(item); // Ensuring onPressItem is defined before calling it
          }}
          style={styles.actionSheetItem}>
          <RNView style={styles.element_main}>
            <RNView style={styles.element}>
              <RNView style={styles.element}>
                <RNView style={styles.style_view}>
                  <Entypo name={item.icon} size={24} color="black" />
                </RNView>
              </RNView>

              <RNView style={styles.style_view}>
                <RNText style={{ color: 'black' }}>{item.label}</RNText>
              </RNView>
            </RNView>

            {/* <Text>{item.info}</Text> */}
          </RNView>
        </ActionsheetItem>
      ))}
    </ModalWrapper>
  );
};

export default PropertyActionHideModel;
