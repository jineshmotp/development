import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

import CommonImageComp from '../../CommonImageComp';

type Props = {
  item?: any[];
};
type AlbumProps = {
  _id?: string;
  uploaded_date?: string;
  url?: string;
};

type AlbumImg = {
  item?: AlbumProps;
  key?: number;
  allPics?: string[];
};

const AlbumImage: React.FC<AlbumImg> = ({ item, key, allPics }) => {
  const basedOnPictures = () => {
    switch (allPics.length) {
      case 1:
        return styles.image1;
      case 2:
        return styles.image2;
      case 3:
        return styles.image3;
      case 4:
        return styles.image;
      default:
        return styles.image;
    }
  };
  return (
    <RNView>
      <CommonImageComp
        item={item?.url}
        imgStyles={basedOnPictures()}
        close={false}
        imgIndex={key}
        allImages={allPics}
      />
    </RNView>
  );
};
const GridPhotos: React.FC<Props> = ({ item }) => {
  const imageArr = item?.data?.map(itm => {
    return itm?.url;
  });

  return (
    <TouchableOpacity style={styles.itemContainer}>
      <RNView style={styles.gridImgs}>
        {item?.data?.slice(0, imageArr?.length > 4 ? 4 : imageArr?.length)?.map((ele, ind) => {
          return <AlbumImage item={ele} key={ind} allPics={imageArr} />;
        })}
      </RNView>
      <RNText style={styles.textStyle}>{item?.property_name}</RNText>
      <RNText style={styles.text}>{`${item?.data?.length}  Items`}</RNText>
    </TouchableOpacity>
  );
};

export default GridPhotos;

const styles = StyleSheet.create({
  itemContainer: {
    width: deviceWidth / 2.2,
    height: deviceWidth / 1.9,
    // padding: 10,
  },
  textStyle: {
    fontSize: SIZES.small14,
    color: 'black',
    fontWeight: '500',
    lineHeight: SIZES.large,
  },
  image: {
    width: px(80),
    height: px(80),
    margin: 1,
  },
  image1: {
    width: px(160),
    height: px(160),
    margin: 1,
  },
  image2: {
    width: px(80),
    height: px(160),
    margin: 1,
  },
  image3: {
    width: px(80),
    height: px(80),
    margin: 1,
  },
  gridImgs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: deviceWidth / 2.2,
  },
  text: {
    fontSize: SIZES.small,
    color: ColorTheme.nearLukGray,
  },
});
