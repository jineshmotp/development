import React, { memo, ReactElement } from 'react';
import { TextStyle, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Props = {
  item?: any;
  onPress?: () => void;
  onPreview?: () => void;
  onCheck?: (checked: boolean) => void;

  onRemove?: () => void;
  width?: number;

  rightIcon?: ReactElement;
  leftIcon?: ReactElement;
  textStyle?: TextStyle;
  selected?: boolean;
};

const PropertyDocumentSelection: React.FC<Props> = ({
  item,
  onPress,
  onCheck,
  onPreview,
  onRemove,

  rightIcon,
  leftIcon,
  textStyle,
  selected,
}) => {
  return (
    <RNView>
      <RNView style={{ flexDirection: 'row' }}>
        <RNView style={{ flex: 0.6, justifyContent: 'flex-start' }}>
          <RNView
            style={[
              styles.containerView,
              {
                backgroundColor: item?.uploaded || selected ? ColorTheme.primary : 'white',
              },
            ]}>
            {leftIcon}
            <RNText
              style={[
                {
                  color: item?.uploaded || selected ? 'black' : 'gray',
                },
                textStyle,
              ]}>
              {item?.label}
            </RNText>
          </RNView>
        </RNView>

        <RNView style={{ flex: 0.1, justifyContent: 'center' }}></RNView>

        <RNView style={{ flex: 0.1, justifyContent: 'center' }}>
          {
            item.uploaded ? (
              <TouchableOpacity onPress={onRemove}>
                <Entypo name="trash" size={24} color="red" />
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={onPress}>
                <Entypo name="upload-to-cloud" size={24} color={ColorTheme.nearLukGray5} />
              </TouchableOpacity>
            )

            // item.loadervalue === true ? (
            //   <TouchableOpacity onPress={onPress}>
            //     <Entypo
            //       name="upload-to-cloud"
            //       size={24}
            //       color={ColorTheme.nearLukGray5}
            //     />
            //   </TouchableOpacity>
            // ) : (
            //   <ActivityIndicator />
            // )
          }
        </RNView>

        <RNView style={{ flex: 0.1, justifyContent: 'center' }}></RNView>

        <TouchableOpacity style={{ flex: 0.1, justifyContent: 'center' }} onPress={onPreview}>
          {item.uploaded ? <Entypo name="eye" size={24} color="black" /> : null}

          {rightIcon}
        </TouchableOpacity>
      </RNView>
    </RNView>
  );
};

export default memo(PropertyDocumentSelection);
