import React, { useEffect, useState } from 'react';
import { Keyboard, Pressable, TouchableWithoutFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useToast } from 'react-native-toast-notifications';

import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useUpdateUserDetailsMutation } from '@/redux/login/loginService';
import { ColorTheme } from '@/theme';
import { deviceHeight, px } from '@/utils';

import { styles } from './styles';
import { RNText } from '@/custom/RNText';

type Props = {
  isVisible?: boolean;
  onPressClose?: () => void;
  text?: string;
};

const UserBioUpdate: React.FC<Props> = ({ isVisible = false, onPressClose, text }) => {
  const toast = useToast();
  const [bioData, setBioData] = useState<string>(text);
  const [updateUserDataMutation, { isLoading }] = useUpdateUserDetailsMutation();
  const state = useAppSelector(getUserData);

  useEffect(() => {
    setBioData(text);
  }, []);

  const handleUpdateBio = (bio: string) => {
    updateUserDataMutation({
      userId: state._id,
      updateDetails: {
        bio: bio,
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
  };

  return (
    <ModalWrapper visible={isVisible} onClose={onPressClose} header={true} modalHeight={deviceHeight - px(300)}>
      <HeaderBar label="Bio" backPress={onPressClose} />
      <Pressable onPress={() => Keyboard.dismiss()}>
        <RNView>
          <RNText style={styles.initialText}>Update your Bio</RNText>
          <RNView style={styles.inputView}>
            <CommonInput
              onChangeText={val => {
                setBioData(val);
              }}
              value={bioData ? bioData : ''}
              placeholder="Bio"
              placeholderColor={ColorTheme.gray2}
              containerStyle={styles.container}
              style={styles.InputStyle}
              numberOfLines={5}
              multiline={true}
              maxLength={500}
            />
          </RNView>
          <RNView style={styles.mainBtn}>
            <CommonButton
              disabled={isLoading || !bioData}
              onPress={() => handleUpdateBio(bioData)}
              loaderColor="black"
              loading={isLoading}
              title="Save"
              style={isLoading || !bioData ? styles.btnStyle2 : styles.btnStyle}
              textStyle={styles.textBtn}
            />
          </RNView>
        </RNView>
      </Pressable>
    </ModalWrapper>
  );
};

export default UserBioUpdate;
