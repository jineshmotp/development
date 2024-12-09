import React, { useEffect, useState } from 'react';
import { useController } from 'react-hook-form';

import DropDownComponent from '@/components/common/DropDownComponent';
import Loader from '@/components/common/Loader';
import PropertyChipsetWithIconSelection from '@/components/common/PropertyChipsetWithIconSelection';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import SectionHoc from '@/components/common/SectionHoc';
import TitledCheckBox from '@/components/common/TitledCheckBox';
import PropertyLabel from '@/components/property/PropertyLabel';
import {
  formatNumberWithComma,
  propertyAreaUnits,
  propertyCarpetArea,
  rent_duration,
  token_duration_months,
} from '@/constants/function/property.helper';
import { activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import CommonInput from '@/custom/CommonInput';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceWidth, px } from '@/utils';

import { styles } from '../../../screens/Property/styles';

interface OwnerDetailsProps {
  setDetails?: any;
  details?: any;
  control?: any;
  clearErrors?: any;
  controlConstraints?: any;
  errors?: any;
  checkingData?: any;
  additioanlData?: any;
}

const BuilderListingPrice: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  clearErrors,
  checkingData,
  details,
  additioanlData,
}) => {
  const [additionalPrice, setAdditionalPrice] = useState(additioanlData);
  const [propunits, setPropUnits] = useState(propertyAreaUnits);
  const [propselectunits, setPropSelectUnits] = useState(Object.keys(propunits)[0]);
  const [rentDurationDetails, setRentDurationDetails] = useState(rent_duration);
  const [tokendurationmonth, setTokendurationMonth] = useState(token_duration_months);

  const [componentLoader, setComponentLoader] = useState(false);

  const { field: propertyunitvalueField } = useController({
    name: 'property_unit',
    control,
    defaultValue: Object.keys(propunits)[0],
    rules: controlConstraints.property_unit, // Apply constraints for fname
  });

  const { field: propertyareaField } = useController({
    name: 'property_area',
    control,
    defaultValue: details?.property_area,
    rules: controlConstraints.property_area, // Apply constraints for fname
  });

  const { field: propertyareamaxField } = useController({
    name: 'property_area_max',
    control,
    defaultValue: details?.property_area_max,
    rules: controlConstraints.property_area_max, // Apply constraints for fname
  });

  const { field: propertypriceField } = useController({
    name: 'property_price',
    control,
    defaultValue: details?.property_price,
    rules: controlConstraints.property_price, // Apply constraints for fname
  });

  const { field: propertypricemaxField } = useController({
    name: 'property_price_max',
    control,
    defaultValue: details?.property_price_max,
    rules: controlConstraints.property_price_max, // Apply constraints for fname
  });

  const { field: priceperunitField } = useController({
    name: 'property_price_per_unit',
    control,
    defaultValue: details?.property_price_per_unit,
    rules: controlConstraints.property_price_per_unit, // Apply constraints for fname
  });

  const { field: priceperunitmaxField } = useController({
    name: 'property_price_per_unit_max',
    control,
    defaultValue: details?.property_price_per_unit_max,
    rules: controlConstraints.property_price_per_unit_max, // Apply constraints for fname
  });

  const { field: tokenamountField } = useController({
    name: 'token_amount',
    control,
    defaultValue: details?.token_amount,
    rules: controlConstraints.token_amount, // Apply constraints for fname
  });

  const { field: rented_timeField } = useController({
    name: 'rented_time',
    control,
    defaultValue: details?.rented_time,
    rules: controlConstraints.rented_time, // Apply constraints for fname
  });

  const { field: rentaamountField } = useController({
    name: 'rent_amount',
    control,
    defaultValue: details?.rent_amount,
    rules: controlConstraints.rent_amount, // Apply constraints for fname
  });

  const { field: tokeamountdurationField } = useController({
    name: 'token_amount_of_duration',
    control,
    defaultValue: '',
    rules: controlConstraints.token_amount_of_duration,
  });

  //############################ Additional Price ##########################################

  const activateKeyForAdditionalPrice = (item: any) => {
    const shallowCopy = [...additionalPrice];
    const updatedArr = activateItemByKeyForMultiple(shallowCopy, item.key);
    const newFiltered = updatedArr.filter((item: any) => item.active === true);

    if (item.label === 'Price Negotiable') {
      setDetails({
        ...details,
        is_price_negotiable: !details.is_price_negotiable,
      });
    }

    if (item.label === 'Currently under Loan') {
      setDetails({
        ...details,
        is_currently_under_loan: !details.is_currently_under_loan,
      });
    }

    if (item.label === 'All inclusive price') {
      setDetails({
        ...details,
        is_all_inclusive_price: !details.is_all_inclusive_price,
      });
    }

    if (item.label === 'Annual Dues Paid') {
      setDetails({
        ...details,
        is_annual_dues_paid: !details.is_annual_dues_paid,
      });
    }

    if (item.label === 'Tax Excluded') {
      setDetails({
        ...details,
        is_tax_excluded: !details.is_tax_excluded,
      });
    }

    setAdditionalPrice(updatedArr);
  };

  //########################## Property Price / Sell ####################################

  const handleCalculatePerSqft = () => {
    const conversionFactor = propertyCarpetArea[details.property_area_units];
    const areaInSquareFeet = details.property_area * conversionFactor;

    let ratePerSquareFoot = parseInt(details.property_price) / areaInSquareFeet;

    let value = ratePerSquareFoot > 0 ? ratePerSquareFoot.toFixed(0) : 0;

    const conversionFactor_max = propertyCarpetArea[details.property_area_units];
    const areaInSquareFeet_max = details.property_area_max * conversionFactor_max;

    let ratePerSquareFoot_max = parseInt(details.property_price_max) / areaInSquareFeet_max;

    let value_max = ratePerSquareFoot_max > 0 ? ratePerSquareFoot_max.toFixed(0) : 0;

    setDetails({
      ...details,
      property_price_per_unit: value,
      property_price_per_unit_max: value_max,
    });
  };

  const handle_unitSelection = (item: any) => {
    // console.log(' unit value is ------>', item.label);

    setPropSelectUnits(item.label);

    setDetails({
      ...details,
      property_area_units: item.label,
    });

    // propertyunitvalueField.onChange(details?.property_price);
  };

  const rentduration_amount_Calculation = (item: any) => {
    setDetails({ ...details, rented_time: item.label });
    clearErrors(['rented_time']);
  };

  const rent_amount_Calculation = (item: any) => {
    let token_amout = 0;

    setDetails({ ...details, token_amount_of_duration: item.label });

    if (details.rented_time === 'Monthly') {
      token_amout = parseInt(details.rent_amount) * parseInt(item.label);
    }

    if (details.rented_time === 'Quaterly') {
      token_amout = (parseInt(details.rent_amount) / 3) * parseInt(item.label);
    }

    if (details.rented_time === 'Yearly') {
      token_amout = parseInt(details.rent_amount) * parseInt(item.label) * 12;
    }

    console.log('toekn amount : ', token_amout);

    setDetails({ ...details, token_amount_of_duration: item.label, token_amount: token_amout });
    clearErrors(['token_amount_of_duration']);
  };

  //####################################################################################

  // useEffect(() => {
  //   handleCalculatePerSqft();
  // }, [details.property_price, details.property_price_max, details.property_area, details.property_area_max]);

  //#################################################################################

  useEffect(() => {
    propertypriceField.onChange(details?.property_price);
    propertypricemaxField.onChange(details?.property_price_max);

    propertyareaField.onChange(details?.property_area);
    propertyareamaxField.onChange(details?.property_area_max);

    priceperunitField.onChange(details?.property_price_per_unit);
    priceperunitmaxField.onChange(details?.property_price_per_unit_max);

    propertyunitvalueField.onChange(details?.property_area_units);

    tokenamountField.onChange(details?.token_amount);

    rentaamountField.onChange(details?.rent_amount);

    rented_timeField.onChange(details?.rented_time);
    tokeamountdurationField.onChange(details?.token_amount_of_duration);
    // tokeamountdurationField.onChange(details?.token_amount_of_duration);
  }, [
    details?.property_price,
    details?.property_price_max,
    details?.property_area,
    details?.property_area_max,
    details?.property_price_per_unit,
    details?.property_price_per_unit_max,
    details?.property_area_units,
    details?.token_amount,
    details?.rent_amount,
    details?.rented_time,
    details?.token_amount_of_duration,
  ]);

  useEffect(() => {
    setAdditionalPrice(additioanlData);
  }, [additioanlData]);

  //#################################################################################

  if (componentLoader) {
    return <Loader size={'large'} />;
  }

  return (
    <RNView style={styles.container}>
      {checkingData.iwant === 'Sell' && (
        <>
          <SectionHoc title="Property Area & Price " mandatory={true}>
            {/* //############################## Sell  ####################################### */}

            <RNView
              style={{
                marginBottom: 0,
              }}>
              <DropDownComponent
                data={propunits}
                disabled={false}
                sectioname="Units"
                value={propertyunitvalueField.value}
                errors={errors.property_unit}
                activefunction={handle_unitSelection}
              />
            </RNView>

            {errors.property_unit && (
              <PropertyInputErrorComponent
                errordata={errors.property_unit.message}
                styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
              />
            )}

            <RNView style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between' }}>
              <CommonInput
                label="* Min Area"
                keyboardType="number-pad"
                errorvalue={errors.property_area}
                placeholder=""
                maxLength={10}
                contentStyle={{ textTransform: 'capitalize' }}
                placeholderColor={ColorTheme.gray}
                style={[styles.inputStyle, { width: deviceWidth / 2.5, marginBottom: errors.pincode ? -10 : 10 }]}
                onChangeText={(e: string) => {
                  setDetails({ ...details, property_area: e });
                  // propertyareaField.onChange(e);
                }}
                value={propertyareaField.value}
              />

              <CommonInput
                label="* Max Area"
                keyboardType="number-pad"
                errorvalue={errors.property_area_max}
                placeholder=""
                maxLength={10}
                contentStyle={{ textTransform: 'capitalize' }}
                placeholderColor={ColorTheme.gray}
                style={[styles.inputStyle, { width: deviceWidth / 2.5, marginBottom: errors.pincode ? -10 : 10 }]}
                onChangeText={(e: string) => {
                  setDetails({ ...details, property_area_max: e });
                  // propertyareamaxField.onChange(e);
                }}
                value={propertyareamaxField.value}
              />
            </RNView>

            <RNView style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between' }}>
              {errors.property_area ? (
                <PropertyInputErrorComponent
                  errordata={errors.property_area.message}
                  // styledata={{ width: deviceWidth / 2.5 }}
                />
              ) : errors.property_area_max ? (
                <PropertyInputErrorComponent
                  errordata={errors.property_area_max.message}
                  // styledata={{ width: deviceWidth / 2.5 }}
                />
              ) : null}
            </RNView>

            <RNView style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between' }}>
              <CommonInput
                label="* Min Price"
                keyboardType="number-pad"
                errorvalue={errors.property_price}
                placeholder=""
                maxLength={10}
                contentStyle={{ textTransform: 'capitalize' }}
                placeholderColor={ColorTheme.gray}
                style={[styles.inputStyle, { width: deviceWidth / 2.5, marginBottom: errors.pincode ? -10 : 10 }]}
                onChangeText={(e: string) => {
                  setDetails({ ...details, property_price: e });
                  // propertypriceField.onChange(e);
                }}
                value={propertypriceField.value}
              />

              <CommonInput
                label="* Max Price"
                keyboardType="number-pad"
                errorvalue={errors.property_price_max}
                placeholder=""
                maxLength={10}
                contentStyle={{ textTransform: 'capitalize' }}
                placeholderColor={ColorTheme.gray}
                style={[styles.inputStyle, { width: deviceWidth / 2.5, marginBottom: errors.pincode ? -10 : 10 }]}
                onChangeText={(e: string) => {
                  setDetails({ ...details, property_price_max: e });
                  // propertypricemaxField.onChange(e);
                }}
                value={propertypricemaxField.value}
              />
            </RNView>

            <RNView style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between' }}>
              {errors.property_price ? (
                <PropertyInputErrorComponent
                  errordata={errors.property_price.message}
                  // styledata={{ width: deviceWidth / 2.5 }}
                />
              ) : errors.property_price_max ? (
                <PropertyInputErrorComponent
                  errordata={errors.property_price_max.message}
                  // styledata={{ width: deviceWidth / 2.5 }}
                />
              ) : null}
            </RNView>

            <RNView style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between' }}>
              <CommonInput
                label="Min Price/sqft"
                keyboardType="number-pad"
                disabled={false}
                errorvalue={errors.property_price_per_unit}
                placeholder=""
                maxLength={10}
                contentStyle={{ textTransform: 'capitalize' }}
                placeholderColor={ColorTheme.gray}
                style={[styles.inputStyle, { width: deviceWidth / 2.5, marginBottom: errors.pincode ? -10 : 10 }]}
                onChangeText={(e: string) => {
                  setDetails({ ...details, property_price_per_unit: e });
                  // propertypriceField.onChange(e);
                }}
                value={priceperunitField.value}
              />

              <CommonInput
                label="Max Price/sqft"
                keyboardType="number-pad"
                disabled={false}
                errorvalue={errors.property_price_per_unit_max}
                placeholder=""
                maxLength={10}
                contentStyle={{ textTransform: 'capitalize' }}
                placeholderColor={ColorTheme.gray}
                style={[styles.inputStyle, { width: deviceWidth / 2.5, marginBottom: errors.pincode ? -10 : 10 }]}
                onChangeText={(e: string) => {
                  setDetails({ ...details, property_price_per_unit_max: e });
                  // propertypricemaxField.onChange(e);
                }}
                value={priceperunitmaxField.value}
              />
            </RNView>

            <RNView style={{ flexDirection: 'row', gap: px(10), justifyContent: 'space-between' }}>
              {errors.property_price_per_unit ? (
                <PropertyInputErrorComponent
                  errordata={errors.property_price_per_unit.message}
                  // styledata={{ width: deviceWidth / 2.5 }}
                />
              ) : errors.property_price_per_unit_max ? (
                <PropertyInputErrorComponent
                  errordata={errors.property_price_per_unit_max.message}
                  // styledata={{ width: deviceWidth / 2.5 }}
                />
              ) : null}
            </RNView>
          </SectionHoc>

          <RNView
            style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              alignContent: 'center',
              backgroundColor: ColorTheme.white,
            }}>
            <PropertyChipsetWithIconSelection
              control={control}
              controlConstraints={controlConstraints}
              data={additionalPrice}
              details={details}
              setDetails={setDetails}
              errors={errors}
              sectioname=""
              activefunction={activateKeyForAdditionalPrice}
            />
          </RNView>
        </>
      )}

      {checkingData.iwant === 'Rent' && (
        <>
          <RNView
            style={{
              marginBottom: 0,
            }}>
            <DropDownComponent
              data={rentDurationDetails}
              disabled={false}
              sectioname="Rent Duration"
              value={rented_timeField.value}
              errors={errors.rented_time}
              activefunction={rentduration_amount_Calculation}
            />
          </RNView>

          {errors.rented_time && (
            <PropertyInputErrorComponent
              errordata={errors.rented_time.message}
              styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            />
          )}

          <CommonInput
            label="Rent Amount"
            keyboardType="number-pad"
            errorvalue={errors.rent_amount}
            placeholder=""
            maxLength={10}
            contentStyle={{ textTransform: 'capitalize' }}
            placeholderColor={ColorTheme.gray}
            style={[styles.inputStyle, { marginBottom: errors.rent_amount ? -10 : 10 }]}
            onChangeText={(e: string) => {
              setDetails({ ...details, rent_amount: e });
              rentaamountField.onChange(e);
            }}
            value={rentaamountField.value}
            //onChangeText={fnameField.onChange}
          />

          {errors.rent_amount && (
            <PropertyInputErrorComponent
              errordata={errors.rent_amount.message}
              styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            />
          )}

          <RNView
            style={{
              marginTop: 10,
              marginBottom: 0,
            }}>
            <DropDownComponent
              data={tokendurationmonth}
              disabled={false}
              sectioname="Token Amount Duration"
              value={tokeamountdurationField.value}
              errors={errors.token_amount_of_duration}
              activefunction={rent_amount_Calculation}
            />
          </RNView>

          {errors.token_amount_of_duration && (
            <PropertyInputErrorComponent
              errordata={errors.token_amount_of_duration.message}
              styledata={{ color: ColorTheme.red, paddingTop: px(20), paddingBottom: px(10) }}
            />
          )}

          <PropertyLabel
            placeholder={details.token_amount ? 'Token amount ' + formatNumberWithComma(details.token_amount) : ''}
          />
        </>
      )}
    </RNView>
  );
};

export default BuilderListingPrice;
