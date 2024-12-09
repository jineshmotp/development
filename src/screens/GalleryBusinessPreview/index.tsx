import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StatusBar } from 'react-native';
import Gallery, { GalleryRef, RenderItemInfo } from 'react-native-awesome-gallery';
import Video from 'react-native-video';

import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';
import { px } from '@/utils';

import RenderItem from './RenderItem';
import { styles } from './styles';

const GalleryBusinessPreview = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'GALLERY_PREVIEW'>>();
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [imgIndex, setImgIndex] = useState(route?.params?.index);
  const gallery = useRef<GalleryRef>(null);
  const [mounted, setMounted] = useState(false);
  const [infoVisible, setInfoVisible] = useState(true);
  const images = route?.params?.images;
  useEffect(() => {
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
    if (!isFocused) {
      StatusBar.setHidden(false, 'fade');
    }
  }, [isFocused]);
  useEffect(() => {
    setLoad(true);
    const setIndex = async () => {
      const ind = await route?.params?.index;
      setImgIndex(ind);
      setLoad(false);
    };
    setIndex();
  }, [route?.params?.index]);
  const onIndexChange = useCallback(
    (index: number) => {
      isFocused && setImgIndex(index);
    },
    [isFocused]
  );
  const verifyImageOrVideo = data => {
    const temp = /[^\s]+(.*?).(jpg|jpeg|png|gif|JPG|JPEG|PNG|GIF)$/.test(data);
    // console.log("temp", temp);
    return temp;
  };
  const renderItem = ({ item, setImageDimensions }: RenderItemInfo<{ uri: string }>) => {
    return <RenderItem item={item} />;
  };

  const onTap = () => {
    StatusBar.setHidden(infoVisible, 'slide');
    setInfoVisible(!infoVisible);
  };
  return (
    // <ModalWrapper visible={isVisible} onClose={} header={hasHeader}>
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      {infoVisible && (
        <RNView
          style={Platform.select({
            android: {
              position: 'absolute',
              top: px(30),
              zIndex: 3000,
            },
            ios: {
              position: 'absolute',
              top: px(30),
              zIndex: 3000,
            },
          })}>
          {route?.params?.hasHeader ? (
            <HeaderBar
              backPress={() => navigation.goBack()}
              label={`${route?.params?.headerName ? route?.params?.headerName : 'Gallery'} ( ${imgIndex + 1} of ${images?.length})`}
              shadow={false}
            />
          ) : (
            <RNView></RNView>
          )}
        </RNView>
      )}
      {load ? (
        <RNView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <RNText style={{ color: 'black' }}>Loading...</RNText>
        </RNView>
      ) : (
        <Gallery
          ref={gallery}
          data={images}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          initialIndex={imgIndex}
          numToRender={2}
          doubleTapInterval={150}
          onIndexChange={onIndexChange}
          onSwipeToClose={() => navigation.goBack()}
          loop={true}
          onTap={onTap}
          // loop
          onScaleEnd={scale => {
            if (scale < 0.8) {
              navigation.goBack();
            }
          }}
          // disableVerticalSwipe={true}
          // style={{ height: '90%' }}
          containerDimensions={styles.containerDimension}
        />
      )}
      {/* {infoVisible && images?.length !== 1 && (
        <Animated.View
          entering={mounted ? FadeInDown.duration(250) : undefined}
          exiting={FadeOutDown.duration(250)}
          style={[styles.toolbar, styles.bottomToolBar]}>
          <RNView style={styles.buttonsContainer}>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => setImgIndex(imgIndex === 0 ? images?.length - 1 : imgIndex - 1)}>
              <AntDesign name="leftcircleo" size={40} color={ColorTheme.primary} />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.textContainer}
              onPress={() => setImgIndex(imgIndex === images?.length - 1 ? 0 : imgIndex + 1)}>
              <AntDesign name="rightcircleo" size={40} color={ColorTheme.primary} />
            </TouchableOpacity>
          </RNView>
        </Animated.View>
      )} */}
    </Container>
    // </ModalWrapper>
  );
};

export default GalleryBusinessPreview;
