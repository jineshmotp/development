import React, { useEffect, useState } from 'react';
import { useController, useForm } from 'react-hook-form';

import DropDownComponent from '@/components/common/DropDownComponent';
import Loader from '@/components/common/Loader';
import PropertyChipsetWithIconSelection from '@/components/common/PropertyChipsetWithIconSelection';
import PropertyInputErrorComponent from '@/components/common/PropertyInputErrorComponent';
import SectionHoc from '@/components/common/SectionHoc';
import TitledCheckBox from '@/components/common/TitledCheckBox';
import PropertyLabel from '@/components/property/PropertyLabel';
import PropertyYesNo from '@/components/property/PropertyYesNo';
import {
  formatNumberWithComma,
  price_additional_details,
  propertyCarpetArea,
  rent_duration,
  token_duration_months,
} from '@/constants/function/property.helper';
import { activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import CommonInput from '@/custom/CommonInput';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

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

const PropertyPrice: React.FC<OwnerDetailsProps> = ({
  control,
  controlConstraints,
  errors,
  setDetails,
  clearErrors,
  checkingData,
  details,
  additioanlData,
}) => {
  const { setValue } = useForm();
  const [additionalPrice, setAdditionalPrice] = useState(additioanlData);
  const [rentDurationDetails, setRentDurationDetails] = useState(rent_duration);
  const [tokendurationmonth, setTokendurationMonth] = useState(token_duration_months);

  const [componentLoader, setComponentLoader] = useState(false);

  const { field: propertypriceField } = useController({
    name: 'property_price',
    control,
    defaultValue: details?.property_price,
    rules: controlConstraints.property_price, // Apply constraints for fname
  });

  const { field: maintenanceField } = useController({
    name: 'maintenance_price',
    control,
    defaultValue: details?.maintenance_price,
    rules: controlConstraints.maintenance_price, // Apply constraints for fname
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
    defaultValue: details?.rented_time || '',
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
    defaultValue: details?.token_amount_of_duration,
    rules: controlConstraints.token_amount_of_duration,
  });

  const { field: powerbillchargesField } = useController({
    name: 'include_power_bill_charges',
    control,
    defaultValue: details?.include_power_bill_charges,
    rules: controlConstraints.include_power_bill_charges, // Apply constraints for fname
  });

  const { field: waterbillField } = useController({
    name: 'include_water_bill_charges',
    control,
    defaultValue: details?.include_water_bill_charges,
    rules: controlConstraints.include_water_bill_charges, // Apply constraints for fname
  });

  const { field: rentagrementField } = useController({
    name: 'is_rent_agreement',
    control,
    defaultValue: details?.is_rent_agreement,
    rules: controlConstraints.is_rent_agreement, // Apply constraints for fname
  });

  const { field: agrementdurationField } = useController({
    name: 'agreement_duration_month',
    control,
    defaultValue: details?.agreement_duration_month,
    rules: controlConstraints.agreement_duration_month, // Apply constraints for fname
  });

  const { field: noticeperiodField } = useController({
    name: 'is_notice_period',
    control,
    defaultValue: details?.is_notice_period,
    rules: controlConstraints.is_notice_period, // Apply constraints for fname
  });

  const { field: noticedurationField } = useController({
    name: 'notice_duration_month',
    control,
    defaultValue: details?.notice_duration_month,
    rules: controlConstraints.notice_duration_month, // Apply constraints for fname
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
    const conversionFactor = propertyCarpetArea[checkingData.property_area_units];

    // console.log(' Price value ', conversionFactor);

    const areaInSquareFeet = checkingData.property_area * conversionFactor;

    // console.log(' area in sqft value ', areaInSquareFeet);

    let ratePerSquareFoot = parseInt(details.property_price) / areaInSquareFeet;

    // console.log(' rate PerSquareFoot ', ratePerSquareFoot);

    let value = ratePerSquareFoot.toFixed(0);

    // console.log('price value : ', value);

    setDetails({
      ...details,
      property_price_per_unit: value,
    });
  };

  //########################### Rent Amount Calculation / Rent ######################

  const rentduration_amount_Calculation = (item: any) => {
    setValue('rented_time', item.label);
    clearErrors(['rented_time']);
    rented_timeField.onChange(item.label);
    setDetails({ ...details, rented_time: item.label });
  };

  const rent_amount_Calculation = (item: any) => {
    let token_amout = 0;

    // console.log(
    //   ' Rented Time : ',
    //   details.rented_time,
    //   ' \nRent Amount : ',
    //   details.rent_amount,
    //   ' \nmonth val : ',
    //   item.label
    // );

    if (details.rented_time === 'Monthly') {
      token_amout = parseInt(details.rent_amount) * parseInt(item.label);
    }

    if (details.rented_time === 'Quaterly') {
      token_amout = (parseInt(details.rent_amount) / 3) * parseInt(item.label);
    }

    if (details.rented_time === 'Yearly') {
      token_amout = parseInt(details.rent_amount) * parseInt(item.label) * 12;
    }

    // console.log('toekn amount : ', token_amout);

    setValue('token_amount_of_duration', item.label);
    clearErrors(['token_amount_of_duration']);
    tokeamountdurationField.onChange(item.label);

    setDetails({ ...details, token_amount_of_duration: item.label, token_amount: token_amout });
  };

  //####################################################################################

  useEffect(() => {
    handleCalculatePerSqft();
  }, [details.property_price]);

  //########################################## Rent Agrement Duration Calculation #########################

  const rentAgrementDuration_Calculation = (item: any) => {
    // console.log(' item value : ', item);

    setDetails({ ...details, agreement_duration_month: item.label });
    // agrementdurationField.onChange(item.label);
  };

  const noticeperiodDuration_Calculation = (item: any) => {
    // console.log(' item value : ', item);

    setDetails({ ...details, notice_duration_month: item.label });
    // noticedurationField.onChange(item.label);
  };

  //#################################################################################

  useEffect(() => {
    propertypriceField.onChange(details?.property_price);
    maintenanceField.onChange(details?.maintenance_price);

    tokenamountField.onChange(details?.token_amount);

    rentaamountField.onChange(details?.rent_amount);

    powerbillchargesField.onChange(details?.include_power_bill_charges);
    waterbillField.onChange(details?.include_water_bill_charges);

    rentagrementField.onChange(details?.is_rent_agreement);
    agrementdurationField.onChange(details?.agreement_duration_month);
    noticeperiodField.onChange(details?.is_notice_period);
    noticedurationField.onChange(details?.notice_duration_month);

    rented_timeField.onChange(details?.rented_time);
    tokeamountdurationField.onChange(details?.token_amount_of_duration);
  }, [
    details?.property_price,
    details?.maintenance_price,
    details?.token_amount,
    details?.rent_amount,
    details?.include_power_bill_charges,
    details?.include_water_bill_charges,
    details?.is_rent_agreement,
    details?.agreement_duration_month,
    details?.is_notice_period,
    details?.notice_duration_month,
    details?.rented_time,
    details?.token_amount_of_duration,
  ]);

  // useEffect(() => {
  //   console.log('Rent duration --->', details?.rented_time);
  //   rented_timeField.onChange(details?.rented_time);
  // }, [details?.rented_time]);

  useEffect(() => {
    setAdditionalPrice(additioanlData);
  }, [additioanlData]);

  //#################################################################################

  if (componentLoader) {
    return <Loader size={'large'} />;
  }

  return (
    <RNView style={styles.container}>
      <SectionHoc title="Property Price " mandatory={true}>
        {/* //############################## Sell  ####################################### */}

        {(checkingData.iwant === 'Sell' ||checkingData.iwant === 'Investment Sharing' ) && (
          <>
            <CommonInput
              label="* Property Price"
              keyboardType="number-pad"
              errorvalue={errors.property_price}
              placeholder=""
              maxLength={10}
              contentStyle={{ textTransform: 'capitalize' }}
              placeholderColor={ColorTheme.gray}
              style={[styles.inputStyle, { marginBottom: errors.property_price ? -10 : 10 }]}
              onChangeText={(e: string) => {
                setDetails({ ...details, property_price: e });
                propertypriceField.onChange(e);
              }}
              value={propertypriceField.value}
              //onChangeText={fnameField.onChange}
            />

            {errors.property_price && <PropertyInputErrorComponent errordata={errors.property_price.message} />}

            <PropertyLabel
              placeholder={
                details.property_price
                  ? 'Property Price ' + formatNumberWithComma(details.property_price_per_unit) + '  / sqft'
                  : ''
              }
            />
          </>
        )}

        {/* //############################## Sell - Residential ####################################### */}

        {(checkingData.iwant === 'Sell' ||checkingData.iwant === 'Investment Sharing' ) && checkingData.property_type === 'Residential' && (
          <>
            {/* <CommonInput
              label="Maintainance Charges"
              keyboardType="number-pad"
              errorvalue={errors.maintenance_price}
              placeholder=""
              maxLength={10}
              contentStyle={{ textTransform: 'capitalize' }}
              placeholderColor={ColorTheme.gray}
              style={[styles.inputStyle, { marginBottom: errors.maintenance_price ? -10 : 10 }]}
              onChangeText={(e: string) => {
                setDetails({ ...details, maintenance_price: e });
                maintenanceField.onChange(e);
              }}
              value={maintenanceField.value}
              //onChangeText={fnameField.onChange}
            />

            {errors.maintenance_price && <PropertyInputErrorComponent errordata={errors.maintenance_price.message} />} */}

            {/* <CommonInput
              label="Token Amount"
              keyboardType="number-pad"
              errorvalue={errors.token_amount}
              placeholder=""
              maxLength={10}
              contentStyle={{ textTransform: 'capitalize' }}
              placeholderColor={ColorTheme.gray}
              style={[styles.inputStyle, { marginBottom: errors.token_amount ? -10 : 10 }]}
              onChangeText={(e: string) => {
                setDetails({ ...details, token_amount: e });
                tokenamountField.onChange(e);
              }}
              value={tokenamountField.value}
            />

            {errors.token_amount && <PropertyInputErrorComponent errordata={errors.token_amount.message} />}
           */}
          </>
        )}

        {/* //############################## Rent - Coliving ############################## */}

        {((checkingData.iwant === 'Rent' ||checkingData.iwant === 'Property Sharing' ) || checkingData.iwant === 'Coliving') && (
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

            {errors.rented_time && <PropertyInputErrorComponent errordata={errors.rented_time.message} />}

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

            {errors.rent_amount && <PropertyInputErrorComponent errordata={errors.rent_amount.message} />}

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
              <PropertyInputErrorComponent errordata={errors.token_amount_of_duration.message} />
            )}

            <PropertyLabel
              placeholder={details.token_amount ? 'Token amount ' + formatNumberWithComma(details.token_amount) : ''}
            />
          </>
        )}
      </SectionHoc>

      {/* //############################## Sell - Residential ############################### */}

      {(checkingData.iwant === 'Sell' ||checkingData.iwant === 'Investment Sharing' ) && checkingData.property_type === 'Residential' && (
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
      )}

      {((checkingData.iwant === 'Rent' ||checkingData.iwant === 'Property Sharing' ) || checkingData.iwant === 'Coliving') && (
        <>
          <RNView
            style={{
              flexDirection: 'row',
              marginTop: 10,
              marginBottom: 10,
              gap: 10,
            }}>
            <TitledCheckBox
              label={'Power Bill Charges'}
              checked={details.include_power_bill_charges}
              setChecked={() =>
                setDetails({
                  ...details,
                  include_power_bill_charges: !details.include_power_bill_charges,
                })
              }
            />

            <TitledCheckBox
              label={'Water Bill Charges'}
              checked={details.include_water_bill_charges}
              setChecked={() =>
                setDetails({
                  ...details,
                  include_water_bill_charges: !details.include_water_bill_charges,
                })
              }
            />
          </RNView>

          <PropertyYesNo
            propertyKeylabel="Rent Agrement"
            propertyKey="is_rent_agreement" // Pass your property key
            propertyValue={noticeperiodField.value}
            setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
          />

          {details.is_rent_agreement === true && (
            <DropDownComponent
              data={tokendurationmonth}
              disabled={false}
              sectioname="Duration in Months"
              value={agrementdurationField.value}
              errors={errors.agreement_duration_month}
              activefunction={rentAgrementDuration_Calculation}
            />
          )}

          <PropertyYesNo
            propertyKeylabel="Notice period"
            propertyKey="is_notice_period" // Pass your property key
            propertyValue={noticeperiodField.value}
            setPropertyDetails={(key, value) => setDetails({ ...details, [key]: value })}
          />

          {details.is_notice_period === true && (
            <DropDownComponent
              data={tokendurationmonth}
              disabled={false}
              sectioname="Duration in Months"
              value={noticedurationField.value}
              errors={errors.notice_duration_month}
              activefunction={noticeperiodDuration_Calculation}
            />
          )}
        </>
      )}

      {/* <Divider
        borderColor="#D9D6D6"
        style={{
          marginTop: 10,
          gap: 10,
        }}
      /> */}
    </RNView>
  );
};

export default PropertyPrice;
