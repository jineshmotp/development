import React, { useEffect, useState } from 'react';
import { Switch, TouchableOpacity } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

import dayjs from 'dayjs';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';
import { ColorTheme } from '@/theme';

type Props = {
  closingTime?: Date | any;
  openingTime?: Date | any;
  holiday?: 'open' | 'close';
  onchangeHoliday?: any;
  day?: string;
  disableToggle?: boolean;
  onChangeClosingTime?: any;
  onChangeOpeningTime?: any;
};
const OperationTimeRow: React.FC<Props> = ({ closingTime, openingTime, holiday = 'open', onchangeHoliday, day, disableToggle, onChangeClosingTime, onChangeOpeningTime }) => {

  const customParseFormat = require('dayjs/plugin/customParseFormat')
  dayjs.extend(customParseFormat)

  //here p is parse time as date  and r is for rendering as text
  const parseRenderTime = (time: string | Date, mode: 'p' | 'r') => {
    if (dayjs(time).isValid()) {
      return mode === 'r' ? dayjs(time).format('h:mm A') : dayjs(time);
    } else if (dayjs(time, 'h:mm A', true) !== null) {
      return mode === 'r' ? dayjs(time, 'h:mm A', true).format('h:mm A') : dayjs(time, 'h:mm A', true);
    } else {
      return mode === 'r' ? dayjs().format('h:mm A') : dayjs().toDate();
    }
  }

  //it has two keys o for open time and c for close time
  const [toogleDatePicker, setToogleDatePicker] = useState<string>('');

  const handleSwitchfn = val => {
    onchangeHoliday(val ? 'close' : 'open');
  };

  useEffect(() => {
    if (onChangeOpeningTime) {
      onChangeOpeningTime(parseRenderTime(openingTime || new Date(), 'r'))
      onChangeClosingTime(parseRenderTime(closingTime || new Date(), 'r'))
    }
  }, [])

  let switchBool = (holiday !== 'open');
  return (
    <>
      <RNView style={styles.oneRow}>
        <RNText style={styles.timeText}>{day}</RNText>
        <RNView style={styles.switchmain}>
          <Switch
            thumbColor={switchBool ? ColorTheme.primary : ColorTheme.white}
            trackColor={{ false: ColorTheme.primary, true: ColorTheme.placeholderColor }}
            value={switchBool}
            disabled={disableToggle}
            onValueChange={value => {
              handleSwitchfn(value);
            }}
          />
          <RNText style={!switchBool ? styles.enableTimeText : styles.disableTimeText} >{switchBool ? 'Closed' : 'Open'}</RNText>
        </RNView>
        <RNView style={styles.timeView}>
          <TouchableOpacity
            style={styles.oneTime}
            disabled={switchBool}
            onPress={() => setToogleDatePicker('o')}>
            <RNText style={!switchBool ? styles.enableTimeText : styles.disableTimeText}>{parseRenderTime(openingTime, 'r').toString()}</RNText>
          </TouchableOpacity>
          <RNText style={!switchBool ? styles.enableTimeText : styles.disableTimeText}>to</RNText>
          <TouchableOpacity
            style={styles.oneTime}
            disabled={switchBool}
            onPress={() => setToogleDatePicker('c')}>
            <RNText style={!switchBool ? styles.enableTimeText : styles.disableTimeText}>{parseRenderTime(closingTime, 'r').toString()}</RNText>
          </TouchableOpacity>
        </RNView>
      </RNView>
      <DateTimePickerModal
        isVisible={toogleDatePicker === 'o'}
        mode="time"
        date={new Date(parseRenderTime(openingTime, 'p').toString())}
        onConfirm={date => {
          onChangeOpeningTime(parseRenderTime(date, 'p'));
          setToogleDatePicker('');
        }}
        onCancel={() => setToogleDatePicker('')}
      />
      <DateTimePickerModal
        isVisible={toogleDatePicker === 'c'}
        mode="time"
        date={new Date(parseRenderTime(closingTime, 'p').toString())}
        onConfirm={date => {
          onChangeClosingTime(parseRenderTime(date, 'p'));
          setToogleDatePicker('');
        }}
        onCancel={() => setToogleDatePicker('')}
      />
    </>
  );
};

export default OperationTimeRow;
