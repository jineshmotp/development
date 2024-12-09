import React, { memo } from 'react';
import { ActivityIndicator, TouchableOpacity } from 'react-native';
import { Image } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Video from 'react-native-video';

import { useNavigation } from '@react-navigation/native';

import { imagevideoextention } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

interface IncrementDecrementProp {
  heroimage?: boolean;
  text?: string;
  handleClick?: any;
  item?: any;
  deleteClick?: any;
  featureClick?: any;
  uploadBtn?: any;
  uploadBtnClick?: any;
  loadingImage?: boolean;
  VideoValue?: boolean;
  itemArray?: any;
}
const MediaBoxComponent: React.FC<IncrementDecrementProp> = ({
  heroimage,
  text,
  handleClick,
  item,
  deleteClick,

  featureClick,
  uploadBtn,
  uploadBtnClick,
  loadingImage,
  VideoValue,
  itemArray,
}) => {
  const navigation = useNavigation();

  //  onPress={() => {
  //             navigation.navigate('GALLERY_PREVIEW', {
  //               images: itemArray,
  //               index: 0,
  //               hasHeader: true,
  //             });
  //           }}

  return (
    <>
      <RNView style={styles.container}>
        <>
          {item ? (
            <TouchableOpacity style={styles.uploadBox} onPress={handleClick}>
              {imagevideoextention(item?.url) ? (
                <Image
                  source={{ uri: item?.url }}
                  style={styles.imageStyle} // Ensure you have a defined style for the image
                />
              ) : (
                <Video source={{ uri: item?.url }} resizeMode="cover" style={styles.fileStyle} />
              )}

              {/* <RNText style={styles.uploadBoxText}>ADD +</RNText> */}

              <TouchableOpacity style={styles.deleteCrossButton} onPress={deleteClick}>
                <Fontisto name="close-a" size={10} color={ColorTheme.white} />
              </TouchableOpacity>

              {heroimage ? (
                <TouchableOpacity style={styles.uploadBoxWithIcon} onPress={featureClick}>
                  <Entypo name="heart" size={25} color={ColorTheme.black} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.uploadBoxWithIcon} onPress={featureClick}>
                  <Entypo name="heart-outlined" size={25} color={ColorTheme.black} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.uploadBox} onPress={uploadBtnClick} disabled={loadingImage}>
              {loadingImage ? (
                <ActivityIndicator />
              ) : (
                <RNText style={styles.uploadBoxText}>
                  Upload <Entypo name="upload-to-cloud" size={15} color={ColorTheme.black} />
                </RNText>
              )}
            </TouchableOpacity>
          )}
        </>

        <>
          {/* {VideoValue !== true && uploadBtn !== true ? (
            heroimage ? (
              <RNView style={[styles.cardViewRightView]}>
                <TouchableOpacity style={styles.OpenContainer} onPress={featureClick}>
                  <RNView style={styles.OpenViewLeft}>
                    <RNView style={[styles.colorStyle]} />
                  </RNView>

                  <RNView style={styles.OpenViewRight}>
                    <RNText style={styles.opencloseText}>Hero</RNText>
                  </RNView>
                </TouchableOpacity>
              </RNView>
            ) : (
              <RNView style={[styles.cardViewRightView]}>
                <TouchableOpacity style={styles.OpenContainerClose} onPress={featureClick}>
                  <RNView style={styles.OpenViewLeft}>
                    <RNText style={styles.opencloseText}>Hero</RNText>
                  </RNView>

                  <RNView style={styles.OpenViewRight}>
                    <RNView style={[styles.colorStyle, { backgroundColor: '#333333', borderColor: '#333333' }]} />
                  </RNView>
                </TouchableOpacity>
              </RNView>
            )
          ) : (
            <RNView style={[styles.cardViewRightView]} />
          )} */}
        </>
      </RNView>
    </>
  );
};

export default memo(MediaBoxComponent);
