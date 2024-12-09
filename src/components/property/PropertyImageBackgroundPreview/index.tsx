import React, { useEffect, useState } from 'react';
import { ImageBackground, Share, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useNavigation } from '@react-navigation/native';

import { isArray } from '@/constants/function/isArray';
import { isValidURL } from '@/constants/function/property.helper';
import { formatNumberWithNotation } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { usePropertyFavUnfavMutation, useUpdateShareCountMutation } from '@/redux/login/loginService';
import { baseURL } from '@/services/apiClient';
import { FONT, SIZES } from '@/theme';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type PropertyAreaProps = {
  details?: any;
  goBack?: () => void;
  url?: string;
  index?: number;
  category?: string;
};

const PropertyImageBackgroundPreview: React.FC<PropertyAreaProps> = ({ details, goBack, url, index, category }) => {
  const userId = useAppSelector(getUserData)?._id;
  const selectedUserData = useAppSelector(getUserData);
  const navigation = useNavigation();
  const [imagArr, setImgArr] = useState([]);
  const [ShareCount, setShareCount] = useState(details?.shareCount ? details?.shareCount : 0);
  const totalImages = () => {
    const imageArr = details?.gallery.map(ele => {
      return ele?.url;
    });
    setImgArr(imageArr);
  };
  const toast = useToast();
  const [isSaved, setIsSaved] = useState(details?.isFav || false);
  const [propertyFavUnfavMutation] = usePropertyFavUnfavMutation();
  const [updateShareCount] = useUpdateShareCountMutation();

  const handlePropertyPostFavUnFav = () => {
    const payload = {
      property: details?._id,
      user: selectedUserData?._id,
    };
    // console.log('handlePropertyPostFavUnFav+++', payload);
    propertyFavUnfavMutation(payload).then(result => {
      if (result?.data?.status) {
        // console.log(' satus ----->', result?.data?.status);

        setIsSaved(!isSaved);
      } else {
        // handlePropertyPostFavUnFav();
        setIsSaved(isSaved);
        toast.show(result?.data?.message, {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };

  useEffect(() => {
    totalImages();
  }, []);
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate('GALLERY_PREVIEW', {
          images: isArray(imagArr)
            ? imagArr
            : ['https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png'],
          index: index,
        });
      }}>
      <ImageBackground
        resizeMethod="auto"
        resizeMode="stretch"
        style={styles.imageBackgroundStyle}
        source={{
          uri: isValidURL(url)
            ? url
            : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png',
        }}>
        <RNView style={styles.topView}>
          <RNView style={styles.navChild}>
            <RNView>
              <TouchableOpacity onPress={goBack} style={styles.goBackButton}>
                <Ionicons name="arrow-back-outline" size={px(25)} color={ColorTheme.black} />
              </TouchableOpacity>
            </RNView>
            <RNView>
              {category ? (
                <RNView style={styles.navRightImageCategory}>
                  <RNText style={styles.navRightImageCategoryText}>{category}</RNText>
                </RNView>
              ) : null}
            </RNView>
            {/* <RNView style={styles.navRight}>
              <TouchableOpacity
                onPress={() => {
               
                }}
                style={styles.shareButton}>
                <Ionicons name="share-social-outline" size={px(25)} color={ColorTheme.black} />
              </TouchableOpacity>

              <TouchableOpacity onPress={() => handlePropertyPostFavUnFav()} style={styles.shareButton}>
                {isSaved ? (
                  <AntDesign name="heart" size={24} color={ColorTheme.primary} />
                ) : (
                  <AntDesign name="hearto" size={24} color={ColorTheme.primary} />
                )}
              </TouchableOpacity>
            </RNView> */}
          </RNView>

          <RNView style={styles.pricingContainer}>
            {details?.iwant !== 'Investment Sharing' && (
              <RNView style={styles.pricingChild}>
                <RNView
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <RNView
                    style={{
                      // flex: 1,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <RNText style={styles.pricingText}>
                      ₹{' '}
                      {formatNumberWithNotation(
                        details?.iwant !== 'Sell' ? details?.rent_amount : details?.property_price
                      )}
                      <RNText style={styles.pricingSubText}>/{details?.rented_time}</RNText>
                    </RNText>
                  </RNView>
                  {details?.negotiable && <RNText style={styles.negotiableText}>Negotiable</RNText>}
                </RNView>
              </RNView>
            )}

            {details?.gallery?.length > 0 && (
              <TouchableOpacity
                style={styles.galleryBtn}
                onPress={() => {
                  navigation.navigate('GALLERY_PREVIEW', {
                    images: imagArr,
                    index: 0,
                  });
                }}>
                <RNText
                  style={{
                    color: ColorTheme.black,
                    fontWeight: '500',
                  }}>
                  {details?.gallery?.length}
                </RNText>
                <Ionicons name="images-outline" size={24} color="black" />
              </TouchableOpacity>
            )}
          </RNView>
        </RNView>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default PropertyImageBackgroundPreview;
