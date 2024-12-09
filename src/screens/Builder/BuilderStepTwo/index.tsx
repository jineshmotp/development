import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import InputChips from '@/components/common/InputChips';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { builderStepTwo, getBuilderStepTwo } from '@/redux/onboarding/onboardingReducer';
import { useGetAllLanguagesQuery } from '@/redux/onboarding/onboardingService';
import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from '../styles';

type Props = {
  setStep?: (i) => void;
};
type defaultProps = {
  _id?: string;
  isActive?: boolean;
  label?: string;
  value?: string;
};
type StepTwoProps = {
  languages?: defaultProps[];
  rera?: string;
};
const BuilderStepTwo: React.FC<Props> = ({ setStep }) => {
  const navigation = useNavigation();
  const stepTwoBuilder = useAppSelector(getBuilderStepTwo);
  const [showCityModal, setShowCityModal] = useState(false);
  const dispatch = useAppDispatch();
  const [selectedList, setSelectedList] = useState([]);
  const [rera, setRera] = useState('');
  // const [stepTwoDetails, setstepTwoDetails] = useState<StepTwoProps>({ languages: [], rera: '' });
  const { data: languagesList } = useGetAllLanguagesQuery({});
  // console.log('data', data?.data);
  const handleFocus = () => {
    Keyboard.dismiss();
    if (!showCityModal) {
      setShowCityModal(true);
    }
  };

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

  const handleNext = () => {
    setStep('3');
    dispatch(
      builderStepTwo({
        languages: selectedList,
        rera: rera,
      })
    );
  };
  useEffect(() => {
    setSelectedList(stepTwoBuilder?.languages);
    setRera(stepTwoBuilder?.rera);
  }, [stepTwoBuilder]);
  return (
    <>
      <RNView style={styles.mainContainer}>
        <RNView style={styles.stepContainer}>
          <RNText style={styles.stepText}>Step 2 of 4</RNText>
        </RNView>

        {/* <RNView style={{ position: 'absolute', bottom: 50, alignSelf: 'center', elevation: 5 }}>
        <CommonButton
          title={'Next Step'}
          onPress={() => setStep('3')}
          style={{ backgroundColor: ColorTheme.onboardingPrimary }}
          textStyle={styles.BtnStyle}
          // disabled={selectedOption === null} // Disable button if no option is selected
        />
      </RNView> */}
        <ScrollView>
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
          <RNView style={{ width: deviceWidth / 1.09, flexWrap: 'wrap', flexDirection: 'row', marginLeft: px(20) }}>
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

          <CommonInput
            onChangeText={text => {
              // setstepTwoDetails({ ...stepTwoDetails, rera: text });
              setRera(text);
            }}
            value={rera}
            label="RERA Id"
            placeholder="RERA Id"
            placeholderColor={ColorTheme.gray2}
            style={[styles.inputStyle]}
            maxLength={50}
            // keyboardType={'numeric'}
          />
        </ScrollView>
        <RNView style={styles.bottomBtnsStyle}>
          <CommonButton
            onPress={() => setStep('1')}
            title={'Back'}
            style={styles.buttonContainer}
            textStyle={styles.BtnStyle}
          />
          <CommonButton
            onPress={handleNext}
            title={'Next Step'}
            style={styles.nextContainer}
            textStyle={styles.nextStyle}
          />
        </RNView>
      </RNView>
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
    </>
  );
};

export default BuilderStepTwo;
