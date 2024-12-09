import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import CheckBox from '@/components/common/CheckBox';
import InputChips from '@/components/common/InputChips';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { builderStepThree, getBuilderStepThree, getSelectedRole } from '@/redux/onboarding/onboardingReducer';
import { useGetLookingForDataQuery } from '@/redux/onboarding/onboardingService';
import { ColorTheme, SIZES } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from '../styles';

type Props = {
  setStep?: (i: string) => void;
};

type DefaultProps = {
  _id?: string;
  isActive?: boolean;
  label?: string;
  value?: string;
};

type StepThreeProps = {
  buildType?: DefaultProps[];
  propertyType?: DefaultProps[];
};

const BuilderStepThree: React.FC<Props> = ({ setStep }) => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const role = useAppSelector(getSelectedRole);

  const stepThreeBuilder = useAppSelector(getBuilderStepThree);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const { data: builderType } = useGetLookingForDataQuery('builder_type');
  const { data: buildingType } = useGetLookingForDataQuery('deal_property_type');

  const [stepThreeDetails, setStepThreeDetails] = useState<StepThreeProps>({ buildType: [], propertyType: [] });
  const [selectedList, setSelectedList] = useState<DefaultProps[]>([]);
  const [selectedBuilderType, setSelectedBuilderType] = useState<DefaultProps[]>([]);
  const [dealType, setDealType] = useState([
    { name: 'New', checked: false },
    { name: 'Pre Owned', checked: false },
  ]);

  const [errorFields, setErrorFields] = useState({
    buildType: false,
    propertyType: false,
    dealType: false,
  });

  const handleFocus = () => {
    Keyboard.dismiss();
    if (!showCityModal) setShowCityModal(true);
  };

  const handleBuilderFocus = () => {
    Keyboard.dismiss();
    if (!showBuilderModal) setShowBuilderModal(true);
  };

  const handleCloseModal = () => setShowCityModal(false);
  const handleBuilderModal = () => setShowBuilderModal(false);

  const handleBuildingTypeSelect = (builder: DefaultProps) => {
    setSelectedList(prevState =>
      prevState.includes(builder) ? prevState.filter(item => item !== builder) : [...prevState, builder]
    );
    Keyboard.dismiss();
  };

  const handleBuilderTypeSelect = (builder: DefaultProps) => {
    setSelectedBuilderType(prevState =>
      prevState.includes(builder) ? prevState.filter(item => item !== builder) : [...prevState, builder]
    );
  };

  const handleCheckBox = (ele: { name: string; checked: boolean }) => {
    setDealType(prevState =>
      prevState.map(item => (item.name === ele.name ? { ...item, checked: !item.checked } : item))
    );
  };

  const handleNext = () => {
    let hasError = false;
    if (role === 'BUILDER') {
      if (selectedList.length === 0) {
        setErrorFields(prev => ({ ...prev, propertyType: true }));
        hasError = true;
      }
      if (selectedBuilderType.length === 0) {
        setErrorFields(prev => ({ ...prev, buildType: true }));
        hasError = true;
      }
    } else {
      if (selectedList.length === 0) {
        setErrorFields(prev => ({ ...prev, propertyType: true }));
        hasError = true;
      }
      if (!dealType.some(item => item.checked)) {
        setErrorFields(prev => ({ ...prev, dealType: true }));
        hasError = true;
      }
    }
    if (!hasError) {
      setErrorFields({
        buildType: false,
        propertyType: false,
        dealType: false,
      });
      setStep?.('4');
      dispatch(
        builderStepThree({
          propertyType: selectedList,
          buildType: selectedBuilderType,
          transactionType: dealType,
        })
      );
    }
  };

  useEffect(() => {
    setSelectedList(stepThreeBuilder?.propertyType || []);
    setSelectedBuilderType(stepThreeBuilder?.buildType || []);
    setDealType(
      stepThreeBuilder?.transactionType || [
        { name: 'New', checked: false },
        { name: 'Pre Owned', checked: false },
      ]
    );
  }, [stepThreeBuilder]);

  return (
    <RNView style={styles.mainContainer}>
      <RNView style={styles.stepContainer}>
        <RNText style={styles.stepText}>Step 3 of 4</RNText>
      </RNView>

      <ScrollView style={{ alignContent: 'center', width: deviceWidth }}>
        {role === 'AGENT' ? (
          <RNView style={{ marginVertical: px(50), justifyContent: 'center', alignItems: 'center' }}>
            <RNView style={styles.dealView}>
              {dealType.map((ele, ind) => (
                <RNView key={ind} style={styles.agentCheck}>
                  <RNText style={{ color: 'black' }}>{ele.name}</RNText>
                  <CheckBox checked={ele.checked} onPress={() => handleCheckBox(ele)} isCheckBox={true} />
                </RNView>
              ))}
            </RNView>
            <RNView style={styles.errorDeal}>
              <RNText style={styles.errorTransaction}>{errorFields.dealType ? 'Please select Transaction Type' : ''}</RNText>
            </RNView>
          </RNView>
        ) : (
          <>
            <CommonInput
              onChangeText={text => setStepThreeDetails(prev => ({ ...prev, buildType: text }))}
              value={selectedBuilderType.map(type => type.label).join(', ')}
              label="Builder Type *"
              placeholder="Builder Type *"
              placeholderColor={ColorTheme.gray2}
              style={styles.inputStyle}
              maxLength={50}
              onFocus={handleBuilderFocus}
            />
            <RNText style={styles.errorText}>{errorFields.buildType ? 'Please select builder type' : ''}</RNText>
          </>
        )}

        {selectedBuilderType.map((item, ind) => (
          <InputChips
            style={{
              width: deviceWidth / 1.09,
              height: px(40),
              padding: px(5),
              backgroundColor: ColorTheme.onboardingPrimary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: px(5),
              alignSelf: 'center',
            }}
            key={ind}
            item={item}
            onPress={itm => handleBuilderTypeSelect(itm)}
          />
        ))}

        <CommonInput
          onChangeText={text => setStepThreeDetails(prev => ({ ...prev, buildingType: text }))}
          value={stepThreeDetails.buildingType}
          label="Dealing Property Type *"
          placeholder="Dealing Property Type *"
          placeholderColor={ColorTheme.gray2}
          style={[styles.inputStyle]}
          maxLength={50}
          keyboardType={'numeric'}
          onFocus={handleFocus}
        />
        <RNView style={styles.errorDeal}>
          <RNText style={styles.errorText}>
            {errorFields.propertyType ? 'Please select dealing property type' : ''}
          </RNText>
        </RNView>

        {selectedList.map((item, ind) => (
          <InputChips
            style={{
              width: deviceWidth / 1.09,
              height: px(40),
              padding: px(5),
              backgroundColor: ColorTheme.onboardingPrimary,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: px(5),
              alignSelf: 'center',
            }}
            key={ind}
            item={item}
            onPress={itm => handleBuildingTypeSelect(itm)}
          />
        ))}

        <Modal visible={showCityModal} transparent={true} animationType="fade" onRequestClose={handleCloseModal}>
          <Pressable style={styles.modalBackground} onPress={handleCloseModal}>
            <RNView style={styles.modalContainer}>
              <FlatList
                data={buildingType?.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleBuildingTypeSelect(item)}>
                    <RNText style={[styles.renderText, selectedList.includes(item) && styles.selectedText]}>
                      {item.label}
                    </RNText>
                  </TouchableOpacity>
                )}
              />
            </RNView>
          </Pressable>
        </Modal>

        <Modal visible={showBuilderModal} transparent={true} animationType="fade" onRequestClose={handleBuilderModal}>
          <Pressable style={styles.modalBackground} onPress={handleBuilderModal}>
            <RNView style={styles.modalContainer}>
              <FlatList
                data={builderType?.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleBuilderTypeSelect(item)}>
                    <RNText style={[styles.renderText, selectedBuilderType.includes(item) && styles.selectedText]}>
                      {item.label}
                    </RNText>
                  </TouchableOpacity>
                )}
              />
            </RNView>
          </Pressable>
        </Modal>
      </ScrollView>

      <RNView style={styles.bottomBtnsStyle}>
        <CommonButton
          onPress={() => setStep?.('2')}
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
  );
};

export default BuilderStepThree;
