import React, { useEffect, useState } from 'react'
import RNView from '@/custom/RNView'
import { RNText } from '@/custom/RNText';
import { Rating } from 'react-native-ratings';
import CommonButton from '@/custom/CommonButton';
import { ProgressBar } from 'react-native-paper';
import { px } from '@/utils';
import { ColorTheme } from '@/theme';
import { useLazyGetBusinessRatingsQuery, useLazyGetBusinessReviewDetailsQuery, useLazyGetOneBusinessUserRatingQuery, usePostBusinessReviewMutation } from '@/redux/business/businessService';
import qs from 'qs';
import { FlatList } from 'react-native-gesture-handler';
import { styles } from './styles';
import RNImage from '@/custom/RNImage';
import { chatTimefromTimestamp } from '@/constants/function/chat.function';
import { TextInput } from 'react-native';
import { getUserData } from '@/redux/login/loginReducer';
import { useAppSelector } from '@/hooks/reduxHooks';

type reviewProps={
    data?: any;
    onPress?: any;
    onPressImage?: any;
    commentScreen?: boolean;
    isFromOther?: boolean;
}

const BusinessReview: React.FC<reviewProps> = ({data,onPressImage,onPress,commentScreen,isFromOther}) => {
    const selectedUserData = useAppSelector(getUserData);
    const [businessRatings] = useLazyGetBusinessRatingsQuery();
    const [BusinessReviews] = useLazyGetBusinessReviewDetailsQuery()
    const [OneBusinessReview] =useLazyGetOneBusinessUserRatingQuery()
    const [PostBusinessReview] = usePostBusinessReviewMutation()
    const [reviewsList,setReviewsList] = useState()
    const [ratingsList,setRatingsList] = useState()
    const [isViewRatings,setIsViewRatings] = useState(false)
    const [ratingValue,setRatingValue] = useState()
    const [textReview,setTextReview] = useState()

    useEffect(()=>{
        businessRatings(businressQuary(data?._id)).then(res=>{
            if(res?.status==='fulfilled'){
                setReviewsList(res?.data?.data[0]?.ratings?.slice()?.reverse()) 
            }
        })
        businessReviewsApi()
        getOneBusinessUser()
    },[])
    const sendReview= () => {
      const payload = {
        rating_count: ratingValue,
        review_comment: textReview ,
        rating_by: selectedUserData?._id,
        rating_to: data?._id,
        rater_type: selectedUserData?.role,
        ratee_type: "BUSINESS PROFILE"   
    }
    PostBusinessReview(payload).then(res=>{
      console.log('checking on the review',JSON.stringify(res));
    }).catch(err=>{console.log('checking on this error',JSON.stringify(err));
    })
    }
    const getOneBusinessUser =()=>{
        OneBusinessReview(oneBusinessQuery(selectedUserData?._id)).then(res=>{
            console.log('checking on the one user',JSON.stringify(res));
            
        }).catch(err=>{
            console.log('checking on review',err);
            
        })
    }
     
    const oneBusinessQuery =(id)=>{
        const getOneBusinessQuery = {
            rating_to : id,
        }
        return qs.stringify(getOneBusinessQuery);
    }

    const businressQuary =(id)=>{
        const getBuilderRatingsPayload = {
            rating_to : id,
          };
          return qs.stringify(getBuilderRatingsPayload);
    }
    const businessReviewQuery = (id)=>{
        const ReviewPayload ={
            rating_to : id,
            page_number:1,
            page_size:10,
            sortBy:-1
        }
        return qs.stringify(ReviewPayload)
    }
    const businessReviewsApi = ()=>{
        BusinessReviews(businessReviewQuery(data?._id)).then(res=>{
           // console.log('checking on the review response =======>>>>',JSON.stringify(res));
            if(res?.status==='fulfilled'){
                setRatingsList(res?.data?.data)
            }
        }).catch(err=>{
            console.log('errorr checkk',err);
            
        })
    }
    const renderRatingsItem = ({item}) =>{
        return(
            <RNView style={styles.viewOffsetStyle}>
            <RNView style={{flexDirection:'row',alignItems:'center',margin:px(10)}}>
               {item?.user_data?.profile_pic ? (
                <RNImage
                  style={styles.profileImg}
                  source={
                    { uri: item?.user_data?.profile_pic } // Use the cover_pic URL if available
                  }
                />
              ) : (
                <RNView style={styles.defaultProfile}>
                  <RNText style={styles.ownerText}>{item?.user_data?.fname?.slice(0, 1).toUpperCase()}</RNText>
                </RNView>
              )}
              <RNView>
                <RNText style={styles.nameTextStyle}>{item?.user_data?.fname+' '+item?.user_data?.lname}</RNText>
              <Rating
                startingValue={item?.rating_count}
                ratingCount={5}
                imageSize={15}
                style={styles.ratingStyle}
                readonly={true}
                />
            </RNView>
            <RNView style={{width:'50%'}}>
                <RNText style={{alignSelf:'flex-end'}}>{chatTimefromTimestamp(item?.updatedAt)}</RNText>
            </RNView>
               </RNView>
               <RNText style={{marginHorizontal:px(20)}}>{item?.review_comment}</RNText>
            </RNView>
        )
    }
   const renderReviewItem = ({item})=>{
        return(
            <RNView style={styles.itemStyle}>
                <RNView style={styles.enumStyle}>
                <RNText style={styles.enumTextStyle}>{item?.enum}</RNText>
                </RNView>
            <RNView style={styles.progressViewStyle}>
            <ProgressBar visible={true} style={{height:15,backgroundColor:ColorTheme.lightWhite}} progress={(item?.percentage)/100} color={'#f1c40f'}/>
            </RNView>
            <RNView style={styles.enumStyle}>
            <RNText style={styles.enumTextStyle}>{`${item?.percentage} %`}</RNText>
            </RNView>
        </RNView>
        )
    }
  return (
    <RNView style={{backgroundColor:'#F0F0F0'}}>
        <RNView style={{alignItems:'center'}}>
            <RNText style={styles.ratingTextStyle}>{data?.averageRating}</RNText>
            <Rating 
            tintColor={'#F0f0f0'}
            style={{marginVertical:px(10)}}
            startingValue={data?.averageRating}
            ratingCount={5}
            readonly={true}
            imageSize={20}/>
            <CommonButton
                disabled={true}
                style={{backgroundColor:'white',marginVertical:px(5)}}
                textStyle={styles.enumTextStyle}
                title={`Based on ${reviewsList?.length} Reviews`}
              />
        </RNView>
        <RNView style={{marginHorizontal:px(5),marginTop:px(5)}}>
            <FlatList
            data={reviewsList}
            renderItem={renderReviewItem}
            />
        </RNView>
        {isFromOther?
        <RNView style={{marginHorizontal:px(15)}}>     
       <RNView style={{alignItems:'center'}}>
       <CommonButton
                style={{backgroundColor:'white',marginVertical:px(10),borderColor:ColorTheme.onboardingPrimary,borderWidth:px(1)}}
                textStyle={[styles.enumTextStyle,{color:ColorTheme.onboardingPrimary}]}
                title={'Write a review'}
                onPress={()=>{setIsViewRatings(true)}}
              />
       </RNView>
             {isViewRatings?
             <RNView>
             <RNView style={styles.textCardStyle}>
      <RNText style={{fontSize:px(14),marginVertical:px(5)}} >How Would you rate this agent ?</RNText>
                <Rating
                startingValue={0}
                ratingCount={5}
                imageSize={30}
                style={{alignSelf:'center',justifyContent: 'space-between'}}
                onFinishRating={(ratings)=>{setRatingValue(ratings)}}
                />
              </RNView>
              <RNText style={{alignSelf:'flex-start',marginVertical:px(5)}}>Write a review :</RNText>
              <RNView style={styles.viewTextInput}>
               <TextInput 
               onChangeText={(text)=>{setTextReview(text)}}
               placeholder='Add your review here ' />
              </RNView>
              <RNView
          style={{
            alignSelf: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
           margin:px(5)
          }}>
          <CommonButton
            onPress={()=>{setIsViewRatings(false)}}
            title={'Back'}
            style={styles.buttonContainer}
            textStyle={styles.BtnStyle}
          />
          <CommonButton
            onPress={sendReview}
            title={'Review'}
            style={[
              styles.nextContainer,
              { backgroundColor: ColorTheme?.onboardingPrimary },
            ]}
            textStyle={styles.nextStyle}
          />
        </RNView>
             </RNView>
        :<></>}
             
        </RNView>
        :
        <></>
        }
        
        <RNView style={{marginHorizontal:px(10),marginVertical:px(5)}}>
             <FlatList
              data={ratingsList}
              renderItem={renderRatingsItem}
              />
             </RNView>
    </RNView>
  )
}
export default BusinessReview