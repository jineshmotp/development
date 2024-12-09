import React, { useEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { userStepThree } from '@/redux/onboarding/onboardingReducer';
import { useGetPreferenceQuery } from '@/redux/onboarding/onboardingService';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type defaultProps = {
  _id?: string;
  isActive?: boolean;
  label?: string;
  value?: string;
};

const OnBoardingThree = () => {
  const navigation = useNavigation();
  const [allItems, setAllItems] = useState([]);
  const dispatch = useAppDispatch();

  const { data: preferenceData } = useGetPreferenceQuery({});

  const [selectedItems, setSelectedItems] = useState([]);
  // console.log('selectedItems =====>', selectedItems);

  const toggleSelection = item => {
    if (selectedItems.includes(item)) {
      const temp = selectedItems.filter(itm => itm?.label !== item?.label);
      setSelectedItems(temp);
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const renderItem = ({ item }: { item: defaultProps }) => {
    return (
      <TouchableOpacity
        style={[
          styles.touchableContainer,
          selectedItems.includes(item) && { backgroundColor: ColorTheme.onboardingPrimary },
        ]}
        onPress={() => toggleSelection(item)}>
        <RNText style={[styles.touchableText, selectedItems.includes(item) && { color: '#FFF' }]}>{item?.label}</RNText>
      </TouchableOpacity>
    );
  };

  const handleNext = () => {
    dispatch(userStepThree({ userPreference: selectedItems })); // Dispatch stepTwoDetails to Redux
    navigation.navigate('ONBOARDING_FOUR');
  };

  useEffect(() => {
    const values = preferenceData?.data;

    setAllItems(values);
  });

  return (
    <Container hasHeader={false} isTab={false}>
      <RNView style={styles.mainContainer}>
        <RNView style={styles.stepContainer}>
          <RNText style={styles.stepText}>Step 3 of 4</RNText>
          <RNText style={styles.lineText}>What is your Property Type Preference(s)?</RNText>
        </RNView>
        <FlatList
          data={allItems}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            width: '95%', // Ensure the FlatList takes full width
            padding: px(20),
            marginTop: px(10),
          }}
          numColumns={2} // Display items in 2 columns
        />
        <RNView
          style={{
            backgroundColor: ColorTheme.white,
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '100%',
            paddingHorizontal: 20,
            paddingVertical: 30,
          }}>
          <CommonButton
            onPress={() => navigation.goBack()}
            title={'Back'}
            style={styles.buttonContainer}
            textStyle={styles.BtnStyle}
          />
          <CommonButton
            onPress={handleNext}
            title={'Next Step'}
            style={[
              styles.nextContainer,
              { backgroundColor: !selectedItems?.length ? '#dcdedc' : ColorTheme.onboardingButton },
            ]}
            textStyle={styles.nextStyle}
            disabled={!selectedItems?.length}
          />
        </RNView>
      </RNView>
    </Container>
  );
};

export default OnBoardingThree;
