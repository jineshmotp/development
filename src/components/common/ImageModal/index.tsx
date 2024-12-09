import React, { createRef, memo, useRef, useState } from 'react';
import { Animated, TouchableOpacity, View } from 'react-native';
import { GestureHandlerRootView, PanGestureHandler, PinchGestureHandler, State } from 'react-native-gesture-handler';
import Entypo from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';

import { Modal, ModalContent } from '@gluestack-ui/themed';

import RNView from '@/custom/RNView';
import { deviceHeight, deviceWidth } from '@/utils';

import { styles } from './styles';

type ImageModalState = {
  show: boolean;
  url: string;
};
type Props = {
  showImageModal?: boolean;
  setShowImageModal?: React.Dispatch<React.SetStateAction<ImageModalState>>;
  type?: 'image' | 'video';
  src?: string;
};
const ImageModal: React.FC<Props> = ({ showImageModal, setShowImageModal, type, src }) => {
  const [panEnabled, setPanEnabled] = useState(false);

  const scale = useRef(new Animated.Value(1)).current;
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  const pinchRef = createRef();
  const panRef = createRef();

  const onPinchEvent = Animated.event(
    [
      {
        nativeEvent: { scale },
      },
    ],
    { useNativeDriver: true }
  );

  const onPanEvent = Animated.event(
    [
      {
        nativeEvent: {
          translationX: translateX,
          translationY: translateY,
        },
      },
    ],
    { useNativeDriver: true }
  );

  const handlePinchStateChange = ({ nativeEvent }) => {
    if (nativeEvent.state === State.ACTIVE) {
      setPanEnabled(true);
    }

    const nScale = nativeEvent.scale;
    if (nativeEvent.state === State.END) {
      if (nScale < 1) {
        Animated.spring(scale, {
          toValue: 1,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateX, {
          toValue: 0,
          useNativeDriver: true,
        }).start();
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
        }).start();

        setPanEnabled(false);
      }
    }
  };

  return (
    <Modal
      isOpen={showImageModal}
      onClose={() => {
        setShowImageModal({ show: false, url: '' });
      }}
      height={deviceHeight}>
      <ModalContent height={deviceHeight} width={deviceWidth}>
        <RNView>
          <TouchableOpacity
            style={styles.imageContainer}
            onPress={() => {
              setShowImageModal({ show: false, url: '' });
            }}>
            <Entypo name="cross" size={34} color="black" />
          </TouchableOpacity>
          {type === 'image' ? (
            <RNView>
              <GestureHandlerRootView>
                <PanGestureHandler
                  onGestureEvent={onPanEvent}
                  ref={panRef}
                  simultaneousHandlers={[pinchRef]}
                  enabled={panEnabled}
                  failOffsetX={[-1000, 1000]}
                  shouldCancelWhenOutside>
                  <Animated.View>
                    <PinchGestureHandler
                      ref={pinchRef}
                      onGestureEvent={onPinchEvent}
                      simultaneousHandlers={[panRef]}
                      onHandlerStateChange={handlePinchStateChange}>
                      <Animated.Image
                        source={{
                          uri: src,
                        }}
                        style={{
                          width: deviceWidth,
                          height: deviceHeight,
                          transform: [{ scale }, { translateX }, { translateY }],
                        }}
                        resizeMode="contain"
                      />
                    </PinchGestureHandler>
                  </Animated.View>
                </PanGestureHandler>
              </GestureHandlerRootView>
            </RNView>
          ) : (
            <RNView></RNView>
            // <Video
            //   source={{
            //     uri: src,
            //   }}
            //  controls
            //   style={{
            //     height: deviceHeight / 1.03,
            //     width: deviceWidth,
            //   }}
            //   // resizeMode={ResizeMode.CONTAIN}
            // />
          )}
        </RNView>
      </ModalContent>
    </Modal>
  );
};

export default memo(ImageModal);
