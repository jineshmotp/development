import React from 'react';
import { Modal } from 'react-native';
import { WebView } from 'react-native-webview';

import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  isVisible?: any;
  onClose?: any;
  serverUri?: any;
};

const PdfViewerModal: React.FC<Props> = ({ isVisible, onClose, serverUri }) => {
  // console.log("PropertyCategoryChips=================", item);
  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <RNView style={styles.container}>
        <WebView source={{ uri: serverUri }} style={styles.webView} />
      </RNView>
    </Modal>
  );
};

export default PdfViewerModal;
