import React, { useCallback, useEffect, useRef, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Entypo from 'react-native-vector-icons/Entypo';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import BottomSheetForCommentPage from '@/components/Comment/BottomSheetForCommentPage';
import BottomsheetForReplyComment from '@/components/Comment/BottomsheetForReplyComment';
import CommentCard from '@/components/Comment/CommentCard';
import CommentInputAction from '@/components/Comment/CommentInputAction';
import ReplyComment from '@/components/Comment/ReplyComment';
import ReplyInputCloser from '@/components/Comment/ReplyInputCloser';
import DefaultProfile from '@/components/common/DefaultProfile';
import HeaderBar from '@/components/common/HeaderBar';
import ImageModal from '@/components/common/ImageModal';
import SocialPropertyCard from '@/components/common/SocialPropertyCard';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useAddCommentByIdMutation,
  useDeleteCommentByIdMutation,
  useLazyCommentListByIdQuery,
  useLazyGetAllReplyCommentByIdQuery,
  useReplyCommentByIdMutation,
  useUpdateCommentByIdMutation,
} from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';

import { styles } from './styles';

const PropertyComment = () => {
  // const selectedData = useSelector((state: any) => state?.loginReducer);
  const dispatch = useAppDispatch();
  const route = useRoute<RouteProp<RootStackParamList, 'PROPERTY_COMMENTS'>>();
  const navigation = useNavigation();

  const selectedUserData = useAppSelector(getUserData);
  // console.log('selectedUserData ====>', selectedUserData);
  const [showModal, setShowModal] = useState({
    show: false,
    url: '',
  });
  const [showImageModal, setShowImageModal] = useState({
    show: false,
    url: '',
  });
  const openImageModal = useCallback(
    uri => {
      setShowImageModal({
        show: true,
        url: uri,
      });
    },
    [showImageModal]
  );
  type editType = {
    comment_id: string;
    comment: string;
  };
  const toast = useToast();
  const [item, setItem] = useState(route?.params?.data);
  // console.log('item+++++++++++++', item);
  const [replyData, setReplyData] = useState([]);
  const [isReply, setIsReply] = useState(false);
  const [editReply, seteditReply] = useState(false);
  const [openReply, setopenReply] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState<string>('');
  const [replyComment, setreplyComment] = useState<string>('');
  const [recallComments, setrecallComments] = useState(false);
  const [editCommentText, seteditCommentText] = useState<editType>({
    comment_id: '',
    comment: '',
  });
  const [editReplyText, seteditReplyText] = useState<editType>({
    comment_id: '',
    comment: '',
  });
  const [showBottomSheet, setshowBottomSheet] = useState(false);
  const [showBottomSheetReply, setshowBottomSheetReply] = useState(false);
  const [editComment, seteditComment] = useState(false);
  const [data, setData] = useState<Object>({});
  const [parentCommentId, setparentCommentId] = useState<Object>({
    name: '',
    parant_id: '',
  });
  const textInputRef = useRef<TextInput>(null);
  const [commentsById] = useLazyCommentListByIdQuery();
  const [getAllReplyComments] = useLazyGetAllReplyCommentByIdQuery();
  const [addCommentById] = useAddCommentByIdMutation();
  const [replyCommentById] = useReplyCommentByIdMutation();
  const [deleteCommentById] = useDeleteCommentByIdMutation();
  const [updateCommentById] = useUpdateCommentByIdMutation({});
  useEffect(() => {
    setItem({
      ...route?.params?.data,
      commentCount: comments?.length ? comments?.length : 0,
    });
  }, [route?.params]);
  // console.log("route?.params?.data?._id", item);s
  type payloadProp = {
    pageSize?: string;
    pageNumber?: string;
    post_id: string;
  };
  const getCommentsBypost = async (payload: payloadProp) => {
    // console.log("payload===", payload);
    const params = new URLSearchParams(payload).toString();
    commentsById(params).then(response => {
      // console.log("response===", response?.data);
      if (response?.data?.status) {
        setComments(response.data.data);
        setItem({
          ...item,
          commentCount: response.data.data?.length ? response.data.data?.length : 0,
        });
      } else {
        setComments([]);
      }
    });
  };
  type commentProp = {
    user: string;
    post_id: string;
    comment: string;
  };
  type replyProp = {
    user: string;
    post_id: string;
    comment: string;
    parent_id: string;
  };

  // console.log("selectedData==============", selectedData.user.user);
  // console.log("selectedUserData========", selectedUserData);
  const userData = {
    _id: selectedUserData?._id,
    fname: selectedUserData?.fname,
    lname: selectedUserData?.lname,
    profile_pic: selectedUserData?.profile_pic,
  };

  // FUNCTION FOR MAKE COMMENT FOR POST

  const addCommentsBypost = async (payload: commentProp) => {
    // console.log("payload===+++=", payload);
    addCommentById(payload).then(response => {
      // console.log("response========+++", response);
      if (response?.data?.status) {
        setComments([{ ...response.data.data, replyCount: 0, user_data: userData }, ...comments]);
        setCommentText('');
        setrecallComments(!recallComments);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        setComments(comments);
      }
    });
  };

  // REPLY COMMENT FUNCTION FOR REPLY

  const replyCommentFn = async (payload: replyProp) => {
    // console.log("payload===+++=", payload);
    replyCommentById(payload).then(response => {
      // console.log("response========+++", response?.data.status);
      if (response?.data?.status) {
        setReplyData([
          {
            comment: payload?.comment,
            fname: selectedUserData?.fname,
            createdAt: new Date().toISOString(),
            profile_pic: selectedUserData?.profile_pic,
          },
          ...replyData,
        ]);
        // setComments(temp);
        setrecallComments(!recallComments);
        setreplyComment('');
        getAllCommentByParanetId({
          pageSize: '20',
          pageNumber: '1',
          comment_id: payload?.parent_id,
        });
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        setComments(comments);
      }
    });
  };

  // FUNCTION FOR DELETE COMMENT

  const handleDeleteCommentById = async (id: string) => {
    deleteCommentById(id).then(response => {
      // console.log('handleDeleteCommentById', response.data);
      if (response?.data?.status) {
        const commentsData = comments.filter(item => {
          return item?._id !== id;
        });
        setComments(commentsData);
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

  // FUNCTION FOR DELETE REPLY COMMENT

  const handleDeleteReplyCommentById = async (id: string) => {
    deleteCommentById(id).then(response => {
      // console.log('handleDeleteCommentById', response.data);
      if (response?.data?.status) {
        const commentsData = replyData.filter(item => {
          return item?._id !== id;
        });
        setReplyData(commentsData);
        setrecallComments(!recallComments);
        if (commentsData.length === 0) {
          setopenReply(false);
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
      }
    });
  };

  // EDIT COMMENT FUNCTION

  const updateCommentByIdfn = async (payload: editType) => {
    updateCommentById(payload).then(response => {
      if (response?.data?.status) {
        getCommentsBypost({
          pageSize: '20',
          pageNumber: '1',
          post_id: route?.params?.data?._id,
        });
        seteditCommentText({ comment_id: '', comment: '' });
        seteditComment(false);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        seteditCommentText({ comment_id: '', comment: '' });
        seteditComment(false);
      }
    });
  };

  // UPDATE REPLY FUNCTION / EDIT REPLY FUNCTION

  const updateReplyCommentByIdfn = async (payload: editType) => {
    console.log('dnsjnvjdsnvjkn');
    updateCommentById(payload).then(response => {
      if (response?.data?.status) {
        getAllCommentByParanetId({
          pageSize: '10',
          pageNumber: '1',
          comment_id: parentCommentId?.parant_id,
        });
        seteditReplyText({ comment_id: '', comment: '' });
        seteditReply(false);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        seteditReplyText({ comment_id: '', comment: '' });
        seteditReply(false);
      }
    });
  };

  // GET ALL REPLY COMMENT FOR SPECIFIC COMMNENT

  const getAllCommentByParanetId = async payload => {
    // console.log("payload========", payload);
    const params = new URLSearchParams(payload).toString();
    getAllReplyComments(params).then(response => {
      // console.log('getAllCommentByParanetId', response?.data?.data);
      if (response?.data?.status) {
        setrecallComments(!recallComments);
        setopenReply(true);
        setReplyData(response?.data?.data);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        setReplyData([]);
        setopenReply(false);
      }
    });
  };

  const marketingPeople = key => {
    if (item?.posted_by) {
      return item?.posted_by[key];
    } else {
      return selectedUserData[key];
    }
  };

  // CALL FUNCTION WHEN LOAD UI

  useEffect(() => {
    getCommentsBypost({
      pageSize: '20',
      pageNumber: '1',
      post_id: route?.params?.data?._id,
    });
  }, [route?.params?.data?._id, recallComments]);

  const handlePropertyUserPostNavigation = item => {
    // console.log(
    //   "item?.user_data?._id === selectedUserData?._id",
    //   item?.property_owner?._id === selectedUserData?._id
    // );
    if (marketingPeople('_id') === selectedUserData?._id) {
      navigation.navigate('USER_PROFILE_DETAILS');
    } else {
      navigation.navigate('OTHER_USER_PROFILE_DETAILS', {
        id: marketingPeople('_id'),
      });
    }
  };

  // console.log("abhay===", {
  //   user: route?.params?.data?.user_data?._id,
  //   post_id: route?.params?.data?._id,
  //   comment: commentText,
  // });

  // console.log(
  //   "comments======================",
  //   replyData,
  //   "abhdjbvhjbhjdbvjh=========",
  //   comments
  // );

  return (
    <Container hasHeader={true} isTab={false} backgroundColor="white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          // style={{
          //   width: DEVICE_WIDTH,
          //   alignItems: "center",
          //   flex: 1,
          //   backgroundColor: "white",
          // }}
        >
          <RNView style={styles.scrollView}>
            <RNView style={styles.headerTop}>
              <HeaderBar
                backPress={() => {
                  navigation.goBack();
                }}
                label=""
                shadow={false}
                padVerticle={false}
              />
            </RNView>
            <RNView style={{ paddingHorizontal: 20 }}>
              <SocialPropertyCard
                data={item}
                //   onPress={() =>
                //     navigation.navigate(ROUTES.PropertyDetails, {
                //       id: item?._id,
                //       property_owner: item?.property_owner?._id,
                //     })
                //   }
                onPressUsername={() => handlePropertyUserPostNavigation(item)}
              />
            </RNView>
            <ScrollView nestedScrollEnabled style={styles.commentsScroll} showsVerticalScrollIndicator={false}>
              {/* COMMENTS LIST RENDER SECTION */}
              {comments?.length ? (
                comments.map((item, ind) => {
                  return (
                    <RNView
                      key={ind}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                      }}>
                      {item?.user_data?.profile_pic ? (
                        <RNImage
                          source={{
                            uri: item?.user_data?.profile_pic,
                          }}
                          style={styles.profileImg}
                        />
                      ) : (
                        <DefaultProfile
                          username={item?.user_data?.fname}
                          viewStyle={styles.defaultprofile}
                          textStyle={styles.defaultText}
                        />
                      )}

                      <RNView style={{ paddingLeft: 5 }}>
                        <CommentCard
                          setshowBottomSheet={val => setshowBottomSheet(val)}
                          setData={val => setData(val)}
                          item={item}
                          setIsReply={val => setIsReply(val)}
                          getAllCommentByParanetId={data => getAllCommentByParanetId(data)}
                          setparentCommentId={data => setparentCommentId(data)}
                        />
                        {item?.replyCount > 0 &&
                          openReply &&
                          item?._id === parentCommentId?.parant_id &&
                          (replyData?.length > 0 ? (
                            <RNView>
                              <ScrollView
                                nestedScrollEnabled
                                style={{ minHeight: 100 }}
                                showsVerticalScrollIndicator={false}>
                                {replyData?.map((item, ind) => {
                                  return (
                                    <ReplyComment
                                      key={ind}
                                      item={item}
                                      setshowBottomSheetReply={val => setshowBottomSheetReply(val)}
                                      setData={val => setData(val)}
                                    />
                                  );
                                })}
                              </ScrollView>
                            </RNView>
                          ) : (
                            <RNView style={styles.emptyData}>
                              <RNText style={styles.emptyText}>No Reply Comments</RNText>
                            </RNView>
                          ))}
                      </RNView>
                    </RNView>
                  );
                })
              ) : (
                <RNView style={styles.emptyDataComment}>
                  <RNText style={styles.emptyText}>No Comments</RNText>
                </RNView>
              )}
              <RNView style={{ height: 100 }}></RNView>
            </ScrollView>
            <RNView style={styles.commentInputpos}>
              {isReply ? (
                <>
                  <ReplyInputCloser name={parentCommentId?.name} setIsReply={val => setIsReply(val)} />
                  <RNView style={styles.bottominput}>
                    <TextInput
                      value={replyComment}
                      onChangeText={t => setreplyComment(t)}
                      placeholder={`Reply Comment`}
                      style={styles.inputField}
                      ref={textInputRef}
                    />
                    <CommentInputAction
                      replyComment={replyComment}
                      setIsReply={val => setIsReply(val)}
                      setopenReply={val => setopenReply(val)}
                      onPressReplySubmit={() => {
                        replyCommentFn({
                          user: selectedUserData._id,
                          post_id: route?.params?.data?._id,
                          comment: replyComment,
                          parent_id: parentCommentId?.parant_id,
                        });

                        setIsReply(false);
                        setopenReply(true);
                      }}
                      // onPressSmily={() => {
                      //   setTimeout(() => {
                      //     setTimeout(() => {
                      //       if (textInputRef && textInputRef.current) {
                      //         textInputRef.current.getInputConnection().sendKeyEvent({ keyCode: 2 }); // KeyEvent.ACTION_DOWN
                      //         textInputRef.current.getInputConnection().sendKeyEvent({ keyCode: 3 }); // KeyEvent.ACTION_UP
                      //       }
                      //     }, 300);
                      //   });
                      // }}
                    />
                  </RNView>
                </>
              ) : editReply ? (
                <>
                  <ReplyInputCloser name={parentCommentId?.name} setIsReply={val => seteditReply(val)} />
                  <RNView style={styles.bottominput}>
                    <TextInput
                      value={editReplyText?.comment}
                      onChangeText={t =>
                        seteditReplyText({
                          comment: t,
                          comment_id: editReplyText.comment_id,
                        })
                      }
                      placeholder={`Reply Comment`}
                      style={styles.inputField}
                      ref={textInputRef}
                    />
                    <CommentInputAction
                      replyComment={editReplyText?.comment}
                      onPressReplySubmit={() => {
                        updateReplyCommentByIdfn({
                          comment_id: editReplyText?.comment_id,
                          comment: editReplyText?.comment,
                        });
                        seteditReply(false);
                        setopenReply(true);
                      }}
                      // onPressSmily={() => {
                      //   setTimeout(() => {
                      //     if (textInputRef && textInputRef.current) {
                      //       textInputRef.current.getInputConnection().sendKeyEvent({ keyCode: 2 }); // KeyEvent.ACTION_DOWN
                      //       textInputRef.current.getInputConnection().sendKeyEvent({ keyCode: 3 }); // KeyEvent.ACTION_UP
                      //     }
                      //   }, 300);
                      // }}
                    />
                  </RNView>
                </>
              ) : editComment ? (
                <RNView style={styles.bottominput}>
                  <TextInput
                    value={editCommentText?.comment}
                    onChangeText={t =>
                      seteditCommentText({
                        comment_id: editCommentText?.comment_id,
                        comment: t,
                      })
                    }
                    placeholder="Update comment"
                    style={styles.inputField}
                    ref={textInputRef}
                  />
                  <CommentInputAction
                    replyComment={editCommentText?.comment}
                    onPressReplySubmit={() =>
                      updateCommentByIdfn({
                        comment_id: editCommentText?.comment_id,
                        comment: editCommentText?.comment,
                      })
                    }
                  />
                </RNView>
              ) : (
                <RNView style={styles.bottominput}>
                  <TextInput
                    value={commentText}
                    onChangeText={t => setCommentText(t)}
                    placeholder={`Comment as ${selectedUserData?.fname} `}
                    style={styles.inputField}
                    ref={textInputRef}
                  />
                  <CommentInputAction
                    replyComment={commentText}
                    onPressReplySubmit={() =>
                      addCommentsBypost({
                        user: selectedUserData._id,
                        post_id: route?.params?.data?._id,
                        comment: commentText,
                      })
                    }
                    // onPressSmily={() => {
                    //   setTimeout(() => {
                    //     if (textInputRef && textInputRef.current) {
                    //       textInputRef.current.getInputConnection().sendKeyEvent({ keyCode: 2 }); // KeyEvent.ACTION_DOWN
                    //       textInputRef.current.getInputConnection().sendKeyEvent({ keyCode: 3 }); // KeyEvent.ACTION_UP
                    //     }
                    //   }, 300);
                    // }}
                  />
                </RNView>
              )}
            </RNView>
          </RNView>

          <BottomSheetForCommentPage
            showBottomSheet={showBottomSheet}
            setshowBottomSheet={val => setshowBottomSheet(val)}
            onPressDelete={(Id: string) => {
              handleDeleteCommentById(Id);
            }}
            data={data}
            userId={selectedUserData?._id}
            onPressEdit={data => {
              seteditComment(true);
              seteditCommentText(data);
            }}
            onPressReply={data => {
              setparentCommentId({
                name: data?.user_data?.fname,
                parant_id: data?._id,
              });
              setIsReply(true);
            }}
          />
          <BottomsheetForReplyComment
            showBottomSheet={showBottomSheetReply}
            setshowBottomSheet={val => setshowBottomSheetReply(val)}
            onPressDelete={(Id: string) => {
              handleDeleteReplyCommentById(Id);
            }}
            data={data}
            userId={selectedUserData?._id}
            onPressEdit={data => {
              setIsReply(false);
              seteditReply(true);
              seteditReplyText(data);
            }}
            // onPressReply={(data) => {
            //   setparentCommentId({
            //     name: data?.user_data?.fname,
            //     parant_id: data?._id,
            //   });
            //   setIsReply(true);
            // }}
          />
          {showModal.show && (
            <ImageModal
              showImageModal={showModal.show}
              src={showModal.url}
              setShowImageModal={setShowModal}
              type="video"
            />
          )}
          {showImageModal.show && (
            <ImageModal
              showImageModal={showImageModal.show}
              src={showImageModal.url}
              setShowImageModal={setShowImageModal}
              type="image"
            />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default PropertyComment;
