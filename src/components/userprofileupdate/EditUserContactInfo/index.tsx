import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useToast } from 'react-native-toast-notifications';
import { Entypo } from 'react-native-vector-icons';
import { useDispatch } from 'react-redux';

import { useFocusEffect } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
import EditAddress from '@/components/ContactInformation/EditAddress';
import EditCity from '@/components/ContactInformation/EditCity';
import EditPinCode from '@/components/ContactInformation/EditPinCode';
import EditState from '@/components/ContactInformation/EditState';
import EditWebsite from '@/components/ContactInformation/EditWebsite';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { deviceHeight } from '@/utils';

// import AddressEditScreen from '../../../../../business-profile/pages/bussinessProfileEditing/EditScreens/ContactsEditScreens/AddressEditScreen';
// import CityEditScreen from '../../../../../business-profile/pages/bussinessProfileEditing/EditScreens/ContactsEditScreens/CityEditScreen';
// import CountryEditScreen from '../../../../../business-profile/pages/bussinessProfileEditing/EditScreens/ContactsEditScreens/CountryEditScreen';
// import PinCodeEditScreen from '../../../../../business-profile/pages/bussinessProfileEditing/EditScreens/ContactsEditScreens/PinCodeEditScreen';
// import StateEditScreen from '../../../../../business-profile/pages/bussinessProfileEditing/EditScreens/ContactsEditScreens/StateEditScreen';
// import WebsiteEditScreen from '../../../../../business-profile/pages/bussinessProfileEditing/EditScreens/ContactsEditScreens/WebsiteEditScreen';
type Props = {
  screenName?: string;
  data?: any;
  isVisible?: boolean;
  onPressClose?: () => void;
};

const EditUserContactInfo: React.FC<Props> = ({ screenName, data, isVisible, onPressClose }) => {
  const toast = useToast();
  const [contactData, setContactData] = useState(data);
  const [editFieldName, setEditFieldName] = useState<string>('Contact Info');
  const state = useAppSelector(getUserData);
  // console.log("state++++++++++", state);
  const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
  //   const [mutation, businessData, isloading, isSuccess, isError] = useCallApi(Apis.updateUserDataApi);
  const dispatch = useDispatch();

  useFocusEffect(() => {
    setContactData(contactData);
  });
  useEffect(() => {
    setContactData(state);
  }, [state]);
  useEffect(() => {
    setEditFieldName(screenName ? screenName : 'Contact Info');
  }, [screenName]);

  //====================update city function================
  const handleUpdateCity = (city: string) => {
    updateUserDataMutation({
      userId: state._id,
      updateDetails: {
        city: city,
      },
    }).then(response => {
      // console.log('response', response);
      if (response?.data?.status) {
        toast.show(response?.data?.message, {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        // console.log("city+++++++++++++++++++++", city);
        onPressClose();
        // {
        //   editFieldName ? navigation.goBack() : setEditFieldName("Contact Info");
        // }
        //  setCity("");
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };

  //==================update state function===================
  const handleUpdateState = async (State: string) => {
    updateUserDataMutation({
      userId: state._id,
      updateDetails: {
        state: State,
      },
    }).then(response => {
      if (response?.data?.status) {
        toast.show(response?.data?.message, {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        onPressClose();
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };

  //==================update country function===================
  // const handleUpdateCountry = async (country: string) => {
  //   try {
  //     let response = await mutation.mutateAsync({
  //       userId: state._id,
  //       updateDetails: {
  //         country: country,
  //       },
  //     });
  //     if (response?.status === 201 || 200) {
  //       dispatch(
  //         userAction.setUserData({
  //           ...contactData,
  //           country: country,
  //         })
  //       );
  //       // console.log("country+++++++++++++++++++++", country);
  //       onPressClose();
  //     }
  //   } catch (error) {
  //     // Alert.alert("Message", "Something went wrong", [
  //     //   {
  //     //     text: "Cancel",
  //     //     onPress: () => console.log("Cancel Pressed"),
  //     //     style: "cancel",
  //     //   },
  //     //   { text: "OK", onPress: () => console.log("OK Pressed") },
  //     // ]);
  //     toast.show('Something went wrong', {
  //       type: 'error_toast',
  //       animationDuration: 100,
  //       data: {
  //         title: 'Message',
  //       },
  //       duration: 3000,
  //     });
  //     // console.log("city update error", error);
  //   }
  // };

  //================update website function================
  const handleWebvalidation = (website: string): boolean => {
    let urlRegex =
      /^(https?|ftp?|www?|http):\/\/(([a-z\d]([a-z\d-]*[a-z\d])?\.)+[a-z]{2,}|localhost)(\/[-a-z\d%_.~+]*)*(\?[;&a-z\d%_.~+=-]*)?(\#[-a-z\d_]*)?$/i;
    return urlRegex.test(`https://${website}`);
  };
  const handleUpdateWebsite = (website: string) => {
    if (handleWebvalidation(website)) {
      updateUserDataMutation({
        userId: state._id,
        updateDetails: {
          website: website,
        },
      }).then(response => {
        if (response?.data?.status) {
          toast.show(response?.data?.message, {
            type: 'success_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });

          // console.log('website+++++++++++', website);
          onPressClose();
        } else {
          toast.show('Something went wrong', {
            type: 'error_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        }
      });
    }
  };

  //==============update addresss function============
  const handleUpdateAddress = async (address1: string, address2: string) => {
    updateUserDataMutation({
      userId: state._id,
      updateDetails: {
        address_lane1: `${address1}`,
        address_lane2: `${address2}`,
      },
    }).then(response => {
      if (response?.data?.status) {
        // console.log('address+++++++++++', address1, address2);
        onPressClose();
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };

  // ==================update Pincode function==================

  const handleUpdatePinCode = async (pincodeData: string) => {
    updateUserDataMutation({
      userId: state._id,
      updateDetails: {
        pincode: pincodeData,
      },
    }).then(response => {
      if (response?.data?.status) {
        toast.show(response?.data?.message, {
          type: 'success_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
        // console.log('pincode++++++++', pincodeData);
        onPressClose();
      } else {
        toast.show('Something went wrong', {
          type: 'error_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
    // console.log("response?.status======>", response?.status);
  };
  const renderEditScreenByName = (onPressClose): React.ReactNode => {
    switch (editFieldName) {
      case 'Website':
        return (
          <EditWebsite
            data={data?.website}
            isloading={isLoading}
            handleUpdateFieldFn={handleUpdateWebsite}
            onPress={onPressClose}
            editFieldName={editFieldName}
          />
        );
      case 'City':
        return (
          <EditCity
            data={contactData?.city}
            isloading={isLoading}
            handleUpdateFieldFn={handleUpdateCity}
            editFieldName={editFieldName}
            onPressClose={() => onPressClose()}
          />
        );
      case 'State':
        return (
          <EditState
            data={contactData?.state}
            isloading={isLoading}
            handleUpdateFieldFn={handleUpdateState}
            editFieldName={editFieldName}
            onPressClose={() => onPressClose()}
          />
        );
      case 'Address':
        return (
          <EditAddress
            data={contactData}
            handleUpdateFieldFn={handleUpdateAddress}
            isloading={isLoading}
            onPress={onPressClose}
            editFieldName={editFieldName}
          />
        );
      case 'Pincode':
        return (
          <EditPinCode
            data={contactData?.pincode}
            isloading={isLoading}
            handleUpdateFieldFn={handleUpdatePinCode}
            editFieldName={editFieldName}
            onPressClose={() => onPressClose()}
          />
        );
      //   case 'Followers':
      //     return (
      //       <CountryEditScreen
      //         data={contactData}
      //         setData={setContactData}
      //         editFieldName={route?.params?.screenName}
      //         setEditFieldName={setEditFieldName}
      //         isloading={isloading}
      //         handleUpdateFieldFn={handleUpdateCountry}
      //       />
      //     );
    }
  };
  return (
    <ModalWrapper
      header={true}
      visible={isVisible}
      onClose={onPressClose}
      modalHeight={editFieldName === 'City' || editFieldName === 'State' ? deviceHeight : deviceHeight / 2}>
      <KeyboardAvoidingView
        behavior="height"
        style={{
          // flex: 1,
          backgroundColor: 'white',
        }}>
        {/* <HeaderBar
          label={`${editFieldName}`}
          // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
          backPress={onPressClose}
        /> */}

        {renderEditScreenByName(onPressClose)}
      </KeyboardAvoidingView>
    </ModalWrapper>
  );
};

export default EditUserContactInfo;
