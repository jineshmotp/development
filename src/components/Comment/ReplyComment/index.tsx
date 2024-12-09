import React from 'react';
import { TouchableOpacity } from 'react-native';

import moment from 'moment';

import DefaultProfile from '@/components/common/DefaultProfile';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  item?: any;
  setshowBottomSheetReply?: (val) => void;
  setData?: (val) => void;
};

const ReplyComment: React.FC<Props> = ({ item, setshowBottomSheetReply, setData }) => {
  return (
    <TouchableOpacity
      onLongPress={() => {
        setshowBottomSheetReply(true);
        setData(item);
      }}
      style={styles.topView}>
      {item?.profile_pic ? (
        <RNImage
          source={{
            uri: item?.profile_pic,
          }}
          style={styles.profileImg}
        />
      ) : (
        <DefaultProfile username={item?.fname} viewStyle={styles.defaultprofile} textStyle={styles.defaultText} />
      )}
      <RNView style={{ paddingLeft: 5 }}>
        <RNView style={styles.commentHead}>
          <RNText style={styles.nameCommentstyle}>{item?.fname}</RNText>
          <RNText style={styles.parentComment}>{item?.comment}</RNText>
        </RNView>
        <RNView style={styles.footerView}>
          <TouchableOpacity style={{ marginRight: 15 }}>
            <RNText style={styles.timetext}>{null}</RNText>
          </TouchableOpacity>
          {/* <TouchableOpacity
                          style={{ marginRight: 15 }}
                          onPress={() => {
                            setIsReply(true);
                            setparentCommentId({
                              name: item?.user_data?.fname,
                              parant_id: item?._id,
                            });
                            textInputRef?.current?.focus();
                          }}
                        >
                          <Text
                            style={{
                              fontWeight: "300",
                              fontSize: SIZES.small,
                              lineHeight: SIZES.medium18,
                              padding: 5,
                            }}
                          >
                            Reply
                          </Text>
                        </TouchableOpacity> */}
          <TouchableOpacity>
            <RNText style={styles.timetext}>{moment(item?.createdAt).format('hh:mm A')}</RNText>
          </TouchableOpacity>
        </RNView>
      </RNView>
    </TouchableOpacity>
  );
};

export default ReplyComment;
