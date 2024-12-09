import React, { useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import HeaderBar from '@/components/common/HeaderBar';
import MultiSelectDropdown from '@/components/common/MultiSelectDropdown';
import OperationTimeRow from '@/components/common/OperationTimeRow';
import { commonLanguages } from '@/constants/function/agent.helper';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useConvertToAgentMutation, useLazyGetUserDataQuery } from '@/redux/login/loginService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { deviceWidth } from '@/utils';

import CityLocality from './CityLocality';
import { styles } from './styles';

const AgentOperationTime = () => {
  const toast = useToast();
  const userData = useAppSelector(getUserData);
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'AGENT_OPERATION_TIME'>>();
  const [convertToAgentMutation] = useConvertToAgentMutation();
  const [getUserInfo] = useLazyGetUserDataQuery();

  const initialLocationDetails = {
    city: '',
    locality: [],
  };

  const initialOperationTimings = [
    {
      close_time: new Date(),
      start_time: new Date(),
      status: 'close',
      day: 'Sunday',
    },
    {
      close_time: new Date(),
      start_time: new Date(),
      status: 'close',
      day: 'Monday',
    },
    {
      close_time: new Date(),
      start_time: new Date(),
      status: 'close',
      day: 'Tuesday',
    },
    {
      close_time: new Date(),
      start_time: new Date(),
      status: 'close',
      day: 'Wednesday',
    },
    {
      close_time: new Date(),
      start_time: new Date(),
      status: 'close',
      day: 'Thursday',
    },
    {
      close_time: new Date(),
      start_time: new Date(),
      status: 'close',
      day: 'Friday',
    },
    {
      close_time: new Date(),
      start_time: new Date(),
      status: 'close',
      day: 'Saturday',
    },
  ];
  const cityListData = [
    { value: 'Hyderabad', label: 'Hyderabad' },
    { value: 'Mumbai', label: 'Mumbai' },
    { value: 'Delhi', label: 'Delhi' },
    { value: 'Gurugram', label: 'Gurugram' },
    { value: 'Bangalore', label: 'Bangalore' },
    { value: 'Chennai', label: 'Chennai' },
    { value: 'Pune', label: 'Pune' },
    { value: 'Nizamabad', label: 'Nizamabad' },
    { value: 'Bhubaneswar', label: 'Bhubaneswar' },
    { value: 'Kochi', label: 'Kochi' },
    { value: 'Warangal', label: 'Warangal' },
  ];

  const initialState = {
    language: [],
    rera_id: '',
    operation_timings: [...initialOperationTimings],
    location_details: [
      {
        city: '',
        locality: [],
      },
    ],
  };

  const [agentInfo, setAgentInfo] = useState({ ...route?.params?.agentData, ...initialState });
  const [defOpenTime, setDefOpenTime] = useState(new Date());
  const [defCloseTime, setDefCloseTime] = useState(new Date());
  const [cityList, setCityList] = useState(cityListData);

  const addMoreClick = () => {
    setAgentInfo({ ...agentInfo, location_details: [...agentInfo.location_details, { ...initialLocationDetails }] });
    const selectedCities = agentInfo.location_details.map(ele => {
      return ele?.city;
    });
    const temp = cityList.filter(item => {
      return !selectedCities.includes(item.value);
    });
    setCityList(temp);
  };

  const validateForm = () => {
    return (
      agentInfo.language.length !== 0 &&
      agentInfo.location_details.map(item => item.city.length !== 0 && item.locality.length !== 0)[0] &&
      agentInfo.operation_timings.length !== 0
    );
  };

  //here o is for open time,c is for close time and h is for holiday bool
  const onChangeTimings = (index: number, value: any, type: 'o' | 'c' | 'h') => {
    let tempArr = [...agentInfo.operation_timings];
    if (type === 'o') {
      tempArr[index].start_time = value;
    } else if (type === 'c') {
      tempArr[index].close_time = value;
    } else if (type === 'h') {
      tempArr[index].status = value;
    }
    setAgentInfo({ ...agentInfo, operation_timings: [...tempArr] });
  };

  const triggerApiToAgent = () => {
    if (!agentInfo?.rera_id) delete agentInfo.rera_id;

    // console.log('triggerApiToAgent++', agentInfo);
    convertToAgentMutation({
      updateDetails: { ...agentInfo },
      userId: userData?._id,
    }).then((response: any) => {
      // console.log('response+++', response);
      if (response?.data) {
        getUserInfo({}).then(res => {
          // console.log('getUserInfo+++++++', res.data);
          setTimeout(() => {
            navigation.goBack();
            navigation.goBack();
            navigation.navigate('USER_PROFILE_DETAILS');
          }, 1000);
        });

        // navigation.reset({
        //   index: 0,
        //   routes: [{ name: 'USER_PROFILE' }],
        // });
      } else {
        toast.show(response?.error?.message || 'Something went wrong', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Error Message',
          },
          duration: 3000,
        });
      }
    });
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar label="Agent Account" backPress={() => navigation.goBack()} />
      <ScrollView style={{ flex: 1, paddingBottom: 50 }} contentContainerStyle={{ marginBottom: 20 }}>
        <RNView style={{ alignItems: 'center' }}>
          <RNView style={{ width: deviceWidth / 1.09 }}>
            {agentInfo.location_details.map((locationDetail: any, index: number) => {
              return (
                <CityLocality
                  agentInfo={agentInfo}
                  setAgentInfo={setAgentInfo}
                  locationDetail={locationDetail}
                  index={index}
                  cityListData={cityList}
                />
              );
            })}
            {agentInfo.location_details?.length <= 4 ? (
              <TouchableOpacity
                activeOpacity={0.6}
                style={{ alignSelf: 'flex-end', marginTop: 15 }}
                onPress={addMoreClick}>
                <RNText style={{ color: ColorTheme.nearLukBasePrimaryColor }}>Add More +</RNText>
              </TouchableOpacity>
            ) : (
              <RNView></RNView>
            )}
            <DetailSectionHeader Heading="Languages" style={{ marginBottom: 10 }} />
            <MultiSelectDropdown
              data={commonLanguages}
              value={agentInfo.language}
              onChange={(val: any) => {
                setAgentInfo({ ...agentInfo, language: val });
              }}
              dropdownPosition="top"
              placeholder={agentInfo.language.length === 0 ? 'Select Languages' : 'Selected Languages are'}
              searchPlaceholder="Search for Languages..."
            />
            <DetailSectionHeader Heading="Operation Timings" style={{ marginVertical: 10 }} />
            <RNView>
              <OperationTimeRow
                day="Default"
                holiday={'open'}
                disableToggle={true}
                openingTime={defOpenTime}
                closingTime={defCloseTime}
                onChangeOpeningTime={setDefOpenTime}
                onChangeClosingTime={setDefCloseTime}
              />
              <TouchableOpacity
                activeOpacity={0.5}
                style={{ alignSelf: 'flex-end', marginVertical: 10, marginBottom: 20, marginRight: 10 }}
                onPress={() => {
                  let tempArr = [...agentInfo.operation_timings];
                  tempArr.map((item: any) => {
                    item.start_time = defOpenTime;
                    item.close_time = defCloseTime;
                    item.status = 'open';
                  });
                  setAgentInfo({ ...agentInfo, operation_timings: [...tempArr] });
                }}>
                <RNText style={{ color: ColorTheme.nearLukBasePrimaryColor, fontWeight: '700' }}>Apply to All</RNText>
              </TouchableOpacity>
              {agentInfo.operation_timings.map((timings: any, index: number) => {
                return (
                  <OperationTimeRow
                    key={'OperationTimeRow:__' + timings.day}
                    day={timings.day}
                    holiday={timings.status}
                    openingTime={timings.start_time}
                    closingTime={timings.close_time}
                    onchangeHoliday={(val: any) => onChangeTimings(index, val, 'h')}
                    onChangeOpeningTime={(val: any) => onChangeTimings(index, val, 'o')}
                    onChangeClosingTime={(val: any) => onChangeTimings(index, val, 'c')}
                  />
                );
              })}
            </RNView>
            <CommonInput
              onChangeText={text => {
                setAgentInfo({ ...agentInfo, rera_id: text });
              }}
              value={agentInfo.rera_id}
              label="RERA ID"
              placeholder="RERA ID"
              placeholderColor={ColorTheme.gray2}
              style={[styles.inputStyle, { marginTop: 20 }]}
            />
          </RNView>
        </RNView>
      </ScrollView>
      <CommonButton
        disabled={!validateForm()}
        style={{
          backgroundColor: validateForm() ? ColorTheme.primary : ColorTheme.nearLukGray4,
          marginVertical: 15,
          alignSelf: 'center',
        }}
        title="Finish"
        onPress={triggerApiToAgent}
        textStyle={styles.btnText}
      />
    </Container>
  );
};

export default AgentOperationTime;
