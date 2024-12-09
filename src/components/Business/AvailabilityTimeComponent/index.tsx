import React, { memo, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { style } from '@/components/common/Loader/styles';
import { available_days, available_times } from '@/constants/function/business.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import { styles } from './styles';

interface IncrementDecrementProp {
  key?: any;
  dayvalue?: any;
  styleChanges?: any;
  available?: boolean;
  onUpdate?: any;
  onUpdateavailable?: any;
  TimeValue?: any;
}
const AvailabilityTimeComponent: React.FC<IncrementDecrementProp> = ({
  dayvalue,
  styleChanges,
  available,
  onUpdate,
  onUpdateavailable,
  TimeValue,
}) => {
  const [timefrom, setTimeFrom] = useState(available_times);

  const [isDayFromFocus, setDayFromFocus] = useState(false);
  const [dayFromValue, setDayFromValue] = useState('');

  const [timeto, setTimeTo] = useState(available_times);

  const [isDayToFocus, setDayToFocus] = useState(false);
  const [dayToValue, setDayToValue] = useState('');

  const handleFromTimeChange = selectedTime => {
    // console.log(' se;ected timing-->', selectedTime);

    setDayFromValue(selectedTime.label);

    const filteredToTimes = available_times.filter(time => {
      const selectedHour = parseInt(selectedTime.label.split(' ')[0]);
      const selectedPeriod = selectedTime.label.split(' ')[1]; // Split the selected time correctly
      const timeHour = parseInt(time.label.split(' ')[0]);
      const timePeriod = time.label.split(' ')[1];

      // Exclude "12 PM" if any time from "1 PM" to "6 PM" is selected
      if (selectedPeriod === 'PM' && selectedHour >= 1 && selectedHour <= 6 && time.label === '12 PM') {
        return false;
      }

      // Check if the time is greater based on AM/PM and hour comparison
      if (selectedPeriod === timePeriod) {
        return timeHour > selectedHour || (selectedHour === 12 && selectedPeriod === 'PM' && timeHour < 12);
      } else {
        return timePeriod === 'PM'; // Only PM times are greater if selected is AM
      }
    });

    setTimeTo(filteredToTimes);

    // Reset "to" time if it was set to a time that is now filtered out
    if (filteredToTimes.every(time => time.label !== dayToValue)) {
      setDayToValue('');
    }

    // console.log('from time value -->', selectedTime.label);
    // console.log('to  time value -->', dayToValue);

    // Assuming `onUpdate` is a function passed via props
    onUpdate({
      start_time: selectedTime.label,
      close_time: dayToValue, // Pass the current value of `dayToValue` as close_time
      slot: 0, // Or any other logic you want to use for the slot
    });
  };

  const handleToTimeChange = (item: any) => {
    setDayToValue(item.label);

    // console.log('from time value -->', dayFromValue);
    // console.log('to  time value -->', item);

    onUpdate({
      start_time: dayFromValue,
      close_time: item.label, // Pass the current value of `dayToValue` as close_time
      slot: 0, // Or any other logic you want to use for the slot
    });
  };

  const handleActiveChange = () => {
    if (onUpdateavailable) {
      onUpdateavailable(dayvalue);
    }
  };

  useEffect(() => {
    // console.log(' Time value -->', TimeValue);

    if (available === false) {
      // console.log(' available value --->', available);

      onUpdate({
        start_time: '',
        close_time: '', // Pass the current value of `dayToValue` as close_time
        slot: 0, // Or any other logic you want to use for the slot
      });

      setDayFromValue('');
      setDayToValue('');
    } else {
      // console.log(' timing value-->', TimeValue);

      setDayFromValue(TimeValue[0].start_time);

      let timingval = {
        _index: 0,
        active: false,
        label: TimeValue[0].start_time,
      };

      // handleFromTimeChange(timingval);
      setDayToValue(TimeValue[0].close_time);
    }
  }, [available]);

  return (
    <RNView style={[styles.container, styleChanges]}>
      <RNView style={[styles.cardViewRow]}>
        <RNView style={styles.cardViewLeftView}>
          <RNView style={styles.daystyle}>
            <RNText style={styles.dayTextStyle}>{dayvalue}</RNText>
          </RNView>
        </RNView>

        <RNView style={styles.cardViewCenterView}></RNView>

        {available ? (
          <RNView
            style={[
              styles.cardViewRightView,
              { justifyContent: 'center', alignItems: 'flex-end', alignContent: 'center' },
            ]}>
            <TouchableOpacity style={styles.OpenContainer} onPress={handleActiveChange}>
              <RNView style={styles.OpenViewLeft}>
                <RNText style={styles.opencloseText}>Open</RNText>
              </RNView>

              <RNView style={styles.OpenViewRight}>
                <RNView style={[styles.colorStyle]} />
              </RNView>
            </TouchableOpacity>
          </RNView>
        ) : (
          <RNView
            style={[
              styles.cardViewRightView,
              { justifyContent: 'center', alignItems: 'flex-end', alignContent: 'center' },
            ]}>
            <TouchableOpacity style={styles.OpenContainerClose} onPress={handleActiveChange}>
              <RNView style={styles.OpenViewLeft}>
                <RNView style={[styles.colorStyle, { backgroundColor: '#333333', borderColor: '#333333' }]} />
              </RNView>

              <RNView style={styles.OpenViewRight}>
                <RNText style={styles.opencloseText}>Close</RNText>
              </RNView>
            </TouchableOpacity>
          </RNView>
        )}
      </RNView>

      <RNView style={[styles.cardViewRow, { marginTop: px(20) }]}>
        <RNView style={styles.cardViewLeftView}>
          <Dropdown
            style={[styles.dropdown, isDayFromFocus && { borderColor: ColorTheme.primaryColor }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={timefrom}
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder={!isDayFromFocus ? 'Starting Time' : 'Starting Time'}
            value={dayFromValue}
            onFocus={() => setDayFromFocus(true)}
            onBlur={() => setDayFromFocus(false)}
            onChange={item => {
              handleFromTimeChange(item);
              setDayFromFocus(false);
            }}
            disable={!available}
          />
        </RNView>
        <RNView style={styles.cardViewCenterView}>
          <RNText style={styles.dayToText}>To</RNText>
        </RNView>

        <RNView style={styles.cardViewRightView}>
          <Dropdown
            style={[styles.dropdown, isDayToFocus && { borderColor: ColorTheme.primaryColor }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={timeto}
            maxHeight={300}
            labelField="label"
            valueField="label"
            placeholder={!isDayToFocus ? 'Ending Time' : 'Ending Time'}
            value={dayToValue}
            onFocus={() => setDayToFocus(true)}
            onBlur={() => setDayToFocus(false)}
            onChange={item => {
              handleToTimeChange(item);
              setDayToFocus(false);
            }}
            disable={!available}
          />
        </RNView>
      </RNView>
    </RNView>
  );
};

export default memo(AvailabilityTimeComponent);
