import React, { memo, useEffect, useState } from 'react';
import { ImageBackground, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { KeyboardAvoidingView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

import PropBottomSheet from '@/components/Comment/PropBottomSheet';
import SubscriptionModal from '@/components/Subscription/SubscriptionModal';
import { isArray } from '@/constants/function/isArray';
import { areaunitremoveunder, formatNumberWithNotation, isValidURL } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { setSubscriptionData } from '@/redux/listing/listingReducer';
import {
  useGetAllSubscriptionOptionsQuery,
  useLazyGetAllSubscriptionOptionsQuery,
} from '@/redux/listing/listingService';
import { getUserData } from '@/redux/login/loginReducer';
import {
  useDeletPropertyMutation,
  useHidePropertyMutation,
  useReActivePropertyMutation,
  useRenewPropertyMutation,
} from '@/redux/login/loginService';
import { colors, ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import CustomAlertWrapper from '../CustomAlertWrapper';
import ModalWrapper from '../ModalWrapper';
import PropertyCategoryChips from '../PropertyCategoryChips';
import { styles } from './styles';

type Props = {
  data?: any;
  onPress?: () => void;
  onReloadData?: () => void;
  type?: string;
  business?: boolean;
};

const MyPropertyCard: React.FC<Props> = ({ data, onPress, onReloadData, type, business }) => {
  const toast = useToast();
  const userId = useAppSelector(getUserData)?._id;
  const navigation = useNavigation();
  const [OpenSheet, setOpenSheet] = useState(false);
  const selectedData = useAppSelector(getUserData);
  const [deletePropertyMutation] = useDeletPropertyMutation();
  const [hidePropertyMutation] = useHidePropertyMutation();
  const [renewPropertyMutation] = useRenewPropertyMutation();
  const [reactivePropertyMutation] = useReActivePropertyMutation();
  const [deletePopup, setShowDeletePopup] = useState<boolean>(false);

  const [deleteId, setShowDeleteId] = useState();

  const [ViewSubscription, setViewSubscription] = useState(false);

  const dispatch = useAppDispatch();

  const [subscriptionDatas, setSubscriptionDatas] = useState([]);

  const [getallSubscriptionQuery] = useLazyGetAllSubscriptionOptionsQuery();

  const [planIndex, setPlanIndex] = useState(0);

  //################################ Property Deleting

  const onPressDeleteProp = postId => {
    // console.log('delete property--->', postId);

    const payload = {
      propertyLocationId: [postId],
    };

    // console.log(' payload for delete --->', payload);

    setShowDeleteId(postId);
    setShowDeletePopup(true);
    setOpenSheet(false);
  };

  const deleteProperty = () => {
    const payload = {
      propertyLocationId: [deleteId],
    };

    // console.log(' payload for delete --->', payload);

    if (deleteId) {
      deletePropertyMutation(payload).then(response => {
        if (response?.data?.status) {
          // console.log('reload homescreen for delete', response?.data?.status);
          onReloadData();
          setShowDeletePopup(false);
        } else {
          toast.show(response?.error?.message || 'Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Please try once',
            },
            duration: 3000,
          });
          setShowDeletePopup(false);
        }
      });
    }
  };

  //########################### Property Editing #######################################

  const onPressEditProp = () => {
    // console.log(' basic data --> ', data);

    if (business === true) {
      setOpenSheet(false);
      setTimeout(() => {
        navigation.navigate('BUILDER_POST_PROPERTY_EDITING', {
          BasicData: data,
        });
      }, 1000);
    } else {
      setOpenSheet(false);
      setTimeout(() => {
        navigation.navigate('POST_PROPERTY_EDITING', {
          BasicData: data,
        });
      }, 1000);
    }
  };

  //##################### Property Renew

  const onPressReNewProp = data => {
    // console.log(' prop data--->', data);

    const Payload = {
      userSubscription_id: subscriptionDatas?.data[planIndex]?.userSubscription_id,
      property: data?._id,
    };
    // console.log('payload for renew--->', Payload);

    renewPropertyMutation(Payload).then(response => {
      // console.log('response from renew', response);
      if (response?.data?.status) {
        onReloadData();
        setOpenSheet(false);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Please try once',
          },
          duration: 3000,
        });
        // setHidePropertyUI(false);
      }
    });
  };

  //#################### Property Active and Deactive

  const onPressReActivate = data => {
    const payload = {
      property: data?._id,

      type: 'Property',
    };
    // console.log('payload for unhide--->', payload);

    reactivePropertyMutation(payload).then(response => {
      // console.log('response from unhide', response);
      if (response?.data?.status) {
        onReloadData();
        setOpenSheet(false);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Please try once',
          },
          duration: 3000,
        });
        // setHidePropertyUI(false);
      }
    });
  };
  const onPressDeActivate = data => {
    // console.log(' Deactivate---->');

    const payvalue = [
      {
        user: selectedData?._id,
        property: data?._id,
        reason_enum: 1,
        type: 'Property',
      },
    ];
    // console.log('deactivate payload -------->', payvalue);

    hidePropertyMutation(payvalue).then(response => {
      if (response?.data?.status) {
        // console.log('reload homescreen from deactivate-------->', response);
        // setHidePropertyUI(true);
        onReloadData();
        setOpenSheet(false);
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Please try once',
          },
          duration: 3000,
        });
        // setHidePropertyUI(false);
      }
    });
  };

  const CloseSubscriptionAll = () => {
    setViewSubscription(false);
  };

  const ViewSubscriptionAll = (data: any, reval: number) => {
    const userwant = data?.property?.iwant === 'Sell' ? 'Sell' : 'Rent';
    getallSubscriptionQuery(userwant).then(res => {
      if (Array.isArray(res?.data?.data) && res.data.data.length === 0) {
        const erroMsg = "You don't have sufficient Subscription plan for Active the property";

        toast.show('Subscription Selection', {
          type: 'warning_toast',
          animationDuration: 100,
          data: {
            title: erroMsg,
          },
          duration: 3000,
        });
      } else {
        setSubscriptionDatas(res?.data);
        setViewSubscription(true);
      }

      // console.log(' Response data from useEffect---------->', res?.data);
    });
  };

  const SelectSubscription = (item: any, i: number) => {
    toast.show('Subscription Selection', {
      type: 'info_toast',
      animationDuration: 100,
      data: {
        title: item?.subscriptionplan?.subscription_type,
      },
      duration: 3000,
    });
    setViewSubscription(false);

    setPlanIndex(i);

    if (data?.isExpired === true) {
      onPressReNewProp(data);
      console.log(' renew');
    }
    if (data?.isExpired === false && data?.isHide === true) {
      onPressReActivate(data);
      console.log(' unhide');
    }
  };

  const handleMoreBtn = () => {
    // console.log('dsbjbjdsv++++++++++++++');
    setOpenSheet(true);
  };

  const moreBtnVal = selectedData?._id === data?.posted_by?._id;

  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <RNView style={styles.topView}>
        <RNView style={styles.leftView}>
          <RNImage
            resizeMode="cover"
            source={{
              uri: data?.property?.profile_pic
                ? data?.property?.profile_pic
                : isValidURL(isArray(data?.property?.gallery) ? data?.property?.gallery[0]?.url : '')
                  ? data?.property?.gallery[0]?.url
                  : data?.owned_by === userId
                    ? 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png'
                    : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png',
            }}
            style={styles.imgStyle}
          />

          {data?.isExpired ? (
            <RNView style={styles.expiredView}>
              <RNText style={styles.reraText}>Expired</RNText>
            </RNView>
          ) : (
            <RNView></RNView>
          )}

          {/* {data?.property?.rera_number ? (
            <RNView style={styles.reraView}>
              <RNText style={styles.reraText}>RERA</RNText>
            </RNView>
          ) : (
            <RNView></RNView>
          )} */}

          {data?.is_verified && !data?.property?.business_id ? (
            <RNView style={styles.subTract}>
              <ImageBackground
                resizeMode="contain"
                source={require('@/assets/images/nearu/Subtract.png')}
                style={styles.bgImgStyle}
                // resizeMode="contain"
              >
                <RNView style={styles.verifyView}>
                  <RNText style={styles.verifyText}>Verified</RNText>
                </RNView>
              </ImageBackground>
            </RNView>
          ) : (
            <RNView></RNView>
          )}

          <RNView style={styles.priceView}>
            {data?.property?.property_price ? (
              <RNText style={styles.priceText}>
                ₹ {formatNumberWithNotation(data?.property?.property_price) || 'N/A'}
              </RNText>
            ) : (
              <RNView></RNView>
            )}
          </RNView>
          {data?.property?.rera_number ? (
            <RNView style={styles.reraView}>
              <RNText style={styles.reraText}>RERA</RNText>
            </RNView>
          ) : (
            <RNView></RNView>
          )}
        </RNView>
        <RNView style={styles.imgContainer}>
          <RNView style={styles.header}>
            <RNView style={styles.headerRight}>
              <RNText numberOfLines={1} style={styles.propName}>
                {data?.property?.property_name}
              </RNText>
              {data?.property?.locality ? (
                <RNText numberOfLines={2} style={styles.propLocality}>
                  {data?.property?.locality}
                </RNText>
              ) : (
                <RNView></RNView>
              )}
            </RNView>
            {moreBtnVal ? (
              <RNView style={styles.headerLeft}>
                <TouchableOpacity onPress={handleMoreBtn}>
                  <Entypo name="dots-three-horizontal" size={18} color="black" onPress={handleMoreBtn} />
                </TouchableOpacity>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
          </RNView>
          <RNView>
            <RNText
              style={
                styles.propLocality
              }>{`Posted on: ${moment(data?.createdAt).format('DD-MM-YYYY hh:mm A')}`}</RNText>
          </RNView>
          {type === 'active' ? (
            <RNView>
              {/* <RNText
                style={
                  styles.propLocality
                }>{`Inactive on: ${moment(data?.expired_date).format('DD-MM-YYYY hh:mm A')}`}</RNText> */}
            </RNView>
          ) : (
            <RNView>
              <RNText
                style={
                  styles.propLocality
                }>{`Inactive since: ${moment(data?.expired_date).format('DD-MM-YYYY hh:mm A')}`}</RNText>
            </RNView>
          )}

          <RNView style={styles.rowView}>
            {data?.property?.iwant ? (
              <RNView style={styles.subType}>
                <RNText style={styles.typeText}>{data?.property?.iwant}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}

            {data?.property?.property_type ? (
              <RNView style={styles.subType}>
                <RNText style={styles.typeText}>{data?.property?.property_type}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}

            {data?.property?.property_sub_type ? (
              <RNView style={styles.subType}>
                <RNText style={styles.typeText}>{data?.property?.property_sub_type}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
          </RNView>

          {/* <RNView style={styles.flexRow}>
            {data?.property?.bhk ? (
              <RNText style={styles.propLocality}>{data?.property?.bhk} ,</RNText>
            ) : (
              <RNView></RNView>
            )}
            {data?.property?.furnishing_status ? (
              <RNText style={styles.propLocality}>{data?.property?.furnishing_status}</RNText>
            ) : (
              <RNView></RNView>
            )}
          </RNView> */}

          {/* {data?.property?.transaction_type || data?.property?.transaction_type_new ? (
            <RNText style={styles.propLocality}>Agent Property</RNText>
          ) : (
            <RNView></RNView>
          )} */}
          <RNView style={styles.flexRow}>
            {data?.property?.transaction_type ? (
              <RNView style={styles.transView}>
                <RNText style={styles.propLocality}>{data?.property?.transaction_type}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
            {data?.property?.transaction_type_new ? (
              <RNView style={styles.transTypeNew}>
                <RNText style={styles.propLocality}>{data?.property?.transaction_type_new}</RNText>
              </RNView>
            ) : (
              <RNView></RNView>
            )}
          </RNView>

          <RNView style={styles.rightBottom}>
            <RNView style={styles.flexRow}>
              <RNView style={{ flexDirection: 'column' }}>
                {data?.property?.property_area ? (
                  <>
                    <RNText style={styles.propsUnits}>
                      {data?.property?.property_area} {areaunitremoveunder(data?.property?.property_area_units)}
                    </RNText>
                    <RNText style={styles.propLocality}>Property Area</RNText>
                  </>
                ) : data?.property?.rent_amount ? (
                  <>
                    <RNText style={styles.propsUnits}>{formatNumberWithNotation(data?.property?.rent_amount)}</RNText>
                    <RNText style={styles.propLocality}>Rent Amount</RNText>
                  </>
                ) : null}
              </RNView>

              <RNView style={styles.verticleLine}></RNView>

              {data?.property?.business_id ? (
                <RNView style={{ flexDirection: 'column', marginLeft: 5 }}>
                  <RNText style={styles.facingText}>{data?.property?.no_of_units}</RNText>

                  <RNText style={styles.propLocality}>No of Units</RNText>
                </RNView>
              ) : (
                <RNView style={{ flexDirection: 'column', marginLeft: 5 }}>
                  {data?.property?.property_facing ? (
                    <RNText style={styles.facingText}>{data?.property?.property_facing}</RNText>
                  ) : (
                    <RNText style={styles.facingText}>NA</RNText>
                  )}
                  <RNText style={styles.propLocality}>Facing</RNText>
                </RNView>
              )}
            </RNView>
          </RNView>
        </RNView>
      </RNView>

      {Array.isArray(subscriptionDatas.data) && subscriptionDatas.data.length > 0 && (
        <SubscriptionModal
          ViewSubscription={ViewSubscription}
          CloseSubscriptionAll={CloseSubscriptionAll}
          subscriptionData={subscriptionDatas}
          SelectSubscription={SelectSubscription}
        />
      )}

      <PropBottomSheet
        showBottomSheet={OpenSheet}
        setshowBottomSheet={val => setOpenSheet(val)}
        onPressDelete={(Id: string) => {
          onPressDeleteProp(data?._id);
        }}
        data={data}
        userId={selectedData?._id}
        onPressEdit={data => {
          onPressEditProp();
        }}
        onPressReActivate={data => {
          // ViewSubscriptionAll(data, 0);
          onPressReActivate(data);
        }}
        onPressDeActivate={data => {
          onPressDeActivate(data);
        }}
        onPressReNewProp={data => {
          ViewSubscriptionAll(data, 1);
          // onPressReNewProp(data);
        }}
        type={type}
        renewProp={data?.isExpired === true ? true : false}
        ableToHide={data?.isExpired === false && data?.isHide === true ? true : false}
      />

      {deletePopup && (
        <CustomAlertWrapper
          onClose={() => setShowDeletePopup(false)}
          openModal={deletePopup}
          text={'Are you sure you want to delete?'}
          head={'Delete'}>
          <PropertyCategoryChips
            item={{ label: 'Cancel', active: true }}
            containerStyle={{
              flex: 1,
            }}
            onPress={() => {
              setShowDeletePopup(!deletePopup);
            }}
            style={{
              backgroundColor: 'white',
            }}
          />
          <PropertyCategoryChips
            item={{ label: 'Delete' }}
            containerStyle={{
              flex: 1,
            }}
            onPress={deleteProperty}
            style={{
              backgroundColor: 'red',
            }}
            textStyle={{
              color: 'white',
              fontWeight: 'bold',
            }}
          />
        </CustomAlertWrapper>
      )}
    </TouchableOpacity>
  );
};

export default memo(MyPropertyCard);
