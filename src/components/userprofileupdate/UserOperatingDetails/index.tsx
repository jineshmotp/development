import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AntDesign from 'react-native-vector-icons/AntDesign';

import CityAreaCombo from '@/components/CityAreaCombo';
import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { getBuilderStepFour } from '@/redux/onboarding/onboardingReducer';
import { ColorTheme } from '@/theme';
import { deviceHeight, deviceWidth, px } from '@/utils';

import { styles } from './styles';

type UserOperatingProps = {
  operatingListData?: any;
  isVisible?: boolean;
  onPressClose?: () => void;
};

const UserOperatingDetails: React.FC<UserOperatingProps> = ({ operatingListData, isVisible, onPressClose }) => {
  const [showCityModal, setShowCityModal] = useState(false);
  const [errorFields, setErrorFields] = useState({ city: false, locality: false });
  const [addMoreAreas, setAddMoreAreas] = useState([]);
  const stepFourData = useAppSelector(getBuilderStepFour);
  const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
  const [childData, setChildData] = useState();

  const getDataFromChild = () => {
    const cityMap = new Map();
    childData?.forEach(item => {
      if (
        !cityMap.has(item.city) ||
        (cityMap.has(item.city) && cityMap.get(item.city).locality.length === 0 && item.locality.length > 0)
      ) {
        cityMap.set(item.city, item);
      }
    });

    const uniqueArray = childData?.filter(item => item.locality.some(locality => locality.trim() !== ''));
    // console.log('cheing on array', JSON.stringify(uniqueArray));
    setAddMoreAreas(uniqueArray?.filter(item => item.city !== ''));

    updateUserDataMutation({
      userId: operatingListData?._id,
      updateDetails: {
        operating_location: uniqueArray,
      },
    })
      .then(res => {
        console.log('cheking on the res', JSON.stringify(res));
        onPressClose();
      })
      .catch(err => {
        console.log('cheing the errro', err);
      });
  };

  useEffect(() => {
    // console.log('cheing on operaing list');
    setAddMoreAreas(operatingListData?.operating_location);
  }, []);

  const handleObjectCity = (val, ind) => {
    const temp = addMoreAreas?.map((itm, i) => {
      if (i === ind) {
        return { city: val, locality: itm?.locality };
      } else {
        return itm;
      }
    });
    setAddMoreAreas(temp);
  };
  const handleObjectArea = (val, ind) => {
    console.log('cheing on area data with', addMoreAreas);

    const temp = addMoreAreas?.map((itm, i) => {
      if (i === ind) {
        return { city: itm?.city, locality: val };
      } else {
        return itm;
      }
    });
    setAddMoreAreas(temp);
  };
  const handleDeteleRow = index => {
    const temp = addMoreAreas.filter((itn, ind) => {
      return ind !== index;
    });
    setChildData(temp);
    setAddMoreAreas(temp);
  };

  return (
    <ModalWrapper visible={isVisible} onClose={onPressClose} modalHeight={deviceHeight - px(100)} header={true}>
      <ScrollView>
        <RNView>
          <HeaderBar label="Operating Details" backPress={onPressClose} />
          <RNView>
            <KeyboardAvoidingView
              behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}
              style={{ marginBottom: px(30) }}>
              <ScrollView style={{ paddingTop: px(20) }}>
                <FlatList
                  extraData={addMoreAreas}
                  data={addMoreAreas}
                  renderItem={({ item, index }) => {
                    return (
                      <CityAreaCombo
                        setChildData={setChildData}
                        key={index}
                        listOfAreas={addMoreAreas}
                        index={index}
                        city={item?.city}
                        locality={item?.locality}
                        setCity={val => handleObjectCity(val, index)}
                        setArea={val => handleObjectArea(val, index)}
                        handleDelete={ind => handleDeteleRow(ind)}
                      />
                    );
                  }}
                />
                <RNView style={styles.addView}>
                  <RNView></RNView>
                  <TouchableOpacity
                    onPress={() => {
                      console.log('cheking the aeaassss', [...addMoreAreas]);

                      const cityMap = new Map();
                      childData.forEach(item => {
                        if (
                          !cityMap.has(item.city) ||
                          (cityMap.has(item.city) &&
                            cityMap.get(item.city).locality.length === 0 &&
                            item.locality.length > 0)
                        ) {
                          cityMap.set(item.city, item);
                        }
                      });

                      const uniqueArray = Array.from(cityMap.values());
                      setAddMoreAreas([...uniqueArray?.filter(item => item.city !== ''), { city: '', locality: [] }]);
                    }}>
                    <RNView style={styles.addBtn}>
                      <RNText>ADD</RNText>
                      <RNText>+</RNText>
                    </RNView>
                  </TouchableOpacity>
                </RNView>
                <RNView style={{ width: deviceWidth / 1.09, marginLeft: px(30) }}>
                  <RNText style={styles.errorText}>
                    {errorFields?.city || errorFields?.locality ? 'Please select city and area ' : ''}
                  </RNText>
                </RNView>
              </ScrollView>
            </KeyboardAvoidingView>
          </RNView>
          <RNView style={styles.mainBtn}>
            <CommonButton
              disabled={isLoading}
              onPress={getDataFromChild}
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
        </RNView>
      </ScrollView>
    </ModalWrapper>
  );
};

export default UserOperatingDetails;
