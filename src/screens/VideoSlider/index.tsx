import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Platform, StatusBar, TouchableOpacity } from 'react-native';
import Gallery, { GalleryRef, RenderItemInfo } from 'react-native-awesome-gallery';
import { FlatList } from 'react-native-gesture-handler';
import Animated, { FadeInDown, FadeInUp, FadeOutDown, FadeOutUp } from 'react-native-reanimated';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Video from 'react-native-video';

import { RouteProp, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

import { styles } from './styles';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Feather';
import { useLikeStoryMutation, useShareStoryMutation } from '@/redux/home/homeService';

const VideoSlider = () => {
  const route = useRoute<RouteProp<RootStackParamList, 'VIDEO_SLIDER'>>();
  const selectedUser = useAppSelector(getUserData);
  const [load, setLoad] = useState(false);
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [imgIndex, setImgIndex] = useState(0);
  const [mounted, setMounted] = useState(false);
  const gallery = useRef<GalleryRef>(null);
  const [infoVisible, setInfoVisible] = useState(true);
  const [videoList, setVideoList] = useState(route?.params?.data?.stories);
  const [totalList,setTotalList] = useState(route?.params?.totalData);
  const [allStories,setAllStories] = useState()
  const [stack, setStack] = useState(0);
  const [isCurrentPlay, setIsCurrentPlay] = useState(true);
  const AllStacks = route?.params?.VideosData;
  const [isMuted, setIsMuted] = useState(false);
  const videoRefs = useRef([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLiked,setIsLiked] = useState(false)
  const [arrayIndex,setArrayIndex] = useState(route?.params?.key )
  const [likeStories] = useLikeStoryMutation()
  const [shareStories] = useShareStoryMutation()
  // console.log('route+++++++++++', JSON.stringify(route?.params?.totalData));
   const flatListRef = useRef(null);

  useEffect(() => {
   // console.log('on data check',JSON.stringify(totalList));
    
    const storiesOfusers = totalList?.reduce((acc, curr) => {
      if (curr && curr.stories) {
        return acc.concat(curr.stories);
    }
    return acc;
    }, []);
    setAllStories(storiesOfusers)
   // console.log('single storyies',route?.params?.data);
    scrollToItem(route?.params?.data?._id,storiesOfusers)
    StatusBar.setBarStyle(isFocused ? 'light-content' : 'dark-content', true);
    if (!isFocused) {
      StatusBar.setHidden(false, 'fade');
    }  
  }, [isFocused]);

  const scrollToItem = (itemId, array) => {
    // Find the index of the item with the given ID
    const index = array?.findIndex((item) => item?._id === itemId);
  
    if (route?.params?.key !== -1) {
      // Scroll to the found index
      setTimeout(() => {
        flatListRef.current?.scrollToIndex({
          index: route?.params?.key,
          animated: true, // Set to false if you want to scroll without animation
        });
      }, 500); // Adding a delay to ensure FlatList has rendered
    } else {
     // console.log('Index not found for item ID:', itemId);
    }
  };

  useEffect(() => {
    setVideoList(route?.params?.data?.stories);
    setStack(route?.params?.key || 0);
  }, [route?.params]);
  // const onIndexChange = useCallback(
  //   (index: number) => {
  //     console.log('index+++++', imgIndex, index, imgIndex > index);
  //     if (imgIndex > index) {
  //       console.log('first++++', AllStacks?.length < stack);
  //       setLoad(true);
  //       if (AllStacks?.length - 1 < stack) {
  //         setImgIndex(0);
  //         setVideoList(AllStacks[stack + 1]?.stories);
  //         setLoad(false);
  //       } else {
  //         setLoad(false);
  //         setImgIndex(index);
  //       }
  //     }
  //   },
  //   [isFocused]
  // );

  useEffect(() => {
    scrollToItem(route?.params?.data?._id,allStories)

    // console.log('cheking on changeeeeeee',isCurrentPlay);
  }, [allStories]);

  const onViewableItemsChanged = useCallback(
    ({ viewableItems }) => {
      if (viewableItems.length > 0) {
        const newIndex = viewableItems[0].index;

        if (newIndex !== currentIndex) {
          // Pause the previous video
          if (videoRefs.current[currentIndex]) {
            // videoRefs.current[currentIndex].pause();
          }
          // Play the new video
          if (videoRefs.current[newIndex]) {
            // videoRefs.current[newIndex].play();
          }          
          setCurrentIndex(newIndex);
        }
      }
    },
    [currentIndex]
  );

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 100,
  };

  const onProgress = data => {
    setVideoProgress(data.currentTime / duration);
  };

  const onLoad = data => {
    setDuration(data.duration);
  };

  const togglePlayPause = () => {
    const isCurrentlyPlaying = isPlaying;
    setIsPlaying(!isPlaying);
    if (isCurrentlyPlaying) {
     // videoRefs.current[currentIndex]?.pause();
    } else {
      // videoRefs.current[currentIndex]?.play();
    }
  };

const shareStory = (userId,storyId)=>{
  const sharePayload = {
    user:userId,
    post_id:storyId
  }
  shareStories(sharePayload).then(res=>{
    if(res?.data?.status){
      const updatedStories = allStories?.map((story,index) => {
        if (story?._id === storyId) {
          setArrayIndex(index)
          return {
            ...story,
            shareCount:  story?.shareCount + 1
          };
        }
        return story;
      });
      setAllStories(updatedStories);
    }
   
  }).catch(err=>{
    console.log('checking on err',err);
    
  })
}

const likeStory = (userId, storyId) => {
  const likePayload = {
    user: userId,
    post_id: storyId,
  };
  
  likeStories(likePayload)
    .then((res) => {
    //  console.log('res of like',JSON.stringify(res));
      
      if (res?.data?.status) {
        // Find the index of the story that was liked
        const updatedStories = [...allStories]; // Create a copy of the stories
        const storyIndex = updatedStories?.findIndex((story) => story?._id === storyId);
        if (storyIndex !== -1) {
          // Toggle the isLiked status
          const newIsLiked = !updatedStories[storyIndex]?.isLiked;
          updatedStories[storyIndex] = {
            ...updatedStories[storyIndex],
            isLiked: newIsLiked,
            likeCount: newIsLiked
              ? updatedStories[storyIndex]?.likeCount + 1
              : updatedStories[storyIndex]?.likeCount - 1,
          };
          setAllStories(updatedStories);
          setArrayIndex(storyIndex)
          // Update state with modified story
        }
      }
    })
    .catch((err) => {
      console.log('liking of stories', JSON.stringify(err));
    });
};

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const renderItem = ({ item, index }) => {
    const isCurrent = index === currentIndex;
    setIsCurrentPlay(isCurrent);
    // console.log('redddddf', videoList);
    return (
      <RNView style={{ height: deviceHeight, width: deviceWidth, backgroundColor: 'black',marginVertical:px(10) }}>
        <Video
          source={{
            uri: item?.media || 'https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4?_=1',
          }}
          onBuffer={data => console.log('Buffering...', data)}
          style={{
            height: deviceHeight,
            width: deviceWidth,
          }}
          resizeMode="contain"
          paused={!isCurrent || !isPlaying}
          repeat={true}
          onProgress={onProgress}
          onLoad={onLoad}
          muted={isMuted}
          // ref={ref => {
          //   videoRefs.current[index] = ref;
          // }}
        />
        <TouchableOpacity
          style={{ position: 'absolute', top: 65, left: 20 }}
          onPress={()=>{
            navigation.goBack()
          }}
        >
          <Icon name={ 'x'} size={30} color="#FFF" />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', bottom: 90, left: 25 }}
          onPress={togglePlayPause}
        >
          <Icon name={isPlaying ? 'pause' : 'play'} size={30} color="#FFF" />
        </TouchableOpacity>

        <TouchableOpacity
          style={{ position: 'absolute', top: 65, right: 20 }}
          onPress={toggleMute}
        >
          <Icon name={isMuted ? 'volume-x' : 'volume-2'} size={30} color="#FFF" />
        </TouchableOpacity>

        {/* Progress bar */}
        <Slider
          style={{ position: 'absolute',left: 20, right: 20 ,bottom:70 }}
          value={videoProgress}
          minimumValue={0}
          maximumValue={1}
          thumbTintColor="#3333"
          minimumTrackTintColor="#FFF"
          maximumTrackTintColor="#777"
        />
        <RNView style={{ backgroundColor: '#00000000', position: 'absolute', right: 10, bottom: 80 ,justifyContent:'space-evenly'}}>
          
          {'isLiked' in item?
          item?.isLiked ?
         <RNView>
         <TouchableOpacity style={{margin:px(10)}} onPress={()=>{
            likeStory(selectedUser?._id,item?._id)
          }}>
          <FontAwesome name={'heart'} size={30} color="red" />
          </TouchableOpacity>   
          <RNText style={{color:'white',fontSize:px(14),fontWeight:'bold'}}>{`${item?.likeCount} Likes`}</RNText>
     
         </RNView>
            :
            <RNView>
              <TouchableOpacity style={{margin:px(10)}} onPress={()=>{
              likeStory(selectedUser?._id,item?._id)
            }}>
            <Icon name={'heart'} size={30} color="#FFF" />
            </TouchableOpacity>
            <RNText style={{color:'white',fontSize:px(14),fontWeight:'bold'}}>
              {`${item?.likeCount} Likes`}</RNText>

            </RNView>
          :<></>
          
          }

          <TouchableOpacity style={{margin:px(10)}} onPress={() => {}}>
          <Icon name={'message-circle'} size={30} color="#FFF" />
          </TouchableOpacity>

          <TouchableOpacity style={{margin:px(10)}} onPress={() => {
            shareStory(selectedUser?._id,item?._id)
          }}>
          <Icon name={'share-2'} size={30} color="#FFF" />
          </TouchableOpacity>
          <RNText style={{color:'white',fontSize:px(14),fontWeight:'bold'}}>
          {`${item?.shareCount} Share`}</RNText>
        
          <TouchableOpacity style={{margin:px(10)}} onPress={() => {}}>
          <Icon name={'more-vertical'} size={30} color="#FFF" />
          </TouchableOpacity>
        </RNView>
      </RNView>
    );
  };

  const onTap = () => {
    StatusBar.setHidden(infoVisible, 'slide');
    setInfoVisible(!infoVisible);
  };
  const handleNext = () => {
    if (imgIndex + 1 === videoList?.length) {
      if (AllStacks?.length - 1 >= stack) {
        setLoad(true);
        setVideoList(AllStacks[stack + 1 === AllStacks?.length ? stack : stack + 1]?.stories);
        setTimeout(() => {
          // console.log('stack++++++', stack + 1 === AllStacks?.length ? stack : stack + 1);
          setStack(stack + 1 === AllStacks?.length ? stack : stack + 1);
          setLoad(false);
          setImgIndex(0);
        }, 1000);
      } else {
        setImgIndex(0);
      }
    } else {
      // if(videoList?.length)
      setImgIndex(imgIndex + 1);
    }
  };
  const handlePrev = () => {
    if (imgIndex === 0) {
      if (AllStacks?.length - 1 >= stack) {
        setLoad(true);
        setVideoList(AllStacks[stack ? stack - 1 : stack]?.stories);
        setTimeout(() => {
          if (stack >= 0) {
            setStack(stack ? stack - 1 : stack);
          }
          setLoad(false);
          setImgIndex(0);
        }, 1000);
      } else {
        setImgIndex(0);
      }
    } else {
      if (stack === imgIndex) {
        setImgIndex(0);
      } else {
        if (imgIndex === 0) {
          setStack(stack - 1);
          setImgIndex(0);
        } else {
          setImgIndex(imgIndex - 1);
        }
      }
    }
  };

  // console.log('ImgaIndex+++++++', AllStacks[stack]);
  return (
    <Container isTab={false} hasHeader={false} backgroundColor="white">
      {infoVisible && videoList?.length && (
        <RNView
          style={Platform.select({
            android: {
              position: 'absolute',
              top: px(35),
              zIndex: 3000,
            },
            ios: {
              position: 'absolute',
              top: px(50),
              zIndex: 3000,
            },
          })}>
          {/* <HeaderBar
          backPress={() => navigation.goBack()}
          label={`${AllStacks[stack]?.user?.fname} ( ${imgIndex + 1} of ${videoList?.length})`}
        /> */}
          {/* <RNView
            style={{
              backgroundColor: 'rgba(0,0,0,0.5)',
              height: px(50),
              justifyContent: 'center',
              alignItems: 'flex-start',
              width: deviceWidth,
              paddingHorizontal: px(30),
            }}>
            <RNText
              style={{
                fontSize: SIZES.large,
                fontWeight: '500',
                color: 'white',
              }}>
              {AllStacks[stack]?._id === selectedUser?._id ? selectedUser?.fname : AllStacks[stack]?.user?.fname}
            </RNText>
          </RNView> */}
        </RNView>
      )}
      {load ? (
        <RNView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <RNText style={{ color: 'black' }}>Loading...</RNText>
        </RNView>
      ) : (
         allStories?.length>0 ? 
         <FlatList
         ref={flatListRef}
         data={allStories}
         renderItem={renderItem}
         keyExtractor={(item) => item?._id}
         initialScrollIndex={arrayIndex || 0}
         onViewableItemsChanged={onViewableItemsChanged}
         maxToRenderPerBatch={1}
         windowSize={allStories?.length}
         onScrollToIndexFailed={info => {
          const wait = new Promise(resolve => setTimeout(resolve, 500));
          wait.then(() => {
            flatListRef.current?.scrollToIndex({ index: info.index, animated: false });
          });
        }}
         />
      //    <FlatList
      //    ref={flatListRef}
      //    data={allStories}
      //    getItemLayout={(data, index) => ({ length: 50, offset: 50 * index, index })}
      //    renderItem={renderItem}
      //    pagingEnabled
      //    onViewableItemsChanged={onViewableItemsChanged}
      //    viewabilityConfig={viewabilityConfig}
      //    maxToRenderPerBatch={1}
      //    initialScrollIndex={route?.params?.key || 0}
      //    windowSize={allStories?.length}
      //  />
       :<></>
        // <Gallery
        //   ref={gallery}
        //   data={[videoList[imgIndex]]}
        //   keyExtractor={(item, index) => index.toString()}
        //   renderItem={renderItem}
        //   initialIndex={imgIndex}
        //   numToRender={3}
        //   doubleTapInterval={150}
        //   // onIndexChange={onIndexChange}
        //   onSwipeToClose={() => navigation.goBack()}
        //   loop={true}
        //   onTap={onTap}
        //   // loop
        //   onScaleEnd={scale => {
        //     if (scale < 0.8) {
        //       navigation.goBack();
        //     }
        //   }}
        //   // disableVerticalSwipe={true}
        //   // style={{ height: '90%' }}
        //   containerDimensions={styles.containerDimension}
        // />
      )}
      {/* {infoVisible && videoList?.length && (
        <Animated.View
          entering={mounted ? FadeInDown.duration(250) : undefined}
          exiting={FadeOutDown.duration(250)}
          style={[styles.toolbar, styles.bottomToolBar]}>
          <RNView style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.textContainer} onPress={handlePrev}>
              <AntDesign name="leftcircleo" size={40} color={ColorTheme.primary} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.textContainer} onPress={handleNext}>
              <AntDesign name="rightcircleo" size={40} color={ColorTheme.primary} />
            </TouchableOpacity>
          </RNView>
        </Animated.View>
      )} */}
    </Container>
  );
};

export default VideoSlider;
