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
  onPressDeActivate?: (data: any) => void;
  onPressReActivate?: (data: any) => void;
  onPressReNewProp?: (data: any) => void;
  userId?: string;
  type?: string;
  renewProp?: boolean;
  ableToHide?: boolean;
};

const PropBottomSheet: React.FC<Props> = ({
  showBottomSheet,
  setshowBottomSheet,
  onPressDelete,
  data,
  onPressEdit,
  onPressDeActivate,
  onPressReActivate,
  onPressReNewProp,
  userId,
  type,
  renewProp = false,
  ableToHide = false,
}) => {
  // console.log('PropBottomSheet++++++++++', showBottomSheet);
  return (
    <RNView>
      <BottomSheetWrapper
        openSheet={showBottomSheet}
        onClose={() => setshowBottomSheet(false)}
        snapPoint={type === 'active' ? px(35) : px(15)}
        dragIndicator={false}>
        <>
          {type === 'active' ? (
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
                <RNView style={styles.optView}>
                  <RNText style={styles.textStyle}>Edit property</RNText>
                </RNView>
              </ActionsheetItem>
              <ActionsheetItem
                onPress={() => {
                  setshowBottomSheet(!showBottomSheet);
                  onPressDeActivate(data);
                }}
                style={styles.actionSheetItem}>
                <RNView style={styles.imgMain}>
                  {/* <RNImage
                  style={styles.imgStyle}
                  source={require("@/assets/images/userProfile/visible.png")}
                /> */}
                  <Entypo name={'reply'} size={20} color="black" />
                </RNView>

                <RNView style={styles.optView}>
                  <RNText style={styles.textStyle}>De-activate Property</RNText>
                </RNView>
              </ActionsheetItem>

              <ActionsheetItem
                onPress={() => {
                  setshowBottomSheet(!showBottomSheet);
                  onPressDelete(data?._id);
                }}
                style={styles.actionSheetItem}>
                <RNView style={styles.imgMain}>
                  {/* <RNImage
                  style={styles.imgStyle}
                  source={require("@/assets/images/userProfile/visible.png")}
                /> */}
                  <Entypo name={'trash'} size={20} color="black" />
                </RNView>

                <RNView style={styles.optView}>
                  <RNText style={styles.textStyle}>Delete Property</RNText>
                </RNView>
              </ActionsheetItem>
            </>
          ) : (
            <>
              {renewProp ? (
                <ActionsheetItem
                  onPress={() => {
                    setshowBottomSheet(!showBottomSheet);
                    onPressReNewProp(data);
                  }}
                  style={styles.actionSheetItem}>
                  <RNView style={styles.imgMain}>
                    <Entypo name={'reply'} size={20} color="black" />
                  </RNView>
                  <RNView style={styles.optView}>
                    <RNText style={styles.textStyle}>Re-activate Property</RNText>
                  </RNView>
                </ActionsheetItem>
              ) : (
                ableToHide && (
                  <ActionsheetItem
                    onPress={() => {
                      setshowBottomSheet(!showBottomSheet);
                      onPressReActivate(data);
                    }}
                    style={styles.actionSheetItem}>
                    <RNView style={styles.imgMain}>
                      <Entypo name={'reply'} size={20} color="black" />
                    </RNView>
                    <RNView style={styles.optView}>
                      <RNText style={styles.textStyle}>Re-activate Property</RNText>
                    </RNView>
                  </ActionsheetItem>
                )
              )}
            </>
          )}

          <ActionsheetItem>
            <RNView style={styles.imgMainBottom}></RNView>
            <RNView style={styles.optView}></RNView>
          </ActionsheetItem>
        </>
      </BottomSheetWrapper>
    </RNView>
  );
};

export default PropBottomSheet;
