import React, { memo, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

import PropertyImageVideoSheet from '@/components/common/PropertyImageVideoSheet';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import MediaBoxComponent from '../MediaBoxComponent';
import MediaBoxUploadComponent from '../MediaBoxUploadComponent';
import { styles } from './styles';

interface galleryProp {
  setItems?: any;
  Items?: any;
}

const BusinessPhotoMedia: React.FC<galleryProp> = ({ setItems, Items }) => {
  const [imgArray, setImageArray] = useState([]);

  const toast = useToast();

  const [uploadimgArray, setUploadImgArray] = useState([]);

  const [loadingImage, setLoadingImage] = useState(false);
  const [showBottomSheetImage, setshowBottomSheetImage] = useState(false);

  const [feature, setFeature] = useState(false);

  const navigation = useNavigation();

  const handleImageClick = (typevalue: string, indexvalue: number) => {
    navigation.navigate('GALLERY_PREVIEW', {
      images: uploadimgArray,
      index: indexvalue,
      hasHeader: true,
      headerName: 'Business Gallery',
    });
  };

  const deleteImageClick = (typevalue: string, indexvalue: number) => {
    if (indexvalue >= 0 && indexvalue < uploadimgArray.length) {
      // Create a new array without the item at the specified index
      const updatedImgArray = uploadimgArray.filter((_, i) => i !== indexvalue);

      // Update the state with the new array
      setUploadImgArray(updatedImgArray);
    }
  };

  const featureImageClick = (typevalue: string, indexvalue: number) => {
    const updatedImgArray = [...imgArray];

    const featuredCount = updatedImgArray.filter(img => img.isFeatured).length;

    if (!updatedImgArray[indexvalue].isFeatured && featuredCount >= 2) {
      toast.show('Business Listing', {
        type: 'warning_toast',
        animationDuration: 100,
        data: {
          title: 'You can select a maximum of two images as cover pictures.',
        },
        duration: 3000,
      });

      return;
    }

    if (indexvalue >= 0 && indexvalue < updatedImgArray.length) {
      // Toggle the isFeatured value at the specified index
      updatedImgArray[indexvalue].isFeatured = !updatedImgArray[indexvalue].isFeatured;
    }

    // Update the state with the new array
    setImageArray(updatedImgArray);
  };

  const uploadBtnClick = () => {
    setshowBottomSheetImage(true);
  };

  useEffect(() => {
    // console.log(' image Array0--->', uploadimgArray);

    const transformedArray = uploadimgArray.map(url => {
      const existingItem = imgArray.find(img => img.url === url);
      return {
        url: url,
        isFeatured: existingItem ? existingItem.isFeatured : false,
      };
    });

    // console.log(' transformed array --->', transformedArray);

    setImageArray(transformedArray);
    setItems(transformedArray);
  }, [uploadimgArray]);

  useEffect(() => {
    // console.log(' item values--->', Items);

    const urlArray = Items.map(item => item.url);

    setUploadImgArray(urlArray);
  }, []);

  return (
    <RNView style={styles.containerTop}>
      <MediaBoxUploadComponent uploadBtnClick={uploadBtnClick} loadingImage={loadingImage} imagetype={true} />

      <RNView style={styles.labelTextView}>
        <RNText style={styles.labelText}>Starred images will be taken as cover photos</RNText>
      </RNView>

      <RNView style={styles.container}>
        <ScrollView horizontal={true}>
          {imgArray?.map((img: any, index: number) => (
            <MediaBoxComponent
              heroimage={img?.isFeatured}
              uploadBtn={false}
              text="Add as Hero Image"
              handleClick={() => handleImageClick('image', index)}
              deleteClick={() => deleteImageClick('image', index)}
              item={img}
              featureClick={() => featureImageClick('image', index)}
              itemArray={imgArray}
            />
          ))}
        </ScrollView>

        <PropertyImageVideoSheet
          showBottomSheet={showBottomSheetImage}
          imgArray={uploadimgArray}
          setLoading={setLoadingImage}
          setImageArray={data => setUploadImgArray(prev => [...prev, data[0]])}
          setshowBottomSheet={setshowBottomSheetImage}
          photos={true}
          loading={loadingImage}
          multiSelect={true}
        />
      </RNView>
    </RNView>
  );
};

export default memo(BusinessPhotoMedia);
