import React from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';

import { styles } from './styles';
import { useSelector } from 'react-redux';

type Props = {
  profile?: boolean;
  userProfile?: boolean;
  isFromBuilder?:boolean;
  businessData?:any
};
const UserCreatePostUpload: React.FC<Props> = ({ profile = false, userProfile = false, isFromBuilder=false,businessData }) => {
  const navigation = useNavigation();
  const selectedUserData = useAppSelector(getUserData);
  //   const userBusinessData = useSelector(state => state?.businessProfileReducer);
  const userBusinessData = {};
    
  const changeByProfileAccess = () => {
    if (userProfile) {
      return selectedUserData;
    } else {
      return isFromBuilder?businessData:userBusinessData;
    }
  };
  return (
    <RNView style={profile ? styles.searchBarProfile : styles.searchBar}>
      <RNView
        style={{
          alignSelf: 'center',
          alignItems: 'center',
          flexDirection: 'row',
          gap: 10,
        }}>
        <TouchableOpacity
          onPress={() => {
            profile ? () => console.log('profile') : navigation.navigate('USER_PROFILE_DETAILS');
          }}>
          {changeByProfileAccess()?.profile_pic ? (
            <RNImage
              source={{
                uri: changeByProfileAccess()?.profile_pic,
              }}
              style={{
                width: 40,
                height: 40,
                borderRadius: 100,
              }}
            />
          ) : (
            <RNView style={styles.defaultprofile}>
              <RNText style={styles.FirstLetter}>
                {userProfile
                  ? changeByProfileAccess()?.fname?.toUpperCase()?.slice(0, 1)
                  : changeByProfileAccess()?.business_name?.toUpperCase()?.slice(0, 1)}
              </RNText>
            </RNView>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
          }}
          onPress={() =>
            isFromBuilder?
            navigation.navigate('CREATE_POST', {
              upload: false,
              userProfile: userProfile ? true : false,
              builderData:businessData
            }) :
            navigation.navigate('CREATE_POST', {
              upload: false,
              userProfile: userProfile ? true : false,
            })
          }>
          <RNView style={{ height: 40, justifyContent: 'center' }}>
            <RNText style={styles.whatsText}>What's on your mind...?</RNText>
          </RNView>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            isFromBuilder?
            navigation.navigate('CREATE_POST', {
              upload: false,
              userProfile: userProfile ? true : false,
              builderData:businessData
            }) :
            navigation.navigate('CREATE_POST', {
              upload: false,
              userProfile: userProfile ? true : false,
            })
          }>
          <RNImage style={styles.gallery} source={require('@/assets/images/customImage/gallery.png')} />
        </TouchableOpacity>
      </RNView>
    </RNView>
  );
};

export default UserCreatePostUpload;
