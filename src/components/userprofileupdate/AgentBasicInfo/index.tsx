import React, { useEffect, useState } from 'react';
import { Keyboard, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useToast } from 'react-native-toast-notifications';

import { CircleIcon, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, VStack } from '@gluestack-ui/themed';
import moment from 'moment';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import Divider from '@/components/common/Divider';
import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

import { styles } from './styles';

type AgentBasicInfoProps = {
  isVisible?: boolean;
  onPressClose?: () => void;
  userData?: any;
};
const AgentBasicInfo: React.FC<AgentBasicInfoProps> = ({ isVisible, onPressClose, userData }) => {
  const toast = useToast();

  const [data, setData] = useState<any>(userData?.agent_data);
  const [toogleDatePicker, setToogleDatePicker] = useState<boolean>(false);
  const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
  const [date, setDate] = useState(
    data?.operating_since
      ? data?.operating_since?.length > 11
        ? data?.operating_since
        : moment(data?.operating_since, 'MM-DD-YYYY').toISOString()
      : new Date().toISOString()
  );

  const handleUpdateBasicInfo = async () => {
    updateUserDataMutation({
      userId: userData._id,
      updateDetails: {
        company_name: data?.company_name,
        intro: data?.intro,
        operating_since: moment(date).format('MM-DD-YYYY'),
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
        <HeaderBar label="Agent info" backPress={onPressClose} />
        <RNView style={styles.sectionContainer}>
          <DetailSectionHeader
            Heading={'Company Name'}
            btnText={''}
            editBtnFunction={() => {}}
            headingTextStyle={styles.headingTextStyle}
          />
          <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
            <>
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
              <CommonInput
                onChangeText={text => {
                  setData({ ...data, intro: text });
                }}
                value={data?.intro}
                label="Description"
                placeholder="Description"
                placeholderColor={ColorTheme.gray2}
                style={styles.inputStyleArea}
                contentStyle={styles.contentStyle}
                multiline={true}
              />
            </>
          </TouchableWithoutFeedback>
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
            Heading={'Operating Since'}
            btnText={''}
            editBtnFunction={() => {}}
            headingTextStyle={styles.headingTextStyle}
          />
          <TouchableOpacity onPress={() => setToogleDatePicker(true)}>
            <RNView style={styles.inputstyle}>
              <RNText style={{ color: 'black' }}>{moment(date).format('YYYY')}</RNText>
              <RNImage style={{ width: 20, height: 20 }} source={require('@/assets/images/business/calender.png')} />
            </RNView>
          </TouchableOpacity>
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
        </RNView>
      </ScrollView>
    </ModalWrapper>
  );
};

export default AgentBasicInfo;
