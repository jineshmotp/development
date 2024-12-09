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
  handleUnFavourite?: () => void;
  favValue?: boolean;
};

const BuilderPropertyImageBackground: React.FC<PropertyAreaProps> = ({
  details,
  goBack,
  url,
  index,
  category,
  handleUnFavourite,
  favValue,
}) => {
  const userId = useAppSelector(getUserData)?._id;
  const selectedUserData = useAppSelector(getUserData);
  const navigation = useNavigation();
  const [imagArr, setImgArr] = useState([]);
  const [ShareCount, setShareCount] = useState(details?.shareCount ? details?.shareCount : 0);
  const totalImages = () => {
    const imageArr = details?.gallery?.map(ele => {
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

  const handleSharedPostCount = async (id: string) => {
    const payload = {
      user: selectedUserData?._id,
      post_id: id,
    };
    updateShareCount(payload).then(response => {
      if (response?.data?.status) {
        setShareCount(Number(ShareCount) + 1);
      } else {
        toast.show('Something went wrong', {
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

  const onShare = async () => {
    const shareUrl = baseURL.includes('devapi') ? 'https://dev.nearluk.com' : 'https://nearluk.com';
    try {
      const result = await Share.share({
        url: `${shareUrl}/propertydetail/${details?._id}`,
        message: `${shareUrl}/propertydetail/${details?._id}`,
        // title: "this is nearluk app",
      });
      if (result?.action === 'sharedAction') {
        // shared
        handleSharedPostCount(details?._id);
      } else if (result?.action === 'dismissedAction') {
        // console.log('Share.dismissedAction', result.action);
        // dismissed
      }
    } catch (error: any) {
      toast.show(error.message || 'Something went wrong', {
        type: 'error_toast',
        animationDuration: 100,
        data: {
          title: 'Message',
        },
        duration: 3000,
      });
    }
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
            : details?.owned_by === userId
              ? ['https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png']
              : ['https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png'],
          index: index,
          hasHeader: true,
        });
      }}>
      <ImageBackground
        resizeMethod="auto"
        resizeMode="stretch"
        style={styles.imageBackgroundStyle}
        source={{
          uri: isValidURL(url)
            ? url
            : details?.owned_by === userId
              ? 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png'
              : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png',
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

            <RNView style={styles.navRight}>
              <TouchableOpacity onPress={() => onShare()} style={styles.shareButton}>
                <Ionicons name="share-social-outline" size={px(25)} color={ColorTheme.black} />
              </TouchableOpacity>

              <TouchableOpacity onPress={handleUnFavourite} style={styles.shareButton}>
                {favValue ? (
                  <AntDesign name="heart" size={24} color={ColorTheme.primary} />
                ) : (
                  <AntDesign name="hearto" size={24} color={ColorTheme.primary} />
                )}
              </TouchableOpacity>
            </RNView>
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
                    {details?.iwant === 'Sell' ? (
                      <RNText style={styles.pricingText}>
                        ₹ {formatNumberWithNotation(details?.property_price)}-
                        {formatNumberWithNotation(details?.property_price_max)}
                      </RNText>
                    ) : (
                      <RNText style={styles.pricingText}>
                        ₹ {formatNumberWithNotation(details?.rent_amount)}
                        <RNText style={styles.pricingSubText}>/{details?.rented_time}</RNText>
                      </RNText>
                    )}
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
                    hasHeader: true,
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

export default BuilderPropertyImageBackground;
