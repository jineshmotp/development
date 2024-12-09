import RNView from '@/custom/RNView'
import { RNText } from '@/custom/RNText'
import ModalWrapper from '@/components/common/ModalWrapper'
import { deviceHeight, deviceWidth, px } from '@/utils'
import HeaderBar from '@/components/common/HeaderBar'
import { FlatList, Keyboard, Modal, Pressable, ScrollView, TouchableOpacity } from 'react-native'
import { Styles } from './styles'
import { useGetLookingForDataQuery } from '@/redux/onboarding/onboardingService'
import { useEffect, useState } from 'react'
import { useAppSelector } from '@/hooks/reduxHooks'
import { getBuilderStepThree, getSelectedRole } from '@/redux/onboarding/onboardingReducer'
import CommonInput from '@/custom/CommonInput'
import { ColorTheme } from '@/theme'
import CheckBox from '@/components/common/CheckBox'
import InputChips from '@/components/common/InputChips'
import CommonButton from '@/custom/CommonButton'
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService'
import { useToast } from 'react-native-toast-notifications'

type UserProjectProps = {
    isVisible?:boolean
    onPressClose?: () => void
    userData ?: any ;
}
type defaultProps = {
    _id?: string;
    isActive?: boolean;
    label?: string;
    value?: string;
  };

type StepThreeProps = {
    buildType?: defaultProps[];
    propertyType?: defaultProps[];
  };

const UserProjectDetails : React.FC<UserProjectProps>=({isVisible,userData,onPressClose})=> {
    const [data, setData] = useState<any>(userData);
    const stepThreeBuilder = useAppSelector(getBuilderStepThree);
    const { data: builderType } = useGetLookingForDataQuery('builder_type');
    const { data: buildingType } = useGetLookingForDataQuery('deal_property_type');
    const [selectedList, setSelectedList] = useState([]);
    const [selectedBuilder, setSelectedBuilderList] = useState([]);
    const role = useAppSelector(getSelectedRole);
    const [showCityModal, setShowCityModal] = useState(false);
    const [showBuilderModal, setShowBuilderModal] = useState(false);
    const [stepThreeDetails, setstepThreeDetails] = useState<StepThreeProps>({ buildType: '', propertyType: '' });
    const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
    const toast = useToast();

    const [dealType, setDealType] = useState([
        { name: 'New', checked: false },
        { name: 'Pre-Owned', checked: false },
      ]);
    const [errorFields, setErrorFields] = useState({ buildType: false, propertyType: false, dealType: false });


    const handleUpdateProjectInfo = async () => {
        
        //setData({...data,languages:selectedList.map(obj => obj?.label)})
     
        if(data?.role==='AGENT'){
          updateUserDataMutation({
            userId: data._id,
            updateDetails: {
              AGENT:{deal_transaction_type:dealType
                .filter(item => item.checked)
                .map(item => item.name)},
             deal_property_type: selectedList?.map(obj => obj?.label)
            },
          }).then(response => {
            // console.log('updateUserDataMutation', response);
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
              if (!response?.error?.status) {
                toast.show(response?.error?.message, {
                  type: 'error_toast',
                  animationDuration: 100,
                  data: {
                    title: 'Message',
                  },
                  duration: 3000,
                });
              }
            }
          });
        }else{
          updateUserDataMutation({
            userId: data._id,
            updateDetails: {
              BUILDER:{builder_type:selectedBuilder?.map(obj => obj?.label)},
             deal_property_type: selectedList?.map(obj => obj?.label)
            },
          }).then(response => {
             console.log('updateUserDataMutation', response);
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
              if (!response?.error?.status) {
                toast.show(response?.error?.message, {
                  type: 'error_toast',
                  animationDuration: 100,
                  data: {
                    title: 'Message',
                  },
                  duration: 3000,
                });
              }
            }
          });
        }
       
       };
  const handleFocus = () => {
    Keyboard.dismiss();
    if (!showCityModal) {
      setShowCityModal(true);
    }
  };
  const handleBulderFocus = () => {
    Keyboard.dismiss();
    if (!showBuilderModal) {
      setShowBuilderModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowCityModal(false);
  };
  const handleBuilderModal = () => {
    setShowBuilderModal(false);
  };
  const handleTypeSelect = buildType =>{
    if (selectedBuilder.includes(buildType)) {
      setSelectedBuilderList(selectedBuilder.filter(item => item !== buildType));
    } else {
      setSelectedBuilderList([...selectedBuilder, buildType]);
    }

    // Close keyboard when city is selected
    Keyboard.dismiss();
  }
  const handleBuildingTypeSelect = builder => {
    // Toggle selection of builder
    console.log('cheimg on item sedsd',JSON.stringify(builder));
    
    if (selectedList.includes(builder)) {
      setSelectedList(selectedList.filter(item => item !== builder));
    } else {
      setSelectedList([...selectedList, builder]);
    }
    // Close keyboard when city is selected
    Keyboard.dismiss();
  };

  const handleCheckBox = ele => {
    if (ele.name === 'New') {
      setDealType([
        { name: ele.name, checked: !ele?.checked },
        { name: 'Pre-Owned', checked: dealType[1].checked },
      ]);
    } else {
      setDealType([
        { name: 'New', checked: dealType[0].checked },
        { name: ele.name, checked: !ele?.checked },
      ]);
    }
  };

  useEffect(()=>{
    if(data?.BUILDER){
      const typeOfBuilder= data?.BUILDER?.builder_type?.map((type, index) => ({
        _id: `669dfa8cbbaf87b168440${(index + 1).toString().padStart(3, '0')}`,
        label: type,
        value: type,
        isActive: true
    }))
      setSelectedBuilderList([...typeOfBuilder])
    }
    if(data?.deal_property_type?.length>0){
      const transformedData = data?.deal_property_type?.map((type, index) => ({
        _id: `669dfa8cbbaf87b168440${(index + 1).toString().padStart(3, '0')}`,
        label: type,
        value: type,
        isActive: true
    }));
    setSelectedList([...transformedData])
    }
  if(data?.role==='AGENT'){
    const names = ['New', 'Pre-Owned']
    const result = names.map(name => ({
      name: name,
      checked: data?.AGENT?.deal_transaction_type?.includes(name)
  }));  
  setDealType(result)
  
  }
    
  },[])

  
  return (
    <ModalWrapper visible={isVisible} onClose={onPressClose} modalHeight={deviceHeight - px(100)} header={true} >
        <ScrollView showsVerticalScrollIndicator={true}>
            <RNView>
            <HeaderBar label="Project Details" backPress={onPressClose}/>
            <RNView style={Styles.sectionContainer}>
            {data?.role === 'AGENT' ? (
          <RNView style={{ marginTop: px(30), justifyContent: 'center', alignItems: 'center' }}>
            <RNView style={Styles.dealView}>
              {dealType?.map((ele, ind) => {
                return (
                  <RNView key={ind} style={Styles.agentCheck}>
                    <RNText style={Styles.textStyle}>{ele?.name}</RNText>
                    <CheckBox checked={ele?.checked} onPress={() => handleCheckBox(ele)} isCheckBox={true} />
                  </RNView>
                );
              })}
            </RNView>
            <RNView style={Styles.errorDeal}>
              <RNText style={Styles.errorText}>{errorFields?.dealType ? 'Please select type' : ''}</RNText>
            </RNView>
          </RNView>
        ) : (
          <>
            <CommonInput
              onChangeText={text => {
                setstepThreeDetails({ ...stepThreeDetails, buildType: text });
              }}
              value={''}
              label="Builder Type *"
              placeholder="Builder Type *"
              placeholderColor={ColorTheme.gray2}
              style={Styles.inputStyle}
              maxLength={50}
              onFocus={handleBulderFocus}
            />
            <RNText style={Styles.errorText}>{errorFields?.buildType ? 'Please select builder type' : ''}</RNText>
            {selectedBuilder?.map((item, ind) => {
          return (
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
              onPress={itm => {
                handleTypeSelect(itm);
              }}
            />
          );
        })}
          </>
        )}
        <CommonInput
          onChangeText={text => {
            setstepThreeDetails({ ...stepThreeDetails, buildingType: text });
          }}
          value={stepThreeDetails?.buildingType}
          label="Dealing Property Type *"
          placeholder="Dealing Property Type *"
          placeholderColor={ColorTheme.gray2}
          style={[Styles.inputStyle]}
          maxLength={50}
          keyboardType={'numeric'}
          onFocus={handleFocus}
        />
        <RNText style={Styles.errorText}>
          {errorFields?.propertyType ? 'Please select dealing property type' : ''}
        </RNText>
        {selectedList?.map((item, ind) => {
          return (
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
              onPress={itm => {
                handleBuildingTypeSelect(itm);
              }}
            />
          );
        })}
         <Modal visible={showCityModal} transparent={true} animationType="fade" onRequestClose={handleCloseModal}>
          <Pressable style={Styles.modalBackground} onPress={handleCloseModal}>
            <RNView style={Styles.modalContainer}>
              <FlatList
                data={buildingType?.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => {
                    handleBuildingTypeSelect(item)}}>
                    <RNText style={[Styles.renderText, selectedList.some(itemToCheck => itemToCheck?.label === item?.label) && Styles.selectedText]}>
                      {item?.label}
                    </RNText>
                  </TouchableOpacity>
                )}
              />
            </RNView>
          </Pressable>
        </Modal>
        <Modal visible={showBuilderModal} transparent={true} animationType="fade" onRequestClose={handleBuilderModal}>
          <Pressable style={Styles.modalBackground} onPress={handleBuilderModal}>
            <RNView style={Styles.modalContainer}>
              <FlatList
                data={builderType?.data}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={() => handleTypeSelect(item)}>
                    <RNText style={[Styles.renderText, selectedBuilder.some(itemToCheck => itemToCheck?.label === item?.label)  && Styles.selectedText]}>
                      {item?.label}
                    </RNText>
                  </TouchableOpacity>
                )}
              />
            </RNView>
          </Pressable>
        </Modal>
        <RNView style={Styles.mainBtn}>
            <CommonButton
              disabled={isLoading}
              onPress={handleUpdateProjectInfo}
              loaderColor="black"
              loading={isLoading}
              title="Save"
              style={Styles.btnSave}
              textStyle={Styles.textStyle}
            />
            <CommonButton
              // disabled={loader}
              onPress={onPressClose}
              // loaderColor="black"
              // loading={loader}
              title="Cancel"
              style={Styles.btnCancel}
              textStyle={Styles.textStyle}
            />
          </RNView>
            </RNView>

            </RNView>

        </ScrollView>
      </ModalWrapper>
  )
}
export default UserProjectDetails