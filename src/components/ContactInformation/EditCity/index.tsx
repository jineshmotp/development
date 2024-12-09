import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

// import { AntDesign, Entypo } from 'react-native-vector-icons';
import CitySelectorModal from '@/components/common/CitySelectorModal';
import HeaderBar from '@/components/common/HeaderBar';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, FONT } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type Props = {
  data?: any;
  isloading?: boolean;
  handleUpdateFieldFn?: (city: string) => void;
  onPressClose?: () => void;
  editFieldName?: string;
};

const EditCity: React.FC<Props> = ({ data, isloading = false, handleUpdateFieldFn, onPressClose, editFieldName }) => {
  const [openCityModal, setOpenCityModal] = useState<boolean>(false);
  const [city, setCity] = useState<string>(data);

  return (
    <RNView
      style={Platform.select({
        ios: {
          marginTop: px(50),
        },
      })}>
      <HeaderBar
        label={`${editFieldName}`}
        // backIcon={<Entypo name="chevron-thin-left" size={20} color="black" />}
        backPress={onPressClose}
      />
      <RNView style={styles.main}>
        <TouchableOpacity
          onPress={() => {
            setOpenCityModal(!openCityModal);
          }}
          style={{
            marginBottom: 20,
          }}>
          <RNText style={styles.citytext}>Select City</RNText>
          <RNView style={styles.cityName}>
            <RNText
              style={{
                color: city ? 'black' : ColorTheme.nearLukGray2,
                fontFamily: FONT.PoppinsMedium,
              }}>
              {city ? city : 'City'}
            </RNText>
            {/* <AntDesign name="down" size={20} color={ColorTheme.nearLukGray} /> */}
          </RNView>
        </TouchableOpacity>
        <RNView style={styles.mainBtn}>
          <CommonButton
            disabled={isloading}
            onPress={() => handleUpdateFieldFn(city)}
            loaderColor="black"
            loading={isloading}
            title="Save"
            style={styles.btnStyle}
            textStyle={styles.textStyle}
          />
        </RNView>
      </RNView>
      <CitySelectorModal
        showCity={openCityModal}
        onPressClose={() => setOpenCityModal(false)}
        setCity={data => {
          setCity(data);
        }}
      />
    </RNView>
  );
};

export default EditCity;
