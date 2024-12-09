import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Divider from '@/components/common/Divider';
import ImgVidUploadBottomSheet from '@/components/common/ImgVidUploadBottomSheet';
import SectionHoc from '@/components/common/SectionHoc';
import PropertyModelDropDown from '@/components/property/PropertyModelDropDown';
import { imagevideoextention } from '@/constants/function/property.helper';
import { activateItemById } from '@/constants/function/property.helperFunctions';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { uploadstyles } from './uploadstyles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
  mandatory?: boolean;
  loading?: Boolean;
}

const PropertyLayout: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  mandatory,
  details,
  loading,
}) => {
  const [showBottomSheet, setshowBottomSheet] = useState(false);

  const [imgArray, setImageArray] = useState<string[]>([]);

  const [uploadimgArray, setUploadImgArray] = useState([]);

  const [loadingProfilePic, setLoadingProfilePic] = useState(false);

  //########################### Activate Key for Image Featured ######################

  const activateKeyForImgFeatured = (item: any) => {
    const shallowCopy = [...uploadimgArray];
    const updatedArr = activateItemById(shallowCopy, item.id);

    let imgURL = '';

    const updatedArray = updatedArr.map((imgItem: any) => {
      if (imgItem.id === item.id) {
        imgURL = imgItem.url;
        return {
          ...imgItem,
          featured: true,
        };
      } else {
        return {
          ...imgItem,
          featured: false, // set other items' featured to false
        };
      }
    });

    setUploadImgArray(updatedArray);
  };

  //################################## Remove Arr ##########################################

  const removeImgfromArr = (key: any) => {
    const filteredUploadImgArray = uploadimgArray.filter(item => item.id !== key);
    setUploadImgArray(filteredUploadImgArray);

    const removedUrl = uploadimgArray.find(item => item.id === key)?.url;
    if (removedUrl) {
      const filteredImgArray = imgArray.filter(url => url !== removedUrl);
      setImageArray(filteredImgArray);
    }
  };
  //####################################################################################

  useEffect(() => {
    console.log('Transformed image array : ', imgArray);

    if (imgArray.length > 0) {
      const transformedArray = imgArray.map(url => ({
        url: url,
        id: Math.floor(Math.random() * 1400),
      }));

      setUploadImgArray(transformedArray);
    }

    setDetails({ ...details, property_layout: imgArray });
  }, [imgArray]);

  //######################### update image
  //######################### update image

  useEffect(() => {
    if (details?.property_layout.length > 0) {
      const transformedArray = details?.property_layout.map(url => ({
        url: url,
        id: Math.floor(Math.random() * 1400),
      }));

      setUploadImgArray(transformedArray);
    }
  }, [details?.property_layout]);

  return (
    <>
      <RNView>
        <RNView style={uploadstyles.container}>
          <SectionHoc title="Property Layout" mandatory={mandatory}>
            <RNView style={uploadstyles.RNViewcontainer}>
              <CommonButton
                loading={loading}
                disabled={loading}
                onPress={() => setshowBottomSheet(true)}
                title="+ Add Layout"
                lefyIcon={<Ionicons name="add-sharp" size={24} color="black" />}
                style={[uploadstyles.buttonStyle, { width: deviceWidth / 3 }]}
                textStyle={{
                  color: ColorTheme.black,
                  fontSize: SIZES.medium15,
                }}
              />
              {/* <RNView style={uploadstyles.textViewStyle}>
                <RNText style={uploadstyles.RNtextStyle}>
                  Property Listings with more than 5 images get 3x more views.
                </RNText>
                <RNText style={uploadstyles.RNtextStyle}>More Images = Higher chances of Leads.</RNText>
                <RNText style={uploadstyles.RNtextStyle}>
                  Accepted formats are .jpg, .gif, .bmp & .png and Maximum size allowed 10 MB
                </RNText>
              </RNView> */}
            </RNView>

            <>
              {uploadimgArray && uploadimgArray.length > 0 && (
                <>
                  <RNView
                    style={{
                      marginTop: px(20),
                    }}>
                    <RNView>
                      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <RNView style={uploadstyles.RNViewContainer}>
                          {uploadimgArray?.map((img: any, key: any) => (
                            <RNView key={key}>
                              <Image source={{ uri: img?.url }} resizeMode="cover" style={uploadstyles.fileStyle} />
                              {img?.category && (
                                <RNView style={uploadstyles.categoryStyle}>
                                  <RNText style={uploadstyles.categoryimgText}>{img.category}</RNText>
                                </RNView>
                              )}
                              <RNView style={uploadstyles.tagViewStyle}>
                                <TouchableOpacity
                                  style={uploadstyles.touchableRemove}
                                  onPress={() => removeImgfromArr(img.id)}>
                                  <Ionicons name="trash-bin-outline" style={uploadstyles.removeIconStyle} />
                                  <RNText style={uploadstyles.removeTextStyle}>Remove</RNText>
                                </TouchableOpacity>
                              </RNView>
                            </RNView>
                          ))}
                        </RNView>
                      </ScrollView>
                    </RNView>
                  </RNView>
                </>
              )}
            </>
          </SectionHoc>

          <RNView style={uploadstyles.containerDivider}>
            <Divider
              borderColor={ColorTheme.nearLukGray5}
              style={{
                marginTop: 20,
                gap: 10,
              }}
            />
          </RNView>
        </RNView>
      </RNView>

      <ImgVidUploadBottomSheet
        showBottomSheet={showBottomSheet}
        imgArray={imgArray}
        setLoading={setLoadingProfilePic}
        setImageArray={data => setImageArray(prev => [...prev, data[0]])}
        setshowBottomSheet={setshowBottomSheet}
        photos={true}
        loading={loadingProfilePic}
        multiSelect={true}
      />
    </>
  );
};

export default PropertyLayout;
