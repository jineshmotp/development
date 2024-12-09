import React, { useState } from 'react';
import { ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { useDispatch } from 'react-redux';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import { profileInformationData } from '@/constants/business/profile.information';
import CommonButton from '@/custom/CommonButton';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const BusinessProfileFinal = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'BUSINESS_PROFILE_FINAL'>>();
  const toast = useToast();
  const dispatch = useDispatch();

  //   console.log('payload++++++++', route.params.step2);

  const [loading, setLoading] = useState<boolean>(false);

  //   const [
  //     mutationForBusinessProfileCreation,
  //     DataResBusinessProfileCreation,
  //     LoadingResBusinessProfileCreation,
  //     SucessResBusinessProfileCreation,
  //     ErrorResBusinessProfileCreation,
  //   ] = useCallApi(Api.addBusinessProfileApi);

  //   console.log('route?.params.step2', route?.params.step2);
  //   const createBusinessProfile = async () => {
  //     setLoading(true);
  //     console.log('router values on creating business profile : ', route.params.step2);
  //     try {
  //       const response = await Apis.post('business/profile/add', route.params.step2);
  //       setLoading(false);
  //       console.log('asbhfvb+++++++++', response);
  //       dispatch(BusinessAction.updateBusinessProfile(route?.params.step2));
  //       // console.log("response", response?.data?.data);
  //       // Alert.alert("Message", "Business profile created successfully", [
  //       //   { text: "OK", onPress: () => navigation.navigate("BottomTabs") },
  //       // ]);
  //       toast.show('Business profile created successfully', {
  //         type: 'custom_toast',
  //         animationDuration: 100,
  //         data: {
  //           title: 'Message',
  //         },
  //         duration: 3000,
  //       });
  //       // navigation.navigate("BottomTabs");
  //       navigation.navigate('BusinessProfile', {
  //         id: response?.data?.data?.business_id,
  //       });
  //     } catch (e) {
  //       console.log(
  //         'createBusinessProfile+++++++',
  //         e.response.status,
  //         // e.response,
  //         e.response.data.message
  //       );
  //       if (e.response.data.message) {
  //         if (e.response.data.message) {
  //           toast.show(e.response.data.message[0], {
  //             type: 'custom_toast',
  //             animationDuration: 100,
  //             data: {
  //               title: e.response.data.message[1],
  //             },
  //             duration: 3000,
  //           });
  //         }
  //       }

  //       setLoading(false);
  //       // Alert.alert(
  //       //   "Message",
  //       //   e.response.status === 403
  //       //     ? "Account already exists"
  //       //     : "Failed to create business profile"
  //       // );
  //       toast.show(e.response.status === 403 ? 'Account already exists' : 'Failed to create business profile', {
  //         type: 'custom_toast',
  //         animationDuration: 100,
  //         data: {
  //           title: 'Message',
  //         },
  //         duration: 3000,
  //       });
  //     }
  //   };

  // const createBusinessProfile = async () => {
  //   setLoading(true);
  //   try {
  //     const response = await mutationForBusinessProfileCreation.mutateAsync(
  //       route.params.step2
  //     );

  //     if (response.status === 201) {
  //       Alert.alert("Message", "Business profile created successfully", [
  //         { text: "OK", onPress: () => navigation.navigate("BottomTabs") },
  //       ]);
  //     }
  //   } catch (e) {
  //     console.error("Error adding business profile :", e);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar backPress={() => navigation.goBack()} label="" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <RNView style={styles.topView}>
          <RNView style={styles.headLine}>
            <RNText style={styles.headText}>Important profile information</RNText>
          </RNView>
          {profileInformationData.map((item, i) => {
            return (
              <RNView key={i}>
                <RNText style={styles.label}>{item.label}</RNText>
                <RNText style={styles.description}>{item.description}</RNText>
              </RNView>
            );
          })}
        </RNView>
      </ScrollView>
      <RNView style={styles.btnView}>
        <CommonButton
          title="Create Profile"
          //   onPress={createBusinessProfile}
          disabled={loading}
          loading={loading}
          loaderColor="black"
          style={{
            minHeight: 40,
            backgroundColor: loading ? ColorTheme.nearLukGray2 : ColorTheme.primary,
          }}
          textStyle={{ color: 'black' }}
        />
      </RNView>
    </Container>
  );
};

export default BusinessProfileFinal;
