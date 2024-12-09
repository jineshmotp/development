import React, { useEffect, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import CityAreaCombo from '@/components/CityAreaCombo';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { updateLoginStatus } from '@/redux/login/loginReducer';
import { builderStepFour, getBuilderStepFour } from '@/redux/onboarding/onboardingReducer';
import { getBuilderData, getSelectedRole, getUserOnboardingData } from '@/redux/onboarding/onboardingReducer';
import { useUserOnboardingMutation } from '@/redux/onboarding/onboardingService';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from '../styles';

type Props = {
  setStep?: (i) => void;
};
type StepThreeProps = {
  buildType?: string;
  buildingType?: string;
  refCode?: string;
};
const BuilderStepFour: React.FC<Props> = ({ setStep }) => {
  const navigation = useNavigation();
  const [load, setLoad] = useState(false);
  const dispatch = useAppDispatch();
  const stepFourData = useAppSelector(getBuilderStepFour);
  const role = useAppSelector(getSelectedRole);
  // console.log('role =======>', role);

  const totalData = useAppSelector(getBuilderData);

  // console.log('userData =======>', userData?.role);

  const wholeData = useAppSelector(getUserOnboardingData);

  const [onboardingMutation] = useUserOnboardingMutation();
  const [childData, setChildData] = useState();

  const [stepFourDetails, setstepFourDetails] = useState<StepThreeProps>({
    buildType: '',
    buildingType: '',
    refCode: '',
  });
  const [refCode, setRefCode] = useState('');
  const [addMoreAreas, setAddMoreAreas] = useState([]);
  // console.log('addMoreAreas', addMoreAreas);
  const [errorFields, setErrorFields] = useState({ city: false, locality: false });

  const handleObjectCity = (val, ind) => {
    const temp = addMoreAreas?.map((itm, i) => {
      if (i === ind) {
        return { city: val, locality: [...itm?.locality] };
      } else {
        return itm;
      }
    });
    // console.log('cheking on next ity selection',JSON.stringify(temp));

    setAddMoreAreas(temp);
  };
  const handleObjectArea = (val, ind) => {
    // console.log('checking on the list of cities', JSON.stringify(addMoreAreas));

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
  // const handleNext = () => {
  //   if (addMoreAreas[0]?.city && addMoreAreas[0]?.locality) {
  //     dispatch(builderStepFour({ areaCityData: addMoreAreas, refCode: refCode }));
  //     setStep('5');
  //   } else {
  //     if (!addMoreAreas[0]?.city) {
  //       setErrorFields({ ...errorFields, city: true });
  //     } else {
  //       if (!addMoreAreas[0]?.locality) {
  //         setErrorFields({ ...errorFields, locality: true, city: false });
  //       } else {
  //         setErrorFields({ ...errorFields, locality: false, city: false });
  //       }
  //     }
  //   }
  // };

  const convertObjectToArrStr = (arrData: any[]) => {
    return arrData?.map(item => item?.value);
  };

  const postOnboarding = (val: boolean) => {
    // console.log('cheking on dataa',JSON.stringify(childData));

    const cityMap = new Map();

    childData.forEach(item => {
      if (
        !cityMap.has(item.city) ||
        (cityMap.has(item.city) && cityMap.get(item.city).locality.length === 0 && item.locality.length > 0)
      ) {
        cityMap.set(item.city, item);
      }
    });

    const uniqueArray = Array.from(cityMap.values());
    setAddMoreAreas(uniqueArray?.filter(item => item.city !== ''));
    // console.log('chkiendfas',uniqueArray?.filter(item => item.city !== ""));

    let payload: any = {};

    if (role === 'USER') {
      payload = {
        user_sub_role: wholeData?.stepOneData?.userRole,
        looking_for: convertObjectToArrStr(wholeData?.stepTwoData?.userLooking),
        property_preference: convertObjectToArrStr(wholeData?.stepThreeData?.userPreference),
      };
    } else if (role === 'AGENT') {
      payload = {
        company_name: totalData?.stepOneData?.fname,
        bio: totalData?.stepOneData?.description,
        operating_since: totalData?.stepOneData?.optSince,
        languages: convertObjectToArrStr(totalData?.stepTwoData?.languages),
        rera_id: totalData?.stepTwoData?.rera ? totalData?.stepTwoData?.rera : null,
        AGENT: {
          deal_transaction_type: ['New'], // Modify as per your requirement
        },
        deal_property_type: convertObjectToArrStr(totalData?.stepThreeData?.propertyType),
        operating_location: uniqueArray,
        referral_code: totalData?.stepFourData?.refCode,
      };
    } else if (role === 'BUILDER') {
      payload = {
        company_name: totalData?.stepOneData?.fname,
        bio: totalData?.stepOneData?.description,
        operating_since: totalData?.stepOneData?.optSince,
        languages: convertObjectToArrStr(totalData?.stepTwoData?.languages),
        rera_id: totalData?.stepTwoData?.rera ? totalData?.stepTwoData?.rera : null,
        BUILDER: {
          builder_type: convertObjectToArrStr(totalData?.stepThreeData?.buildType),
        },
        deal_property_type: convertObjectToArrStr(totalData?.stepThreeData?.propertyType),
        operating_location: uniqueArray,
        referral_code: totalData?.stepFourData?.refCode,
      };
    }

    const convertRequiredPayload = (payload: any) => {
      // Example implementation to filter out empty or null values
      const filteredPayload: any = {};
      Object.keys(payload).forEach(key => {
        if (payload[key] !== undefined && payload[key] !== null) {
          filteredPayload[key] = payload[key];
        }
      });
      return filteredPayload;
    };
    // console.log('cheking on the payload',JSON.stringify(payload));

    const filteredPayload = convertRequiredPayload(payload);
    // console.log('filteredPayload =======>', filteredPayload);

    onboardingMutation(filteredPayload).then(res => {
      // console.log('res =======>', res);

      if (res?.data?.status) {
        dispatch(updateLoginStatus(true));
        // navigation.navigate('BOTTOM_TAB');
        // navigation.goBack();
        // Alert.alert('hello')
      } else {
        console.log('Error in onboarding builder', res);
      }
    });
  };
  // const handleNextBtn = () => {
  //   dispatch(updateLoginStatus(true));

  //   // Alert.alert('hello');
  // };
  useEffect(() => {
    setAddMoreAreas([{ city: '', locality: [] }]);
    // setRefCode(stepFourData?.refCode || '');
  }, []);
  return (
    <RNView style={styles.mainContainer}>
       <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'padding'}  >
        <ScrollView showsVerticalScrollIndicator={false}>
      <RNView style={styles.stepContainer}>
        <RNText style={styles.stepText}>Step 4 of 4</RNText>
      </RNView>
     
          <FlatList
            extraData={addMoreAreas}
            data={addMoreAreas}
            renderItem={({ item, index }) => {
              return (
                <CityAreaCombo
                  key={index}
                  index={index}
                  listOfAreas={addMoreAreas}
                  setChildData={setChildData}
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
                const cityMap = new Map();
                childData.forEach(item => {
                  if (
                    !cityMap.has(item.city) ||
                    (cityMap.has(item.city) && cityMap.get(item.city).locality.length === 0 && item.locality.length > 0)
                  ) {
                    cityMap.set(item.city, item);
                  }
                });

                const uniqueArray = Array.from(cityMap.values());
                setAddMoreAreas([...uniqueArray?.filter(item => item.city !== ''), { city: '', locality: [] }]);
                // setAddMoreAreas([...addMoreAreas, { city: '', locality: '' }]);
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
          <RNView style={[styles.inputView, { marginTop: px(15) }]}>
            <CommonInput
              onChangeText={text => {
                setRefCode(text);
              }}
              value={refCode}
              label="Referral Code"
              placeholder="Referral Code"
              placeholderColor={ColorTheme.gray2}
              style={[styles.inputStyle]}
              outlineStyle={{ borderStyle: 'dashed', borderWidth: 0.7 }}
              maxLength={8}
            />
          </RNView>
          <RNView style={styles.emptyContainer}>

          </RNView>
          <RNView
            style={{
              alignSelf: 'center',

              flexDirection: 'row',
              justifyContent: 'space-around',
              marginBottom:px(20),
              width: '100%',
            }}>
            <CommonButton
              onPress={() => setStep('3')}
              title={'Back'}
              style={styles.buttonContainer}
              textStyle={styles.BtnStyle}
            />
            <CommonButton
              onPress={postOnboarding}
              // onPress={() => setStep('5')}
              title={'Finish'}
              style={styles.nextContainer}
              textStyle={styles.nextStyle}
            />
          </RNView>
        </ScrollView>
      </KeyboardAvoidingView>
    </RNView>
  );
};

export default BuilderStepFour;
