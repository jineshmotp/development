import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { TextInput } from 'react-native-paper';
import { useToast } from 'react-native-toast-notifications';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import Divider from '@/components/common/Divider';
import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
// import { isArray } from '@/constants/function/isArray';
import CommonButton from '@/custom/CommonButton';
import DropDownComponent from '@/custom/DropDownComponent';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { deviceHeight, deviceWidth } from '@/utils';

import { styles } from './styles';

type Props = {
  isVisible?: boolean;
  onPressClose?: () => void;
  userInfoData?: { _id?: number; key?: string; value?: string }[];
};

const SocialLinksEdit: React.FC<Props> = ({ isVisible = true, onPressClose, userInfoData = {} }) => {
  // console.log('++++++++++++++++++', userInfoData);
  const toast = useToast();
  const state = useAppSelector(getUserData);
  const [value, setValue] = useState(null);
  const [label, setLabel] = useState(null);
  const [text, setText] = useState('');
  const [listData, setListData] = useState(userInfoData);
  // console.log('listData ======>', listData);

  const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
  //   const [mutation, userLinkData, isloading, isSuccess, isError] = useCallApi(Apis.updateUserDataApi);
  const data = [
    { label: 'instagram', value: '1' },
    { label: 'facebook', value: '2' },
    { label: 'linkedin', value: '3' },
    { label: 'youtube', value: '4' },
    { label: 'twitter', value: '5' },
  ];
  //   const replacevalue = (platform: string) => {
  //     let temp = data.find((itm, ind) => {
  //       return platform === itm?.label;
  //     });
  //     return temp?.value;
  //   };
  //   useEffect(() => {
  //     if (isArray(state?.social_media) && state?.social_media[0]?.key) {
  //       let temp = state.social_media.map((itm, ind) => {
  //         return {
  //           platform: itm.key,
  //           acc_name: itm.value,
  //           value: replacevalue(itm.key),
  //         };
  //       });
  //       setListData(temp);
  //     }
  //     setUserData(state);
  //   }, [route?.params, state]);

  const cleanUpFields = () => {
    setValue(null);
    setLabel('');
    setText('');
  };

  const handleDeleteFn = item => {
    // console.log('first', item);
    const temp = listData.filter((itm, ind) => {
      return itm.value !== item.value && itm.key !== item.key;
    });
    // console.log('handleDeleteFn', temp);
    setListData(temp);
  };
  const getValByPlatform = platform => {
    const valId = data.find((ele, ind) => {
      return ele.label === platform;
    });
    return valId?.value;
  };

  const handleEditFn = item => {
    const myFn = getValByPlatform(item.key);
    setValue(myFn);
    setLabel(item.key);
    setText(item.value);
    handleDeleteFn(item);
  };

  const handleLinkvalidation = (link: string): boolean => {
    console.log('link ======>', link);

    const urlRegex =
      /^(https?|ftp?|www?|http):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    return urlRegex.test(`${link}`);
  };
  const handleAddLinkBtnFn = () => {
    if (handleLinkvalidation(text) && value) {
      setListData(prev => [{ key: label, value: text, _id: value }, ...prev]);
      cleanUpFields();
    } else if (!value)
      // Alert.alert("Please select social platform in drop down");
      toast.show('', {
        type: 'info_toast',
        animationDuration: 100,
        data: {
          title: 'Please select social platform in drop down',
        },
        duration: 2000,
      });
    else {
      // Alert.alert("Please ender valid social link");
      toast.show('', {
        type: 'info_toast',
        animationDuration: 100,
        data: {
          title: 'Please enter valid social link',
        },
        duration: 2000,
      });
    }
  };

  const handleSubmitFn = async () => {
    const socialData = listData.map((itm, ind) => {
      return {
        key: itm?.key,
        value: itm?.value,
      };
    });
    updateUserDataMutation({
      userId: state._id,
      updateDetails: {
        social_media: socialData,
      },
    }).then(response => {
      // console.log('response =====>', response);

      if (response?.data?.status) {
        cleanUpFields();
        toast.show(response?.data?.message, {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        // console.log('social++++++++', socialData);
        onPressClose();
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
    // console.log("response?.status======>", response?.status);
  };
  return (
    <ModalWrapper visible={isVisible} onClose={onPressClose} header={true} modalHeight={deviceHeight / 1.5}>
      <HeaderBar
        label="Social link"
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={() => {
          cleanUpFields();
          onPressClose();
        }}
      />
      <ScrollView>
        <TouchableWithoutFeedback onPress={() => console.log('first')}>
          <RNView style={styles.sectionContainer}>
            <RNView style={styles.main}>
              <DetailSectionHeader Heading={'SOCIAL LINKS'} btnText={''} editBtnFunction={() => {}} />
            </RNView>
            <Divider
              borderColor="#D9D6D6"
              dividerWidth={deviceWidth}
              style={{
                marginBottom: 10,
              }}
            />
            <RNView style={styles.Container}>
              <RNView>
                <DropDownComponent
                  data={data}
                  selectedTextStyle={label ? styles.selectedTextStyle : styles.placeholderStyle}
                  dropDownStyle={styles.mainDown}
                  placeholderStyle={label ? styles.selectedTextStyle : styles.placeholderStyle}
                  // disabled={details.total_floors === '' ? true : false}
                  placeholderName="Select platform"
                  value={value}
                  // errors={errors.floor_no}
                  onSelectChange={item => {
                    setLabel(item.label);
                    setValue(item.value);
                  }}
                  itemContainerStyle={styles.optionStyle}
                  itemTextStyle={styles.optionText}
                />
              </RNView>
              <TextInput
                value={text}
                onChangeText={t => setText(t)}
                style={[styles.dropdown]}
                inputMode="text"
                underlineColor="#EEEEEE"
                activeUnderlineColor="#EEEEEE"
                activeOutlineColor="#EEEEEE"
                underlineColorAndroid="transparent"
                placeholder="Add Link Here"
                textColor="black"
                placeholderTextColor={'#1E9991'}
                cursorColor="grey"
                keyboardType="url"
              />
            </RNView>
            <Divider
              borderColor="#D9D6D6"
              dividerWidth={deviceWidth}
              style={{
                marginVertical: 10,
              }}
            />
            <RNView style={styles.addlink}>
              <CommonButton
                onPress={handleAddLinkBtnFn}
                title={'Add Link'}
                loading={false}
                disabled={false}
                style={styles.addlinkBtn}
                textStyle={{ color: 'black' }}
              />
            </RNView>
            <Divider
              borderColor="#D9D6D6"
              dividerWidth={deviceWidth}
              style={{
                marginTop: 10,
              }}
            />
            <RNView style={styles.listView}>
              {listData?.map((item, ind) => {
                return (
                  <RNView key={ind} style={styles.rowStyle}>
                    <RNText style={styles.selectedTextStyle}>{item?.key}</RNText>
                    <RNView style={styles.rightCross}>
                      <RNText style={styles.selectedTextStyle}>{item?.value}</RNText>
                      <TouchableOpacity style={styles.closeBtn} onPress={() => handleDeleteFn(item)}>
                        <Ionicons name="close" size={20} color="#1E9991" />
                      </TouchableOpacity>
                      <TouchableOpacity style={styles.closeBtn} onPress={() => handleEditFn(item)}>
                        <Entypo name="edit" size={15} color="#1E9991" />
                      </TouchableOpacity>
                    </RNView>
                  </RNView>
                );
              })}
            </RNView>
            <RNView style={styles.mainBtn}>
              <CommonButton
                disabled={isLoading}
                onPress={handleSubmitFn}
                loaderColor="black"
                loading={isLoading}
                title="Save"
                style={styles.btnSave}
                textStyle={styles.textStyle}
              />
              <CommonButton
                // disabled={loader}
                onPress={() => {
                  // cleanUpFields();
                  onPressClose();
                }}
                // loaderColor="black"
                // loading={loader}
                title="Cancel"
                style={styles.btnCancel}
                textStyle={styles.textStyle}
              />
            </RNView>
          </RNView>
        </TouchableWithoutFeedback>
      </ScrollView>
    </ModalWrapper>
  );
};

export default SocialLinksEdit;
