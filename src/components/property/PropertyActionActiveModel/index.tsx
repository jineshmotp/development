import React from 'react';

import { ActionsheetItem } from '@gluestack-ui/themed';

import BottomSheetWrapper from '@/components/common/BottomSheetWrapper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { FONT, SIZES } from '@/theme';

import { styles } from './styles';

type Item = {
  label: string;
  child?: any[];
};

type Props = {
  showModal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  data?: Item[];
  placeholder?: string;
  onPressItem?: (item: Item) => void;
};

const PropertyActionActiveModel: React.FC<Props> = ({ data, showModal, setShowModal, placeholder, onPressItem }) => {
  // console.log('prop active');

  return (
    <BottomSheetWrapper
      openSheet={showModal}
      onClose={() => setShowModal?.(false)}
      snapPoint={data?.length ? data.length * 11 : 10}>
      <RNView style={styles.topView}>
        <RNText style={styles.placeholderStyle}>{placeholder}</RNText>
      </RNView>
      {data?.map(item => (
        <ActionsheetItem
          key={item.key} // Assuming item has a unique identifier called 'id'
          onPress={() => {
            setShowModal && setShowModal(false); // Ensuring setShowModal is defined before calling it
            onPressItem && onPressItem(item); // Ensuring onPressItem is defined before calling it
          }}
          style={styles.actionSheetItem}>
          <RNView style={styles.element_main}>
            <RNText style={{ color: 'black' }}>{item.label}</RNText>
          </RNView>
        </ActionsheetItem>
      ))}
    </BottomSheetWrapper>
  );
};

export default PropertyActionActiveModel;
