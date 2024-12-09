import React, { useState } from 'react';
import { useToast } from 'react-native-toast-notifications';

import { CircleIcon, Radio, RadioGroup, RadioIcon, RadioIndicator, RadioLabel, VStack } from '@gluestack-ui/themed';

import CommonButton from '@/custom/CommonButton';
import CommonInput from '@/custom/CommonInput';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { useReportPostMutation } from '@/redux/login/loginService';
import { deviceHeight, deviceWidth } from '@/utils';

import ModalWrapper from '../ModalWrapper';
import { styles } from './styles';

type ReportProps = {
  visible?: boolean;
  setIsVisible?: () => void;
  postId?: string;
  setHidePropertyUI?: (val) => void;
  postType?: string;
};

const ReportCard: React.FC<ReportProps> = ({ visible, setIsVisible, postId, setHidePropertyUI, postType }) => {
  const toast = useToast();
  const userData = useAppSelector(getUserData);
  const [values, setValues] = useState<string>('');
  const [text, setText] = useState<string>('');
  const [reportPostMutation, { isLoading }] = useReportPostMutation();
  const handleReport = () => {
    const payload = {
      user: userData?._id,
      property: postId,
      report_reason: values,
      type: postType,
    };
    payload['report_reason_description'] = text ? text : null;
    // console.log('payload++++++++++', payload);
    if (postId) {
      reportPostMutation(payload).then(response => {
        // console.log('resposn+++++++++', response);
        if (response?.data?.status) {
          setIsVisible();
          setHidePropertyUI(true);
        } else {
          if (!response?.error?.status) {
            // console.log('sdbhjbdsjhvbhjds', response?.error?.message);
            toast.show(response?.error?.message, {
              type: 'error_toast',
              animationDuration: 100,
              data: {
                title: 'Please try once',
              },
              duration: 3000,
            });
          }
        }
      });
    }
  };
  return (
    <ModalWrapper visible={visible} onClose={() => setIsVisible()} header={false} modalHeight={deviceHeight / 2}>
      <RNView style={styles.topView}>
        <RNView style={styles.headView}>
          <RNText style={styles.headText}>Please select the reason</RNText>
        </RNView>

        <RNView style={styles.containerView}>
          <RadioGroup value={values} onChange={setValues} width={deviceWidth - 40}>
            <VStack space="lg" size="lg" width={deviceWidth - 40} marginBottom={10}>
              <Radio
                value="Misleading Information"
                justifyContent="flex-start"
                width={deviceWidth - 40}
                size="sm"
                marginVertical={-5}>
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Misleading Information</RadioLabel>
              </Radio>
              <Radio
                value="Spam or Fraudulent"
                justifyContent="flex-start"
                width={deviceWidth - 40}
                size="sm"
                marginVertical={-5}>
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Spam or Fraudulent</RadioLabel>
              </Radio>
              <Radio
                value="Inappropriate Content"
                justifyContent="flex-start"
                width={deviceWidth - 40}
                size="sm"
                marginVertical={-5}>
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Inappropriate Content</RadioLabel>
              </Radio>
              <Radio
                value="Policy Violation"
                justifyContent="flex-start"
                width={deviceWidth - 40}
                size="sm"
                marginVertical={-5}>
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Policy Violation</RadioLabel>
              </Radio>
              <Radio
                value="Other"
                justifyContent="flex-start"
                width={`${deviceWidth - 40}`}
                size="sm"
                marginVertical={-5}>
                <RadioIndicator mr="$2">
                  <RadioIcon as={CircleIcon} />
                </RadioIndicator>
                <RadioLabel>Other</RadioLabel>
              </Radio>
            </VStack>
          </RadioGroup>
        </RNView>
        <CommonInput
          maxLength={300}
          multiline={true}
          contentStyle={{ textTransform: 'lowercase' }}
          style={styles.textArea}
          numberOfLines={5}
          value={text}
          onChangeText={t => setText(t)}
          placeholder="Description"
          label="Description"
        />
      </RNView>
      <RNView style={styles.mainBtn}>
        <CommonButton
          disabled={isLoading || !values}
          onPress={() => handleReport()}
          loaderColor="black"
          loading={isLoading}
          title="Report"
          style={isLoading || !values ? styles.btnSaveStyle1 : styles.btnSaveStyle}
          textStyle={styles.btntext}
        />
        <CommonButton
          onPress={() => setIsVisible()}
          title="Cancel"
          style={styles.btnCancelStyle}
          textStyle={styles.textStyle}
        />
      </RNView>
    </ModalWrapper>
  );
};

export default React.memo(ReportCard);
