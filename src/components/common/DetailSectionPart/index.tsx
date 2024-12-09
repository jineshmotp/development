import React from 'react';
import { Alert, Linking, TouchableOpacity } from 'react-native';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import IconReplacer from '../IconReplacer';
import { styles } from './styles';

type Props = {
  icon?: string;
  iconName?: string | any;
  lable?: string;
  sublable?: string | null;
  editBtn?: any;
  editFunction?: () => void;
  editIcon?: boolean;
  verifed?: boolean;
  tooltip?: string;
  labelCapitalise?: boolean;
};

const DetailSectionPart: React.FC<Props> = ({
  icon,
  iconName,
  lable,
  sublable,
  editBtn,
  editFunction,
  editIcon,
  verifed,
  tooltip,
  labelCapitalise,
}) => {
  return (
    <RNView style={styles.sectionDetailPart}>
      <RNView style={styles.sectionContainer}>
        <RNView style={editBtn ? [styles.sectionpart, styles.addEdit] : [styles.sectionpart]}>
          {sublable ? (
            <IconReplacer iconName={iconName} iconSize={21} />
          ) : (
            <IconReplacer iconName={'plusCircle'} iconSize={35} />
          )}
          <RNView style={styles.rightSide}>
            <RNView style={styles.labelContainer}>
              <RNText
                style={
                  sublable
                    ? labelCapitalise
                      ? [styles.sectionTextCap]
                      : sublable == 'Website'
                        ? [styles.sectionTextWeb]
                        : [styles.sectionText]
                    : labelCapitalise
                      ? [(styles.sectionText, styles.AddNameField)]
                      : [(styles.sectionText, styles.AddNameField1)]
                }
                onPress={
                  !editBtn
                    ? editFunction
                    : () => {
                        if (sublable === 'Website') {
                          Linking.openURL(`https://${lable}`);
                        }
                      }
                }>
                {lable}
              </RNText>
              {tooltip ? (
                <TouchableOpacity style={styles.toolTip} onPress={() => Alert.alert(`${tooltip}`)}>
                  <IconReplacer iconName={'infoSimple'} iconSize={16} />
                </TouchableOpacity>
              ) : null}
              {verifed ? (
                <TouchableOpacity onPress={editFunction} style={styles.editIconStyle}>
                  <RNImage style={styles.imgStyle} source={require('@/assets/images/business/verify.png')} />
                </TouchableOpacity>
              ) : null}
            </RNView>
            {sublable ? <RNText style={styles.subtile}>{sublable}</RNText> : null}
          </RNView>
        </RNView>
        {editBtn ? (
          <RNView style={styles.viewEditstyle}>
            {editIcon ? (
              <TouchableOpacity onPress={editFunction} style={styles.editIconStyle}>
                <RNImage style={styles.imgStyle} source={require('@/assets/images/business/pencil.png')} />
              </TouchableOpacity>
            ) : (
              <RNText style={styles.editTextStyle} onPress={editFunction}>
                Edit
              </RNText>
            )}
          </RNView>
        ) : null}
      </RNView>
    </RNView>
  );
};

export default DetailSectionPart;
