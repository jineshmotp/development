import React, { useEffect, useState } from 'react'
import RNView from '@/custom/RNView'
import { RNText } from '@/custom/RNText'
import { FlatList } from 'react-native-gesture-handler'
import { RouteProp, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { RootStackParamList } from '@/routes/RootNavigator'
import VideoModal from '@/components/common/VideoModal'
import { deviceHeight, deviceWidth, px } from '@/utils'
import HeaderBar from '@/components/common/HeaderBar'
import { TouchableOpacity } from 'react-native'
import { useUploadStoryMutation } from '@/redux/home/homeService'

 const AllStories =()=> {
    const route = useRoute<RouteProp<RootStackParamList, 'ALL_STORIES'>>();
    const [totalList,setTotalList] = useState()
    const [allStoriesList,setAllStoriesList] = useState();
    const navigation = useNavigation();
    const [uploadStoryMutation] = useUploadStoryMutation()

    type storyProps = {
      user?: string;
      city?: string;
    };

    useFocusEffect(
      React.useCallback(() => {
        // console.log('abhayyayayyayay+++++++++', route?.params?.locationDetails);
         uploadStoryFn(route?.params?.useData , route?.params?.locationDetails)
      }, [])
    );

    const uploadStoryFn = (selectedUserData,headerLocation) => {
      const payload: storyProps = {
        user: selectedUserData._id,
        geo_data: [headerLocation?.city],
        location: [headerLocation?.lat, headerLocation?.long],
      };
      // const params = new URLSearchParams(payload).toString();
      uploadStoryMutation(payload).then(response => {
        const storiesOfUsers = [response?.data?.data?.loggedInUserStories, ...response?.data?.data?.globalUserStories]
       // setAllStoriesList(storiesOfUsers)
       // console.log('payload =====>', JSON.stringify(storiesOfUsers));

       setTotalList(storiesOfUsers)
       const array = storiesOfUsers?.reduce((acc, curr) => {
        if (curr && curr.stories) {
          return acc.concat(curr.stories);
      }
      return acc;
      }, []);
       // console.log('uploadStoryFn++', JSON.stringify(array));
        setAllStoriesList(array)
      }).catch(err=>{console.log('error',JSON.stringify(err));
      })
    };
   
    useEffect(()=>{
       //  console.log('routeeee====>>>',JSON.stringify(totalList));
        
        // const storiesOfusers = totalList?.reduce((acc, curr) => {
        //     return acc.concat(curr.stories);
        //   }, []);
        //   setAllStoriesList(storiesOfusers)
    },[])
  return (
    <RNView>
       <RNView style={{marginTop:px(20)}}>
       <HeaderBar label="Home Tours" backPress={()=>{navigation.goBack()}}/>
     <RNView style={{paddingBottom:px(200)}}>
        { allStoriesList?.length >0?
        <FlatList 
        data={allStoriesList}
        numColumns={3}
        renderItem={({item,index})=>{
          return(<TouchableOpacity onPress={()=>{navigation.navigate('VIDEO_SLIDER',{data: item, VideosData: allStoriesList, hasHeader: true, key: index ,totalData:totalList})}}>
             <RNView style={{margin:px(5)}}>
              <VideoModal
                imgStyle={   { width: deviceWidth / 3.3,
                height: deviceHeight / 3.5,
                borderRadius: px(5),}}
                item={item?.media}
                // playIconStyle={{
                //   position: 'absolute',
                //   top: 0,
                //   justifyContent: 'center',
                //   alignItems: 'center',
                //   alignContent: 'center',
                // }}
              />
          </RNView>
          </TouchableOpacity>)
        }}
        />:<RNView style={{flex:1}}>
            <RNText>No Data</RNText>
            </RNView>}
     
     </RNView>
       </RNView>
    </RNView>
  )
}
export default AllStories