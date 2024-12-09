import React, { useEffect, useRef } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';

import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  code?: string;
  setCode?: any;
};
const OTPInputField: React.FC<Props> = ({ code, setCode }): React.ReactNode => {
  const inputRef = useRef();
  const handleOTPString = (text: string) => {
    if (text.length > 0) {
      if (text.length === 1) {
        return [text, '', '', '', '', ''];
      } else if (text.length === 2) {
        return [text[0], text[1], '', '', '', ''];
      } else if (text.length === 3) {
        return [text[0], text[1], text[2], '', '', ''];
      } else if (text.length === 4) {
        return [text[0], text[1], text[2], text[3], '', ''];
      } else if (text.length === 5) {
        return [text[0], text[1], text[2], text[3], text[4], ''];
      } else {
        return [text[0], text[1], text[2], text[3], text[4], text[5]];
      }
    } else {
      return ['', '', '', '', '', ''];
    }
  };
  //   const handleTextInput = (t: string, ind: number) => {
  //     let temp = handleOTPString(code).map((itm, index) => {
  //       if (ind === index) {
  //         return (itm = t);
  //       }
  //       return itm;
  //     });
  //     setCode(temp);
  //   };
  const focusKeyBoard = () => {
    if (inputRef) {
      inputRef?.current?.focus();
    }
  };
  useEffect(() => {
    focusKeyBoard();
  }, []);

  return (
    <RNView style={styles.container}>
      <TouchableOpacity onPress={focusKeyBoard} activeOpacity={1}>
        <RNView style={styles.main}>
          {handleOTPString(code).map((item, ind) => {
            return (
              <TextInput
                key={ind}
                value={item}
                //   onChangeText={(t) => handleTextInput(t, ind)}
                maxLength={1}
                keyboardType="numeric"
                style={styles.inputStyle}
                editable={false}
                textContentType="password"
                focusable={false}
                // ref={input1}
              />
            );
          })}
          <RNView style={styles.emptySpace}></RNView>
        </RNView>
      </TouchableOpacity>
      <TextInput
        value={code}
        onChangeText={t => setCode(t)}
        // cursorColor={'white'}
        cursorColor={'#ffffff'}
        selectionColor={'#ffffff'}
        style={styles.blankInput}
        ref={inputRef}
        maxLength={6}
        keyboardType="numeric"
      />
    </RNView>
  );
};

export default OTPInputField;
