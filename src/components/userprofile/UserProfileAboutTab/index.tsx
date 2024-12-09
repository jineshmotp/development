import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import moment from 'moment';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import DetailSectionPart from '@/components/common/DetailSectionPart';
import Divider from '@/components/common/Divider';
import { isArray } from '@/constants/function/isArray';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { deviceWidth } from '@/utils';

import SocialMediaElement from '../SocialMediaElement';
import { styles } from './styles';
import OperationTimeRow from '@/components/common/OperationTimeRow';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ColorTheme } from '@/theme';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

type Props = {
  userData?: any;
};
const convertDate =(strDate)=>{
  const date = new Date(strDate)
  const months = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
 const suffixes = ["th", "st", "nd", "rd"];
 let day = date.getDate();
    let suffix = suffixes[0];
    if (day % 10 >= 1 && day % 10 <= 3 && (day < 10 || day > 20)) {
        suffix = suffixes[day % 10];
    }
    const formattedDate = `${months[date.getMonth()]} ${day}${suffix}, ${date.getFullYear()}`;

    return formattedDate;

}

const UserProfileAboutTab: React.FC<Props> = ({ userData }) => {
    console.log('UserProfileAboutTab', JSON.stringify(userData));
  // const [operatingTimings,setOperatingTimings] = useState(userData?.operation_timings)
  const [operatingTimings,setOperatingTimings] = useState([{"close_time":"9:35 AM","start_time":"9:35 AM","status":"close","day":"Sunday"},{"close_time":"9:35 AM","start_time":"9:35 AM","status":"close","day":"Monday"},{"close_time":"9:35 AM","start_time":"9:35 AM","status":"close","day":"Tuesday"},{"close_time":"9:35 AM","start_time":"9:35 AM","status":"close","day":"Wednesday"},{"close_time":"9:35 AM","start_time":"9:35 AM","status":"close","day":"Thursday"},{"close_time":"9:35 AM","start_time":"9:35 AM","status":"close","day":"Friday"},{"close_time":"9:35 AM","start_time":"9:35 AM","status":"close","day":"Saturday"}])
  const selectedUserData = useAppSelector(getUserData);
  const [defOpenTime, setDefOpenTime] = useState(new Date());
  const [defCloseTime, setDefCloseTime] = useState(new Date());


  const onChangeTimings = (index: number, value: any, type: 'o' | 'c' | 'h') => {
    let tempArr = [...operatingTimings];
    if (type === 'o') {
      tempArr[index].start_time = value;
    } else if (type === 'c') {
      tempArr[index].close_time = value;
    } else if (type === 'h') {
      tempArr[index].status = value;
    }
    setOperatingTimings(tempArr)    
  };

  return (
    <View style={styles.sectionContainer}>
      { /* =============== BASIC INFO============== */}
      {(userData?.fname || userData?.gender || userData?.dob) && <DetailSectionHeader Heading={'Basic Info'} />}
      
      {userData?.fname && (
        <>
          <DetailSectionPart
            iconName={'user'}
            lable={userData?.fname ? `${userData?.fname} ${userData?.lname}` : 'Add Full Name'}
            sublable={userData?.fname ? 'Full Name' : ''}
            labelCapitalise={true}
          />

          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
       {userData?.bio && (
        <>
          <DetailSectionPart
            iconName={'user'}
            lable={userData?.bio ? `${userData?.bio}` : 'Add bio'}
            sublable={userData?.bio ? 'Bio' : ''}
            labelCapitalise={true}
          />

          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
     
      {userData?.role==='BUILDER' || userData?.role==='AGENT'?
      <>
        {userData?.company_name &&(
        <>
        <DetailSectionPart
            iconName={'user'}
            lable={userData?.company_name ? `${userData?.company_name}` : 'Add Full Name'}
            sublable={userData?.company_name ? 'Company Name' : ''}
            labelCapitalise={true}
          />

          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
      {userData?.operating_since && 
      ( <>
       <DetailSectionPart
       iconName={'location'}
       lable={userData?.operating_since ? convertDate(userData?.operating_since) : 'Add operating date'}
       sublable={userData?.operating_since ? 'Operating Since' : ''}
      />
      <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
      </>
      )}
      {userData?.languages?.length>0 && 
      ( <>
       <DetailSectionPart
       iconName={'Email'}
       lable={userData?.languages ? userData?.languages.join(', ') : 'Add Languages'}
       sublable={userData?.languages ? 'Languages' : ''}
      />
      <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
      </>
      )}

    {userData?.rera_id && (
        <DetailSectionPart
          iconName={'mobile'}
          lable={userData?.rera_id ? userData.rera_id : 'Add Rera ID'}
          sublable={userData?.rera_id ? 'Rera ID' : ''}
        />
      )}

      </>
      :<></>}
      
      {userData?.gender && (
        <>
          <DetailSectionPart
            iconName={'user'}
            lable={userData?.gender ? userData.gender : 'Add Gender'}
            sublable={userData?.gender ? 'Gender' : ''}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
      {userData?.dob && (
        <>
          <DetailSectionPart
            iconName={'birthday'}
            lable={
              userData?.dob
                ? userData?.dob?.length > 11
                  ? moment(userData?.dob).format('MM-DD-YYYY')
                  : moment(moment(userData?.dob, 'MM-DD-YYYY').toISOString()).format('MM-DD-YYYY')
                : 'Add Date Of Birth'
            }
            sublable={userData?.dob ? 'Date of birth' : ''}
          />
        </>
      )}
      {/* =============== CONTACT INFO============== */}
      {(userData?.mobile_no ||
        userData?.email ||
        userData?.website ||
        userData?.address_lane1 ||
        userData?.pincode ||
        userData?.city ||
        userData?.state ||
        userData?.country) && <DetailSectionHeader Heading={'Contact Info'} btnText={''} editBtnFunction={() => {}} />}
      {userData?.mobile_no && selectedUserData?._id === userData?._id && (
        <>
          <DetailSectionPart
            iconName={'mobile'}
            lable={userData?.mobile_no ? userData.mobile_no : 'Add Mobile Number'}
            sublable={userData?.mobile_no ? 'Mobile Number' : ''}
            verifed={true}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
      {userData?.email && selectedUserData?._id === userData?._id && (
        <>
          <DetailSectionPart
            iconName={'Email'}
            lable={userData?.email ? userData.email : 'Add Email'}
            sublable={userData?.email ? 'Email' : ''}
            verifed={userData?.isVerifiedEmail}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
      {userData?.website && (
        <>
          <DetailSectionPart
            iconName={'web'}
            lable={userData?.website ? userData.website : 'Add Website'}
            sublable={userData?.website ? 'Website' : ''}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
      {userData?.address_lane1 && (
        <>
          <DetailSectionPart
            iconName={'location'}
            lable={
              userData?.address_lane1 ? `${userData.address_lane1}, ${userData.address_lane2}` : 'Add Complete Address'
            }
            sublable={userData?.address_lane1 ? 'Address' : ''}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
      {userData?.pincode && (
        <DetailSectionPart
          iconName={'location'}
          lable={userData?.pincode ? userData.pincode : 'Add Pincode'}
          sublable={userData?.pincode ? 'Pincode' : ''}
        />
      )}
      
      {userData?.role=='USER'? <>
      {userData?.looking_for?.length>0?
      <>
      <DetailSectionHeader Heading={'Property Details'} />
         <DetailSectionPart
       iconName={'mobile'}
       lable={userData?.looking_for?.length>0 ? userData?.looking_for?.join(', ') : 'Add Transaction Type'}
       sublable={userData?.looking_for?.length>0 ? 'Looking for' : ''}
      />
      <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
      </>:<></>}
      {userData?.property_preference?.length>0?
      <>
         <DetailSectionPart
       iconName={'mobile'}
       lable={userData?.property_preference?.length>0 ? userData?.property_preference?.join(', ') : 'Add Transaction Type'}
       sublable={userData?.property_preference?.length>0 ? 'Property Preference' : ''}
      />
      <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
      </>:<></>}
        </>
       :<></>}

      {/* ===============PROJECT DETAILS START==============*/}

      {userData?.role==='BUILDER' || userData?.role==='AGENT'?
      <>
      {userData?.deal_property_type?.length>0 &&
       <DetailSectionHeader Heading={'Project Details'} />}

       {userData?.role==='AGENT'?
       userData?.AGENT?.deal_transaction_type && (
        <>
        <DetailSectionPart
       iconName={'mobile'}
       lable={userData?.AGENT?.deal_transaction_type?.length>0 ? userData?.AGENT?.deal_transaction_type?.join(', ') : 'Add Transaction Type'}
       sublable={userData?.AGENT?.deal_transaction_type?.length>0 ? 'Deal Transaction Type' : ''}
      />
      <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
       )
       :<></>}
        
        {userData?.BUILDER?.builder_type?.length>0 && (
        <>
         <DetailSectionPart
       iconName={'mobile'}
       lable={userData?.BUILDER?.builder_type?.length>0 ? userData?.BUILDER?.builder_type?.join(', ') : 'Add Property Type'}
       sublable={userData?.BUILDER?.builder_type?.length>0 ? 'Building Type' : ''}
      />
      <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
          </>
       )}
       {userData?.deal_property_type?.length>0 && (
        <>
         <DetailSectionPart
       iconName={'location'}
       lable={userData?.deal_property_type?.length>0 ? userData?.deal_property_type?.join(', ') : 'Add Property Type'}
       sublable={userData?.deal_property_type?.length>0 ? 'Dealing Property Type' : ''}
      />   
          </>
       )}

       {/* ===============OPERATING CITIES START==============*/}
       {userData?.operating_location?.length>0 && 
       <DetailSectionHeader Heading={'Operating Cities & Areas'} />
      }

      {userData?.operating_location?.length>0 && (
        <>
        {userData?.operating_location?.length>0 ?
        
          userData?.operating_location?.map((item)=>
            {              
              return(
                <>
                <DetailSectionPart
       iconName={'mobile'}
       lable={userData?.operating_location?.length>0 ? item?.city : 'Add Property Type'}
       sublable={userData?.operating_location?.length>0 ? 'Operating City' : ''}
      />
      <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
       {item?.locality?.length>0 ?
       <>
        <DetailSectionPart
       iconName={'location'}
       lable={item?.locality?.length>0 ? item?.locality?.join(', ') : 'Add Property Type'}
       sublable={item?.locality?.length>0 ? 'Operating Location' : ''}
      />
       </> :<></> }
                </>
            )}
          )
        
        :
        <></>
        }
         
       {/* ===================OPERATING DAYS====================== */}
       {userData?.operation_timings?.length>0 &&
       <>
        <DetailSectionHeader Heading={'Operating Days & Timings'} />
        <RNView style={styles.timingsStyle}>
       
       <TouchableOpacity
                activeOpacity={0.5}
                style={{ alignSelf: 'flex-end', marginVertical: 10, marginBottom: 20, marginRight: 10 }}
                onPress={() => {
                  let tempArr = [...operatingTimings];
                  tempArr.map((item: any) => {
                    item.start_time = defOpenTime;
                    item.close_time = defCloseTime;
                    item.status = 'open';
                  });
                  setOperatingTimings([...tempArr]);
                }}>
                <RNText style={{ color: ColorTheme.nearLukBasePrimaryColor, fontWeight: '700',alignSelf:'flex-end' }}>Apply to All</RNText>
              </TouchableOpacity>
       {operatingTimings.map((timings: any, index: number)=>{
        console.log('cheking on dayssssss ====>>>>>>>>>',JSON.stringify(operatingTimings));
        
         return(
          <OperationTimeRow
              key={'OperationTimeRow:__' + timings.day}
              day={timings.day}
              holiday={timings.status}
              openingTime={timings.start_time}
              closingTime={timings.close_time}
              onchangeHoliday={(val: any) =>onChangeTimings(index, val, 'h')}
              onChangeOpeningTime={(val: any) =>onChangeTimings(index, val, 'o')}
              onChangeClosingTime={(val: any) =>onChangeTimings(index, val, 'c')}
          />
         )
         } )}
         </RNView>
         </>
        }        
       </>
       )}
      </>:<></>}

      {/* ==============LOCATION START================ */}
      {(userData?.city || userData?.state || userData?.country) && (
        <DetailSectionHeader Heading={'Location'} btnText={''} />
      )}

      {userData?.city && (
        <>
          <DetailSectionPart
            iconName={'location'}
            lable={userData?.city ? userData?.city : 'Add Current City'}
            sublable={userData?.city ? 'City' : ''}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
      {userData?.state && (
        <>
          <DetailSectionPart
            iconName={'location'}
            lable={userData?.state ? userData.state : 'Add State'}
            sublable={userData?.state ? 'State' : ''}
          />
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
      {userData?.country && (
        <DetailSectionPart
          iconName={'location'}
          lable={userData?.country ? userData.country : 'Add Country'}
          sublable={userData?.country ? 'Country' : ''}
        />
      )}

      {/* ###########################Social media links############################## */}
      {userData?.social_media && isArray(userData?.social_media) && (
        <>
          <DetailSectionHeader Heading={'Social media links'} />
          <View style={{ paddingVertical: 10 }}>
            {userData?.social_media?.map((item, ind) => {
              return <SocialMediaElement key={ind} platform={item?.key} acc_name={item?.value} />;
            })}
          </View>
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 10,
              }
            }
          />
        </>
      )}
    </View>
  );
};

export default UserProfileAboutTab;