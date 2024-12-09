import ModalWrapper from '@/components/common/ModalWrapper';
import CommonButton from '@/custom/CommonButton';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceHeight, px } from '@/utils';
import React, { useEffect, useState } from 'react'
import { FlatList, TouchableOpacity } from 'react-native';
import { styles } from './styles';
import { useNavigation } from '@react-navigation/native';
import { RNText } from '@/custom/RNText';
import { getUserStepTwo } from '@/redux/onboarding/onboardingReducer';
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { useToast } from 'react-native-toast-notifications';
import HeaderBar from '@/components/common/HeaderBar';

type UserLookingFor = {
    lookingForList?: any;
    isVisible?: boolean;
    responseList:any;
    onPressClose?: () => void;
    userData ?: any ;
  };

  

const UserLookingForUpdate:React.FC<UserLookingFor> = ({lookingForList,isVisible,onPressClose,responseList,userData})=> {
    const navigation = useNavigation();
    const [selectedItems, setSelectedItems] = useState([]);
    const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
    const toast = useToast()

    const handleUpdateLookingFor = async () =>{
        
        updateUserDataMutation(
           { userId: userData._id,
            updateDetails:{
                looking_for : selectedItems?.map(obj => obj?.label)}
            }
        ).then(res=>{
            console.log('response after update',JSON.stringify(res));
            if (res?.data?.status) {
                toast.show(res?.data?.message, {
                  type: 'success_toast',
                  animationDuration: 100,
                  data: {
                    title: 'Message',
                  },
                  duration: 3000,
                });
        
                onPressClose();
              } else {
                if (!res?.error?.status) {
                  toast.show(res?.error?.message, {
                    type: 'error_toast',
                    animationDuration: 100,
                    data: {
                      title: 'Message',
                    },
                    duration: 3000,
                  });
                }
              }
            
        }).catch(err=>{
            console.log('checking on error',JSON.stringify(err));
            
        })
    }
    
    useEffect(()=>{
        const objectArray = responseList?.map((item, index) => {
            return {
              _id: generateId(), // Assuming you have a function to generate unique IDs
              label: item,
              value: item,
              isActive: true
            };
          });
          function generateId() {
            return Math.random().toString(36).substring(2, 18);
          }
          // console.log('cheking on the sssss',JSON.stringify(objectArray));
          
          setSelectedItems(objectArray)
    },[])

    const isInArray1 = (item, array) => {
        return array.some(el => el.label === item.label && el.value === item.value);
      };

    const renderItem = ({ item }: { item: defaultProps }) => {
        return (
          <TouchableOpacity
            style={[
              styles.touchableContainer,
               isInArray1(item, selectedItems) && { backgroundColor: ColorTheme.onboardingPrimary },
            ]}
            onPress={() => toggleSelection(item)}>
            <RNText style={[styles.touchableText, isInArray1(item, selectedItems) && { color: '#FFF' }]}>{item?.label}</RNText>
          </TouchableOpacity>
        );
      };

      const toggleSelection = item => {
        console.log('checkinggg',selectedItems);
        
        if (isInArray1(item, selectedItems)) {
          const temp = selectedItems.filter(itm => itm?.label !== item?.label);
          setSelectedItems(temp);
        } else {
          setSelectedItems([...selectedItems, item]);
        }
      };

  return (
   <ModalWrapper visible={isVisible} onClose={onPressClose} modalHeight={deviceHeight - px(100)} header={true}>
  <HeaderBar label="Looking For " backPress={onPressClose}/>
   <FlatList
          data={lookingForList}
          extraData={lookingForList}
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
            onPress={onPressClose}
            title={'Back'}
            style={styles.buttonContainer}
            textStyle={styles.BtnStyle}
          />
          <CommonButton
            onPress={handleUpdateLookingFor}
            title={'Next Step'}
            style={[
              styles.nextContainer,
              { backgroundColor: ColorTheme?.onboardingButton },
            ]}
            textStyle={styles.nextStyle}
          />
        </RNView>
   </ModalWrapper>
  )
}
export default UserLookingForUpdate