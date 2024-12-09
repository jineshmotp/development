import React, { useEffect, useState } from 'react';
import { ScrollView } from 'react-native';

import CheckBox from '@/components/common/CheckBox';
// import {
//   activateItem,
//   activateItemByKeyForMultiple,
// } from '@/components/common/property/helpers/property.helperFunctions';
import {
  ColivingAmenities,
  CombinedFilterData,
  industrialSuitableFor,
  MostFavouritedFilterData,
  PostedByFilterData,
  propertyAgeData,
  PropertyApprovedFilterData,
  propertyAvailabilityData,
  propertyBhkData,
  propertyFurnishingData,
  PropertyStatusFilterData,
  propertyTransactionTypeData,
  retailSuitableFor,
  showroomSuitableFor,
  VerifiedFilterData,
} from '@/components/global/Common/Constant/filterHelpers';
import { activateItem, activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import RNView from '@/custom/RNView';

import CombinedRangeSlider from '../CombinedRangeSlider';
import { styles } from './styles';

CombinedRangeSlider;

export const CombinedRangeFilter = ({ filterDetails, setFilterDetails }: any) => {
  return (
    <RNView style={styles.filterView}>
      <CombinedRangeSlider filterDetails={filterDetails} setFilterDetails={setFilterDetails} />
    </RNView>
  );
};

export const MostFavouriteFilterData = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);
    return temp;
  };

  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(MostFavouritedFilterData, filterDetails?.most_favourite)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);
    setFilterDetails({
      ...filterDetails,
      most_favourite: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => {
        return (
          <CheckBox
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
            isCheckBox={true}
          />
        );
      })}
    </RNView>
  );
};

export const VerifiedTypeFilterData = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);
    return temp;
  };

  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(VerifiedFilterData, filterDetails?.verified)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);

    setFilterDetails({
      ...filterDetails,
      verified: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => {
        return (
          <CheckBox
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
            isCheckBox={true}
          />
        );
      })}
    </RNView>
  );
};
export const PropertyApprovedTypeFilterData = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);
    return temp;
  };

  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(PropertyApprovedFilterData, filterDetails?.approved_by_rera)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);

    setFilterDetails({
      ...filterDetails,
      approved_by_rera: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => {
        return (
          <CheckBox
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
            isCheckBox={true}
          />
        );
      })}
    </RNView>
  );
};

export const PropertyStatusTypeFilterData = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    return temp;
  };
  const [multipleSelectable, setMultipleSelectable] = useState(
    convertRequired(PropertyStatusFilterData, filterDetails?.property_for)
  );
  const changeStatus = item => {
    const multipleSelected = activateItem(item, item.key, multipleSelectable, setMultipleSelectable);
    setFilterDetails({
      ...filterDetails,
      property_for: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label)[0],
    });
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => {
        return (
          <CheckBox
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
          />
        );
      })}
    </RNView>
  );
};

export const PostedTypeFilterData = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    return temp;
  };
  const [multipleSelectable, setMultipleSelectable] = useState(
    convertRequired(PostedByFilterData, filterDetails?.posted_by)
  );
  const changeStatus = item => {
    const multipleSelected = activateItem(item, item.key, multipleSelectable, setMultipleSelectable);
    setFilterDetails({
      ...filterDetails,
      posted_by: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label)[0],
    });
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => {
        return (
          <CheckBox
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
          />
        );
      })}
    </RNView>
  );
};

export const PropertyTypeFilter = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);

    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);

    return temp;
  };

  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(CombinedFilterData, filterDetails?.property_type)
  );
  // console.log('multipleSelectable ======>',multipleSelectable);
  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);
    setFilterDetails({
      ...filterDetails,
      property_type: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {multipleSelectable.map((item: any, i: any) => (
          <CheckBox
            isCheckBox={true}
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
          />
        ))}
      </ScrollView>
    </RNView>
  );
};

export const SuitableTypeFilter = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);

    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);

    return temp;
  };

  const getSuitableForOptions = (selectedTypes: any) => {
    const resultArray = [
      ...(selectedTypes.includes('Retail') ? retailSuitableFor : []),
      ...(selectedTypes.includes('Showroom') ? showroomSuitableFor : []),
      ...(selectedTypes.includes('Industrial') ? industrialSuitableFor : []),
    ];
    // console.log('resultArray ====>', resultArray);

    return resultArray;
  };

  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(getSuitableForOptions(filterDetails?.property_type), filterDetails?.suitable_for || [])
  );

  // console.log('multipleSelectable  ====>', multipleSelectable);

  useEffect(() => {
    // setMultipleSelectable(getSuitableForOptions(filterDetails?.property_type));
  }, [JSON.stringify(filterDetails.property_type)]);

  // console.log('multipleSelectable ======>',multipleSelectable);
  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);
    setFilterDetails({
      ...filterDetails,
      suitable_for: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {multipleSelectable.map((item: any, i: any) => (
          <CheckBox
            isCheckBox={true}
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
          />
        ))}
      </ScrollView>
    </RNView>
  );
};

export const TransactionTypeFilter = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    return temp;
  };
  const [multipleSelectable, setMultipleSelectable] = useState(
    convertRequired(propertyTransactionTypeData, filterDetails?.transaction_type)
  );
  const changeStatus = item => {
    const multipleSelected = activateItem(item, item.key, multipleSelectable, setMultipleSelectable);
    setFilterDetails({
      ...filterDetails,
      transaction_type: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label)[0],
    });
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => (
        <CheckBox
          key={i}
          label={item.label}
          labelStyle={styles.filterText}
          checked={item.active}
          onPress={() => changeStatus(item)}
        />
      ))}
    </RNView>
  );
};

export const AvailabilityTypeFilter = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);
    return temp;
  };
  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(propertyAvailabilityData, filterDetails?.availability)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);
    setFilterDetails({
      ...filterDetails,
      availability: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.key),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => {
        return (
          <CheckBox
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
            isCheckBox={true}
          />
        );
      })}
    </RNView>
  );
};
export const FurnishingTypeFilter = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);
    return temp;
  };
  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(propertyFurnishingData, filterDetails?.furnishing_status)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);
    setFilterDetails({
      ...filterDetails,
      furnishing_status: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.key),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => (
        <CheckBox
          key={i}
          label={item.label}
          labelStyle={styles.filterText}
          checked={item.active}
          onPress={() => changeStatus(item)}
          isCheckBox={true}
        />
      ))}
    </RNView>
  );
};

export const PropertyAgeFilter = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    return temp;
  };
  const [multipleSelectable, setMultipleSelectable] = useState(
    convertRequired(propertyAgeData, filterDetails?.age_of_property)
  );
  const changeStatus = item => {
    const multipleSelected = activateItem(item, item.key, multipleSelectable, setMultipleSelectable);
    setFilterDetails({
      ...filterDetails,
      age_of_property: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label)[0],
    });
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => (
        <CheckBox
          key={i}
          label={item.label}
          labelStyle={styles.filterText}
          checked={item.active}
          onPress={() => changeStatus(item)}
        />
      ))}
    </RNView>
  );
};

export const BhkTypeFilter = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);
    return temp;
  };
  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(propertyBhkData, filterDetails?.bhk_type)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);

    setFilterDetails({
      ...filterDetails,
      bhk_type: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable.map((item: any, i: any) => (
        <CheckBox
          key={i}
          label={item.label}
          labelStyle={styles.filterText}
          checked={item.active}
          onPress={() => changeStatus(item)}
          isCheckBox={true}
        />
      ))}
    </RNView>
  );
};

export const AmenitiesFilter = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data.map(item => {
      if (propertyType.includes(item?.label)) {
        return {
          ...item,
          active: true,
        };
      } else {
        return item;
      }
    });
    // console.log("convertRequired===", temp);
    return temp;
  };
  const [multipleSelectable, setMultipleSelectable] = useState(() =>
    convertRequired(ColivingAmenities, filterDetails?.amenities)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);

    setFilterDetails({
      ...filterDetails,
      amenities: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        {multipleSelectable.map((item: any, i: any) => (
          <CheckBox
            isCheckBox={true}
            key={i}
            label={item.label}
            labelStyle={styles.filterText}
            checked={item.active}
            onPress={() => changeStatus(item)}
          />
        ))}
      </ScrollView>
    </RNView>
  );
};
