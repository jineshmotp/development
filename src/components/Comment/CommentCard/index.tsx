import React from 'react';
import { TouchableOpacity } from 'react-native';

import moment from 'moment';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  setshowBottomSheet?: (val) => void;
  setData?: (val) => void;
  setIsReply?: (val) => void;
  getAllCommentByParanetId?: (data) => void;
  setparentCommentId?: (data) => void;
  item?: any;
};

const CommentCard: React.FC<Props> = ({
  item,
  setData,
  setshowBottomSheet,
  setparentCommentId,
  getAllCommentByParanetId,
  setIsReply,
}) => {  
  return (
    <TouchableOpacity
      onLongPress={() => {
        setshowBottomSheet(true);
        setData(item);
      }}>
      <RNView style={styles.commentDetail}>
        <RNText style={styles.nameCommentstyle}>{item?.user_data?.fname+' '+item?.user_data?.lname}</RNText>
        <RNText style={styles.parentComment}>{item?.comment}</RNText>
      </RNView>
      <RNView style={styles.footerView}>
        <TouchableOpacity style={{ marginRight: 15 }}>
          <RNText style={styles.timetext}>{null}</RNText>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ marginRight: 15 }}
          onPress={() => {
            if (item?.replyCount > 0) {
              getAllCommentByParanetId({
                pageSize: '10',
                pageNumber: '1',
                comment_id: item?._id,
              });
              setparentCommentId({
                name: item?.user_data?.fname,
                parant_id: item?._id,
              });
              setIsReply(true);
            } else {
              setparentCommentId({
                name: item?.user_data?.fname,
                parant_id: item?._id,
              });
              setIsReply(true);
            }
          }}>
          <RNText style={styles.timetext}>{`Reply ${item?.replyCount ? item?.replyCount : ''}`}</RNText>
        </TouchableOpacity>
        <TouchableOpacity>
          <RNText style={styles.timetext}>
            {/* {moment(item?.createdAt).format("hh:mm A")} */}
            {/* {moment(item?.createdAt).format("MMMM Do, YYYY")} */}
            {moment(new Date()).diff(item?.createdAt, 'days')
              ? moment(new Date()).diff(item?.createdAt, 'days') + 'ago'
              : moment(item?.createdAt).format('hh:mm A')}
          </RNText>
        </TouchableOpacity>
      </RNView>
    </TouchableOpacity>
  );
};

export default CommentCard;
