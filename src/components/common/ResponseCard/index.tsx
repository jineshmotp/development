import React, { useState } from 'react';
import { Linking, Platform, TouchableOpacity } from 'react-native';
import { Alert, PermissionsAndroid } from 'react-native';
import { opacity } from 'react-native-reanimated/lib/typescript/reanimated2/Colors';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import { formatNumberWithNotation } from '@/constants/function/property.helper';
import { userData } from '@/constants/login';
import CommonButton from '@/custom/CommonButton';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useContactDetailsRequestMutation,
  useFavouriteLeadsMutation,
  useLazyGetContactDetailsQuery,
} from '@/redux/property/propertyService';
import { deviceWidth, px } from '@/utils';

import DefaultProfile from '../DefaultProfile';
import ModalWrapper from '../ModalWrapper';
import { styles } from './styles';

type ResponseCard = {
  favorite?: boolean;
  loader?: boolean;
  data?: any;
  tab?: string;
};

const ResponseCard: React.FC<ResponseCard> = ({ favorite = false, data, loader = false, tab }) => {
  // console.log('item++++++++++', data);
  const [fav, setFav] = useState(favorite);
  const [favouriteLeadMutation] = useFavouriteLeadsMutation();
  const [contactDetailsRequest] = useContactDetailsRequestMutation({});
  const [getContactDetailCall] = useLazyGetContactDetailsQuery();
  const [isHide, setIsHide] = useState(false);
  const [openContact, setOpenContact] = useState(false);
  const [allContact, setAllContact] = useState([]);
  const navigation = useNavigation();

  const selectedUserData = useAppSelector(getUserData);

  async function requestPhonePermission() {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CALL_PHONE, {
        title: 'Phone Call Permission',
        message:
          'App requires access to initiate phone calls so you can quickly contact support or reach your designated contact directly from the app.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      });
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Phone call permission granted');
        Linking.openURL(`tel:+91${data?.user_data?.mobile_no}`).then(res => setOpenContact(false));
      } else {
        console.log('Phone call permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  // FAVOURITE API FUNCTION

  const handleFavourite = payload => {
    favouriteLeadMutation(payload).then(response => {
      // console.log('resposnse', response);
      if (response?.data?.status) {
        setFav(!fav);
        if (tab === 'Favourite') setIsHide(true);
      } else {
        setFav(fav);
      }
    });
  };

  const handleChatFn = (item: any) => {
    let conectuser = item?.user_data;

    const concatenatedData: Data = {
      ...item,
      connectedUsers: { ...conectuser },
    };

    navigation.navigate('CHATBOX', {
      item: concatenatedData,
      iam: selectedUserData?._id,
      businessProfile: false,
    });
  };

  const handleContactDetails = payloadData => {
    const payload = {
      sender: userData._id,
      receiver: payloadData?.user_data?._id,
      leadId: payloadData?._id,
    };
    console.log('checking on response data', JSON.stringify(userData));

    contactDetailsRequest(payload)
      .then(res => {
        console.log('checking on response data', JSON.stringify(res));
      })
      .catch(err => {
        console.log('errorr======>>>', err);
      });
  };

  const handleContactFn = payload => {
    // console.log('+++++++++++++++++ contact payload --------->', payload);
    getContactDetailCall(payload).then(response => {
      // console.log('resposnse from contact ----------->', response);
      if (response?.data?.status) {
        // setOpenContact(true);
        setAllContact(response?.data);
        if (tab === 'Favourite') setIsHide(true);
      } else {
        setOpenContact(true);
      }
    });
  };

  return isHide ? (
    <RNView></RNView>
  ) : (
    <RNView style={styles.container}>
     
        <TouchableOpacity style={styles.cardContainer}>
          <RNView style={styles.cardView}>
            <RNView style={styles.cardHeader}>
              <RNView style={styles.cardHeadLeft}>
                {data?.user_data?.profile_pic ? (
                  <RNImage
                    source={{
                      uri: data?.user_data?.profile_pic,
                    }}
                    style={styles.imgStyle}
                  />
                ) : (
                  <DefaultProfile
                    username={data?.user_data?.fname}
                    viewStyle={styles.defaultprofile}
                    textStyle={styles.defaultText}
                  />
                )}

                <RNView style={styles.nameView}>
                  {data?.is_viewed ? (
                    <RNText style={styles.nameText}>{data?.user_data?.fname + ' ' + data?.user_data?.lname}</RNText>
                  ) : (
                    <RNText style={styles.nameText}>{data?.user_data?.fname}</RNText>
                  )}
                  <RNText
                    style={
                      styles.contacted
                    }>{`contacted on : ${moment(data?.createdAt)?.format('MMM D, YYYY')}`}</RNText>
                </RNView>
              </RNView>

              <RNView style={styles.cardHeadRight}>
                <RNView style={styles.actionView}>
                  <RNText style={styles.actionText}>{data?.user_data?.role}</RNText>
                  <TouchableOpacity style={styles.favBtn} onPress={() => handleFavourite(data?._id)}>
                    {fav ? (
                      <AntDesign name="heart" size={px(22)} color="red" />
                    ) : (
                      <FontAwesome name="heart-o" size={px(22)} color="black" />
                    )}
                  </TouchableOpacity>
                </RNView>
              </RNView>
            </RNView>
            <RNView style={styles.cardContent}>
              <RNView style={styles.contentView}>
                <RNView style={{ flex: 1 }}></RNView>
                <RNView style={styles.contentTop}>
                  <RNText style={styles.propName}>
                    {data?.property_data?.property_name + ' ' + data?.property_data?.property_type}
                  </RNText>
                  <RNText style={styles.propAdd}>{data?.property_data?.locality}</RNText>
                </RNView>
              </RNView>

              {data?.property_data?.property_price ? (
                <RNView style={styles.priceContainer}>
                  <RNView style={styles.priceView}>
                    <RNText style={styles.priceText}>
                      {`Rs ${formatNumberWithNotation(data?.property_data?.property_price)}`}{' '}
                    </RNText>
                  </RNView>
                </RNView>
              ) : (
                <RNView style={styles.priceContainer}>
                  <RNView style={styles.priceView}>
                    <RNText style={styles.priceText}>
                      {`Rs ${formatNumberWithNotation(data?.property_data?.rent_amount)}`}{' '}
                    </RNText>
                  </RNView>
                </RNView>
              )}
            </RNView>
          </RNView>
        </TouchableOpacity>

        <RNView style={styles.btnContainer}>
          {data?.is_contacted ? (
            <CommonButton
              disabled={loader}
              onPress={() => setOpenContact(true)}
              loaderColor="black"
              loading={loader}
              title="View Contact"
              style={styles.btnStyle}
              textStyle={styles.btnText}
            />
          ) : (
            <CommonButton
              disabled={loader}
              onPress={() => handleContactFn(data?._id)}
              loaderColor="black"
              loading={loader}
              title="Contact"
              style={styles.btnStyle}
              textStyle={styles.btnText}
            />
          )}
          {data?.chat === 'Accepted' ? (
            <CommonButton
              disabled={loader}
              onPress={() => handleChatFn(data)}
              loaderColor="black"
              loading={loader}
              title="Chat"
              style={styles.btnStyle1}
              textStyle={styles.btnText}
            />
          ) : data?.contact !== null ? (
            <CommonButton
              disabled={loader}
              onPress={handleChatFn}
              loaderColor="black"
              loading={loader}
              title="Accept Chat"
              style={styles.btnStyle1}
              textStyle={styles.btnText}
            />
          ) : (
            <RNView style={{ width: 160, height: 30 }} />
          )}
       
      </RNView>
      <ModalWrapper
        visible={openContact}
        onClose={() => setOpenContact(!openContact)}
        header={false}
        modalHeight={px(300)}
        modalWidth={deviceWidth / 1.09}>
        <RNView style={styles.modalView}>
          <RNView style={styles.modalcontentView}>
            <RNText style={styles.userText}>{`${data?.user_data?.fname} ${data?.user_data?.lname}`}</RNText>
            <RNText style={styles.roleText}>{`Role: ${data?.user_data?.role}`}</RNText>
          </RNView>
          <RNView style={styles.modalcontentView}>
            <RNText
              style={styles.mobText}
              onPress={
                Platform.OS === 'ios'
                  ? () => Linking.openURL(`tel:+91${data?.user_data?.mobile_no}`).then(res => setOpenContact(false))
                  : requestPhonePermission
              }>{`${data?.user_data?.mobile_no}`}</RNText>
            <RNText style={styles.roleText}>Mobile number</RNText>
          </RNView>
        </RNView>
      </ModalWrapper>
    </RNView>
  );
};

export default ResponseCard;
