import React, { useState } from 'react';
import { Platform, TouchableOpacity } from 'react-native';

import HeaderBar from '@/components/common/HeaderBar';
import StateSelectorModal from '@/components/common/StateSelectorModal';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, FONT } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

type Props = {
  data?: any;
  isloading?: boolean;
  handleUpdateFieldFn?: (State: string) => void;
  onPressClose?: () => void;
  editFieldName?: string;
};

const EditState: React.FC<Props> = ({ data, isloading = false, handleUpdateFieldFn, onPressClose, editFieldName }) => {
  const [openStateModal, setOpenStateModal] = useState(false);
  const [state, setState] = useState(data);

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
            setOpenStateModal(!openStateModal);
          }}
          style={styles.touch}>
          <RNText style={styles.StateName}>Select State</RNText>
          <RNView style={styles.stateTitle}>
            <RNText
              style={{
                color: state ? 'black' : ColorTheme.nearLukGray2,
                fontFamily: FONT.PoppinsRegular,
              }}>
              {state ? state : 'State'}
            </RNText>
            {/* <AntDesign name="down" size={24} color={ColorTheme.nearLukGray} /> */}
          </RNView>
        </TouchableOpacity>
        <RNView style={styles.mainBtn}>
          <CommonButton
            disabled={isloading}
            onPress={() => handleUpdateFieldFn(state)}
            loaderColor="black"
            loading={isloading}
            title="Save"
            style={styles.btnStyle}
            textStyle={styles.textStyle}
          />
        </RNView>
      </RNView>
      <StateSelectorModal
        showState={openStateModal}
        onPressClose={() => setOpenStateModal(false)}
        setState={data => {
          setState(data);
        }}
      />
    </RNView>
  );
};
export default EditState;
