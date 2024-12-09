import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ImageBackground,
  PermissionsAndroid,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { Rating } from 'react-native-ratings';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { format } from 'date-fns';
import moment from 'moment';
import qs from 'qs';

// import RNFetchBlob from 'rn-fetch-blob';
import BusinessHighlights from '@/components/Business/BusinessHighlights';
import BusinessLayoutComponent from '@/components/Business/BusinessLayoutComponent';
import LeadsUserCard from '@/components/Business/LeadsUserCard';
import ProjectDetails from '@/components/Business/ProjectDetails';
import BusinessReview from '@/components/common/BusinessReview';
import GalleryTabView from '@/components/common/GalleryTabView';
import HeaderBar from '@/components/common/HeaderBar';
import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import Loader from '@/components/common/Loader';
import TopTab from '@/components/common/TopTab';
import UserCreatePostUpload from '@/components/common/UserCreatePostUpload';
import UserListCard from '@/components/common/UserListCard';
import UserPostCard from '@/components/common/UserPostCard';
import { isArray } from '@/constants/function/isArray';
import { formatNumberWithNotation } from '@/constants/function/property.helper';
import { isValidURL } from '@/constants/function/property.helperFunctions';
import { UserGalleryTabs } from '@/constants/userprofile';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  useGetBuilderBusinessAlbumDetailsQuery,
  useGetBuilderBusinessImageDetailsQuery,
  useGetBuilderBusinessVideoDetailsQuery,
  useGetBuilderLeadsQuery,
  useLazyGetBuilderLeadsListQuery,
  useLazyGetBuilderPostDetailsQuery,
  useLazyGetBuilderPropertyQuery,
  useLazyGetBuilderViewDetailsQuery,
} from '@/redux/builder/builderService';
import { useLazyBusinessDetailsQuery, useLazyGetBusinessProfileQuery } from '@/redux/business/businessService';
import { getUserData } from '@/redux/login/loginReducer';
import { useLazyChatListQuery } from '@/redux/login/loginService';
import { setLatLongData } from '@/redux/nearu/nearuReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import ActivePropertyList from './ActivePropertyList';
import InActivePropertyList from './InActivePropertyList';
import { styles } from './styles';

type ListItem = {
  name: string;
  isSelect: boolean;
};

const BusinessProfileDescription = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const dispatch = useAppDispatch();

  const route = useRoute<RouteProp<RootStackParamList, 'BUSINESS_PROPERTY_DESCRIPTION'>>();
  // console.log('route ===>', route);

  const [businessProfile] = useLazyGetBusinessProfileQuery();

  const { data: leadsData } = useGetBuilderLeadsQuery({});

  // console.log('leads dataaaaaa ===>', JSON.stringify(leadsData));

  const { data: businessImageData } = useGetBuilderBusinessImageDetailsQuery(route?.params?.profiledata?._id);
  const { data: businessAlbumData } = useGetBuilderBusinessAlbumDetailsQuery(route?.params?.profiledata?._id);
  const { data: businessVideoData } = useGetBuilderBusinessVideoDetailsQuery(route?.params?.profiledata?._id);
  const [userGallery, setUserGallery] = useState(UserGalleryTabs);

  const [leadsListData] = useLazyGetBuilderLeadsListQuery();
  const [changeViewDetails] = useLazyGetBuilderViewDetailsQuery();

  const [businessDetail] = useLazyBusinessDetailsQuery();

  const [businessData, setBusinessData] = useState({});
  const [listingData, setListingData] = useState([]);
  const [businessDetails, setBusinessDetails] = useState({});
  // console.log('listingData ====>', listingData?.length);
  // console.log('businessData ====>', businessData);

  const [inActiveBuilderProp, setInActiveBuilderProp] = useState([]);
  const [activeBuilderProp, setActiveBuilderProp] = useState([]);
  const [activeBuilderPropHorizontal, setActiveBuilderPropHorizontal] = useState([]);

  const [getAllBuilderPropertyMutation, { isLoading }] = useLazyGetBuilderPropertyQuery();

  const [isActive, setIsActive] = useState('Accepted');

  const [getChatList] = useLazyChatListQuery();

  const [chatList, setChatList] = useState([]);

  const [listOfPosts, setListOfPosts] = useState([]);

  // const [propertyFavMutation] = usePropertyFavUnfavMutation();
  // const [deletePostMutation] = useDeletPropertyMutation();

  const [leadsList, setLeadsList] = useState([]);
  const [isIntial, setIsIntial] = useState(false);

  const setAutoLocation = useAppSelector(setLatLongData);

  const [isView, setIsView] = useState(false);

  const [isBuilderActive, setBuilderIsActive] = useState<string>('active');

  const selectedUserData = useAppSelector(getUserData);

  const businessId = route?.params?.profiledata?._id;

  const [text, setText] = useState('');
  const MAX_WORDS = 100;

  const [getBuilderDetailsList] = useLazyGetBuilderPostDetailsQuery();

  const truncateText = text => {
    if (!text) return ''; // Handle case where text is null or undefined

    // Split the text into an array of words
    const words = text.split(' ');

    // Check if the number of words exceeds the limit
    if (words.length > MAX_WORDS) {
      // Slice the array up to the maximum number of words and join back into a string
      return words.slice(0, MAX_WORDS).join(' ') + '...'; // Append '...' to indicate truncation
    }

    // If within limit, return original text
    return text;
  };

  const currentDate = moment().format('YYYY-MM-DD');

  useEffect(() => {
    const renderingData = () => {
      setTimeout(() => {
        

        businessProfile(route?.params?.profiledata?._id)
          .then(res => {
            // console.log('res++++++++++', JSON.stringify(res?.data?.data));
            setBusinessData(res?.data?.data?.business);
            setListingData(res?.data?.data?.listings);
            leadsListApi();
            builderListDetails(res?.data?.data?.business?._id, res?.data?.data?.business?.business_owner);
            setLoader(false)
          })
          .catch(err => {
            toast.show(err?.error?.message, {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: 'Auth message',
              },
              duration: 3000,
            });
          });
      }, 3000);
    };
    renderingData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const renderingData = () => {
        setLoader(false);

        businessProfile(route?.params?.profiledata?._id)
          .then(res => {
            // console.log('res++++++++++', JSON.stringify(res?.data?.data));
            setBusinessData(res?.data?.data?.business);
            setListingData(res?.data?.data?.listings);
            leadsListApi();
            builderListDetails(res?.data?.data?.business?._id, res?.data?.data?.business?.business_owner);
          })
          .catch(err => {
            toast.show(err?.error?.message, {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: 'Auth message',
              },
              duration: 3000,
            });
          });
      };
      renderingData();
      if (isIntial) {
        // console.log('cheking on the comment refreshhhhh', currentDate + ' ,,, ' + businessId);
        builderListDetails(businessData?._id, businessData?.business_owner);
      }
      return () => {
        setIsIntial(true);
      };
    }, [isIntial])
  );

  const builderListDetails = (builderId, userId) => {
    // console.log('cheking businesss dataaa',builderId+' ,, '+userId);

    getBuilderDetailsList(getBuilderPostQuery(1, 10, builderId, userId))
      .then(res => {
        // console.log('cheking on the buildersss',JSON.stringify(res));

        setIsIntial(true);

        if (res?.status === 'fulfilled') {
          setListOfPosts(res?.data?.data);
        } else {
          if (res?.error?.message || res?.data?.message) {
            toast.show(res?.error?.message || res?.data?.message, {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: 'Message',
              },
              duration: 3000,
            });
          }
        }
      })
      .catch(err => {
        console.log('cheking on err', err);
      });
  };

  const getBuilderPostQuery = (pagenumber = 1, pagesize = 10, business_id, user) => {
    const getBuilderPostListPayload = {
      pagenumber: pagenumber.toString(),
      pagesize: pagesize,
      business_id: business_id,
      user: user,
      // business_id: businessId,
    };

    return qs.stringify(getBuilderPostListPayload);
  };
  const leadsListApi = () => {
    // console.log(' payload for leadesssss ------>', getLeadsListData(1, 10, '2024-05-07', currentDate, businessId));
    leadsListData(getLeadsListData(1, 10, '05-07-2024', currentDate, businessId))
      .then(res => {
        // console.log(' response of leads--->', JSON.stringify(res));
        if (res?.status == 'fulfilled') {
          setLeadsList(res?.data);
        } else {
          toast.show(res?.error?.message || res?.data?.message, {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        }
      })
      .catch(error => {
        console.log('errorrrrr======>>>>', error);
      });
  };
  const viewBuilderDetailsApi = property_data => {
    // console.log(' view details item --->', property_data);

    changeViewDetails(viewBuilderDetails(property_data?._id, '', property_data?.property_data?.subscription_id))
      .then(res => {
        // console.log('checking on response of viewDetails', JSON.stringify(res));

        if (res?.status == 'fulfilled') {
          leadsListApi();
        } else {
          toast.show(res?.error?.message || res?.data?.message, {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        }
      })
      .catch(err => {
        console.log('error of view details', err);
      });
  };

  const getLeadsListData = (page = 1, limit = 10, startDate = '05-07-2024', endDate = currentDate, businessId) => {
    const builderLeadsListPayload = {
      pageNumber: page.toString(),
      pageSize: limit.toString(),
      start_date: startDate,
      end_date: currentDate,
      business_id: businessId,
      owner_id: businessId,
    };

    return qs.stringify(builderLeadsListPayload);
  };
  const viewBuilderDetails = (leadId = '', chatId = '', subscriptionId) => {
    const viewBuilderDetailsPayload = {
      lead_id: leadId,
      chatId: chatId,
      subscription_id: subscriptionId,
    };
    return qs.stringify(viewBuilderDetailsPayload);
  };

  useEffect(() => {
    const renderingBusinessDetails = () => {
      businessDetail(route?.params?.profiledata?._id)
        .then(res => {
          // console.log('res++++++++++', res?.data);
          setBusinessDetails(res?.data?.data[0]);
        })
        .catch(err => {
          toast.show(err?.error?.message, {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Auth message',
            },
            duration: 3000,
          });
        });
    };
    renderingBusinessDetails();
  }, []);

  const [listOfData, setListOfData] = useState<ListItem[]>([
    { name: 'About Us', isSelect: true },
    { name: 'Posts', isSelect: false },
    { name: 'Our Properties', isSelect: false },
    { name: 'Gallery', isSelect: false },
    { name: 'Chats', isSelect: false },
    { name: 'Leads', isSelect: false },
    { name: 'Review', isSelect: false },
  ]);

  const propertyFeatures = businessDetails?.propertyFeatures || [];
  // console.log('propertyFeatures =======>', propertyFeatures);

  const aemnitiesrenderItem = ({ item }) => {
    // console.log(
    //   'item =====>',
    //   `https://nearluk-media.s3.ap-south-1.amazonaws.com/amenities-png/${item?.label
    //     .toLowerCase()
    //     .replace(/\s+/g, '_')}.png`
    // );
    return (
      <RNView style={styles.amenticeViewStyle}>
        <RNImage
          resizeMode="cover"
          style={styles.amenticeImage}
          source={{
            uri: `https://nearluk-media.s3.ap-south-1.amazonaws.com/amenities-png/${item?.label
              .toLowerCase()
              .replace(/\s+/g, '_')}.png`,
          }}
        />
        <RNText style={styles.amenticeText}>{item.label}</RNText>
      </RNView>
    );
  };

  const formatDate = dateString => {
    const date = new Date(dateString);
    const formattedDate = format(date, 'MMM dd, yyyy'); // Example format: Jul 24, 2024

    return formattedDate;
  };

  const getAllPropertyResult = data => {
    const params = new URLSearchParams(data).toString();
    const payload = `${route?.params?.profiledata?._id}?${params}`;

    getAllBuilderPropertyMutation(payload).then(response => {
      // console.log('response for business builder listing---> ', response?.data);

      // console.log('dsbhjbdsjvbjdsb+++', response?.data?.data);
      if (response?.status) {
        if (response?.data?.length) {
          if (isBuilderActive === 'active') {
            setActiveBuilderProp(prev => prev.concat(response?.data?.data));
          } else {
            setInActiveBuilderProp(prev => prev.concat(response?.data?.data));
          }
        } else {
          if (isBuilderActive === 'active') {
            setActiveBuilderProp(prev => prev.concat(response?.data?.data));
          } else {
            setInActiveBuilderProp(prev => prev.concat(response?.data?.data));
          }
        }
      } else {
        // console.log('first+++++++++');

        if (response?.status === false) {
          if (data?.page_number == 1) {
            if (selectedUserData?._id) onRefreshfn();
          } else {
            if (isBuilderActive === 'active') {
              setActiveBuilderProp(activeBuilderProp);
            } else {
              setInActiveBuilderProp(inActiveBuilderProp);
            }
          }
        }
      }
    });
  };

  const onRefreshfn = () => {
    getAllPropertyResult({
      sortBy: -1,
      is_active: isBuilderActive === 'active' ? true : false,
      page_size: '10',
      page_number: '1',
    });
  };

  const chatNavigation = item => {
    let conectuser = item?.user_data;

    const concatenatedData: Data = {
      ...item,
      connectedUsers: { ...conectuser },
    };

    // console.log(' item val---->', concatenatedData);

    navigation.navigate('CHATBOX', {
      item: concatenatedData,
      iam: route?.params?.profiledata?._id,
      businessProfile: true,
    });
  };
  // useEffect(() => {
  //   if (businessData?._id) builderListDetails(businessData?._id, businessData?.business_owner);
  // }, [businessData?._id]);

  useEffect(() => {
    if (text) {
      const activeList = activeBuilderProp.filter(ele => {
        const searchFields = `{${ele?.property?.property_name} ${ele?.property?.property_price} ${ele?.property?.property_type} ${ele?.property?.locality} ${ele?.property?.property_area} ${ele?.property?.property_area}}`;
        // console.log('searchFields', searchFields, searchFields?.includes(text));
        return searchFields?.toLocaleLowerCase()?.includes(text);
      });
      setActiveBuilderProp(activeList);
      const inActiveList = inActiveBuilderProp.filter(ele => {
        const searchFields = `{${ele?.property?.property_name} ${ele?.property?.property_price} ${ele?.property?.property_type} ${ele?.property?.locality} ${ele?.property?.property_area} ${ele?.property?.property_area}}`;
        // console.log('searchFields', searchFields, searchFields?.includes(text));
        return searchFields?.toLocaleLowerCase()?.includes(text);
      });
      setInActiveBuilderProp(inActiveList);
    } else {
      onRefreshfn();
    }
  }, [text]);

  useEffect(() => {
    // console.log('business idssss---->', route?.params?.profiledata?._id);

    getChatList('id=' + route?.params?.profiledata?._id + '&status=' + isActive).then((resp: any) => {
      if (resp?.data?.status) {
        setChatList(resp?.data?.data);
        // console.log(' chatlist --->', resp?.data?.data);
      } else {
        toast.show(resp?.error?.message || resp?.data?.message, {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Error Message',
          },
          duration: 3000,
        });
      }
    });
  }, [isActive]);

  const handleNavigationCheck = () => {
    if (businessData?.category === 'Real Estate Project') {
      // dispatch(clearPropertyLocationData());

      navigation.navigate('BUILDER_POST_PROPERTY', {
        businessdata: route?.params?.profiledata,
      });
    } else if (businessData?.category === 'Event Space') {
      // dispatch(clearPropertyLocationData());

      navigation.navigate('EVENT_SPACE_STEPONE', {
        businessdata: businessData,
      });
    } else if (businessData?.category === 'Exclusive Services') {
      // dispatch(clearPropertyLocationData());

      navigation.navigate('EXCLUSIVE_SERVICES_STEP_ONE', {
        businessdata: businessData,
      });
    } else {
      console.log('Navigation Secion for other screens', businessData?.category);
    }
  };

  const checkPermission = async () => {
    if (Platform.OS === 'ios') {
      downloadImage();
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Storage Permission Granted.');
          downloadImage();
        } else {
          Alert.alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const downloadImage = () => {
    const date = new Date();
    let image_URL = businessData?.master_plan;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const { config, fs } = ReactNativeBlobUtil;
    const PictureDir = fs.dirs.PictureDir;

    const index = PictureDir.lastIndexOf('/Android/data');

    // Slice the string to get the desired path
    const newPath = PictureDir.slice(0, index) + '/Pictures';

    // console.log('PictureDir ====>', newPath);

    const options = {
      fileCache: true,
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path: newPath + '/image_' + Math.floor(date.getTime() + date.getSeconds() / 2) + ext,
        description: 'Image',
      },
    };
    // console.log('options =====>', options);

    config(options)
      .fetch('GET', image_URL)
      .then(res => {
        // console.log('res -> ', JSON.stringify(res));
        // Alert.alert('Project Layout Downloaded Successfully');
        if (res) {
          toast.show('Project Layout Downloaded Successfully', {
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
        Alert.alert('Failed to download Project Layout');
      });
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

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
          // console.log('Storage Permission Granted.');
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
    let image_URL = businessData?.project_brochure;
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
        // console.log('res -> ', JSON.stringify(res));
        // Alert.alert('Project Layout Downloaded Successfully');
        if (res) {
          toast.show('Project Layout Downloaded Successfully', {
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
        Alert.alert('Failed to download Project Layout');
      });
  };

  const getBrochureExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const renderItems = ({ item }) => (
    <RNView style={styles.itemContainer}>
      <RNView style={{ flexDirection: 'row', alignItems: 'center' }}>
        <RNImage
          resizeMode="contain"
          source={require('@/assets/images/business/types.png')}
          style={styles.typesImage}></RNImage>
        <RNText style={styles.subText}>{item}</RNText>
      </RNView>
    </RNView>
  );

  const renderItem = ({ item, index }) => {
    return (
      <TouchableOpacity key={index} onPress={() => handleSelection(index)} style={{ height: px(40) }}>
        <RNView>
          <RNText style={styles.itemStyle}>{item?.name}</RNText>
          <RNView style={item?.isSelect ? styles.underlineViewStyle : styles.nonUnderlineViewStyle}></RNView>
        </RNView>
      </TouchableOpacity>
    );
  };
  const flatDetailsItem = ({ item }) => {
    // console.log(' item values--------->', item);

    return (
      <TouchableOpacity
        onPress={() => {
          // console.log('cheking with property details', JSON.stringify(item));
          navigation.navigate('BUILDER_PROPERTY_DETAILS', {
            id: item?._id,
            businessId: item?.property?.business_id,
          });
        }}>
        <RNView style={styles.propertyDetailsStyle}>
          <ImageBackground
            source={{
              uri: isValidURL(item?.property?.gallery[0]?.url)
                ? item?.property?.gallery[0]?.url
                : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png',
            }}
            style={styles.imageBackgroundStyle}>
            <RNView>
              <RNView style={styles.propertyCard}>
                <RNText style={styles.PropertyLabel}>{item?.property?.property_name}</RNText>

                <RNView style={styles.propertyCardStyle}>
                  <RNView style={styles.viewMargin}>
                    <RNText style={styles.PropertyLabelStyle}>
                      {item?.property?.property_type === 'Residential'
                        ? item?.property?.bhk
                        : item?.property?.property_type}
                    </RNText>
                    <RNText style={styles.propertyText}>
                      {item?.property?.iwant === 'Sell'
                        ? `${item?.property?.property_area} sqft`
                        : `${item?.property?.no_of_units} No.of Units`}
                    </RNText>
                  </RNView>

                  <RNView style={styles.viewMargin}>
                    <RNText style={styles.PropertyBlue}>
                      {item?.property?.iwant === 'Sell'
                        ? `${formatNumberWithNotation(item?.property?.property_price)}-${formatNumberWithNotation(item?.property?.property_price_max)}`
                        : formatNumberWithNotation(item?.property?.rent_amount)}
                    </RNText>
                    <RNText style={styles.propertyText}>Onwards</RNText>
                  </RNView>
                </RNView>
              </RNView>

              <RNView style={styles.propertyViewStyle}>
                <RNView style={styles.forSaleStyle}>
                  <RNText style={styles.whiteTextStyle}>{`For ${item?.property?.iwant}`}</RNText>
                </RNView>
                <RNView>
                  <TouchableOpacity
                    style={styles.arrowContainer}
                    onPress={() => {
                      // console.log('cheking with property details', JSON.stringify(item));
                      // navigation.navigate('BUILDER_PROPERTY_DETAILS', {
                      //   id: item?._id,
                      //   businessId: item?.property?.business_id,
                      // });
                    }}>
                    <AntDesign name="arrowright" size={15} color="black" />
                  </TouchableOpacity>
                </RNView>
              </RNView>
            </RNView>
          </ImageBackground>
        </RNView>
      </TouchableOpacity>
    );
  };

  const listingDetailsItem = ({ item }) => {
    // console.log(' item values--------->', item);

    return (
      <TouchableOpacity

      onPress={() => {
        // console.log('cheking with property details', JSON.stringify(item));
        navigation.navigate('BUSINESS_LISTING_DETAILS', {
          id: item?._id,    
        });
      }}

      >
        <RNView style={styles.propertyDetailsStyle}>
          <ImageBackground
            source={{
              uri: isValidURL(item?.gallery[0]?.url)
                ? item?.gallery[0]?.url
                : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png',
            }}
            style={styles.imageBackgroundStyle}>
            <RNView>
              <RNView style={styles.propertyCard}>
                <RNText style={styles.PropertyLabel}>{item?.name}</RNText>

                <RNText style={styles.PropertyLabel}>{item?.sub_category}</RNText>
              </RNView>

              <RNView style={styles.propertyViewStyle}>
                <RNView style={styles.forSaleStyle}>
                  {/* <RNText style={styles.whiteTextStyle}>{`For ${item?.property?.iwant}`}</RNText> */}
                </RNView>
                <RNView>
                  <TouchableOpacity
                    style={styles.arrowlistingContainer}
                    onPress={() => {
                      // console.log('cheking with property details', JSON.stringify(item));
                      // navigation.navigate('BUILDER_PROPERTY_DETAILS', {
                      //   id: item?._id,
                      //   businessId: item?.property?.business_id,
                      // });
                    }}>
                    <AntDesign name="arrowright" size={15} color="black" />
                  </TouchableOpacity>
                </RNView>
              </RNView>
            </RNView>
          </ImageBackground>
        </RNView>
      </TouchableOpacity>
    );
  };

  const handleSelection = index => {
    setListOfData(prevList =>
      prevList.map((item, idx) => ({
        ...item,
        isSelect: idx === index,
      }))
    );
  };

  const getSelectedView = () => {
    const selectedItem = listOfData.find(item => item.isSelect);
    if (selectedItem) {
      switch (selectedItem?.name) {
        case 'About Us':
          return (
            <RNView>
              {businessData?.category === 'Real Estate Project' ? (
                <>
                  <RNView
                    style={[styles.builderContainer, !businessData?.project_date && styles.builderContainerNoDate]}>
                    <RNView style={styles.areaContainer}>
                      <RNText style={styles.areaText}>Project Area</RNText>
                      <RNText style={styles.valueText}>
                        {`${businessData?.project_area} ${businessData?.project_area_units}`}
                      </RNText>
                    </RNView>
                    <RNView style={styles.areaContainer}>
                      <RNText style={styles.areaText}>Project Status</RNText>
                      <RNText style={styles.valueText}>
                        {businessData?.project_status === 'newLaunching'
                          ? 'New Launching'
                          : businessData?.project_status === 'upcoming'
                            ? 'Under Construction'
                            : businessData?.project_status}
                      </RNText>
                    </RNView>
                    {businessData?.project_date && (
                      <RNView style={styles.areaContainer}>
                        <RNText style={styles.areaText}>Possession Date</RNText>
                        <RNText style={styles.valueText}>{formatDate(businessData?.project_date)}</RNText>
                      </RNView>
                    )}
                  </RNView>
                </>
              ) : (
                <>
                  <RNView style={styles.businessCardContainer}>
                    <RNView style={styles.rowContainer}>
                      <RNText style={styles.headText}>Location</RNText>
                      <RNView style={{ paddingRight: px(10) }}>
                        <RNText numberOfLines={2} style={styles.localityText}>
                          {/* {businessData?.city}, {businessData?.state} */}
                          {businessData?.locality}
                        </RNText>
                      </RNView>
                    </RNView>
                    <RNView style={styles.rowContainer}>
                      <RNText style={styles.headText}>Category</RNText>
                      <RNText style={styles.numberText}>{businessData?.category}</RNText>
                    </RNView>
                    <RNView style={styles.rowContainer}>
                      <RNText style={styles.headText}>Business Types</RNText>
                    </RNView>
                    <RNView style={styles.rowView}>
                      {/* <RNText style={styles.numberText}>{businessData?.category}</RNText>

                      <RNText style={styles.numberText}>{businessData?.category}</RNText> */}

                      <FlatList
                        data={businessData?.sub_category}
                        renderItem={renderItems}
                        keyExtractor={(item, index) => index.toString()}
                        numColumns={2}
                        columnWrapperStyle={styles.row}
                      />
                    </RNView>
                  </RNView>
                </>
              )}
              {businessData?.cin_no ? (
                <>
                  <RNView style={styles.cinContainer}>
                    <RNView style={styles.cinSubContainer}>
                      <RNText style={styles.cinText}>CIN Number :</RNText>
                    </RNView>
                    <RNView style={styles.cinNumContainer}>
                      <RNText style={styles.numberText}>{businessData?.cin_no}</RNText>
                    </RNView>
                  </RNView>
                </>
              ) : null}
              {businessData?.rera_number ? (
                <>
                  <RNView style={styles.cinContainer}>
                    <RNView style={styles.cinSubContainer}>
                      <RNText style={styles.cinText}>RERA ID :</RNText>
                    </RNView>
                    <RNView style={styles.cinNumContainer}>
                      <RNText style={styles.numberText}>{businessData?.rera_number}</RNText>
                    </RNView>
                  </RNView>
                </>
              ) : null}
              {businessData?.dtcp_number ? (
                <>
                  <RNView style={styles.cinContainer}>
                    <RNView style={styles.cinSubContainer}>
                      <RNText style={styles.cinText}>DTCP ID :</RNText>
                    </RNView>
                    <RNView style={styles.cinNumContainer}>
                      <RNText style={styles.numberText}>{businessData?.dtcp_number}</RNText>
                    </RNView>
                  </RNView>
                </>
              ) : null}

              {businessData?.category === 'Real Estate Project' ? (
                <>
                  <RNView style={styles.ProjectHeighLightsContainer}>
                    <RNView style={styles.buildingContainer}>
                      <RNImage
                        resizeMode="stretch"
                        source={require('@/assets/images/business/buildings.png')}
                        style={styles.propertyImageStyle}></RNImage>
                    </RNView>
                    {businessData?.project_highlights ? (
                      <>
                        <RNText style={styles.descriptionTextStyle}>Project Highlights</RNText>
                        <RNView style={styles.propertyListStyle}>
                          <RNText style={styles.propertyTextStyle}>
                            {truncateText(businessData.project_highlights)}
                          </RNText>
                        </RNView>
                      </>
                    ) : null}

                    {businessData?.category === 'Real Estate Project' && businessDetails != undefined ? (
                      <>
                        <RNText style={styles.descriptionTextStyle}>{'Project Details '}</RNText>
                        <RNView style={styles.projectDetailsContainer}>
                          <ProjectDetails
                            tintColor="#FF9548"
                            imagePath={require('@/assets/images/business/location_green.png')}
                            lable="Area"
                            propertyValue={`${businessDetails?.projectArea} ${businessDetails?.projectAreaUnits}`}
                          />
                          <ProjectDetails
                            imagePath={require('@/assets/images/business/units.png')}
                            lable="Units"
                            propertyValue={businessDetails?.totalUnits}
                          />
                        </RNView>
                        <RNView style={styles.projectDetailsContainer}>
                          <ProjectDetails
                            tintColor="#3DC6F2"
                            imagePath={require('@/assets/images/business/floors.png')}
                            lable="Floors"
                            propertyValue={businessDetails?.totalFloors}
                          />
                          <ProjectDetails
                            tintColor="#989201"
                            imagePath={require('@/assets/images/business/bhk.png')}
                            lable="BHK"
                            propertyValue={businessDetails?.bhkValues}
                          />
                        </RNView>
                        <RNView style={styles.projectDetailsContainer}>
                          <ProjectDetails
                            tintColor="#E22C2C"
                            imagePath={require('@/assets/images/business/price.png')}
                            lable="price per Sqft"
                            propertyValue={`₹ ${businessDetails?.minPricePerUnit} - ${businessDetails?.maxPricePerUnit}`}
                          />
                          <RNView style={styles.viewStyle} />
                        </RNView>
                      </>
                    ) : null}
                  </RNView>
                </>
              ) : (
                <>
                  <RNView style={styles.ProjectHeighLightsContainer}>
                    <RNText style={styles.descriptionTextStyle}>Description</RNText>

                    {businessData?.project_description ? (
                      <>
                        <RNText style={styles.propertyTextStyle}>{businessData?.project_description}</RNText>
                      </>
                    ) : null}

                    {businessData?.intro ? (
                      <>
                        <RNText style={styles.propertyTextStyle}>{businessData?.intro}</RNText>
                      </>
                    ) : null}
                  </RNView>
                </>
              )}

              {activeBuilderProp.length > 0 ? (
                <>
                  <RNText style={[styles.idealText, { fontSize: px(12) }]}>{'Find Your Ideal Home Here : '}</RNText>
                  <RNView style={styles.viewMargin}>
                    <FlatList
                      data={activeBuilderProp}
                      horizontal
                      renderItem={flatDetailsItem}
                      // renderItem={({ item }) => <flatDetailsItem item={item} />}
                      keyExtractor={item => item?._id}
                    />
                  </RNView>
                </>
              ) : null}

              {listingData?.length > 0 ? (
                <>
                  <RNText style={[styles.idealText, { fontSize: px(12) }]}> Our {listingData[0]?.category}</RNText>
                  <RNView style={styles.viewMargin}>
                    <FlatList
                      data={listingData}
                      horizontal
                      renderItem={listingDetailsItem}
                      // renderItem={({ item }) => <flatDetailsItem item={item} />}
                      keyExtractor={item => item?._id}
                    />
                  </RNView>
                </>
              ) : null}

              <RNText style={[styles.idealText, { fontSize: px(12) }]}>{'Location Details : '}</RNText>
              <RNText style={styles.locationText}>{businessData?.locality}</RNText>

              <BusinessHighlights details={businessData} />
              <RNView style={styles.flatPropertyStyle}>
                {businessData?.category === 'Real Estate Project' && businessDetails != undefined ? (
                  <>
                    <RNView style={styles.scrollContainer}>
                      <RNText style={[styles.amenitiesText, { fontSize: px(12) }]}>{'Amenities we provide : '}</RNText>
                      <FlatList
                        data={propertyFeatures}
                        renderItem={aemnitiesrenderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: px(10) }}
                      />
                    </RNView>
                  </>
                ) : null}

                <RNView
                  style={[
                    styles.layoutView,
                    businessData?.master_plan && businessData?.project_brochure && styles.layoutViewSpaceAround,
                  ]}>
                  {businessData?.master_plan ? (
                    <>
                      <BusinessLayoutComponent
                        onButtonPress={checkPermission}
                        title="Project Layout : "
                        source={businessData?.master_plan}
                        downloadText="Download Layout"
                      />
                    </>
                  ) : null}

                  {businessData?.project_brochure ? (
                    <>
                      <BusinessLayoutComponent
                        onButtonPress={checkBrochurePermission}
                        title=" Project Brochure : "
                        source={businessData?.project_brochure}
                        downloadText="Download Brochure"
                      />
                    </>
                  ) : null}
                </RNView>
              </RNView>
            </RNView>
          );

        case 'Posts':
          return (
            <RNView>
              <LinearGradient colors={['#C9FCFF', 'rgba(255, 255, 255, 1)']} style={styles.lastGradientView}>
                <UserCreatePostUpload isFromBuilder={true} userProfile={false} businessData={businessData} />
              </LinearGradient>
              <FlatList
                scrollEnabled={false}
                data={listOfPosts}
                extraData={listOfPosts}
                showsVerticalScrollIndicator={false}
                initialNumToRender={10}
                contentContainerStyle={{
                  paddingBottom: 30,
                }}
                renderItem={({ item, index }) => {
                  return (
                    <RNView>
                      <UserPostCard
                        isFromBuilder={true}
                        isFromHomeBusiness={false}
                        key={index}
                        data={item}
                        srNumber={index}
                        onPress={() => {
                          //handleUserPostNavigation(item)
                        }}
                        onPressComment={() => {
                          navigation.navigate('USER_POST_COMMENTS', {
                            isFromBuilder: true,
                            isFromHomeBusiness: false,
                            key: index,
                            data: item,
                            srNumber: index,
                          });
                        }}
                      />
                    </RNView>
                  );
                }}
              />
            </RNView>
          );

        case 'Our Properties':
          return (
            <RNView>
              <TopTab
                onPressLeft={() => setBuilderIsActive('active')}
                onPressRight={() => setBuilderIsActive('pending')}
                leftTabStyle={{ borderBottomColor: isBuilderActive === 'active' ? ColorTheme.primary : 'white' }}
                rightTabStyle={{ borderBottomColor: isBuilderActive === 'pending' ? ColorTheme.primary : 'white' }}
                leftTabText="Active Property"
                rightTabText="Inactive Property"
              />
              <RNView style={{ width: deviceWidth, alignItems: 'center' }}>
                <CommonInput
                  maxLength={300}
                  multiline
                  contentStyle={{ textTransform: 'lowercase', paddingTop: px(10) }}
                  style={styles.inputStyle}
                  numberOfLines={5}
                  value={text}
                  onChangeText={setText}
                  label="Search Property"
                />
              </RNView>
              <RNView style={{ width: deviceWidth, alignItems: 'center', paddingTop: px(20) }}>
                {isBuilderActive === 'active' ? (
                  <ActivePropertyList
                    userId={selectedUserData?._id}
                    text={text}
                    businessId={route?.params?.profiledata?._id}
                  />
                ) : (
                  <InActivePropertyList
                    userId={selectedUserData?._id}
                    text={text}
                    businessId={route?.params?.profiledata?._id}
                  />
                )}
              </RNView>
            </RNView>
          );

        case 'Chats':
          return (
            <RNView>
              {isActive === 'Accepted' ? (
                <ScrollView>
                  <RNView style={styles.topView}>
                    {isArray(chatList) && chatList?.filter(item => item?.isAccepted === true)?.length > 0 ? (
                      chatList
                        ?.filter(item => item?.isAccepted === true && item.connectedUsers !== null)
                        ?.map((item, i) => {
                          // console.log('item+++++++++', item);
                          return (
                            <UserListCard
                              activeChat={true}
                              item={item}
                              key={i}
                              onPress={() => {
                                navigation.navigate('CHATBOX', {
                                  item: item,
                                  iam: route?.params?.profiledata?._id,
                                  businessProfile: true,
                                });
                              }}
                            />
                          );
                        })
                    ) : (
                      <ListEmptyComponent text={'No Active Chats Available'} type="default" />
                    )}
                  </RNView>
                </ScrollView>
              ) : (
                <RNView style={styles.topView}>
                  {isArray(chatList) && chatList?.filter(item => item?.isAccepted !== true).length > 0 ? (
                    chatList
                      ?.filter(item => item?.isAccepted !== true)
                      ?.map((item, i) => {
                        return (
                          <UserListCard
                            activeChat={false}
                            item={item}
                            key={i}
                            onPress={() => {
                              navigation.navigate('CHATBOX', {
                                item: item,
                                iam: route?.params?.profiledata?._id,
                                businessProfile: true,
                              });
                            }}
                          />
                        );
                      })
                  ) : (
                    <ListEmptyComponent text={'No Pending Chats Available'} type="default" />
                  )}
                </RNView>
              )}
            </RNView>
          );

        case 'Leads':
          return (
            <RNView>
              <RNView style={styles.leadsContainer}>
                <FlatList
                  style={{ marginHorizontal: px(10) }}
                  data={leadsData?.data}
                  renderItem={({ item }) => {
                    return (
                      <RNView style={[styles.leadsViewStyle, { justifyContent: 'space-between' }]}>
                        <RNText style={styles.totalLeadsLabelStyle}>{item?.subscription_type}</RNText>
                        <RNView style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                          <RNView>
                            <RNText style={styles.totalLeadsTextStyle}>Total no. of leads </RNText>
                            <RNText style={styles.totalLeadsLabelStyle}>{item?.totalLeads}</RNText>
                          </RNView>
                          <RNView>
                            <RNText style={styles.totalLeadsTextStyle}>Remaining leads </RNText>
                            <RNText style={styles.totalLeadsLabelStyle}>{item?.availableLeads}</RNText>
                          </RNView>
                        </RNView>
                      </RNView>
                    );
                  }}
                />
                {/* <RNView style={styles.leadsViewStyle}>
                  <RNText style={styles.totalLeadsTextStyle}>Total no. of leads </RNText>
                  <RNText style={styles.totalLeadsLabelStyle}>{leadsData?.data?.totalLeads}</RNText>
                </RNView>
                <RNView style={[styles.leadsViewStyle, { backgroundColor: ColorTheme.onboardingButton }]}>
                  <RNText style={styles.totalLeadsTextStyle}>Remaining leads </RNText>
                  <RNText style={styles.totalLeadsLabelStyle}>{leadsData?.data?.availableLeads}</RNText>
                </RNView> */}
                <RNView></RNView>
              </RNView>
              <FlatList
                scrollEnabled={false}
                data={leadsList}
                renderItem={({ item, index }) => {
                  return (
                    <LeadsUserCard
                      data={item}
                      chatNavigation={chatNavigation}
                      onViewClick={() => {
                        viewBuilderDetailsApi(item);
                      }}
                    />
                  );
                }}
              />
            </RNView>
          );

        case 'Gallery':
          return (
            <GalleryTabView
              userGallery={userGallery}
              setUserGallery={setUserGallery}
              userData={{
                gallery: businessImageData?.data,
                uservideo: businessVideoData?.data,
                useralbum: businessAlbumData,
              }}
            />
          );
        case 'Review':
          return <BusinessReview data={businessData} />;
        // case 'Subscription':
        //   return (
        //     <RNView style={{ backgroundColor: 'white', alignItems: 'center', marginBottom: px(5) }}>
        //       <ActivePlans />
        //     </RNView>
        //   );

        default:
          return (
            <RNView style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <RNText>No Details</RNText>
            </RNView>
          );
      }
    }
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="#F0F0F0">
      {loader && <Loader size={'small'} color={ColorTheme.primary} />}
      <HeaderBar
        label="Business Profile"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => navigation.goBack()}
      />
      <ScrollView showsVerticalScrollIndicator={false} nestedScrollEnabled={true}>
        <RNView style={styles.businessView}>
          <RNImage
            style={styles.businessBackgroundImage}
            source={
              businessData?.cover_pic
                ? { uri: businessData?.cover_pic } // Use the cover_pic URL if available
                : {
                    uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                  }
            }></RNImage>

          <RNView style={styles.topProfileView}>
            <RNView style={styles.userProfile}>
              {businessData?.profile_pic ? (
                <RNImage
                  style={styles.profileImg}
                  source={
                    { uri: businessData.profile_pic } // Use the cover_pic URL if available
                  }
                />
              ) : (
                <RNView style={styles.defaultProfile}>
                  <RNText style={styles.ownerText}>{businessData?.business_name?.slice(0, 1).toUpperCase()}</RNText>
                </RNView>
              )}

              {/* <TouchableOpacity style={styles.profileCamera}>
                  <Entypo name="camera" size={15} color="black" />
                </TouchableOpacity> */}
            </RNView>
            <RNView style={styles.businessNameStyle}>
              <RNView style={{ flexDirection: 'row' }}>
                <RNText style={styles.nameTextStyle}>{businessData?.business_name}</RNText>
                {/* <TouchableOpacity style={{marginTop: px(20),marginHorizontal:px(5)}}>
              </TouchableOpacity> */}
              </RNView>
              <Rating
                tintColor="#F0F0F0"
                startingValue={businessData?.averageRating}
                ratingCount={5}
                imageSize={20}
                readonly={true}
                style={styles.ratingStyle}
              />

              <RNView style={styles.businessNameContainer}>
                <RNText style={styles.followersTextStyle}>{`${businessData?.followers} Followers`}</RNText>
                {/* <RNText style={styles.followTextStyle}>{'Follow'}</RNText> */}
              </RNView>
            </RNView>
          </RNView>

          <RNView style={styles.belowContainer}>
            {businessData?.intro && businessData?.category === 'Real Estate Project' ? (
              <>
                <RNText style={styles.businessDescriptionStyle}>{businessData?.intro}</RNText>
              </>
            ) : null}
            {businessData?.project_description && businessData?.category === 'Real Estate Project' ? (
              <>
                <RNText style={styles.businessDescriptionStyle}>{businessData?.project_description}</RNText>
              </>
            ) : null}
          </RNView>
          {setAutoLocation.lat ? (
            <RNView style={styles.buttonsContainer}>
              <CommonButton
                onPress={handleNavigationCheck}
                style={[styles.buttonStyle, { backgroundColor: ColorTheme.onboardingButton }]}
                textStyle={styles.businessDescriptionStyle}
                title={`List ${businessData?.category}`}
              />
              <CommonButton
                onPress={() => {
                  navigation.navigate('BUSINESS_EDIT_DESCRIPTION', {
                    descriptionData: businessData,
                  });
                }}
                textStyle={styles.businessDescriptionStyle}
                style={styles.buttonStyle}
                title="Edit Profile"
              />
            </RNView>
          ) : (
            <ActivityIndicator />
          )}

          {/* {setAutoLocation.lat ? (
            <RNView style={styles.buttonViewStyle}>
              <CommonButton
                onPress={handleNavigationCheck}
                style={styles.propertyButtonStyle}
                textStyle={styles.businessDescriptionStyle}
                title={`List ${businessData?.category}`}></CommonButton>
            </RNView>
          ) : (
            <ActivityIndicator />
          )} */}

          <RNView style={styles.listViewContainer}>
            <FlatList data={listOfData} horizontal showsHorizontalScrollIndicator={false} renderItem={renderItem} />
          </RNView>

          <RNView>{getSelectedView()}</RNView>
        </RNView>
      </ScrollView>
    </Container>
  );
};

export default BusinessProfileDescription;
