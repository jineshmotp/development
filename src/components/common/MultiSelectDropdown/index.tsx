import React, { useState } from 'react';

import { MultiSelect } from 'react-native-element-dropdown';
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
    placeholder?: string;
    searchPlaceholder?: string;
    dropdownPosition?: 'auto' | 'top' | 'bottom';
};
const MultiSelectDropdown: React.FC<Props> = ({ ...props }) => {

    const {
        data = [],
        value,
        onChange,
        placeholder,
        searchPlaceholder,
        dropdownPosition = 'auto'
    } = props;

    return <RNView>
        <MultiSelect
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
            dropdownPosition={dropdownPosition}
            onChange={item => {
                onChange(item)
            }}
            renderSelectedItem={(item, unSelect) => (
                <TouchableOpacity activeOpacity={0.6} onPress={() => unSelect && unSelect(item)}>
                    <RNView style={styles.selectedStyle}>
                        <RNText style={styles.textSelectedStyle}>{item.label}</RNText>
                        <AntDesign color="black" name="close" size={15} />
                    </RNView>
                </TouchableOpacity>
            )}
            selectedStyle={styles.selectedStyle}
        />
    </RNView>
};

export default MultiSelectDropdown;
