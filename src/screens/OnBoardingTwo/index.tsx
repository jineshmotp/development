import React, { useEffect, useLayoutEffect, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { userStepTwo } from '@/redux/onboarding/onboardingReducer';
import { useGetBuyerForQuery, useGetLookingForQuery, useGetTenantForQuery } from '@/redux/onboarding/onboardingService';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type defaultProps = {
  _id?: string;
  isActive?: boolean;
  label?: string;
  value?: string;
};

const OnBoardingTwo = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'ONBOARDING_TWO'>>();
  const { subRole } = route?.params;

  const [allItems, setAllItems] = useState([]);

  const { data: lookingData } = useGetLookingForQuery({});
  const { data: tenantData } = useGetTenantForQuery({});
  const { data: buyerData } = useGetBuyerForQuery({});

  const dispatch = useAppDispatch();

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

  useEffect(() => {
    // console.log('hello =======>');

    const renderData = (subRole: string) => {
      switch (subRole) {
        case 'OWNER':
          return lookingData?.data;

        case 'TENANT':
          return tenantData?.data;

        case 'BUYER':
          return buyerData?.data;

        default:
          return [];
      }
    };
    const values = renderData(subRole);
    // Set initial values from Redux state if available
    setAllItems(values);
  });

  const handleNext = () => {
    dispatch(userStepTwo({ userLooking: selectedItems })); // Dispatch stepTwoDetails to Redux
    navigation.navigate('ONBOARDING_THREE');
  };

  // console.log('selectedItemsselectedItems', selectedItems);
  return (
    <Container hasHeader={false} isTab={false}>
      <RNView style={styles.mainContainer}>
        <RNView style={styles.stepContainer}>
          <RNText style={styles.stepText}>Step 2 of 4</RNText>
          <RNText style={styles.lineText}>What are you looking for on NearLuk?</RNText>
        </RNView>
        <FlatList
          data={allItems}
          extraData={allItems}
          renderItem={renderItem}
          keyExtractor={item => item._id.toString()}
          contentContainerStyle={{
            alignSelf: 'center',
            alignItems: 'center',
            width: '95%',
            paddingVertical: px(20),
          }}
          numColumns={2}
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

export default OnBoardingTwo;
