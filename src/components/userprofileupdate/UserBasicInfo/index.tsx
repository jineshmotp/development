import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useToast } from 'react-native-toast-notifications';

import { CircleIcon, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, VStack } from '@gluestack-ui/themed';
import moment from 'moment';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import Divider from '@/components/common/Divider';
import HeaderBar from '@/components/common/HeaderBar';
import InputChips from '@/components/common/InputChips';
import ModalWrapper from '@/components/common/ModalWrapper';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { getBuilderStepTwo } from '@/redux/onboarding/onboardingReducer';
import { useGetAllLanguagesQuery } from '@/redux/onboarding/onboardingService';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

import { styles } from './styles';

type UserBasicInfoProps = {
  isVisible?: boolean;
  onPressClose?: () => void;
  userData?: any;
};
const UserBasicInfo: React.FC<UserBasicInfoProps> = ({ isVisible, onPressClose, userData }) => {
  const toast = useToast();
  const { data: languagesList } = useGetAllLanguagesQuery({});
  const [data, setData] = useState<any>(userData);
  const [values, setValues] = useState<string>(data?.gender ? data.gender : 'Male');
  const [toogleDatePicker, setToogleDatePicker] = useState<boolean>(false);
  const [selectedList, setSelectedList] = useState([]);
  const [showCityModal, setShowCityModal] = useState(false);
  const stepTwoBuilder = useAppSelector(getBuilderStepTwo);
  const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
  const [date, setDate] = useState(
    data?.dob
      ? data?.dob?.length > 11
        ? data?.dob
        : moment(data?.dob, 'MM-DD-YYYY').toISOString()
      : new Date().toISOString()
  );
  useEffect(() => {
    setSelectedList(stepTwoBuilder?.languages);
    setSelectedList(
      data?.languages?.map((language, index) => ({
        _id: `language_${index}`,
        label: language,
        value: language,
        isActive: true,
      }))
    );
  }, []);
  const handleCloseModal = () => {
    setShowCityModal(false);
  };
  const handleBuildingTypeSelect = builder => {
    // Toggle selection of builder
    if (selectedList.includes(builder)) {
      setSelectedList(selectedList.filter(item => item !== builder));
    } else {
      setSelectedList([...selectedList, builder]);
    }

    // Close keyboard when city is selected
    Keyboard.dismiss();
  };
  const handleFocus = () => {
    Keyboard.dismiss();
    if (!showCityModal) {
      setShowCityModal(true);
    }
  };
  const handleUpdateBasicInfo = async () => {
    // setData({...data,languages:selectedList.map(obj => obj?.label)})

    updateUserDataMutation({
      userId: data._id,
      updateDetails: {
        fname: data?.fname,
        lname: data?.lname,
        company_name: data?.company_name,
        rera_id: data?.rera_id,
        bio:data?.bio,
        gender: values,
        dob: moment(date).format('MM-DD-YYYY'),
        languages: selectedList.map(obj => obj?.label),
      },
    }).then(response => {
      // console.log('updateUserDataMutation', response);
      if (response?.data?.status) {
        toast.show(response?.data?.message, {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });

        onPressClose();
      } else {
        if (!response?.error?.status) {
          toast.show(response?.error?.message, {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        }
      }
    });
    // console.log("response?.status======>", response?.status);
  };

  return (
    <ModalWrapper visible={isVisible} onClose={onPressClose} header={true} modalHeight={deviceHeight - px(100)}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <HeaderBar label="Basic info" backPress={onPressClose} />
        <RNView style={styles.sectionContainer}>
          <DetailSectionHeader
            Heading={'User Full Name'}
            btnText={''}
            editBtnFunction={() => {}}
            headingTextStyle={styles.headingTextStyle}
          />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>
              <CommonInput
                onChangeText={text => {
                  setData({ ...data, fname: text });
                }}
                value={data?.fname}
                label="First Name"
                placeholder="First Name"
                placeholderColor={ColorTheme.gray2}
                style={styles.inputStyle}
                contentStyle={styles.contentStyle}
              />
              <CommonInput
                onChangeText={text => {
                  setData({ ...data, lname: text });
                }}
                value={data?.lname}
                label="Last Name"
                placeholder="Last Name"
                placeholderColor={ColorTheme.gray2}
                style={styles.inputStyle}
                contentStyle={styles.contentStyle}
              />
               <CommonInput
                    onChangeText={text => {
                      setData({ ...data, bio: text });
                    }}
                    value={data?.bio}
                    label="Description"
                    placeholder="Description"
                    placeholderColor={ColorTheme.gray2}
                    style={styles.inputStyle}
                    multiline={true}
                    contentStyle={[styles.contentStyle,{height:px(80),marginVertical:px(10)}]}
                  />

                  <DetailSectionHeader
                    Heading={'Select Languages'}
                    btnText={''}
                    editBtnFunction={() => {}}
                    headingTextStyle={styles.headingTextStyle}
                  />
              {data?.role === 'BUILDER' || data?.role === 'AGENT' ? (
                <>
                  <DetailSectionHeader
                    Heading={'Company Name'}
                    btnText={''}
                    editBtnFunction={() => {}}
                    headingTextStyle={styles.headingTextStyle}
                  />
                  <CommonInput
                    onChangeText={text => {
                      setData({ ...data, company_name: text });
                    }}
                    value={data?.company_name}
                    label="Company Name"
                    placeholder="Company Name"
                    placeholderColor={ColorTheme.gray2}
                    style={styles.inputStyle}
                    contentStyle={styles.contentStyle}
                  />
                  <DetailSectionHeader
                    Heading={'Rera ID'}
                    btnText={''}
                    editBtnFunction={() => {}}
                    headingTextStyle={styles.headingTextStyle}
                  />
                  <CommonInput
                    onChangeText={text => {
                      setData({ ...data, rera_id: text });
                    }}
                    value={data?.rera_id}
                    label="Rera ID"
                    placeholder="Rera ID"
                    placeholderColor={ColorTheme.gray2}
                    style={styles.inputStyle}
                    contentStyle={styles.contentStyle}
                  />

                  <DetailSectionHeader
                    Heading={'Select Languages'}
                    btnText={''}
                    editBtnFunction={() => {}}
                    headingTextStyle={styles.headingTextStyle}
                  />

                  <CommonInput
                    // onChangeText={text => {
                    //   setstepTwoDetails({ ...stepTwoDetails, languages: text });
                    // }}
                    // value={stepTwoDetails?.languages}
                    label="Select Languages"
                    placeholder="Select Languages"
                    placeholderColor={ColorTheme.gray2}
                    style={styles.inputStyle}
                    maxLength={50}
                    onFocus={handleFocus}
                  />
                  <RNView
                    style={{ width: deviceWidth / 1.09, flexWrap: 'wrap', flexDirection: 'row', marginLeft: px(20) }}>
                    {selectedList?.map((item, ind) => {
                      return (
                        <InputChips
                          style={{
                            minWidth: px(100),
                            height: px(40),
                            backgroundColor: ColorTheme.onboardingPrimary,
                            flexDirection: 'row',
                            justifyContent: 'space-around',
                            alignItems: 'center',
                            margin: px(2),
                          }}
                          key={ind}
                          item={item}
                          onPress={itm => {
                            handleBuildingTypeSelect(itm);
                          }}
                        />
                      );
                    })}
                  </RNView>
                </>
              ) : (
                <>
                <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={
              {
                // marginVertical: 20,
              }
            }
          />
          <DetailSectionHeader
            Heading={'Gender'}
            btnText={''}
            editBtnFunction={() => {}}
            headingTextStyle={styles.headingTextStyle}
          />
          <RNView
            style={{
              alignContent: 'flex-start',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              width: deviceWidth / 1.09,
            }}>
            <RadioGroup value={values} onChange={setValues} width={deviceWidth / 1.09}>
              <VStack space="lg" size="lg" width={deviceWidth / 1.09}>
                <Radio value="Male" justifyContent="space-between" width={deviceWidth / 1.09}>
                  <RadioLabel>Male</RadioLabel>
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                </Radio>
                <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth / 1.09} />
                <Radio value="Female" justifyContent="space-between" width={deviceWidth / 1.09}>
                  <RadioLabel>Female</RadioLabel>
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                </Radio>
                <Divider borderColor="#D9D6D6" dividerWidth={deviceWidth / 1.09} />
                <Radio value="Other" justifyContent="space-between" width={`${deviceWidth / 1.09}`}>
                  <RadioLabel>Other</RadioLabel>
                  <RadioIndicator mr="$2">
                    <RadioIcon as={CircleIcon} />
                  </RadioIndicator>
                </Radio>
              </VStack>
            </RadioGroup>
          </RNView>
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={{
              marginVertical: 20,
            }}
          />
          <DetailSectionHeader
            Heading={'Date of birth'}
            btnText={''}
            editBtnFunction={() => {}}
            headingTextStyle={styles.headingTextStyle}
          />
          <TouchableOpacity onPress={() => setToogleDatePicker(true)}>
            <RNView style={styles.inputstyle}>
              <RNText style={{ color: 'black' }}>{moment(date).format('MM-DD-YYYY')}</RNText>
              <RNImage style={{ width: 20, height: 20 }} source={require('@/assets/images/business/calender.png')} />
            </RNView>
          </TouchableOpacity>
                </>
              )}
            </>
          </TouchableWithoutFeedback>
          
          {/* <Divider
          borderColor="#D9D6D6"
          dividerWidth={deviceWidth}
          style={{
            marginTop: 20,
          }}
        /> */}
          <RNView style={styles.mainBtn}>
            <CommonButton
              disabled={isLoading}
              onPress={handleUpdateBasicInfo}
              loaderColor="black"
              loading={isLoading}
              title="Save"
              style={styles.btnSave}
              textStyle={styles.textStyle}
            />
            <CommonButton
              // disabled={loader}
              onPress={onPressClose}
              // loaderColor="black"
              // loading={loader}
              title="Cancel"
              style={styles.btnCancel}
              textStyle={styles.textStyle}
            />
          </RNView>
          <DateTimePickerModal
            isVisible={toogleDatePicker}
            mode="date"
            onConfirm={date => {
              // console.log('DateTimePickerModal', date);
              setDate(date);
              setToogleDatePicker(false);
            }}
            onCancel={() => setToogleDatePicker(false)}
            maximumDate={new Date()}
          />
          <Modal visible={showCityModal} transparent={true} animationType="fade" onRequestClose={handleCloseModal}>
            <Pressable style={styles.modalBackground} onPress={handleCloseModal}>
              <RNView style={styles.modalContainer}>
                <FlatList
                  data={languagesList?.data}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => handleBuildingTypeSelect(item)}>
                      <RNText style={[styles.renderText, selectedList.includes(item) && styles.selectedText]}>
                        {item?.label}
                      </RNText>
                    </TouchableOpacity>
                  )}
                />
              </RNView>
            </Pressable>
          </Modal>
        </RNView>
      </ScrollView>
    </ModalWrapper>
  );
};

export default UserBasicInfo;
