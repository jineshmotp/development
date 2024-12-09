import React, { useEffect, useState } from 'react';
import { Alert, FlatList, PermissionsAndroid, Platform, ScrollView, TouchableOpacity } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useRoute } from '@react-navigation/native';

import BusinessHighlights from '@/components/Business/BusinessHighlights';
import BusinessPdfComponent from '@/components/Business/BusinessPdfComponent';
import Loader from '@/components/common/Loader';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useLazyBusinessListingQuery } from '@/redux/business/businessService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

const BusinessListingDetails = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'BUSINESS_LISTING_DETAILS'>>();
  const toast = useToast();
  const [businessListing] = useLazyBusinessListingQuery();
  const [loader, setLoader] = useState(true);
  const [listingDetails, setListingDetails] = useState({});

  useEffect(() => {
    const renderingData = () => {
      setTimeout(() => {
        setLoader(false);

        businessListing(route?.params?.id)
          .then(res => {
            setListingDetails(res?.data?.data || {});
          })
          .catch(err => {
            toast.show(err?.error?.message || 'An error occurred', {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: 'Error',
              },
              duration: 3000,
            });
          });
      }, 3000);
    };
    renderingData();
  }, [businessListing, route?.params?.id, toast]);

  const backgroundImageUrl =
    listingDetails?.gallery?.[0]?.url || 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg';

  const checkBrochurePermission = async () => {
    if (Platform.OS === 'ios') {
      downloadBrochureImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          downloadBrochureImage();
        } else {
          Alert.alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadBrochureImage = () => {
    const date = new Date();
    let image_URL = listingDetails?.brochure;
    let ext = getBrochureExtention(image_URL);
    ext = '.' + ext[0];
    const { config, fs } = ReactNativeBlobUtil;
    const PictureDir = fs.dirs.PictureDir;
    const index = PictureDir.lastIndexOf('/Android/data');

    // Slice the string to get the desired path
    const newPath = PictureDir.slice(0, index) + '/Pictures';
    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: newPath + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        description: 'Image',
      },
    };
    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        if (res) {
          toast.show('Pricing Downloaded Successfully', {
            type: 'success_toast',
            animationDuration: 100,
            data: {
              title: 'Success :',
            },
            duration: 2000,
          });
        }
      })
      .catch(error => {
        console.log('Error downloading image: ', error);
        Alert.alert('Failed to download Pricing');
      });
  };

  const getBrochureExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const aemnitiesrenderItem = ({ item }) => {
    return (
      <RNView style={styles.amenticeViewStyle}>
        <RNImage
          resizeMode="cover"
          style={styles.amenticeImage}
          source={{ uri: item?.url }} // Correctly reference item.url
        />
      </RNView>
    );
  };

  const formatTime = time => {
    const options = { hour: '2-digit', minute: '2-digit' };
    return new Date(time).toLocaleTimeString([], options);
  };

  const renderTimings = ({ item }) => (
    <RNText style={styles.propertyTextStyle}>
      {formatTime(item.start_time)} to {formatTime(item.close_time)}
    </RNText>
  );

  const renderDaySection = ({ item }) => (
    <RNView style={{ flexDirection: 'row', marginTop: px(10) }}>
      <RNView style={{ flex: 1 }}>
        <RNText style={styles.propertyTextStyle}>{item.day}</RNText>
      </RNView>
      <RNView style={{ flex: 1.5 }}>
        {item.timings.length > 0 ? (
          <FlatList
            data={item.timings}
            renderItem={renderTimings}
            keyExtractor={timing => timing._id}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <RNText style={styles.propertyTextStyle}>Closed</RNText>
        )}
      </RNView>
    </RNView>
  );

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="#F0F0F0">
      <RNView style={{ flex: 1, paddingBottom: px(20) }}>
        {loader && <Loader size={'small'} color={ColorTheme.primary} />}
        <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
          <RNImage style={styles.businessBackgroundImage} source={{ uri: backgroundImageUrl }} />
          <RNView style={styles.initialContainer}>
            <RNText style={styles.nameText}>{listingDetails?.name}</RNText>
            <RNView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <RNText style={styles.categoryText}>{listingDetails?.category}</RNText>
              <TouchableOpacity>
                <RNText style={styles.editText}>Edit Details</RNText>
              </TouchableOpacity>
            </RNView>
          </RNView>
          {listingDetails?.about ? (
            <RNView style={styles.ProjectHeighLightsContainer}>
              <RNText style={styles.descriptionTextStyle}>Description</RNText>
              <RNText style={styles.propertyTextStyle}>{listingDetails?.about}</RNText>
            </RNView>
          ) : null}
          {listingDetails?.brochure ? (
            <RNView style={styles.ProjectHeighLightsContainer}>
              <RNText style={styles.descriptionTextStyle}>Pricing</RNText>
              <BusinessPdfComponent
                onButtonPress={checkBrochurePermission}
                title=""
                source={listingDetails?.brochure}
                downloadText="Download Pricing"
              />
            </RNView>
          ) : null}
          <RNView style={styles.ProjectHeighLightsContainer}>
            <RNText style={[styles.amenitiesText, { fontSize: px(12) }]}>{'Media'}</RNText>
            <FlatList
              data={listingDetails?.gallery || []}
              renderItem={aemnitiesrenderItem}
              keyExtractor={item => item._id} // Use a unique key from the item
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </RNView>
          <RNText style={[styles.idealText, { fontSize: px(12), marginTop: px(20) }]}>{'Location Details'}</RNText>
          <BusinessHighlights details={listingDetails} />
          <RNView style={styles.ProjectHeighLightsContainer}>
            <RNText style={styles.descriptionTextStyle}>Operating Days and Timings</RNText>
            <FlatList
              data={listingDetails?.operation_timings || []}
              renderItem={renderDaySection}
              keyExtractor={item => item._id}
              showsVerticalScrollIndicator={false}
            />
          </RNView>
        </ScrollView>
      </RNView>
    </Container>
  );
};

export default BusinessListingDetails;
