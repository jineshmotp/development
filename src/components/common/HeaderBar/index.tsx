import React, { memo, ReactElement } from 'react';
import { Platform, TouchableOpacity } from 'react-native';
import Feather from 'react-native-vector-icons/Feather';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { style } from './styles';

type props = {
  backIcon?: ReactElement;
  backPress?: () => void;
  rightIcon?: ReactElement;
  rightPress?: () => void;
  label?: string;
  shadow?: boolean;
  padVerticle?: boolean;
};
const HeaderBar: React.FC<props> = ({
  backIcon,
  backPress,
  rightIcon,
  rightPress,
  label,
  shadow = true,
  padVerticle = true,
}) => {
  return (
    <RNView
      style={[
        style.main,
        shadow
          ? {
              shadowOffset: {
                width: 1,
                height: 1,
              },
              shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
              shadowRadius: 3,
              shadowColor: 'gray',
              elevation: 10,
            }
          : {},
      ]}>
      <RNView style={[style.container, { paddingVertical: padVerticle ? 10 : 0 }]}>
        {backIcon ? (
          <TouchableOpacity style={style.backBtn} onPress={backPress}>
            {backIcon}
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={style.backBtn} onPress={backPress}>
            <Feather name="chevron-left" size={24} color="#8E8E8E" />
          </TouchableOpacity>
        )}
        <RNView style={{ marginRight: 30 }}>
          <RNText style={style.labelStyle}>{label}</RNText>
        </RNView>
        {rightIcon ? (
          <TouchableOpacity style={style.rightBtn} onPress={rightPress}>
            {rightIcon}
          </TouchableOpacity>
        ) : (
          <RNView></RNView>
        )}
      </RNView>
    </RNView>
  );
};

export default memo(HeaderBar);
