import React from 'react';
import Entypo from 'react-native-vector-icons/Entypo';

import { ActionsheetItem } from '@gluestack-ui/themed';

import BottomSheetWrapper from '@/components/common/BottomSheetWrapper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

import { styles } from './styles';

type editType = {
  comment_id: string;
  comment: string;
};
type Props = {
  showBottomSheet?: boolean;
  setshowBottomSheet?: (val) => void;
  onPressDelete?: (id: string) => void;
  data?: any;
  onPressEdit?: (data: editType) => void;
  onPressReply?: (data: any) => void;
  userId?: string;
};

const BottomsheetForReplyComment: React.FC<Props> = ({
  showBottomSheet,
  setshowBottomSheet,
  onPressDelete,
  data,
  onPressEdit,
  onPressReply,
  userId,
}) => {
  // console.log("BottomsheetForReplyComment", data);
  return (
    <RNView>
      <BottomSheetWrapper
        openSheet={showBottomSheet}
        onClose={() => setshowBottomSheet(false)}
        snapPoint={userId === data?.userId ? px(15) : px(8)}
        dragIndicator={false}>
        {userId === data?.userId && (
          <>
            <ActionsheetItem
              onPress={() => {
                setshowBottomSheet(!showBottomSheet);
                onPressEdit({
                  comment_id: data?._id,
                  comment: data?.comment,
                });
              }}
              style={styles.actionSheetItem}>
              <RNView style={styles.imgMain}>
                <RNImage style={styles.imgStyle} source={require('@/assets/images/business/pencil.png')} />
              </RNView>
              <RNText style={styles.textStyle}>Edit comment</RNText>
            </ActionsheetItem>

            <ActionsheetItem
              onPress={() => {
                onPressDelete(data?._id);
                setshowBottomSheet(!showBottomSheet);
              }}
              style={styles.actionSheetItem}>
              <RNView style={styles.imgMain}>
                {/* <RNImage
                      style={styles.imgStyle}
                      source={require("@/assets/images/userProfile/visible.png")}
                    /> */}
                <Entypo name={'trash'} size={20} color="black" />
              </RNView>
              <RNText style={styles.textStyle}>Delete comment</RNText>
            </ActionsheetItem>
          </>
        )}
        {/* <ActionsheetItem
          onPress={() => {
            setshowBottomSheet(!showBottomSheet);
            onPressReply(data);
          }}
          style={styles.actionSheetItem}>
          <RNView style={styles.imgMain}>
            <RNImage style={styles.imgStyle} source={require('@/assets/images/userProfile/visible.png')} />
          </RNView>
          <RNText style={styles.textStyle}>Reply</RNText>
        </ActionsheetItem> */}
        {/* <ActionsheetItem
              onPress={() => {
                setshowBottomSheet(!showBottomSheet);
              }}
              style={styles.actionSheetItem}
            >
              <RNView style={styles.imgMain}>
                <RNImage
                  style={styles.imgStyle}
                  source={require("@/assets/images/userProfile/visible.png")}
                />
              </RNView>
              <RNText style={styles.textStyle}>Copy</RNText>
            </ActionsheetItem> */}
      </BottomSheetWrapper>
    </RNView>
  );
};

export default BottomsheetForReplyComment;
