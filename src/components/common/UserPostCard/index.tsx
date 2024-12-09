import React, { useRef, useState } from 'react';
import { Share, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import FeaturedPropertyList from '@/components/FeaturedPropertyList';
import TrendingPropertyList from '@/components/TrendingPropertyList';
import { user_other_post_action_list, user_own_post_action_list } from '@/constants/function/post.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useAddLikeToPostMutation,
  useDeletePostApiMutation,
  useHidePropertyMutation,
  useUpdateShareCountMutation,
} from '@/redux/login/loginService';
import { getFcToken } from '@/redux/Notification/notificationReducer';
import { useGetNotificationMutation } from '@/redux/Notification/notificationService';
import { baseURL } from '@/services/apiClient';
import { deviceWidth, px } from '@/utils';

import CustomAlertWrapper from '../CustomAlertWrapper';
import PostGrid from '../PostGrid';
import PropertyActionHideModel from '../PropertyActionHideModel';
import PropertyCategoryChips from '../PropertyCategoryChips';
import ReportCard from '../ReportCard';
import { styles } from './styles';

type Props = {
  data?: any;
  onPress?: () => void;
  onPressComment?: () => void;
  srNumber?: number;
  isFromBuilder: boolean;
  businessData: any;
  isFromHomeBusiness?: boolean;
};
type ShareOptions = { title?: string; text?: string; url?: string };

const UserPostCard: React.FC<Props> = ({
  data,
  onPress,
  onPressComment,
  srNumber,
  isFromBuilder,
  businessData,
  isFromHomeBusiness,
}) => {
  const toast = useToast();
  const navigation = useNavigation();
  const fcToken = useAppSelector(getFcToken);
  const [hidePropertyUI, setHidePropertyUI] = useState(false);
  const selectedData = useAppSelector(getUserData);
  const [like, setLike] = useState(data?.isLiked);
  const [LikeCount, setLikeCount] = useState(data?.likeCount ? data?.likeCount : 0);
  const [ShareCount, setShareCount] = useState(data?.shareCount ? data?.shareCount : 0);
  const [showMore, setShowMore] = useState(false);
  const [deletePopup, setShowDeletePopup] = useState(false);
  const [reportPopup, setShowReportPopup] = useState(false);
  const [hidePopup, setShowHidePopup] = useState(false);
  const [propertymodeltoggle, setPropertymodeltoggle] = useState(false);
  const touchableOpacityRef = useRef(null);
  const [updateShareCount] = useUpdateShareCountMutation();
  const [addLikeToPost] = useAddLikeToPostMutation();
  const [deletePostMutation] = useDeletePostApiMutation();
  const [hidePropertyMutation] = useHidePropertyMutation();
  const [getCallNotification] = useGetNotificationMutation();
  // console.log('data============', data);
  // const myimageS = [
  //   "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   // "http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
  //   // "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   // "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   // "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  //   // "https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  // ];

  const checkMultipleOf5 = () => {
    if (srNumber % 5 === 0) {
      return true;
    } else {
      return false;
    }
  };
  const checkMultipleOf10 = () => {
    if (srNumber % 10 === 0) {
      return true;
    } else {
      return false;
    }
  };

  const filterEmptyImageVideosFn = data => {
    const temp = data?.filter((item, ind) => {
      return item ? item : false;
    });
    return temp;
  };
  const myimage = filterEmptyImageVideosFn(data?.media);
  const [showModal, setShowModal] = useState({
    show: false,
    url: '',
  });

  // console.log('ReportCard+++++++++++', hidePropertyUI);

  // VERIFY FUNCTUIN FOR IMAGES EXTENTIONS
  const verifyImageString = (data: string) => {
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    if (temp) {
      return data;
    } else {
      return 'https://images.pexels.com/photos/214574/pexels-photo-214574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    }
  };
  const verifyImageVideoString = (data: string) => {
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    if (temp) {
      return true;
    } else {
      return false;
    }
  };

  // SHARE COUNT FUNCTION
  const handleSharedPostCount = async (id: string) => {
    // console.log("Incremented============");
    const payload = {
      user: selectedData?._id,
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

  // LIKE POST FUNCTION
  const handleLikePost = async (id: string) => {
    const payload = {
      user: selectedData?._id,
      post_id: id,
    };
    addLikeToPost(payload).then(response => {
      if (response?.data?.status) {
        // console.log('dsbjgbjdsghsj==========', response?.data);
        getCallNotification({ token: fcToken });
        if (!like) {
          setLikeCount(LikeCount + 1);
        } else {
          setLikeCount(LikeCount - 1);
        }
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

  //sharin expo pakage
  const onShare = async () => {
    const shareUrl = baseURL.includes('devapi') ? 'https://dev.nearluk.com' : 'https://nearluk.com';
    // console.log('shareUrl++++', shareUrl);

    try {
      const result = await Share.share({
        url: `${shareUrl}/postDetails/${data?._id}`,
        message: `${shareUrl}/postDetails/${data?._id}`,
        // title: "this is nearluk app",
      });
      // console.log('Share.dismissedAction++++', result);
      if (result?.action === 'sharedAction') {
        // shared
        handleSharedPostCount(data?._id);
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
  const filterImagesOnlyfn = imgArr => {
    // console.log('imgArr', imgArr);
    const temp = imgArr.filter((item, ind) => {
      return verifyImageVideoString(item);
    });
    return temp;
  };

  const openpropertymodel = () => {
    // console.log(selectedData?._id, " ", data?.user_data?._id);

    setPropertymodeltoggle(true);
  };

  const actionmodel = item => {
    // console.log(item);

    if (item.label === 'Edit Post') {
      console.log('Edit Post');
      setPropertymodeltoggle(false);
      setTimeout(() => {
        console.log('cheking on business details', businessData);
        isFromBuilder
          ? navigation.navigate('CREATE_POST', {
              upload: false,
              userProfile: true,
              edit: true,
              data: data,
              builderData: businessData,
            })
          : navigation.navigate('CREATE_POST', {
              upload: false,
              userProfile: true,
              edit: true,
              data: data,
            });
      }, 700);

      // navigation.navigate("PostProperty", {
      //   id: data?._id,
      //   property_owner: data?.property_owner,
      // });
    }
    if (item.label === 'Hide Post') {
      // hideProperty();
      setShowHidePopup(true);
    }

    if (item.label === 'Delete Post') {
      // deleteProperty();
      setShowDeletePopup(true);
    }
    if (item.label === 'Report Post') {
      // deleteProperty();
      setShowReportPopup(true);
    }

    //console.log(data?._id);
  };

  // HIDE POST BY USER
  const hideProperty = async () => {
    setShowHidePopup(!hidePopup);

    const payvalue = [
      {
        user: selectedData?._id,
        property: data?._id,
        reason_enum: 1,
        type: 'Post',
      },
    ];
    // console.log(payvalue);

    hidePropertyMutation(payvalue).then(response => {
      if (response?.data?.status) {
        // console.log('reload homescreen', response?.data?.status);
        setHidePropertyUI(true);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Please try once',
          },
          duration: 3000,
        });
        setHidePropertyUI(false);
      }
    });
  };

  const deleteProperty = postId => {
    setShowDeletePopup(!deletePopup);
    const payload = {
      postId: [postId],
    };
    if (postId) {
      deletePostMutation(payload).then(response => {
        // console.log('deletePostMutation', response);
        if (response?.data?.status) {
          // console.log('reload homescreen', response?.data?.status);
          setHidePropertyUI(true);
        } else {
          // console.log('errrrrrrr', err);
          toast.show('Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Please try once',
            },
            duration: 3000,
          });
          setHidePropertyUI(false);
        }
      });
    }
  };

  return (
    <>
      {hidePropertyUI ? (
        <RNView></RNView>
      ) : (
        <RNView
          // onPress={onPress}
          style={styles.backgroundContainer}>
          <RNView>
            <RNView style={styles.initialContainer}>
              <TouchableOpacity onPress={onPress}>
                <RNView style={styles.rowView}>
                  {isFromHomeBusiness ? (
                    data?.business?.profile_pic ? (
                      <RNImage
                        source={{
                          uri: data?.business?.profile_pic,
                        }}
                        style={styles.profileImage}
                      />
                    ) : (
                      <RNView style={styles.subContainer}>
                        <RNText style={styles.firstName}>
                          {data?.business?.business_name
                            ? data?.business?.business_name.slice(0, 1).toUpperCase()
                            : '?'}
                        </RNText>
                      </RNView>
                    )
                  ) : data?.usiness_profile ? (
                    data?.business_profile?.profile_pic ? (
                      <RNImage
                        source={{
                          uri: data?.business_profile?.profile_pic,
                        }}
                        style={styles.profileImage}
                      />
                    ) : (
                      <RNView style={styles.subContainer}>
                        <RNText style={styles.firstName}>
                          {data?.business_profile?.name.slice(0, 1).toUpperCase()}
                        </RNText>
                      </RNView>
                    )
                  ) : data?.user_data?.profile_pic ? (
                    <RNImage
                      source={{
                        uri: data?.user_data?.profile_pic,
                      }}
                      style={styles.profileImage}
                    />
                  ) : (
                    <RNView style={styles.subContainer}>
                      <RNText style={styles.firstName}>
                        {data?.user_data?.fname ? data?.user_data?.fname.slice(0, 1).toUpperCase() : '?'}
                      </RNText>
                    </RNView>
                  )}

                  <RNView>
                    {isFromHomeBusiness ? (
                      <RNText style={styles.name}>{data?.business?.business_name}</RNText>
                    ) : (
                      <RNText style={styles.name}>
                        {data?.business_profile?.name
                          ? data?.business_profile?.name
                          : ((data?.property_owner?.fname ||
                              data?.property?.property_owner?.fname ||
                              data?.user_data?.fname + ' ' + data?.user_data?.lname) ??
                            'N/A')}
                      </RNText>
                    )}

                    <RNText style={styles.posted}>
                      Posted on: {moment(data?.createdAt).format('DD-MM-YYYY hh:mm A')}
                    </RNText>
                  </RNView>
                </RNView>
              </TouchableOpacity>
              <RNView style={styles.iconContainer}>
                <TouchableOpacity ref={touchableOpacityRef} onPress={openpropertymodel}>
                  <Entypo name="dots-three-horizontal" size={18} color="black" />
                </TouchableOpacity>
              </RNView>
            </RNView>

            <RNView style={styles.showMoreContainer}>
              {data?.caption?.length > 50 ? (
                <RNText style={styles.description}>
                  {showMore ? data?.caption : `${data?.caption.slice(0, 50)} ...`}
                  <RNText
                    style={styles.moreBtn}
                    onPress={() => {
                      setShowMore(!showMore);
                    }}>
                    {showMore ? ' less' : ' more'}
                  </RNText>
                </RNText>
              ) : (
                <RNText style={styles.description}>{data?.caption}</RNText>
              )}
            </RNView>

            <PostGrid
              imageArr={myimage}
              onPress={() => {
                navigation.navigate('GALLERY_PREVIEW', { images: myimage, hasHeader: true, index: 3 });
              }}
              type={'general'}
            />

            <RNView style={styles.socialDisplay}>
              <RNView style={styles.subSocialDisplay}>
                <RNView style={styles.likeIconContainer}>
                  <Entypo name="thumbs-up" size={15} color="white" />
                </RNView>
                <RNText style={styles.commonText}>{LikeCount ? LikeCount : ''}</RNText>
              </RNView>
              <RNView style={styles.commentContainer}>
                <RNText style={styles.commonText}>{data?.commentCount ? data?.commentCount : 0} Comments</RNText>
                {ShareCount ? <RNText style={styles.commonText}>{ShareCount} Shares</RNText> : null}
              </RNView>
            </RNView>
            <RNView style={styles.lineContainer}></RNView>
            {/* BOTTOM STRIP FOR COMMENT/LIKE/SHARE START HERE */}
            <RNView style={styles.bottomContainer}>
              <TouchableOpacity
                style={styles.subBottomContainer}
                onPress={() => {
                  handleLikePost(data?._id);
                  setLike(!like);
                }}>
                {like ? (
                  <AntDesign name="like1" size={18} color="blue" style={styles.likeIcon} />
                ) : (
                  <AntDesign name="like1" size={18} color="black" style={styles.likeIcon} />
                )}
                <RNText
                  style={[
                    styles.likeText,
                    {
                      color: like ? 'blue' : 'black',
                    },
                  ]}>
                  {like ? 'Liked' : 'Like'}
                </RNText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentContainer} onPress={onPressComment}>
                <RNImage style={styles.commentImage} source={require('@/assets/images/property/comment.png')} />
                <RNText style={styles.commentText}>Comment</RNText>
              </TouchableOpacity>
              <TouchableOpacity style={styles.commentContainer} onPress={onShare}>
                <RNImage style={styles.commentImage} source={require('@/assets/images/property/share.png')} />
                <RNText style={styles.commentText}>Share</RNText>
              </TouchableOpacity>
            </RNView>
          </RNView>
          {deletePopup && (
            <CustomAlertWrapper
              openModal={deletePopup}
              onClose={() => {
                setShowDeletePopup(false);
              }}
              text="Are you sure you want to delete?"
              head="Delete">
              <PropertyCategoryChips
                item={{ label: 'Cancel', active: true }}
                containerStyle={{
                  flex: 1,
                }}
                onPress={() => {
                  setShowDeletePopup(!deletePopup);
                }}
                style={{
                  backgroundColor: 'white',
                }}
              />
              <PropertyCategoryChips
                item={{ label: 'Delete' }}
                containerStyle={{
                  flex: 1,
                }}
                onPress={() => deleteProperty(data?._id)}
                style={{
                  backgroundColor: 'red',
                }}
                textStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </CustomAlertWrapper>
          )}
          {hidePopup && (
            <CustomAlertWrapper
              openModal={hidePopup}
              onClose={() => {
                setShowHidePopup(false);
              }}
              text="Are you sure you want to Hide?"
              head="Hide">
              <PropertyCategoryChips
                item={{ label: 'Cancel', active: true }}
                containerStyle={{
                  flex: 1,
                }}
                onPress={() => {
                  setShowHidePopup(!hidePopup);
                }}
                style={{
                  backgroundColor: 'white',
                }}
              />
              <PropertyCategoryChips
                item={{ label: 'Hide' }}
                containerStyle={{
                  flex: 1,
                }}
                onPress={hideProperty}
                style={{
                  backgroundColor: 'red',
                }}
                textStyle={{
                  color: 'white',
                  fontWeight: 'bold',
                }}
              />
            </CustomAlertWrapper>
          )}
          <PropertyActionHideModel
            data={selectedData?._id === data?.user_data?._id ? user_own_post_action_list : user_other_post_action_list}
            showModal={propertymodeltoggle}
            // placeholder=""
            setShowModal={val => setPropertymodeltoggle(val)}
            onPressItem={itm => actionmodel(itm)}
          />
          <ReportCard
            visible={reportPopup}
            setIsVisible={() => setShowReportPopup(!reportPopup)}
            postId={data?._id}
            setHidePropertyUI={val => setHidePropertyUI(val)}
            postType="Post"
          />
        </RNView>
      )}
      {isFromBuilder ? (
        <></>
      ) : checkMultipleOf5() ? (
        <RNView
          style={{
            width: deviceWidth,
            height: px(240),
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          {checkMultipleOf10() ? <TrendingPropertyList /> : <FeaturedPropertyList />}
        </RNView>
      ) : (
        <RNView></RNView>
      )}
    </>
  );
};

export default React.memo(UserPostCard);
