import React, { useEffect, useRef, useState } from 'react';
import { Alert, ImageBackground, KeyboardAvoidingView, PermissionsAndroid, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useSelector } from 'react-redux';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';
import qs from 'qs';

import BuilderPropertyList from '@/components/common/BuilderPropertyList';
import DefaultProfile from '@/components/common/DefaultProfile';
import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import Divider from '@/components/common/Divider';
import GalleryTabView from '@/components/common/GalleryTabView';
import HeaderBar from '@/components/common/HeaderBar';
import Loader from '@/components/common/Loader';
import ProfilePropertyList from '@/components/common/ProfilePropertyList';
import UserCreatePostUpload from '@/components/common/UserCreatePostUpload';
import UserPostCard from '@/components/common/UserPostCard';
import PropertyCategoryChips from '@/components/userprofile/PropertyCategoryChips';
import { UserMenuPostTabComponent } from '@/components/userprofile/UserMenuPostTabComponent';
import UserProfileAboutTab from '@/components/userprofile/UserProfileAboutTab';
import { activateItemByKey, isValidURL } from '@/constants/function/property.helperFunctions';
import { OtherBusinessMenuTabs, OtherUserMenuTabs, UserGalleryTabs, UserTabs } from '@/constants/userprofile';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import {
  useGetBuilderBusinessAlbumDetailsQuery,
  useGetBuilderBusinessImageDetailsQuery,
  useGetBuilderBusinessVideoDetailsQuery,
  useGetBuilderLeadsQuery,
  useLazyGetBuilderPostDetailsQuery,
  useLazyGetBuilderPropertyQuery,
} from '@/redux/builder/builderService';
import { useLazyBusinessDetailsQuery, useLazyGetBusinessProfileQuery, useLazyOnUnFollowBusinessQuery, useOnFllowBusinessMutation } from '@/redux/business/businessService';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useGetUserAlbumsQuery,
  useGetUserDetailByIdQuery,
  useGetUserImagesQuery,
  useGetUserVideosQuery,
  useLazyGetUserPostsQuery,
} from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

import { styles } from './styles';
import BusinessReview from '@/components/common/BusinessReview';
import { Rating } from 'react-native-ratings';
import { format } from 'date-fns';
import BusinessHighlights from '@/components/Business/BusinessHighlights';
import BusinessLayoutComponent from '@/components/Business/BusinessLayoutComponent';
import ProjectDetails from '@/components/Business/ProjectDetails';
import ReactNativeBlobUtil from 'react-native-blob-util';
import { formatNumberWithNotation } from '@/constants/function/property.helper';

const BusinessPropertyDescriptionOtherUser = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const [loader, setLoader] = useState(true);
  const route = useRoute<RouteProp<RootStackParamList, 'BUSINESS_PROFILE_DESCRIPTION_OTHER_USER'>>();

  // console.log('userDatauserData+++++++++', userData, route?.params?.id, status);
  const [menuTabs, setMenuTabs] = useState(OtherBusinessMenuTabs);
  const [userGallery, setUserGallery] = useState(UserGalleryTabs);
  const [pageNumber, setPageNumber] = useState(1);
  //   const reload = useSelector((state: any) => state?.homePageReducer?.reload);
  const [userPostsData, setUserPostsData] = useState([]);
  const [showMore, setShowMore] = useState(false);

  // console.log('route ===>', route);

  const [businessProfile] = useLazyGetBusinessProfileQuery();

  const { data: leadsData } = useGetBuilderLeadsQuery({});

  // console.log('leads dataaaaaa ===>', JSON.stringify(leadsData));

  const { data: businessImageData } = useGetBuilderBusinessImageDetailsQuery(route?.params?.profiledata?._id);
  const { data: businessAlbumData } = useGetBuilderBusinessAlbumDetailsQuery(route?.params?.profiledata?._id);
  const { data: businessVideoData } = useGetBuilderBusinessVideoDetailsQuery(route?.params?.profiledata?._id);

  const [getUserPosts, { data: loadData }] = useLazyGetUserPostsQuery();

  const [businessDetail] = useLazyBusinessDetailsQuery();
  const [businessData, setBusinessData] = useState({});

  const [getAllBuilderPropertyMutation, { isLoading }] = useLazyGetBuilderPropertyQuery();

  const [isView, setIsView] = useState(false);

  const [isBuilderActive, setBuilderIsActive] = useState<string>('active');

  const selectedUserData = useAppSelector(getUserData);
  // console.log('checking on the user details',JSON.stringify(selectedUserData));
  
  const [getBuilderDetailsList] = useLazyGetBuilderPostDetailsQuery();
  const [followBusiness] = useOnFllowBusinessMutation();
  const [unFollowBusinessProfile] = useLazyOnUnFollowBusinessQuery()
  const [listOfPosts, setListOfPosts] = useState();
  const [activeBuilderProp, setActiveBuilderProp] = useState([]);
  const [businessDetails, setBusinessDetails] = useState({});

  const businessId = route?.params?.profiledata?._id;

  const [text, setText] = useState('');
  const MAX_WORDS = 100;

  // console.log(' business id --------->', route?.params?.profiledata?._id);

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

  const [listOfData, setListOfData] = useState<ListItem[]>([
    { name: 'About Us', isSelect: true },
    { name: 'Posts', isSelect: false },
    { name: 'Our Properties', isSelect: false },
    { name: 'Gallery', isSelect: false },
    { name: 'Review', isSelect: false },
  ]);
  const propertyFeatures = businessDetails?.propertyFeatures || [];

  const currentDate = moment().format('YYYY-MM-DD');

  useEffect(() => {
    const renderingBusinessDetails = () => {
      businessDetail(route?.params?.profiledata?._id)
        .then(res => {
           console.log('res++++++++++', res?.data);
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
    renderingData();
  }, []);

  const renderingData = () => {
    setTimeout(() => {
      setLoader(false);
    }, 1000);
    businessProfile(route?.params?.business_Id)
      .then(res => {
        console.log('res++++++++++', JSON.stringify(res));
        setBusinessData(res?.data?.data?.business);
        builderListDetails(res?.data?.data?.business?._id, res?.data?.data?.business?.business_owner);
      })
      .catch(err => {
        toast.show(err?.error?.message || 'Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Auth message',
          },
          duration: 3000,
        });
      });
  };

const followBusinessFunction =()=>{
const FollowProfileDTO = {
  followingId: businessData?._id,
  isBusiness: true,
}
followBusiness(FollowProfileDTO).then(res=>{if(res?.data?.message==='Success'){
  renderingData()
}}).catch(err=>{console.log('checking',JSON.stringify(err));
})
}

const unFollowQuery=()=>{
  
    unFollowBusinessProfile(businessId).then(res=>{
      console.log('checking on the response',JSON.stringify(res));
      if(res?.data?.message==='Success'){
        renderingData()
      }
      
    }).catch((err)=>{
      console.log('checking on error',err);
      
    })
  
}

  const aemnitiesrenderItem = ({ item }) => (
    <RNView style={styles.amenticeViewStyle}>
      <RNImage style={styles.amenticeImage} source={require('@/assets/images/business/office.png')} />
      <RNText style={styles.amenticeText}>{item.label}</RNText>
    </RNView>
  );

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
      is_active: 'active',
      page_size: '10',
      page_number: '1',
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

  const flatDetailsItem = ({ item }) => {
    // console.log(' item values--------->', item?.property);

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

  useEffect(() => {
    onRefreshfn();
    //builderListDetails()
  }, []);

  const builderListDetails = (builderId, userId) => {
    // console.log('cheking businesss dataaa',builderId+' ,, '+userId);
    getBuilderDetailsList(getBuilderPostQuery(1, 10, builderId, userId))
      .then(res => {
        // console.log('cheking on response of post', JSON.stringify(res));
        if (res?.status === 'fulfilled') {
          setListOfPosts(res?.data?.data);
        } else {
          toast.show(res?.error?.message, {
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
        console.log('cheking on err', err);
      });
  };
  const getAllUserPosts = async payload => {
    // getUserPosts(payload).then(result => {
    //   if (result?.data?.status) {
    //     if (result?.data?.data?.length && payload?.pageNumber > 1) {
    //       setUserPostsData(prev => prev.concat(result?.data?.data));
    //     } else {
    //       setUserPostsData(prev => prev.concat(result?.data?.data));
    //     }
    //   } else {
    //     if (result?.error?.status === false) {
    //       if (payload?.pageNumber == 1) {
    //         if (route?.params?.id) onRefresh();
    //       } else {
    //         setUserPostsData(userPostsData);
    //       }
    //     }
    //   }
    // });
  };

  const getSelectedView = () => {        
    const selectedItem = listOfData.find(item => item.isSelect);
    if (selectedItem) {
      switch (selectedItem?.name) {
        case 'About Us':
          return (
            <RNView style={{backgroundColor:'#F0F0F0'}}>
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
                    <RNText style={styles.headText}>Sub Categories :</RNText>
                    <RNView style={styles.rowView}>
                      {businessData?.sub_category?.map((item, index) => (
                        <TouchableOpacity style={styles.subContainer} key={index}>
                          <RNText style={styles.subText}>{item}</RNText>
                        </TouchableOpacity>
                      ))}
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
                      <RNText style={styles.propertyTextStyle}>{truncateText(businessData.project_highlights)}</RNText>
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
              {/* <LinearGradient colors={['#C9FCFF', 'rgba(255, 255, 255, 1)']} style={styles.lastGradientView}>
                <UserCreatePostUpload isFromBuilder={true} userProfile={false} businessData={businessData} />
              </LinearGradient> */}
              {listOfPosts?.length > 0 ? (
                <FlatList
                  style={styles.amenticeImage}
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
                          key={index}
                          data={item}
                          srNumber={index}
                          onPress={() => {
                            //handleUserPostNavigation(item)
                            console.log('onPressed');
                          }}
                          onPressComment={() => {
                            console.log('onPressedComment');
                            navigation.navigate('USER_POST_COMMENTS', {
                              data: item,
                            });
                          }}
                        />
                      </RNView>
                    );
                  }}
                />
              ) : (
                <RNView>
                  <RNText>No Post Data</RNText>
                </RNView>
              )}
            </RNView>
          );
        case 'Our Properties':
          return (
            <BuilderPropertyList
              headerShow={false}
              userId={route?.params?.id}
              businessId={route?.params?.profiledata?._id}
            />
          );
        case 'Gallery':
          return (
            <GalleryTabView
              userGallery={userGallery}
              setUserGallery={setUserGallery}
              userData={{
                gallery: businessImageData?.data,
                uservideo: businessVideoData?.data,
                useralbum: businessAlbumData?.data,
              }}
            />
          );
        case 'Review':
          return(<BusinessReview data={businessData} isFromOther={true}/>)

        default:
          return (
            <RNView style={{ justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
              <RNText>No Details</RNText>
            </RNView>
          );
      }
    }
  };

  const handleSelection = index => {
    setListOfData(prevList =>
      prevList.map((item, idx) => ({
        ...item,
        isSelect: idx === index,
      }))
    );
  };

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

  const activateTabByKey = (item: any) => {
    const shallow = [...menuTabs];
    const filterData = activateItemByKey(shallow, item.key);
    setMenuTabs(filterData);
  };
  const activateTabByKeyforGallery = (item: any) => {
    const shallow = [...userGallery];
    const filterData = activateItemByKey(shallow, item.key);
    setUserGallery(filterData);
  };

  const renderTabComponent = (item: any) => {
    const itemData = item?.filter((item: any) => item?.active === true)[0];
   // console.log('cheking on the keyy',itemData?.key);
    
    switch (itemData?.key) {
      case 'post':
        return (
          <RNView>
            <LinearGradient colors={['#C9FCFF', 'rgba(255, 255, 255, 1)']} style={styles.lastGradientView}>
              <UserCreatePostUpload isFromBuilder={true} userProfile={false} businessData={businessData} />
            </LinearGradient>
            {listOfPosts?.length > 0 ? (
              <FlatList
                style={styles.amenticeImage}
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
                        key={index}
                        data={item}
                        srNumber={index}
                        onPress={() => {
                          //handleUserPostNavigation(item)
                          console.log('onPressed');
                        }}
                        onPressComment={() => {
                          console.log('onPressedComment');
                          navigation.navigate('USER_POST_COMMENTS', {
                            data: item,
                          });
                        }}
                      />
                    </RNView>
                  );
                }}
              />
            ) : (
              <RNView>
                <RNText>No Post Data</RNText>
              </RNView>
            )}
          </RNView>
        );
      case 'gallery':
        // return <GalleryTabView userGallery={userGallery} setUserGallery={setUserGallery} userData={userData} />;
        return (
          <GalleryTabView
            userGallery={userGallery}
            setUserGallery={setUserGallery}
            userData={{
              gallery: businessImageData?.data,
              uservideo: businessVideoData?.data,
              useralbum: businessAlbumData?.data,
            }}
          />
        );
      case 'properties':
        return (
          <BuilderPropertyList
            headerShow={false}
            userId={route?.params?.id}
            businessId={route?.params?.profiledata?._id}
          />
        );
        case 'reviews' :
          return(<BusinessReview data={businessData} isFromOther={true}/>)
       
      // case 'about':
      //   return <UserProfileAboutTab userData={userData} />;
      default:
        return <UserMenuPostTabComponent data={userPostsData} />;
    }
  };

  const renderTabCommonCompo = item => {
    const itemData = item?.filter(item => item?.active === true)[0];
    switch (itemData?.key) {
      case 'postttt':
        return (
          <>
            <RNView style={styles.headerView}>
              <DetailSectionHeader
                Heading={'Your posts'}
                btnText={''}
                headingTextStyle={{ fontSize: SIZES.medium15, lineHeight: 22 }}
              />
            </RNView>
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} style={styles.divider} />
            <RNView style={styles.whatsMind}>
              <UserCreatePostUpload profile={true} userProfile={true} />
            </RNView>
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} style={styles.divider} />
            <RNView style={styles.chipView}>
              <ScrollView
                horizontal
                contentContainerStyle={{ paddingLeft: 20, paddingRight: 100 }}
                showsHorizontalScrollIndicator={false}>
                <RNView style={styles.userTabView}>
                  {UserTabs.map((item, i) => {
                    return (
                      <PropertyCategoryChips
                        key={i}
                        item={item}
                        onPress={() => activateTabByKey(item)}
                        leftIcon={imageRenderFn(item.label)}
                        textStyle={styles.textTab}
                        style={styles.propertyChips}
                      />
                    );
                  })}
                </RNView>
              </ScrollView>
            </RNView>
            <RNView style={styles.bottombtn}>
              <RNView style={styles.editBtn}>
                <CommonButton
                  title="Manage Posts"
                  style={styles.buttenstyle}
                  textStyle={styles.textBtnstyle}
                  //   leftIcon={
                  //     <RNImage
                  //       style={{ height: 16, width: 16, marginRight: 5 }}
                  //       source={require('../../../../assets/images/business/bookmark.png')}
                  //     />
                  //   }
                  onPress={() => {
                    // navigation.navigate("BusinessEditDetails");
                  }}
                />
              </RNView>
            </RNView>
            <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} />
          </>
        );
      default:
        return <RNView></RNView>;
    }
  };

  if (isLoading) {
    return <Loader size={'large'} />;
  }

  const imageRenderFn = (name: string) => {
    switch (name) {
      case 'Home Tour':
        return <RNImage style={styles.renderImg} source={require('@/assets/images/customImage/video-player.png')} />;
      case 'Go Live':
        return <RNImage style={styles.renderImg} source={require('@/assets/images/customImage/eye.png')} />;
      default:
        break;
    }
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <KeyboardAvoidingView style={styles.keyboardView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled>
        <ScrollView
          contentContainerStyle={styles.topScroll}
          style={styles.topScrollStyle}
          showsVerticalScrollIndicator={false}>
          <HeaderBar backPress={() => navigation.goBack()} label={route?.params?.profiledata?.business_name} />
          <ImageBackground
            source={
              businessData?.cover_pic
                ? { uri: businessData?.cover_pic }
                : {
                    uri: 'https://i.pinimg.com/736x/52/19/43/521943cd9dc1cbee8419edc2e4bc4b13.jpg',
                  }
            }
            style={styles.backgroundImg}
            resizeMode="cover" />
          <RNView style={styles.topProfileView}>
            <RNView style={styles.userProfile}>
              {businessData?.profile_pic ? (
                <RNImage
                  style={[styles.profileImg]}
                  source={{
                    uri: businessData?.profile_pic,
                  }}
                />
              ) : (
                <DefaultProfile
                  username={route?.params?.profiledata?.business_name}
                  viewStyle={styles.userIcon}
                  textStyle={styles.userLetter}
                />
              )}
            </RNView>
          </RNView>

          <RNView style={styles.topMain}>
            <RNView style={styles.userNameView}>
              <RNText style={styles.username}>{route?.params?.profiledata?.business_name}</RNText>
              <Rating
                startingValue={businessData?.averageRating}
                ratingCount={5}
                imageSize={20}
                readonly={true}
                style={[styles.ratingStyle,{marginLeft:px(0)}]}
              />
              {businessData?.role === 'BUILDER' && (
                <RNImage
                  source={require('@/assets/images/business/verify.png')}
                  style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                  resizeMode="contain"
                />
              )}
              {businessData?.role === 'AGENT' && (
                <RNImage
                  source={require('@/assets/images/business/nearluk-agent-logo.png')}
                  style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                  resizeMode="contain"
                />
              )}
              {businessData?.role === 'USER' && (
                <RNImage
                  source={require('@/assets/images/business/nearluk-agent-logo.png')}
                  style={{ width: px(15), height: px(15), marginLeft: px(6) }}
                  resizeMode="contain"
                />
              )}
            </RNView>
            <RNView style={styles.likesMain}>
              <RNText
                style={
                  styles.likesText
                }>{`${businessData?.likeCount ? businessData?.likeCount + 'Likes' : ''}`}</RNText>
                <RNView style={styles.businessNameContainer}>
               <RNText style={[styles.followTextStyle,{color:ColorTheme.black,marginHorizontal:px(0),}]}>{`${businessData?.followers} Followers .`}</RNText>
               {businessData?.isFollowing? <TouchableOpacity onPress={unFollowQuery}>
               <RNText style={[styles.followTextStyle,{color:ColorTheme.nearLukBaseSecondaryColor3}]}>{'UnFollow'}</RNText>
               </TouchableOpacity>:
               <TouchableOpacity onPress={followBusinessFunction}>
               <RNText style={[styles.followTextStyle,{color:ColorTheme.nearLukBaseSecondaryColor3}]}>{'Follow'}</RNText>
               </TouchableOpacity>
               }
              </RNView>
              {/* <RNText style={styles.followText}>{`${businessData?.followers} Followers`}</RNText> */}
            </RNView>
            <RNView style={styles.rating}>
              {/* {[1, 2, 3, 4, 5].map((item: any, i) => {
              return <AntDesign name="star" key={i} size={13} color="#FFC200" />;
            })} */}
              {/* <RNText>4</RNText> */}
            </RNView>
            {businessData?.bio && (
              <RNView style={styles.bioContainer}>
                <RNText
                  style={styles.bioTextStyle}
                  // onPress={() => {
                  //   navigation.navigate("UserBioScreen", userData);
                  // }}
                >
                  {showMore ? businessData?.bio : `${businessData?.bio.slice(0, 100)} ...`}
                  <RNText
                    style={styles.moreBtn}
                    onPress={() => {
                      setShowMore(!showMore);
                    }}>
                    {showMore ? 'less' : 'more'}
                  </RNText>
                </RNText>
              </RNView>
            )}
          </RNView>
          <Divider style={styles.dividerView} />
          <RNView style={styles.sectionContainer}>
            <RNView style={styles.headerView}>
              <DetailSectionHeader Heading={'Description'} btnText={''} headingTextStyle={styles.headingTextStyle} />
              <RNView style={styles.sectionDetailPart}>
              <RNText style={[styles.detailText,{marginBottom:px(5)}]}>{businessData?.intro}</RNText>

                {/* {businessData?.locality && (
                  <RNView style={styles.detailSection}>
                    <RNView style={{ paddingRight: 7 }}>
                      <RNImage source={require('@/assets/images/business/map.png')} style={styles.detaillogos} />
                    </RNView>
                    <RNView style={{ paddingRight: 30 }}>
                      <RNText style={styles.detailText}>{businessData?.locality}</RNText>
                    </RNView>
                  </RNView>
                )}
                <RNView style={styles.detailSection}>
                  <RNView style={{ paddingRight: 7 }}>
                    <RNImage source={require('@/assets/images/business/time.png')} style={styles.detaillogos} />
                  </RNView>
                  <RNText style={styles.detailText}>
                    Joined on {moment(businessData?.updatedAt).format('MMMM YYYY')}
                  </RNText>
                </RNView>
                {businessData?.propertyCount ? (
                  <RNView style={styles.detailSection}>
                    <RNView style={{ paddingRight: 7 }}>
                      <RNImage source={require('@/assets/images/business/bookmark.png')} style={styles.detaillogos} />
                    </RNView>

                    <RNText style={styles.detailText}>
                      {businessData?.propertyCount && `${businessData?.propertyCount} Postings`}
                    </RNText>
                  </RNView>
                ) : (
                  <RNView></RNView>
                )} */}
              </RNView>
            </RNView>
          </RNView>
          <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth} />

          {/* <RNView style={styles.sectionContainer}>
            <ScrollView
              horizontal
              contentContainerStyle={{
                paddingRight: 20,
              }}
              showsHorizontalScrollIndicator={false}>
              {menuTabs.map((item, i) => {
                return (
                  <PropertyCategoryChips
                    key={i}
                    item={item}
                    onPress={() => activateTabByKey(item)}
                    textStyle={styles.chips}
                    containerStyle={styles.topTabContainerStyle}
                    style={[styles.propertyChips, { backgroundColor: item.active ? ColorTheme.primary : '#DBDBDB' }]}
                  />
                );
              })}
            </ScrollView>
            
            {renderTabCommonCompo(menuTabs)}
          </RNView> */}
          <RNView style={styles.listViewContainer}>
            <FlatList data={listOfData} horizontal showsHorizontalScrollIndicator={false} renderItem={renderItem} />
          </RNView>

          {/* <RNView
            style={{
              width: deviceWidth,
              // alignSelf: "center",
            }}>
            {renderTabComponent(menuTabs)}
          </RNView> */}
            <RNView>{getSelectedView()}</RNView>

        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default BusinessPropertyDescriptionOtherUser;
