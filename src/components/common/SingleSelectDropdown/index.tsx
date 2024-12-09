import React, { useState } from 'react';

import { Dropdown } from 'react-native-element-dropdown';
import RNView from '@/custom/RNView';

import { styles } from './styles';
import { ColorTheme } from '@/theme';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { TouchableOpacity } from 'react-native';
import { RNText } from '@/custom/RNText';

type Props = {
    data: any;
    value: any;
    onChange: any;
    onSearchTxt?: any;
    placeholder?: string;
    searchPlaceholder?: string;
};
const SingleSelectDropdown: React.FC<Props> = ({ ...props }) => {

    const {
        data = [],
        value,
        onChange,
        onSearchTxt,
        placeholder,
        searchPlaceholder
    } = props;

    return <RNView>
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            itemContainerStyle={styles.itemContainerStyle}
            search
            data={data}
            labelField="label"
            valueField="value"
            placeholder={placeholder || "Select item"}
            searchPlaceholder={searchPlaceholder || "Search..."}
            value={value}
            onChange={item => {
                onChange(item)
            }}
            onChangeText={val => {
                onSearchTxt(val)
            }}
        />
    </RNView>
};

export default SingleSelectDropdown;
