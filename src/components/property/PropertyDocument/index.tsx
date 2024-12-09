import React, { useEffect, useState } from 'react';
import { Linking } from 'react-native';

import moment from 'moment';

import Divider from '@/components/common/Divider';
import DocumentUploadBottomSheet from '@/components/common/DocumentUploadBottomSheet';
import SectionHoc from '@/components/common/SectionHoc';
import PropertyDocumentSelection from '@/components/property/PropertyDocumentSelection';
import {
  propertyDocuments,
  propertyDocumentsForHospitality,
  propertyDocumentsForLease,
  propertyDocumentsForSelling,
} from '@/constants/function/property.helper';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { uploadstyles } from './uploadstyles';

interface VerificationDetailsProps {
  setDetails: any;
  details: any;
  control: any;
  controlConstraints: any;
  errors: any;
  checkingData?: any;
}

const PropertyDocument: React.FC<VerificationDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  details,
  checkingData,
}) => {
  const [PropertyDocuments, setPropertyDocuments] = useState(
    checkingData.iwant === 'Sell' && checkingData.property_type === 'Residential'
      ? propertyDocumentsForHospitality
      : checkingData.iwant === 'Sell' && checkingData.property_type === 'Residential'
        ? propertyDocumentsForSelling
        : checkingData.iwant === 'Coliving' || checkingData.property_type === 'Rent'
          ? propertyDocumentsForLease
          : propertyDocuments
  );

  const [showPostPropertyDrawer, setShowPostPropertyDrawer] = useState({
    key: '',
    open: false,
  });

  const [showBottomSheet, setshowBottomSheet] = useState(false);

  const [imgArray, setImageArray] = useState<string[]>([]);

  const [docArray, setDocArray] = useState([]);

  const [loadingdocUploading, setLoadingDocUploading] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [pdfUri, setPdfUri] = useState(null);

  //############################### Remove document #############################################################

  const activateKeyForPropertyDocuments = (key: string) => {
    setShowPostPropertyDrawer({
      key: key,
      open: true,
    });
  };

  const uploadDocuments = (key: string) => {
    console.log(' key values : ', key);

    activateKeyForPropertyDocuments(key);
    setshowBottomSheet(true);
  };

  const openPdfInBrowser = async serverUri => {
    try {
      const supported = await Linking.canOpenURL(serverUri);
      if (supported) {
        await Linking.openURL(serverUri);
      } else {
        console.error("Don't know how to open URI: " + serverUri);
      }
    } catch (error) {
      console.error('An error occurred', error);
    }
  };

  const PreviewDoc = async (key: any) => {
    //console.log(key);

    const shallowCopy = [...PropertyDocuments];
    const updatedDocuments = shallowCopy?.map((item: any) => {
      if (item.key === key) {
        return {
          ...item,
          label: `${item.label.split('-')[0]}`,
          uploaded: false,
          status: false,
          source: '',
        };
      }
      return item;
    });

    // Using find to get the object with the matching key
    const documentWithServerUri = updatedDocuments.find(doc => doc.key === key);

    // Accessing the serveruri property if found
    const serverUri = documentWithServerUri ? documentWithServerUri.serverUri : null;

    // console.log(' uri ---- ', serverUri);

    // if (serverUri) {
    //   setPdfUri(serverUri);
    //   setModalVisible(true);
    // }
    if (serverUri) {
      try {
        await Linking.openURL(serverUri);
      } catch (error) {
        console.error('Failed to open URL:', error);
      }
    }
  };

  const removeDocFromArr = (key: any) => {
    const shallowCopy = [...PropertyDocuments];
    const updatedDocuments = shallowCopy?.map((item: any) => {
      if (item.key === key) {
        return {
          ...item,
          label: `${item.label.split('-')[0]}`,
          serverUri: '',
          uploaded: false,
          status: false,
          source: '',
        };
      }
      return item;
    });
    setPropertyDocuments(updatedDocuments);
  };

  useEffect(() => {
    // console.log('Transformed image array:', imgArray);

    const transformedArray = imgArray.map(url => {
      const parts = url.split('/');
      const fileName = parts[parts.length - 1];

      return {
        label: fileName,
        key: showPostPropertyDrawer.key,
        serverUri: url,
        status: true,
        type: fileName.split('.').pop(),
        uploadOn: moment(new Date()).format('YYYY-MM-DD'),
        uploaded: true,
      };
    });

    const updatedDocuments = PropertyDocuments.map((item: any) => {
      const modifiedDocument = transformedArray.find((itemModified: any) => item.key === itemModified.key);
      if (modifiedDocument) {
        return {
          ...item,
          label: `${item.label}`,
          serverUri: modifiedDocument.serverUri,
          type: modifiedDocument.type,
          uploaded: modifiedDocument.uploaded,
          uploadOn: modifiedDocument.uploadOn,
          status: true,
        };
      }
      return item;
    });

    // console.log('Transformed array updated document:', updatedDocuments);

    setPropertyDocuments(updatedDocuments);

    setDetails({ ...details, property_documents: updatedDocuments.filter((item: any) => item.uploaded === true) }); // Uncomment this line to set the state
  }, [imgArray]);

  //############################################################################################

  return (
    <>
      <RNView>
        <RNView style={uploadstyles.container}>
          <SectionHoc title="Documents">
            <RNView
              style={{
                gap: 10,
              }}>
              {PropertyDocuments?.map((item: any, i) => {
                return (
                  <PropertyDocumentSelection
                    key={i}
                    item={item}
                    onPress={() => {
                      uploadDocuments(item.key);
                    }}
                    onPreview={() => {
                      PreviewDoc(item.key);
                    }}
                    onRemove={() => {
                      // Handle trash button press
                      removeDocFromArr(item.key);
                    }}
                  />
                );
              })}
            </RNView>
          </SectionHoc>

          <Divider
            borderColor={ColorTheme.nearLukGray5}
            style={{
              marginTop: 10,
              gap: 10,
            }}
          />
        </RNView>
      </RNView>

      <DocumentUploadBottomSheet
        showBottomSheet={showBottomSheet}
        imgArray={imgArray}
        setLoading={setLoadingDocUploading}
        setImageArray={data => setImageArray(prev => [...prev, data[0]])}
        setshowBottomSheet={setshowBottomSheet}
        loading={loadingdocUploading}
        multiSelect={false}
      />

      {/* <PdfViewerModal isVisible={isModalVisible} onClose={() => setModalVisible(false)} serverUri={pdfUri} /> */}
    </>
  );
};

export default PropertyDocument;
