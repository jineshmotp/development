import React from 'react';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
} from '@gluestack-ui/themed';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  handleClose?: any;
  showActionsheet?: any;
};

const PostPropertyBottomSheet: React.FC<Props> = ({ handleClose, showActionsheet }) => {
  return (
    <Box>
      <Actionsheet
        isOpen={showActionsheet}
        // isOpen={true}
        onClose={handleClose}
        zIndex={999}
        snapPoints={[80]}>
        <ActionsheetBackdrop />
        <ActionsheetContent zIndex={999} maxHeight={900}>
          <ActionsheetDragIndicatorWrapper>
            <ActionsheetDragIndicator />
          </ActionsheetDragIndicatorWrapper>
          <RNView style={styles.container}>
            <RNText style={styles.propertyText}>Posting Property</RNText>
          </RNView>
        </ActionsheetContent>
      </Actionsheet>
    </Box>
  );
};

export default PostPropertyBottomSheet;
