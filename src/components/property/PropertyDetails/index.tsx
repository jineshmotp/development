import React from 'react';

import Divider from '@/components/common/Divider';
import SpecChip from '@/components/property/SpecChip';
import { areaunitremoveunder } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import '@/custom/RNView';
import RNView from '@/custom/RNView';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
}

const PropertyDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  const getPropertyAreaDescription = details => {
    let description = '';
    if (details?.property_area) {
      description += `${details.property_area} `;
    }
    if (details?.property_area_max) {
      description += `- ${details.property_area_max} `;
    }
    if (details?.property_area_units) {
      description += `${areaunitremoveunder(details.property_area_units)}`;
    }
    return description.trim(); // To remove any trailing spaces
  };

  return (
    <RNView>
      {details?.iwant !== 'Coliving' ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Property Details</RNText>
            </RNView>

            <RNView style={styles.sectionView}>
              {details?.bhk !== '' && details?.bhk !== undefined ? (
                <SpecChip label={'Rooms'} description={details?.bhk ? `${details?.bhk}` : 'N/A'} />
              ) : null}

              {details?.pooja_rooms !== false && details?.pooja_rooms !== undefined ? (
                <SpecChip label={'Pooja Rooms'} description={details?.pooja_rooms ? `YES` : 'N/A'} />
              ) : null}

              {details?.servant_rooms !== false && details?.servant_rooms !== undefined ? (
                <SpecChip label={'Servant Rooms'} description={details?.servant_rooms ? `YES` : 'N/A'} />
              ) : null}

              {details?.study_rooms !== false && details?.study_rooms !== undefined ? (
                <SpecChip label={'Study Rooms'} description={details?.study_rooms ? `YES` : 'N/A'} />
              ) : null}

              {details?.store_rooms !== false && details?.store_rooms !== undefined ? (
                <SpecChip label={'Store Rooms'} description={details?.store_rooms ? `YES` : 'N/A'} />
              ) : null}

              {details?.bathrooms !== '' && details?.bathrooms !== undefined ? (
                <SpecChip label={'Bathrooms'} description={details?.bathrooms ? `${details?.bathrooms}` : 'N/A'} />
              ) : null}

              {details?.balconies !== '' && details?.balconies !== undefined ? (
                <SpecChip label={'Balconies'} description={details?.balconies ? `${details?.balconies}` : 'N/A'} />
              ) : null}

              {details?.washroom !== '' && details?.washroom !== undefined ? (
                <SpecChip label={'Washroom'} description={details?.washroom ? `${details?.washroom}` : 'N/A'} />
              ) : null}

              {details?.is_multi_level !== false && details?.is_multi_level !== undefined ? (
                <SpecChip label={'Multilevel'} description={details?.is_multi_level ? `YES` : 'N/A'} />
              ) : null}

              {details?.level_count !== null && details?.level_count !== undefined && details?.level_count !== '' ? (
                <SpecChip
                  label={'Level count'}
                  description={details?.level_count ? `${details?.level_count}` : 'N/A'}
                />
              ) : null}

              {details?.total_units_of_floors !== null &&
              details?.total_units_of_floors !== undefined &&
              details?.total_units_of_floors !== '' ? (
                <SpecChip
                  label={'Total units of floors'}
                  description={details?.total_units_of_floors ? `${details?.total_units_of_floors}` : 'N/A'}
                />
              ) : null}

              {details?.total_rooms_on_level !== null &&
              details?.total_rooms_on_level !== undefined &&
              details?.total_rooms_on_level !== '' ? (
                <SpecChip
                  label={'Total Rooms on level'}
                  description={details?.total_rooms_on_level ? `${details?.total_rooms_on_level}` : 'N/A'}
                />
              ) : null}

              {details?.kitchen_area_available !== false && details?.kitchen_area_available !== undefined ? (
                <SpecChip
                  label={'kitchen area available'}
                  description={details?.kitchen_area_available ? `YES` : 'N/A'}
                />
              ) : null}

              {details?.dining_area_available !== false && details?.dining_area_available !== undefined ? (
                <SpecChip
                  label={'Dining area available'}
                  description={details?.dining_area_available ? `YES` : 'N/A'}
                />
              ) : null}

              {details?.conference_hall_available !== false && details?.conference_hall_available !== undefined ? (
                <SpecChip
                  label={'Conference Hall Available'}
                  description={details?.conference_hall_available ? `YES` : 'N/A'}
                />
              ) : null}

              {details?.conference_hall_count !== null &&
              details?.conference_hall_count !== undefined &&
              details?.conference_hall_count !== 0 &&
              details?.conference_hall_count !== '' ? (
                <SpecChip
                  label={'Conference Hall Count'}
                  description={details?.conference_hall_count ? `${details?.conference_hall_count}` : 'N/A'}
                />
              ) : null}

              {details?.private_cabin_available !== false && details?.private_cabin_available !== undefined ? (
                <SpecChip
                  label={'Private Cabin Available'}
                  description={details?.private_cabin_available ? `YES` : 'N/A'}
                />
              ) : null}

              {details?.private_cabin_count !== null &&
              details?.private_cabin_count !== undefined &&
              details?.private_cabin_count !== 0 &&
              details?.private_cabin_count !== '' ? (
                <SpecChip
                  label={'Private Cabin Count'}
                  description={details?.private_cabin_count ? `${details?.private_cabin_count}` : 'N/A'}
                />
              ) : null}

              {details?.pantry !== false && details?.pantry !== undefined ? (
                <SpecChip label={'Pantry Available'} description={details?.pantry ? `YES` : 'N/A'} />
              ) : null}

              {details?.borewell !== false && details?.borewell !== undefined ? (
                <SpecChip label={'Borewell Available'} description={details?.pantry ? `YES` : 'N/A'} />
              ) : null}

              {details?.corner_property !== false && details?.corner_property !== undefined ? (
                <SpecChip label={'Corner Property'} description={details?.pantry ? `YES` : 'N/A'} />
              ) : null}

              {details?.boundary_fencing !== false && details?.boundary_fencing !== undefined ? (
                <SpecChip label={'Boundary Fencing'} description={details?.boundary_fencing ? `YES` : 'N/A'} />
              ) : null}

              {details?.front_facing_road_width !== null &&
              details?.front_facing_road_width !== undefined &&
              details?.front_facing_road_width !== 0 &&
              details?.front_facing_road_width !== '' ? (
                <SpecChip
                  label={'Front Facing Road Width'}
                  description={
                    details?.front_facing_road_width
                      ? `${details?.front_facing_road_width} - ${details?.front_facing_road_width_unit}`
                      : 'N/A'
                  }
                />
              ) : null}

              {details?.side_facing_road_width !== null &&
              details?.side_facing_road_width !== undefined &&
              details?.side_facing_road_width !== 0 &&
              details?.side_facing_road_width !== '' ? (
                <SpecChip
                  label={'Side Facing Road Width'}
                  description={
                    details?.side_facing_road_width
                      ? `${details?.side_facing_road_width} - ${details?.side_facing_road_width_unit}`
                      : 'N/A'
                  }
                />
              ) : null}
              <Divider
                borderColor="#D9D6D6"
                dividerWidth={deviceWidth}
                style={{
                  marginVertical: 10,
                }}
              />
            </RNView>
          </RNView>
        </>
      ) : null}

      {details?.iwant !== 'Coliving' ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Specifications</RNText>
            </RNView>

            <RNView
              style={{
                marginTop: 10,
                flexDirection: 'column',
                gap: 5,
              }}>
              {details?.property_area ? (
                <SpecChip label="Property Area" description={getPropertyAreaDescription(details)} />
              ) : null}

              {details?.carpet_area !== null &&
              details?.carpet_area !== '' &&
              details?.carpet_area !== 0 &&
              details?.carpet_area !== undefined ? (
                <SpecChip
                  label={'Carpet Area'}
                  description={
                    details?.carpet_area
                      ? `${details?.carpet_area} ${areaunitremoveunder(details?.carpet_area_units)}`
                      : 'N/A'
                  }
                />
              ) : null}

              {details?.undivided_share !== null &&
              details?.undivided_share !== '' &&
              details?.undivided_share !== 0 &&
              details?.undivided_share !== undefined ? (
                <SpecChip
                  label={'Undivided Share'}
                  description={
                    details?.undivided_share
                      ? `${details?.undivided_share} ${areaunitremoveunder(details?.undivided_share_units)}`
                      : 'N/A'
                  }
                />
              ) : null}

              {details?.total_floors ? (
                <SpecChip label={'Total Floor'} description={details?.total_floors || 'N/A'} />
              ) : null}

              {details?.no_of_units ? (
                <SpecChip label={'No of units'} description={details?.no_of_units || 'N/A'} />
              ) : null}

              {details?.floor_no ? <SpecChip label={'Floor'} description={details?.floor_no || 'N/A'} /> : null}

              {details?.property_age ? (
                <SpecChip
                  label={'Age of property'}
                  description={
                    details?.property_age !== 'Less than a year' ? `${details?.property_age}yrs` : 'Less than a year'
                  }
                />
              ) : null}
            </RNView>
          </RNView>
          <Divider
            borderColor="#D9D6D6"
            dividerWidth={deviceWidth}
            style={{
              marginVertical: 10,
            }}
          />
        </>
      ) : null}
    </RNView>
  );
};

export default PropertyDetails;
