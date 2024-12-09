import React from 'react';
import { useController } from 'react-hook-form';

import Divider from '@/components/common/Divider';
import PropertyCategoryChips from '@/components/common/PropertyCategoryChips';
import SectionHoc from '@/components/common/SectionHoc';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

import { styles } from './styles';

interface ProptypeDetailsProps {
  setDetails?: any;
  data?: any[];
  mandatory?: Boolean;
  sectioname?: string;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
  activefunction?: any;
}

const PropertyChipsetSelection: React.FC<ProptypeDetailsProps> = ({
  control,
  data,
  controlConstraints,
  sectioname,
  mandatory,
  errors,
  setDetails,
  details,
  activefunction,
}) => {
  const { field: propertytypeField } = useController({
    name: 'property_type',
    control,
    defaultValue: '',
    rules: controlConstraints.property_type, // Apply constraints for fname
  });

  return (
    <RNView>
      <RNView style={styles.container}>
        <SectionHoc title={sectioname} mandatory={mandatory}>
          <RNView style={styles.sectionView}>
            {data.map((item: any, i) => {
              return (
                <PropertyCategoryChips
                  item={item}
                  key={i}
                  // selected={details.iwant === item.label}
                  onPress={() => {
                    activefunction(item, item.child);
                    propertytypeField.onChange(item.label);
                  }}
                />
              );
            })}
          </RNView>
        </SectionHoc>
      </RNView>

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
