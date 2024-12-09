import React, { memo, useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import PropertyImageVideoSheet from '@/components/common/PropertyImageVideoSheet';
import RNView from '@/custom/RNView';

import MediaBoxComponent from '../MediaBoxComponent';
import MediaBoxUploadComponent from '../MediaBoxUploadComponent';
import { styles } from './styles';

interface galleryProp {
  setItems?: any;
  Items?: any;
}

const BusinessVideoMedia: React.FC<galleryProp> = ({ setItems, Items }) => {
  const [videoArray, setVideoArray] = useState([]);

  const [uploadVideoArray, setUploadVideoArray] = useState([]);

  const [loadingVideo, setLoadingVideo] = useState(false);
  const [showBottomSheetVideo, setshowBottomSheetVideo] = useState(false);

  const [feature, setFeature] = useState(false);

  const navigation = useNavigation();

  const handleVideoClick = (typevalue: string, indexvalue: number) => {
    navigation.navigate('GALLERY_PREVIEW', {
      images: uploadVideoArray,
      index: indexvalue,
      hasHeader: true,
      headerName: 'Business Gallery',
    });
  };

  const deleteVideoClick = (typevalue: string, indexvalue: number) => {
    if (indexvalue >= 0 && indexvalue < uploadVideoArray.length) {
      // Create a new array without the item at the specified index
      const updatedVideoArray = uploadVideoArray.filter((_, i) => i !== indexvalue);

      // Update the state with the new array
      setUploadVideoArray(updatedVideoArray);
    }
  };

  const featureVideoClick = (typevalue: string, indexvalue: number) => {
    // Create a new array to trigger re-render
    const updatedVideoArray = [...videoArray];

    if (indexvalue >= 0 && indexvalue < updatedVideoArray.length) {
      // Toggle the isFeatured value at the specified index
      updatedvideoArray[indexvalue].isFeatured = !updatedVideoArray[indexvalue].isFeatured;
    }

    // console.log(' updt--', updatedVideoArray);

    // Update the state with the new array
    setVideoArray(updatedvideoArray);
  };
  const uploadBtnClick = () => {
    setshowBottomSheetVideo(true);
  };

  useEffect(() => {
    // console.log(' image Array', uploadVideoArray);

    const transformedArray = uploadVideoArray.map(url => {
      const existingItem = videoArray.find(img => img.url === url);
      return {
        url: url,
        isFeatured: existingItem ? existingItem.isFeatured : false,
      };
    });

    // console.log(' transformed array --->', transformedArray);

    setVideoArray(transformedArray);
    setItems(transformedArray);
  }, [uploadVideoArray]);

  useEffect(() => {
    // console.log(' item values--->', Items);

    const urlArray = Items.map(item => item.url);

    setUploadVideoArray(urlArray);
  }, []);

  return (
    <RNView style={styles.containerTop}>
      <MediaBoxUploadComponent uploadBtnClick={uploadBtnClick} loadingImage={loadingVideo} />

      <RNView style={styles.container}>
        <ScrollView horizontal={true}>
          {videoArray?.map((img: any, index: number) => (
            <MediaBoxComponent
              heroimage={img?.isFeatured}
              uploadBtn={false}
              text="Add as Hero Image"
              handleClick={() => handleVideoClick('video', index)}
              deleteClick={() => deleteVideoClick('video', index)}
              item={img}
              VideoValue={true}
              itemArray={videoArray}
            />
          ))}
        </ScrollView>

        <PropertyImageVideoSheet
          showBottomSheet={showBottomSheetVideo}
          imgArray={uploadVideoArray}
          setLoading={setLoadingVideo}
          setImageArray={data => setUploadVideoArray(prev => [...prev, data[0]])}
          setshowBottomSheet={setshowBottomSheetVideo}
          photos={false}
          loading={loadingVideo}
        />
      </RNView>
    </RNView>
  );
};

export default memo(BusinessVideoMedia);
