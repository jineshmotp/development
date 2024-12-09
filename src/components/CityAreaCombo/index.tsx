import React, { useEffect, useState } from 'react';
import { FlatList, Keyboard, Modal, Pressable, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useGetCitiesQuery, useLazyGetAreasQuery } from '@/redux/onboarding/onboardingService';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type Props = {
  city?: string;
  locality?: [];
  setCity?: (t: string) => void;
  setArea?: (t: string) => void;
  handleDelete?: (ind) => void;
  index?: number;
  setChildData?:any
  listOfAreas:[]
};

const CityAreaCombo: React.FC<Props> = ({ city, locality, setCity, setArea, handleDelete, index,setChildData ,listOfAreas}) => {
  const { data: getCities } = useGetCitiesQuery({});
  const [areaListMutation] = useLazyGetAreasQuery();
  const [getAllAreas, setGetAllAreas] = useState([]);
  const [showCityModal, setShowCityModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [selectedCity, setSelectedCity] = useState(city || '');
  const [selectedAreas, setSelectedAreas] = useState<string[]>(locality ? [locality] : []);
  const [selectedAreasDisplay, setSelectedAreasDisplay] = useState<string[]>(locality ? [...locality] : []);
  const [hide, setHide] = useState(false);
  
  useEffect(() => {
    setChildData([...listOfAreas,{city:city,locality:selectedAreasDisplay}]);
  }, [setChildData]);

  const handleFocus = () => {
    Keyboard.dismiss();
    if (!showCityModal) {
      setShowCityModal(true);
    }
  };

  const handleAreaFocus = () => {
    Keyboard.dismiss();
    if (!showAreaModal) {
      setShowAreaModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowCityModal(false);
  };

  const handleAreaCloseModal = () => {
    setShowAreaModal(false);
  };

  const handleCitySelect = (selectedCity: string) => {
    setCity(selectedCity);
    setSelectedCity(selectedCity);
    handleCloseModal();

    // Fetch areas for the selected city
    areaListMutation({ city: selectedCity }).then(res => {
      if (res?.data?.status === 200) {
        setGetAllAreas(res.data?.data?.areas || []);
      } else {
        // console.log('Error fetching areas:', res);
      }
    });

    // Close keyboard when city is selected
    Keyboard.dismiss();
  };

  const handleAreaSelect = (selectedArea: string) => {
    // console.log('cheking on th araay ');

    if (selectedAreasDisplay.includes(selectedArea)) {
      setSelectedAreasDisplay(selectedAreasDisplay?.filter(item => item !== selectedArea));
      // console.log('seeing on selected data',JSON.stringify(listOfAreas.concat({city:city,locality:selectedAreasDisplay?.filter(item => item !== selectedArea)})));
      
      setChildData(listOfAreas.concat({city:city,locality:selectedAreasDisplay?.filter(item => item !== selectedArea)}));
    } else {
      // console.log('seeing on selected data222',JSON.stringify(listOfAreas.concat({city:city,locality:[...selectedAreasDisplay, selectedArea]})));

      setSelectedAreasDisplay([...selectedAreasDisplay, selectedArea]);
      setChildData(listOfAreas.concat({city:city,locality:[...selectedAreasDisplay, selectedArea]}));
    }
    // setArea(selectedArea);
    // setSelectedAreas([...selectedAreas, selectedArea]);
    // setSelectedAreasDisplay([...selectedAreasDisplay, selectedArea]);
    // console.log('checking on array of areas',selectedAreasDisplay);
    
    // handleAreaCloseModal();

    // Close keyboard when area is selected
    Keyboard.dismiss();
  };

  const handleDeleteArea = (area: string) => {
    const updatedAreas = selectedAreas.filter(item => item !== area);
    setSelectedAreas(updatedAreas);

    const updatedAreasDisplay = selectedAreasDisplay?.filter(item => item !== area);
    setSelectedAreasDisplay(updatedAreasDisplay);
  };

  const handleDeletefn = () => {
    handleDelete(index);
    setHide(true);
  };

  return hide ? (
    <RNView></RNView>
  ) : (
    <RNView style={{ justifyContent: 'center', alignItems: 'center' }}>
      <RNView style={styles.container}>
        <CommonInput
          value={selectedCity}
          label="Select City *"
          placeholder="Select City *"
          placeholderColor={ColorTheme.gray2}
          style={styles.smallInputStyle}
          maxLength={50}
          onFocus={handleFocus}
        />
        <RNView style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <CommonInput
            value=""
            label="Select area *"
            placeholder="Select area *"
            placeholderColor={ColorTheme.gray2}
            style={styles.smallInputStyle}
            maxLength={50}
            onFocus={handleAreaFocus}
          />
          <TouchableOpacity
            style={{
              width: px(20),
              height: px(20),
              borderRadius: px(20),
              backgroundColor: 'rgba(0,0,0,0.3)',
              justifyContent: 'center',
              alignItems: 'center',
              margin: px(2),
              marginBottom: px(10),
            }}
            onPress={handleDeletefn}>
            <AntDesign name="close" size={px(10)} color={ColorTheme.black} />
          </TouchableOpacity>
        </RNView>
      </RNView>

      <RNView style={{ flexDirection: 'row', flexWrap: 'wrap', marginTop: 5, width: '90%' }}>
      {selectedAreasDisplay?.map((item, index) => (
        <RNView
          key={index}
          style={{
            backgroundColor: ColorTheme.onboardingPrimary,
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 10,
            marginRight: 10,
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <RNText style={{ color: ColorTheme.white }}>{item}</RNText>
          <TouchableOpacity onPress={() => handleDeleteArea(item)}>
            <AntDesign name="close" size={20} color={ColorTheme.white} style={{ marginLeft: 5 }} />
          </TouchableOpacity>
        </RNView>
      ))}
      </RNView>
      <Modal visible={showCityModal} transparent={true} animationType="fade" onRequestClose={handleCloseModal}>
        <Pressable style={styles.modalBackground} onPress={handleCloseModal}>
          <RNView style={styles.modalContainer}>
            <FlatList
              data={getCities?.data}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleCitySelect(item)}>
                  <RNText style={[styles.renderText, selectedCity === item && styles.selectedText]}>{item}</RNText>
                </TouchableOpacity>
              )}
            />
          </RNView>
        </Pressable>
      </Modal>
      <Modal visible={showAreaModal} transparent={true} animationType="fade" onRequestClose={handleAreaCloseModal}>
        <Pressable style={styles.modalBackground} onPress={handleAreaCloseModal}>
          <RNView style={styles.modalContainer}>
            <FlatList
              data={getAllAreas}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity onPress={() => handleAreaSelect(item)}>
                  <RNText style={[styles.renderText, selectedAreasDisplay?.includes(item) && styles.selectedText]}>
                    {item}
                  </RNText>
                </TouchableOpacity>
              )}
            />
          </RNView>
        </Pressable>
      </Modal>
    </RNView>
  );
};

export default CityAreaCombo;
