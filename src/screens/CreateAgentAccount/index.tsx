import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import MonthPicker from 'react-native-month-year-picker';
import Entypo from 'react-native-vector-icons/Entypo';

import { useNavigation } from '@react-navigation/native';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import HeaderBar from '@/components/common/HeaderBar';
import PropertyCategoryChipsWithIconCheckbox from '@/components/common/PropertyCategoryChipsWithIconCheckbox';
import TabsHOC from '@/components/common/TabsHOC';
import { propertyTypes, propertyTypesArr, transactionTypeData } from '@/constants/function/agent.helper';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, FONT, SIZES } from '@/theme';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

const CreateAgentAccount = () => {
  const navigation = useNavigation();
  const [show, setShow] = useState(false);
  const [toogleDatePicker, setToogleDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const initialState = {
    agentName: '',
    intro: '',
    optMonth: '',
    optYear: '',
    property_deal_type: [],
    property_type: [],
  };
  const [agentInfo, setAgentInfo] = useState<any>(initialState);

  useEffect(() => {
    //initial set up of date
    setAgentInfo({ ...agentInfo, optMonth: new Date().getMonth() + 1, optYear: new Date().getFullYear() });
  }, []);

  const onValueChange = useCallback(
    (event, newDate) => {
      const selectedDate = newDate || date;
      // console.log('selectedDate', selectedDate);
      setShow(false);
      setDate(selectedDate);
      setAgentInfo({ ...agentInfo, optMonth: selectedDate.getMonth() + 1 });
      setAgentInfo({ ...agentInfo, optYear: selectedDate.getFullYear() });
    },
    [date, show]
  );

  const handleTransactionTypes = (value: string, selectedBool: boolean) => {
    let tempArr: any = [...agentInfo.property_deal_type];
    if (selectedBool) {
      const updatedData = tempArr.filter(item => item !== value);
      setAgentInfo({ ...agentInfo, property_deal_type: [...updatedData] });
    } else {
      tempArr.push(value);
      setAgentInfo({ ...agentInfo, property_deal_type: [...tempArr] });
    }
  };

  const handleProperties = (value: string, selectedBool: boolean) => {
    let tempArr: any = [...agentInfo.property_type];
    if (selectedBool) {
      const updatedData = tempArr.filter(item => item !== value);
      setAgentInfo({ ...agentInfo, property_type: [...updatedData] });
    } else {
      tempArr.push(value);
      setAgentInfo({ ...agentInfo, property_type: [...tempArr] });
    }
  };

  const saveAndContinue = () => {
    navigation.navigate('AGENT_OPERATION_TIME', {
      agentData: {
        company_name: agentInfo.agentName,
        intro: agentInfo.intro,
        operating_since: agentInfo.optYear + '-' + agentInfo.optMonth,
        property_deal_type: [...agentInfo.property_deal_type],
        property_type: [...agentInfo.property_type],
      },
    });
  };

  const validateForm = () => {
    return (
      agentInfo.agentName.length !== 0 &&
      agentInfo.intro.length !== 0 &&
      agentInfo.optMonth.length !== 0 &&
      agentInfo.optYear.length !== 0 &&
      agentInfo.property_deal_type.length !== 0 &&
      agentInfo.property_type.length !== 0
    );
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar label="Agent Account" backPress={() => navigation.goBack()} />
      <ScrollView style={{ flex: 1, paddingBottom: 50 }} contentContainerStyle={{ marginBottom: 20 }}>
        <RNView style={{ alignItems: 'center' }}>
          <RNView style={{ width: deviceWidth / 1.09 }}>
            <DetailSectionHeader Heading="Tell us about yourself" style={{ marginVertical: 10 }} />
            <CommonInput
              onChangeText={text => {
                setAgentInfo({ ...agentInfo, agentName: text });
              }}
              value={agentInfo.agentName}
              label="Agent/Company Name"
              placeholder="Agent/Company Name"
              placeholderColor={ColorTheme.gray2}
              style={styles.inputStyle}
            />
            <CommonInput
              onChangeText={text => {
                setAgentInfo({ ...agentInfo, intro: text });
              }}
              value={agentInfo.intro}
              label="Description"
              placeholder="Description"
              placeholderColor={ColorTheme.gray2}
              style={styles.inputStyle}
            />
            <DetailSectionHeader Heading="Operating since" style={{ marginVertical: 10 }} />
            <RNView style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
              <TouchableOpacity onPress={() => setShow(true)}>
                <RNView style={styles.monthView}>
                  <RNText style={styles.monthText}>{`${date.getMonth() + 1}/${date.getFullYear()}`}</RNText>
                  <RNView style={styles.upDown}>
                    <Entypo name="chevron-small-up" size={20} />
                    <Entypo name="chevron-small-down" size={20} style={styles.downArr} />
                  </RNView>
                </RNView>
              </TouchableOpacity>
              <RNView></RNView>
            </RNView>
            <DetailSectionHeader Heading="Transaction Type" style={{ marginVertical: 10 }} />
            <RNView style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {transactionTypeData.map((item, i) => {
                const isActive = agentInfo.property_deal_type.includes(item?.key);
                return (
                  <TabsHOC
                    check={isActive}
                    label={item?.label}
                    key={i.toString()}
                    onPress={() => handleTransactionTypes(item?.key, isActive)}
                  />
                );
              })}
            </RNView>
            <DetailSectionHeader Heading="Property Type" style={{ marginVertical: 10 }} />
            <RNView style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start' }}>
              {propertyTypesArr.map((item, i) => {
                const isActive = agentInfo.property_type.includes(item);
                return (
                  <TabsHOC
                    check={isActive}
                    label={item}
                    key={i.toString()}
                    onPress={() => handleProperties(item, isActive)}
                  />
                );
              })}
            </RNView>
          </RNView>
        </RNView>
      </ScrollView>
      <RNView style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <CommonButton
          disabled={!validateForm()}
          style={{
            backgroundColor: validateForm() ? ColorTheme.primary : ColorTheme.nearLukGray4,
            marginVertical: 15,
            alignSelf: 'center',
          }}
          title="Next"
          onPress={saveAndContinue}
          textStyle={styles.btnText}
        />
      </RNView>
      <DateTimePickerModal
        isVisible={toogleDatePicker}
        mode="time"
        onConfirm={date => {
          // console.log('DateTimePickerModal', date);
          // setDate(date);
          setToogleDatePicker(false);
        }}
        onCancel={() => setToogleDatePicker(false)}
      />
      {show && (
        <MonthPicker
          onChange={onValueChange}
          value={date}
          // minimumDate={new Date()}
          maximumDate={new Date()}
          // locale="ko"
        />
      )}
    </Container>
  );
};

export default CreateAgentAccount;
