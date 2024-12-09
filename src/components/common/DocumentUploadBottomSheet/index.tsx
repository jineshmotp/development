import React from 'react';
import { Platform } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { useToast } from 'react-native-toast-notifications';

import { ActionsheetItem } from '@gluestack-ui/themed';

import { isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useUploadListDocumentMutation } from '@/redux/listing/listingService';

import BottomSheetWrapper from '../BottomSheetWrapper';
import { styles } from './styles';

type Props = {
  showBottomSheet?: boolean;
  imgArray?: any[];
  setImageArray?: React.Dispatch<React.SetStateAction<any[]>>;
  setshowBottomSheet?: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;

  loading?: boolean;
  multiSelect?: boolean;
  uploadVideo?: boolean;
};

const DocumentUploadBottomSheet: React.FC<Props> = ({
  showBottomSheet,
  imgArray,
  setLoading,
  setImageArray,
  setshowBottomSheet,

  loading,
  multiSelect,
  uploadVideo,
}): React.ReactNode => {
  const toast = useToast();

  const [uploadDocumentsMutation, { status }] = useUploadListDocumentMutation();

  // console.log(' API status', status);

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: 'application/pdf',
      });

      setshowBottomSheet(false);
      setLoading(true);

      const document = result[0];
      // console.log('Selected document: ', document);

      const formData = new FormData();
      formData.append('file', {
        uri: document.uri,
        type: document.type,
        name: document.name,
      });

      uploadDocumentsMutation(formData).then(response => {
        if (response?.data?.status) {
          const imageRes = response?.data?.data;
          if (isValidURL(imageRes)) {
            //   console.log('setshowBottomSheet(false);+++', imageRes);
            setImageArray([imageRes]);
            setshowBottomSheet(false);
            setLoading(false);
          } else {
            // console.log('setshowBottomSheet(false);', imageRes);
            setshowBottomSheet(false);
          }
        } else {
          // setLoading(false);
          toast.show(response?.error?.message || 'Something went wrong', {
            type: 'custom_toast',
            animationDuration: 100,
            data: {
              title: 'Auth message',
            },
            duration: 3000,
          });
        }
      });
    } catch (error) {
      console.error('Error picking document:', error);
      setshowBottomSheet(false);
    }
  };

  return (
    <BottomSheetWrapper
      openSheet={showBottomSheet}
      onClose={() => setshowBottomSheet(!showBottomSheet)}
      snapPoint={Platform.OS === 'ios' ? [25] : [20]}
      dragIndicator={false}>
      <ActionsheetItem onPress={pickDocument} style={styles.actionSheetItem}>
        <RNView style={styles.imgMain}>
          <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/imageGallery.png')} />
        </RNView>
        <RNText style={styles.textStyle}>{' Select Document'}</RNText>
      </ActionsheetItem>
    </BottomSheetWrapper>
  );
};

export default DocumentUploadBottomSheet;
