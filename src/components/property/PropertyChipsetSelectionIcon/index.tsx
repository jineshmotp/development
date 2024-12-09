import React from 'react';
import { useController } from 'react-hook-form';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Divider from '@/components/common/Divider';
import PropertyCategoryChips from '@/components/common/PropertyCategoryChips';
import SectionHoc from '@/components/common/SectionHoc';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

import { styles } from './styles';

interface ProptypeDetailsProps {
  setDetails: any;

  sectioname?: string;
  details: any;
  control: any;
  controlConstraints: any;
  errors: any;
  activefunction: any;
}

const PropertyChipsetSelectionIcon: React.FC<ProptypeDetailsProps> = ({
  control,

  controlConstraints,
  sectioname,
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
        <SectionHoc title={sectioname} mandatory={true}>
          <RNView style={styles.sectionView}>
            <PropertyCategoryChips
              item={{
                label: details.ready_for_possession_by ? details.ready_for_possession_by : 'Available From',
              }}
              onPress={() => {
                activefunction();
                propertytypeField.onChange();
              }}
              rightIcon={<AntDesign name="calendar" size={20} color="gray" />}
            />
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

export default PropertyChipsetSelectionIcon;
