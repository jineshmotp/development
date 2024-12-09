import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import CitySelectorModal from '@/components/common/CitySelectorModal';
import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
import StateSelectorModal from '@/components/common/StateSelectorModal';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { deviceHeight } from '@/utils';

import { styles } from './styles';

type Props = {
  onPressClose?: () => void;
  isVisible?: boolean;
};

const MyPersonalINfo: React.FC<Props> = ({ onPressClose, isVisible }) => {
  const toast = useToast();
  //   const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const [showCity, setShowCity] = useState(false);
  const [showState, setShowState] = useState(false);
  const [userData, setUserData] = useState({
    fname: '',
    lname: '',
    adhaar: '',
    pan: '',
    city: '',
    state: '',
    email: '',
    mobile_no: '',
  });
  const selectedData = useAppSelector(getUserData);
  const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
  const fetchUserData = async () => {
    const userData = selectedData;
    // console.log("abhag--------------", data);
    setUserData({
      fname: userData?.fname,
      lname: userData?.lname,
      adhaar: userData?.adhaar,
      pan: userData?.pan,
      city: userData?.city,
      state: userData?.state,
      email: userData?.email,
      mobile_no: userData?.mobile_no,
    });
  };

  const updatePersonalData = async () => {
    const payload = {
      userId: selectedData?._id,
      updateDetails: userData,
    };
    updateUserDataMutation(payload).then(response => {
      // console.log('response.data.status', response.data);
      if (response?.data?.status) {
        toast.show('Personal Info Update successful', {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Updated',
          },
          duration: 3000,
        });
      } else {
        toast.show('Please fill all the fields', {
          type: 'info_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };

  useEffect(() => {
    fetchUserData();
  }, []);
  return (
    <ModalWrapper visible={isVisible} onClose={onPressClose} header={true} modalHeight={deviceHeight - 40}>
      <HeaderBar label="Profile" backPress={onPressClose} />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
        style={Platform.OS === 'ios' ? styles.topView : styles.topView}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 30 : -80}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <CommonInput
            label="First Name"
            style={styles.inputStyle}
            value={userData.fname}
            onChangeText={text => {
              setUserData({
                ...userData,
                fname: text,
              });
            }}
            contentStyle={styles.contentStyle}
          />
          <CommonInput
            label="Last Name"
            style={styles.inputStyle}
            value={userData.lname}
            onChangeText={text => {
              setUserData({
                ...userData,
                lname: text,
              });
            }}
            contentStyle={styles.contentStyle}
          />
          <CommonInput
            label="Email"
            style={styles.inputStyle}
            value={userData.email}
            disabled={true}
            onChangeText={text => {
              setUserData({
                ...userData,
                email: text,
              });
            }}
          />
          <CommonInput
            label="Phone"
            style={styles.inputStyle}
            disabled={true}
            value={userData.mobile_no}
            onChangeText={text => {
              setUserData({
                ...userData,
                mobile_no: text,
              });
            }}
          />
          <CommonInput
            label="Adhaar"
            style={styles.inputStyle}
            value={userData.adhaar}
            onChangeText={text => {
              setUserData({
                ...userData,
                adhaar: text,
              });
            }}
            maxLength={12}
            keyboardType={'numeric'}
          />
          <CommonInput
            label="PAN"
            style={styles.inputStyle}
            value={userData.pan}
            onChangeText={text => {
              setUserData({
                ...userData,
                pan: text,
              });
            }}
          />
          <RNView style={styles.headView}>
            <RNText style={styles.heading}>City</RNText>
            <TouchableOpacity
              style={styles.nameView}
              onPress={() => {
                setShowCity(!showCity);
              }}>
              <RNText style={{ color: 'black' }}>{userData?.city ?? ''}</RNText>
            </TouchableOpacity>
          </RNView>
          <RNView style={styles.headView}>
            <RNText style={styles.heading}>State</RNText>
            <TouchableOpacity
              style={styles.nameView}
              onPress={() => {
                setShowState(!showState);
              }}>
              <RNText style={{ color: 'black' }}>{userData?.state ?? ''}</RNText>
            </TouchableOpacity>
          </RNView>
          <CommonButton
            title="Update"
            onPress={updatePersonalData}
            loading={isLoading}
            disabled={isLoading}
            loaderColor="black"
          />
        </ScrollView>

        <CitySelectorModal
          onPressClose={() => setShowCity(false)}
          showCity={showCity}
          setCity={e => {
            setUserData({
              ...userData,
              city: e,
            });
          }}
        />
        <StateSelectorModal
          showState={showState}
          onPressClose={() => setShowState(false)}
          setState={e => {
            setUserData({
              ...userData,
              state: e,
            });
          }}
        />
      </KeyboardAvoidingView>
    </ModalWrapper>
  );
};

export default MyPersonalINfo;
