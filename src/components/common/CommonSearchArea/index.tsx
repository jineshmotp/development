import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { isArray } from '@/constants/function/isArray';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceHeight, deviceWidth } from '@/utils';

import ListEmptyComponent from '../ListEmptyComponent';
import Loader from '../Loader';
import ModalWrapper from '../ModalWrapper';
import { style } from './styles';

type CommonModalProps = {
  showArea?: boolean;
  onPressClose?: () => void;
  setArea?: (name: string) => void;
  setSearchArea?: (name: string) => void;
  loading?: boolean;
  data?: string[];
  name?: string;
};
const CommonSearchArea: React.FC<CommonModalProps> = ({
  setArea,
  setSearchArea,
  onPressClose,
  showArea,
  loading = false,
  data = [],
  name = 'City',
}) => {
  return (
    <ModalWrapper visible={showArea} onClose={onPressClose} modalHeight={deviceHeight / 1.5} header={true}>
      {/* <ModalBackdrop /> */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ height: deviceHeight / 2 }}>
        <ScrollView style={style.modalContainer} contentContainerStyle={{ flex: 1 }}>
          <RNView style={style.modalContainer}>
            <RNView style={style.topInputView}>
              <RNView style={style.headView}>
                <TouchableOpacity onPress={onPressClose} style={style.closeBtn}>
                  <AntDesign name="close" size={18} color="black" />
                </TouchableOpacity>
                <RNText style={style.textStyle}>{name}</RNText>
              </RNView>
              <TextInput
                numberOfLines={1}
                placeholder={`Search your ${name}...`}
                onChangeText={e => setSearchArea(e)}
                style={style.searchInput}
              />
            </RNView>
            <RNView style={style.mainContainer}>
              <ScrollView contentContainerStyle={style.contentStyle}>
                {loading && <Loader size={'large'} height={deviceHeight - 300} width={deviceWidth} />}
                {isArray(data) ? (
                  data?.map((item: any, i: any) => {
                    return (
                      <TouchableOpacity
                        onPress={() => {
                          setArea(name === 'City' ? item?.city : item.state);
                          onPressClose();
                        }}
                        key={i}
                        style={style.listItem}>
                        <RNText style={{ color: 'black' }}>{name === 'City' ? item?.city : item.state}</RNText>
                      </TouchableOpacity>
                    );
                  })
                ) : (
                  <ListEmptyComponent type="default" />
                )}
              </ScrollView>
            </RNView>
          </RNView>
        </ScrollView>
      </KeyboardAvoidingView>
    </ModalWrapper>
  );
};

export default CommonSearchArea;
