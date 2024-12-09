import React from 'react';

import Divider from '@/components/common/Divider';
import SpecChip from '@/components/property/SpecChip';
import { areaunitremoveunder, formatNumberWithComma } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
  goBack?: () => void;
}

const PropertyPriceDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  const getPropertyPriceDescription = details => {
    let description = '';
    if (details?.property_price) {
      description += `${formatNumberWithComma(details.property_price)} `;
    }
    if (details?.property_price_max) {
      description += `- ${formatNumberWithComma(details.property_price_max)} `;
    }

    return description.trim(); // To remove any trailing spaces
  };

  const getPropertyPriceSqftDescription = details => {
    let description = '';
    if (details?.property_price_per_unit) {
      description += `${formatNumberWithComma(details.property_price_per_unit)} `;
    }
    if (details?.property_price_per_unit_max) {
      description += `- ${formatNumberWithComma(details.property_price_per_unit_max)} `;
    }

    description += `${areaunitremoveunder(details.property_area_units)}`;

    return description.trim(); // To remove any trailing spaces
  };

  return (
    <RNView>
      {details?.iwant === 'Sell' ? (
        <>
          <RNView
            style={{
              width: deviceWidth / 1.09,
              alignSelf: 'center',
            }}>
            <RNView>
              <RNText style={styles.selectionHeader}>Amount Details</RNText>
            </RNView>

            <RNView
              style={{
                marginTop: 10,
                flexDirection: 'column',
                gap: 5,
              }}>
              <SpecChip label={'Property Price'} description={getPropertyPriceDescription(details)} />

              <SpecChip label={'Price per sqft'} description={getPropertyPriceSqftDescription(details)} />

              {details?.maintenance_price !== null &&
              details?.maintenance_price !== 0 &&
              details?.maintenance_price !== '' &&
              details?.maintenance_price !== undefined ? (
                <SpecChip label={'Maintenance Price'} description={formatNumberWithComma(details?.maintenance_price)} />
              ) : null}

              {details?.token_amount !== null &&
              details?.token_amount !== 0 &&
              details?.token_amount !== '' &&
              details?.token_amount !== undefined ? (
                <SpecChip label={'Token Amount'} description={formatNumberWithComma(details?.token_amount)} />
              ) : null}

              {details?.is_price_negotiable !== false ? (
                <SpecChip label={'Is Price negotiable'} description={details?.is_price_negotiable ? `YES` : 'N/A'} />
              ) : null}

              {details?.is_currently_under_loan !== false ? (
                <SpecChip
                  label={'Currently underloan ?'}
                  description={details?.is_currently_under_loan ? `YES` : 'N/A'}
                />
              ) : null}

              {details?.is_all_inclusive_price !== false ? (
                <SpecChip
                  label={'All inclusive Price ?'}
                  description={details?.is_all_inclusive_price ? `YES` : 'N/A'}
                />
              ) : null}

              {details?.is_annual_dues_paid !== false ? (
                <SpecChip label={'Annual Dues Paid ?'} description={details?.is_annual_dues_paid ? `YES` : 'N/A'} />
              ) : null}

              {details?.is_tax_excluded !== false ? (
                <SpecChip label={'Tax excluded ?'} description={details?.is_tax_excluded ? `YES` : 'N/A'} />
              ) : null}
            </RNView>
          </RNView>
        </>
      ) : null}

      {details?.iwant !== 'Sell' ? (
        <>
          <RNView
            style={{
              width: deviceWidth / 1.09,
              alignSelf: 'center',
            }}>
            <RNView>
              <RNText style={styles.selectionHeader}>Amount Details</RNText>
            </RNView>

            <RNView
              style={{
                marginTop: 10,
                flexDirection: 'column',
                gap: 5,
              }}>
              <SpecChip
                label={'Rent Amount'}
                description={details?.rent_amount ? `${formatNumberWithComma(details?.rent_amount)}` : 'N/A'}
              />

              {details?.rented_time ? (
                <SpecChip
                  label={'Rented Time'}
                  description={details?.rented_time ? `${formatNumberWithComma(details?.rented_time)}` : 'N/A'}
                />
              ) : null}

              {details?.token_amount ? (
                <SpecChip
                  label={'Token Amount'}
                  description={details?.token_amount ? `${formatNumberWithComma(details?.token_amount)}` : 'N/A'}
                />
              ) : null}

              {details?.token_amount_of_duration ? (
                <SpecChip
                  label={'Token Amount Duration'}
                  description={
                    details?.token_amount_of_duration ? `${details?.token_amount_of_duration} Months` : 'N/A'
                  }
                />
              ) : null}

              {details?.include_power_bill_charges !== false ? (
                <SpecChip
                  label={'Included Power Bill Charges'}
                  description={details?.include_power_bill_charges ? `YES` : 'N/A'}
                />
              ) : null}

              {details?.include_water_bill_charges !== false ? (
                <SpecChip
                  label={'Include Water Bill Charges'}
                  description={details?.include_water_bill_charges ? `YES` : 'N/A'}
                />
              ) : null}
            </RNView>
          </RNView>
        </>
      ) : null}

      {details?.is_rent_agreement === true || details?.is_notice_period === true ? (
        <>
          <RNView style={styles.containerViewStyle}>
            <RNView>
              <RNText style={styles.selectionHeader}>Agrement Details</RNText>
            </RNView>

            <RNView
              style={{
                marginTop: 10,
                flexDirection: 'column',
                gap: 5,
              }}>
              <SpecChip
                label={'Rent Agrement'}
                description={details?.is_rent_agreement ? `Yes - ${details?.agreement_duration_month} Months` : 'No'}
              />

              <SpecChip
                label={'Notice Period'}
                description={details?.is_notice_period ? `Yes - ${details?.notice_duration_month} Months` : 'No'}
              />
            </RNView>
          </RNView>
        </>
      ) : null}

      <Divider
        borderColor="#D9D6D6"
        dividerWidth={deviceWidth}
        style={{
          marginVertical: 10,
        }}
      />
    </RNView>
  );
};

export default PropertyPriceDetails;
