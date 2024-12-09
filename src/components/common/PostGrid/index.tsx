import React from 'react';
import { TouchableOpacity } from 'react-native';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import CommonImageComp from '../CommonImageComp';
import { styles } from './styles';

type Props = {
  imageArr?: string[];
  onPress?: () => void;
  type?: string;
};

const PostGrid: React.FC<Props> = ({ imageArr = [], onPress, type }) => {
  return (
    <RNView style={styles.showMoreContainer}>
      <RNView style={styles.morethanCouple}>
        {/* IF IMAGE IS 2 OR MORE RENDER THIS */}
        {imageArr?.length >= 2 &&
          imageArr?.slice(0, 2).map((item, i) => {
            return (
              <CommonImageComp
                key={i}
                imgIndex={i}
                item={item}
                close={false}
                imgStyles={styles.userPostView}
                allImages={imageArr}
              />
            );
          })}
        {/* IF IMAGE IS 1 OR LESS */}
        {imageArr?.length === 1 && (
          <CommonImageComp
            item={imageArr[0]}
            imgIndex={0}
            close={false}
            imgStyles={styles.userPostImage}
            allImages={imageArr}
          />
        )}
        {imageArr?.length === 0 && type === 'property' && (
          <CommonImageComp
            item={'https://nearluk-media.s3.ap-south-1.amazonaws.com/pexels-binyamin-mellish-186077726588.jpg'}
            close={false}
            imgStyles={styles.userPostImage}
            allImages={imageArr}
            imgIndex={0}
          />
        )}
      </RNView>
      {type === 'general' ? (
        <RNView
          style={[
            styles.galleryView,
            {
              justifyContent: imageArr?.length > 2 ? 'flex-start' : 'space-between',
              gap: imageArr?.length <= 2 ? 0 : 5,
            },
          ]}>
          {/* IF IMAGES ARE MORE THAN 3 THEN RENDER THIS */}
          {imageArr?.length >= 3 &&
            imageArr?.slice(2, 3).map((item, i) => {
              return (
                <CommonImageComp
                  key={i}
                  imgIndex={2}
                  item={item}
                  close={false}
                  imgStyles={styles.userImage}
                  allImages={imageArr}
                />
              );
            })}
          {/* IF IMAGES ARE MORE THAN 3 THEN SHOW + 3 ON LAST IMAGE UI */}
          {imageArr?.length > 3 && (
            <TouchableOpacity style={styles.absoluteContainer} onPress={onPress}>
              <RNText style={styles.previewText}>{`+ ${imageArr?.length - 3}`}</RNText>
            </TouchableOpacity>
          )}
        </RNView>
      ) : (
        <RNView
          style={[
            styles.galleryView,
            {
              justifyContent: imageArr?.length > 2 ? 'flex-start' : 'space-between',
              gap: imageArr?.length <= 2 ? 0 : 5,
            },
          ]}>
          {/* IF IMAGES ARE MORE THAN 3 THEN RENDER THIS */}
          {imageArr?.length === 3 &&
            imageArr?.slice(2, 3).map((item, i) => {
              return (
                <CommonImageComp
                  key={i}
                  imgIndex={2}
                  item={item}
                  close={false}
                  imgStyles={styles.userImage}
                  allImages={imageArr}
                />
              );
            })}
          {imageArr?.length > 3 &&
            imageArr?.slice(2, imageArr?.length >= 5 ? 4 : imageArr?.length).map((item, i) => {
              return (
                <CommonImageComp
                  key={i}
                  item={item}
                  close={false}
                  imgStyles={styles.additionalImage}
                  allImages={imageArr}
                  imgIndex={2 + i}
                />
              );
            })}
          {/* IF IMAGES ARE MORE THAN 3 THEN SHOW + 3 ON LAST IMAGE UI */}
          {imageArr?.length >= 5 && (
            <TouchableOpacity style={styles.absoluteContainer} onPress={onPress}>
              <RNText style={styles.previewText}>{`${imageArr?.length - 5}+`}</RNText>
            </TouchableOpacity>
          )}
        </RNView>
      )}
    </RNView>
  );
};

export default PostGrid;
