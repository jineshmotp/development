import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, ScrollView, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import { useNavigation } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { builderStepOne, getBuilderStepOne } from '@/redux/onboarding/onboardingReducer';
import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from '../styles';

type Props = {
  setStep?: (i) => void;
};

type StepOneProps = {
  fname?: string;
  description?: string;
  optSince?: string;
};

const BuilderStepOne: React.FC<Props> = ({ setStep }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const stepOneData = useAppSelector(getBuilderStepOne);
  const inputref = useRef();
  const [stepOneDetails, setstepOneDetails] = useState<StepOneProps>({
    fname: '',
    description: '', // Added description field to state
    optSince: '',
  });
  const [errorFields, setErrorFields] = useState({
    fname: false,
    description: false, // Added description field to error state
    optSince: false,
  });
  const [isDateTimePickerVisible, setIsDateTimePickerVisible] = useState(false);

  const handleDateConfirm = date => {
    setstepOneDetails({ ...stepOneDetails, optSince: date.toISOString().split('T')[0] });
    setIsDateTimePickerVisible(false);
    inputref.current.blur();
  };

  const handleCloseDateTimePicker = () => {
    inputref.current.blur();
    setIsDateTimePickerVisible(false);
  };

  const handleNext = () => {
    if (stepOneDetails?.fname && stepOneDetails?.optSince && stepOneDetails?.description) {
      setErrorFields({
        fname: false,
        description: false,
        optSince: false,
      });
      setStep('2');
      dispatch(builderStepOne(stepOneDetails));
    } else {
      setErrorFields({
        fname: !stepOneDetails?.fname,
        description: !stepOneDetails?.description,
        optSince: !stepOneDetails?.optSince,
      });
    }
  };

  useEffect(() => {
    setstepOneDetails(stepOneData);
  }, [stepOneData]);

  return (
    <>
      <RNView style={styles.mainContainer}>
        <RNView style={styles.stepContainer}>
          <RNText style={styles.stepText}>Step 1 of 4</RNText>
        </RNView>
        <ScrollView style={{ paddingVertical: 20, flex: 1 }}>
          <CommonInput
            onChangeText={text => {
              setstepOneDetails({ ...stepOneDetails, fname: text });
            }}
            value={stepOneDetails?.fname}
            label="Company Name *"
            placeholder="Company Name"
            placeholderColor={ColorTheme.gray2}
            style={styles.inputStyle}
            maxLength={50}
          />
          <RNText style={styles.errorText}>{errorFields?.fname ? 'Please enter company name' : ''}</RNText>

          <CommonInput
            onChangeText={text => {
              setstepOneDetails({ ...stepOneDetails, description: text });
            }}
            value={stepOneDetails?.description}
            label="Description *"
            placeholder="Description"
            placeholderColor={ColorTheme.gray2}
            style={[styles.inputStyle, { minHeight: px(150) }]}
            maxLength={100}
          />
          <RNText style={styles.errorText}>{errorFields?.description ? 'Please enter description' : ''}</RNText>

          <TouchableOpacity onPress={() => setIsDateTimePickerVisible(true)}>
            <CommonInput
              onChangeText={text => {
                setstepOneDetails({ ...stepOneDetails, optSince: text });
              }}
              inputRef={inputref}
              value={stepOneDetails?.optSince}
              label="Operating Since *"
              placeholder="Operating Since *"
              placeholderColor={ColorTheme.gray2}
              style={styles.inputStyle}
              maxLength={50}
              onFocus={() => {
                setIsDateTimePickerVisible(true);
                Keyboard.dismiss();
              }}
            />
            <RNText style={styles.errorText}>{errorFields?.optSince ? 'Please enter operating since' : ''}</RNText>
          </TouchableOpacity>

          <CommonButton
            title={'Next Step'}
            onPress={handleNext}
            style={{ backgroundColor: ColorTheme.onboardingButton, marginTop: px(200), alignSelf: 'center' }}
            textStyle={styles.SingleBtnStyle}
          />
        </ScrollView>
      </RNView>
      <DateTimePickerModal
        isVisible={isDateTimePickerVisible}
        mode="date"
        onConfirm={handleDateConfirm}
        onCancel={handleCloseDateTimePicker}
        maximumDate={new Date()}
      />
    </>
  );
};

export default BuilderStepOne;
