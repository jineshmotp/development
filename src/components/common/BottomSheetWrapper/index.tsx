import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
} from '@gluestack-ui/themed';

import { deviceHeight, px } from '@/utils';

import { styles } from './styles';

type Props = {
  children?: React.ReactNode;
  openSheet?: boolean;
  onClose?: () => void;
  snapPoint?: number;
  dragIndicator?: boolean;
};

const BottomSheetWrapper: React.FC<Props> = ({
  children,
  openSheet,
  onClose,
  snapPoint = 10,
  dragIndicator = false,
}) => {
  // console.log(' device height :------', deviceHeight, snapPoint);
  return (
    <Box>
      <Actionsheet
        isOpen={openSheet}
        onTouchEnd={onClose}
        onClose={onClose}
        zIndex={999}
        snapPoints={[px(snapPoint)]}
        style={styles.main}>
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999} maxHeight={900} style={styles.sheetContent}>
          {dragIndicator && (
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>
          )}
          <>{children}</>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default BottomSheetWrapper;
