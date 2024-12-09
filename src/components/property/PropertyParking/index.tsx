import React from 'react';

import Divider from '@/components/common/Divider';
import SectionHoc from '@/components/common/SectionHoc';
import PropertyParkingComponent from '@/components/property/PropertyParkingComponent';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface PropertyAreaProps {
  setDetails?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  errors?: any;
}

const PropertyParking: React.FC<PropertyAreaProps> = ({ control, controlConstraints, errors, setDetails, details }) => {
  //#############################################################

  return (
    <RNView style={styles.container}>
      <SectionHoc title="Parking">
        <PropertyParkingComponent
          setPropertyDiscriptionDecrement={() => {
            setDetails({
              ...details,
              wheeler_4_parking: (details.wheeler_4_parking || 0) - 1,
            });
          }}
          setPropertyDiscriptionIncrement={() => {
            setDetails({
              ...details,
              wheeler_4_parking: (details.wheeler_4_parking || 0) + 1,
            });
          }}
          label={details.wheeler_4_parking}
          title="Car Parking"
        />

        <PropertyParkingComponent
          setPropertyDiscriptionDecrement={() => {
            setDetails({
              ...details,
              wheeler_2_parking: (details.wheeler_2_parking || 0) - 1,
            });
          }}
          setPropertyDiscriptionIncrement={() => {
            setDetails({
              ...details,
              wheeler_2_parking: (details.wheeler_2_parking || 0) + 1,
            });
          }}
          label={details.wheeler_2_parking}
          title="2 Wheeler Parking"
        />

        <PropertyParkingComponent
          setPropertyDiscriptionDecrement={() => {
            setDetails({
              ...details,
              visitor_parking: (details.visitor_parking || 0) - 1,
            });
          }}
          setPropertyDiscriptionIncrement={() => {
            setDetails({
              ...details,
              visitor_parking: (details.visitor_parking || 0) + 1,
            });
          }}
          label={details.visitor_parking}
          title="Visitor Parking"
        />
      </SectionHoc>

      <Divider
        borderColor="#D9D6D6"
        style={{
          marginTop: px(10),
          gap: px(10),
        }}
      />
    </RNView>
  );
};

export default PropertyParking;
