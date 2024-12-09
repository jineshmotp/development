import React from 'react';

import PropertyCategoryChipsWithIconCheckbox from '@/components/property/PropertyCategoryChipsWithIconCheckbox';
import RNView from '@/custom/RNView';

import { styles } from './styles';

interface ProptypeDetailsProps {
  setDetails?: any;
  data?: any[];
  sectioname?: string;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
  activefunction?: any;
  mandatory?: boolean;
}

const PropertyChipsetSelectionNormal: React.FC<ProptypeDetailsProps> = ({ data, activefunction }) => {
  return (
    <RNView>
      <RNView style={styles.sectionView}>
        {data.map((item: any, i) => {
          return (
            <PropertyCategoryChipsWithIconCheckbox
              item={item}
              key={i}
              // selected={details.iwant === item.label}
              onPress={() => {
                activefunction(item);
              }}
              checked={item.active}
            />
          );
        })}
      </RNView>
    </RNView>
  );
};

export default PropertyChipsetSelectionNormal;
