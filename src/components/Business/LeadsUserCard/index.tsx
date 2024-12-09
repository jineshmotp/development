import React, { useState } from 'react';
import { ImageBackground, Platform, Text, TouchableOpacity, View } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type ResponseLeadsCard = {
  onViewClick?: () => void;
  chatNavigation?: any;
  data?: any;
};
const LeadsUserCard: React.FC<ResponseLeadsCard> = ({ onViewClick, data, chatNavigation }) => {
  // console.log(' data value -> ', data);
  const navigation = useNavigation();
  return (
    <RNView style={styles.mainContainer}>
      <RNView style={styles.cardContainer}>
        <RNView style={styles.profileContainerStyle}>
          {data?.is_viewed ? (
            <>
              {data?.user_data?.profile_pic ? (
                <RNImage
                  source={{
                    uri: data?.user_data?.profile_pic,
                  }}
                  style={styles.imgStyle}
                />
              ) : (
                <RNView style={styles.defaultProfile}>
                  <RNText style={styles.ownerText}>{data?.user_data?.fname?.slice(0, 1).toUpperCase()}</RNText>
                </RNView>
              )}
            </>
          ) : (
            <RNImage
              source={{
                uri: 'https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg',
              }}
              blurRadius={Platform.OS == 'ios' ? 10 : 50}
              style={styles.imgStyle}
            />
          )}
          <RNView style={styles.nameView}>
            {data?.is_viewed ? (
              <TouchableOpacity
                onPress={() => navigation.navigate('OTHER_USER_PROFILE_DETAILS', { id: data?.user_data?._id })}>
                <RNText style={styles.userNameText}>{data?.user_data?.fname + ' ' + data?.user_data?.lname}</RNText>
              </TouchableOpacity>
            ) : (
              <RNText style={Platform.OS == 'ios' ? styles.blurIosText : styles.blurText}>
                {data?.user_data?.fname + ' ' + data?.user_data?.lname}
              </RNText>
            )}
            {data?.is_viewed ? (
              <RNText style={styles.businessNameText}>{data?.property_data?.property_name}</RNText>
            ) : (
              <RNText
                style={
                  Platform.OS == 'ios'
                    ? [styles.blurIosText, { fontSize: px(12), color: ColorTheme.gray }]
                    : [styles.blurText, { fontSize: px(12), color: ColorTheme.gray }]
                }>
                {data?.property_data?.property_name}
              </RNText>
            )}
            <RNText style={styles.nameText}>{'Requested on ' + data?.createdAt.split('T')[0]}</RNText>
            {data?.chatted ? (
              <RNText style={styles.nameText}>{'Requested via ' + 'Chat'}</RNText>
            ) : (
              <RNText style={styles.nameText}>{'Requested via ' + 'Call Back'}</RNText>
            )}
          </RNView>
          <RNView style={styles.userStyle}>
            <RNText style={styles.buttonText}>{data?.user_data?.role}</RNText>
          </RNView>
        </RNView>
        <RNView style={styles.lineStyle}></RNView>
        <RNView style={styles.cardHeader}>
          <RNView style={styles.iconContainerStyle}>
            <RNImage style={styles.iconStyle} source={require('@/assets/images/business/ios.png')} />
          </RNView>
          {data?.is_viewed ? (
            <RNText style={styles.nameText}>{data?.user_data?.mobile_no}</RNText>
          ) : (
            <RNText style={Platform.OS == 'ios' ? styles.blurIosText : styles.blurText}>9000000000</RNText>
          )}
        </RNView>
        <RNView style={styles.cardHeader}>
          <RNView style={styles.iconContainerStyle}>
            <RNImage style={styles.iconStyle} source={require('@/assets/images/business/message.png')} />
          </RNView>
          <RNText style={styles.descriptionText}>{data?.requested_for_message}</RNText>
        </RNView>
        {data?.is_viewed ? (
          data?.chatted ? (
            <TouchableOpacity style={styles.buttonStyle} onPress={() => chatNavigation(data)}>
              <RNText style={styles.buttonText}>Chat</RNText>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.buttonStyle}>
              <RNText style={styles.buttonText}>Call Back</RNText>
            </TouchableOpacity>
          )
        ) : (
          <TouchableOpacity style={styles.buttonStyle} onPress={onViewClick}>
            <RNText style={styles.buttonText}>View Details</RNText>
          </TouchableOpacity>
        )}
      </RNView>
    </RNView>
  );
};
export default LeadsUserCard;
