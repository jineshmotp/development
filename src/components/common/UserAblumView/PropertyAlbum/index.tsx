import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { isArray } from '@/constants/function/isArray';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

import CommonImageComp from '../../CommonImageComp';

type Props = {
  item?: any[];
};
const PropertyAlbum: React.FC<Props> = ({ item }) => {
  // console.log('item+++++++', item);
  // return item?.data?.map((ele, ind) => {
  const imageArr = item?.gallery?.map(ele => {
    return ele?.url;
  });
  // console.log('imageArrimageArr', imageArr);
  return isArray(imageArr) ? (
    <TouchableOpacity style={styles.itemContainer}>
      <CommonImageComp
        item={
          item?.gallery[0]?.url ||
          'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/rn_image_picker_lib_temp_ac7f678e-ec94-45bb-9a35-3db009ed69d5007244.jpg'
        }
        imgStyles={styles.image}
        close={false}
        imgIndex={0}
        allImages={imageArr}
      />
      <RNText style={styles.textStyle}>{item?.property_name}</RNText>
      <RNText style={styles.text}>{`${item?.gallery?.length}  Items`}</RNText>
    </TouchableOpacity>
  ) : (
    <RNView></RNView>
  );
  // });
};

export default PropertyAlbum;

const styles = StyleSheet.create({
  itemContainer: {
    width: deviceWidth / 2.2,
    height: deviceWidth / 1.9,
    padding: 10,
  },
  image: {
    flex: 1,
  },
  textStyle: {
    fontSize: SIZES.small14,
    color: 'black',
    fontWeight: '500',
    lineHeight: SIZES.large,
  },
  text: {
    fontSize: SIZES.small,
    color: ColorTheme.nearLukGray,
  },
});
