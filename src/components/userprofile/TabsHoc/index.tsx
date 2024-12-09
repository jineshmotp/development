import React from 'react';
import { TouchableOpacity } from 'react-native';

import PersonalInfoCard from '../PersonalInfoCard';

const TabsHoc = ({ isButton, Components, ...restProps }: any) => {
  return (
    <TouchableOpacity {...restProps}>
      <PersonalInfoCard {...restProps} />
    </TouchableOpacity>
  );
};

export default TabsHoc;
