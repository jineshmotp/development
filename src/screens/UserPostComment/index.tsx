import React, { useEffect, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, TextInput } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Entypo from 'react-native-vector-icons/Entypo';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import BottomSheetForCommentPage from '@/components/Comment/BottomSheetForCommentPage';
import BottomsheetForReplyComment from '@/components/Comment/BottomsheetForReplyComment';
import CommentCard from '@/components/Comment/CommentCard';
import CommentInputAction from '@/components/Comment/CommentInputAction';
import ReplyComment from '@/components/Comment/ReplyComment';
import ReplyInputCloser from '@/components/Comment/ReplyInputCloser';
import DefaultProfile from '@/components/common/DefaultProfile';
import HeaderBar from '@/components/common/HeaderBar';
import UserPostCard from '@/components/common/UserPostCard';
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

// import { homePropertyAction } from '../../home/redux/action';
import { styles } from './styles';

const UserPostComment = () => {
  const selectedUserData = useAppSelector(getUserData);
  const route = useRoute<RouteProp<RootStackParamList, 'USER_POST_COMMENTS'>>();
  const navigation = useNavigation();

  const dispatch = useAppDispatch();
  type editType = {
    comment_id: string;
    comment: string;
  };
  const toast = useToast();
  const [item, setItem] = useState(route?.params?.data);
  const [replyData, setReplyData] = useState([]);
  const [isReply, setIsReply] = useState(false);
  const [editReply, seteditReply] = useState(false);
  const [openReply, setopenReply] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState<string>('');
  const [replyComment, setreplyComment] = useState<string>('');
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
  const [recallComments, setrecallComments] = useState(false);
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
  console.log('route?.params?.data?._id', route?.params?.data);
  type payloadProp = {
    pageSize?: string;
    pageNumber?: string;
    post_id: string;
  };

  const getCommentsBypost = async (payload: payloadProp) => {
    // console.log("payload===", payload);
    const params = new URLSearchParams(payload).toString();
    commentsById(params).then(response => {
      // console.log('response===', response?.data);
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

  // FUNCTION FOR MAKE COMMENT FOR POST
  const addCommentsBypost = async (payload: commentProp) => {
    // console.log("payload===+++=", payload);
    addCommentById(payload).then(response => {
      // console.log("response========+++", response);
      if (response?.data?.status) {
        setComments([
          {
            ...response.data.data,
            replyCount: 0,
            user_data: {
              _id: selectedUserData?._id,
              fname: selectedUserData?.fname,
              lname: selectedUserData?.lname,
              profile_pic: selectedUserData?.profile_pic,
            },
          },
          ...comments,
        ]);
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
        setrecallComments(!recallComments);
        // setComments([{...comments[0],replyCount:comments[0].replyCount +1},]);
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
      // console.log('handleDeleteCommentById', response?.data);
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
      // console.log('handleDeleteCommentById', response?.data);
      if (response?.data?.status) {
        const commentsData = replyData.filter(item => {
          return item?._id !== id;
        });
        setReplyData(commentsData);
        setrecallComments(!recallComments);
        if (commentsData.length === 0) {
          setopenReply(false);
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
  // CALL FUNCTION WHEN LOAD UI
  useEffect(() => {
    getCommentsBypost({
      pageSize: '20',
      pageNumber: '1',
      post_id: route?.params?.data?._id,
    });
  }, [route?.params?.data?._id, recallComments]);

  const handleUserPostNavigation = () => {};
  // const handleUserPostNavigation = (item: any) => {
  //   // console.log(
  //   //   "item?.user_data?._id === selectedUserData?._id",
  //   //   // item?.user_data?._id === selectedUserData?._id,
  //   //   item
  //   // );
  //   if (item?.user_data?._id === selectedUserData?._id) {
  //     navigation.navigate(ROUTES.UserProfileDetails);
  //   } else {
  //     navigation.navigate(ROUTES.OtherUserProfileDetails, {
  //       id: item?.user_data?._id,
  //     });
  //   }
  // };

  // console.log('comments======================', item);

  return (
    <Container hasHeader={true} isTab={false} backgroundColor="white">
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          contentContainerStyle={styles.scroll}
          showsVerticalScrollIndicator={false}
          // style={{
          //   width: deviceWidth,
          //   // alignItems: 'center',
          //   flex: 1,
          //   backgroundColor: 'white',
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
              {/* USER POST SECTION */}
              <UserPostCard
                data={item}
                isFromHomeBusiness={route?.params?.isFromHomeBusiness}
                isFromBuilder={route?.params?.isFromBuilder}
                key={route?.params?.key}
                srNumber={route?.params?.srNumber}
                onPress={() => handleUserPostNavigation(item)}
              />
            </RNView>
            <ScrollView nestedScrollEnabled style={styles.commentsScroll} showsVerticalScrollIndicator={false}>
              {/* LIST OF COMMENTS SECTION HARE */}
              {comments?.length ? (
                comments?.map((item, ind) => {
                  return (
                    <RNView key={ind} style={styles.topView}>
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
                        {/* REPLY COMMNET START HERE */}
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
                          user: selectedUserData?._id,
                          post_id: route?.params?.data?._id,
                          comment: replyComment,
                          parent_id: parentCommentId?.parant_id,
                        });
                        setIsReply(false);
                        setopenReply(true);
                      }}
                      onPressSubmit={() => {
                        replyCommentFn({
                          user: route?.params?.data?.user_data?._id,
                          post_id: route?.params?.data?._id,
                          comment: replyComment,
                          parent_id: parentCommentId?.parant_id,
                        });
                        setIsReply(false);
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
              ) : editReply ? (
                <>
                  <ReplyInputCloser name={parentCommentId?.name} setIsReply={val => setIsReply(val)} />
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
                    onPressReplySubmit={() => {
                      addCommentsBypost({
                        user: selectedUserData._id,
                        post_id: route?.params?.data?._id,
                        comment: commentText,
                      });
                    }}
                    onPressSubmit={() => {
                      addCommentsBypost({
                        user: selectedUserData._id,
                        post_id: route?.params?.data?._id,
                        comment: commentText,
                      });
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
              )}
            </RNView>
          </RNView>

          {/* BOTTOM SHEET FOR COMMENT SECTION */}
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

          {/* BOTTOMSHEET FOR REPLY COMMENT SECTION */}
          <BottomsheetForReplyComment
            showBottomSheet={showBottomSheetReply}
            setshowBottomSheet={() => setshowBottomSheetReply(false)}
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
            // onPressReply={data => {
            //   setparentCommentId({
            //     name: data?.user_data?.fname,
            //     parant_id: data?._id,
            //   });
            //   setIsReply(true);
            // }}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </Container>
  );
};

export default UserPostComment;
