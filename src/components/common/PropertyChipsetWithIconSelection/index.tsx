import React from 'react';

import Divider from '@/components/common/Divider';
import SectionHoc from '@/components/common/SectionHoc';
import PropertyCategoryChipsWithIconCheckbox from '@/components/property/PropertyCategoryChipsWithIconCheckbox';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

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

const PropertyChipsetSelection: React.FC<ProptypeDetailsProps> = ({
  control,
  data,
  controlConstraints,
  sectioname,
  errors,
  setDetails,
  details,
  activefunction,
  mandatory,
}) => {
  return (
    <RNView style={styles.container}>
      <SectionHoc title={sectioname} mandatory={mandatory}>
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
      </SectionHoc>

      <RNView style={styles.containerDivider}>
        <Divider
          borderColor="#D9D6D6"
          style={{
            marginTop: px(20),
            gap: px(10),
          }}
        />
      </RNView>
    </RNView>
  );
};

export default PropertyChipsetSelection;
