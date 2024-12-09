import React, { useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';

import CheckBox from '@/components/common/CheckBox';
import {
  BorwellData,
  CornerProperty,
  FencingData,
  LandPropertyType,
  MostFavouritedFilterData,
  PostedByFilterData,
  PropertyApprovedFilterData,
  PropertyStatusFilterData,
  VerifiedFilterData,
} from '@/components/global/Common/Constant/filterHelpers';
import { activateItem, activateItemByKeyForMultiple } from '@/constants/function/property.helperFunctions';
import RNView from '@/custom/RNView';

import LandRangeSlider from '../LandRangeSlider';
import { styles } from './styles';

export const LandRangeFilter = ({ filterDetails, setFilterDetails }: any) => {
  return (
    <RNView style={styles.filterView}>
      <LandRangeSlider filterDetails={filterDetails} setFilterDetails={setFilterDetails} />
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

export const CornerTypeFilterData = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data?.map(item => {
      if (propertyType?.includes(item?.label)) {
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
    convertRequired(CornerProperty, filterDetails?.corner_property)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);

    setFilterDetails({
      ...filterDetails,
      corner_property: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
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

export const FencingTypeFilterData = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data?.map(item => {
      if (propertyType?.includes(item?.label)) {
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
    convertRequired(FencingData, filterDetails?.boundary_fencing_available)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);

    setFilterDetails({
      ...filterDetails,
      boundary_fencing_available: multipleSelected
        .filter((item: any) => item.active === true)
        .map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable?.map((item: any, i: any) => {
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

export const BorewellTypeFilterData = ({ filterDetails, setFilterDetails }: any) => {
  const convertRequired = (data, propertyType) => {
    // console.log("propertyTpe", propertyType);
    const temp = data?.map(item => {
      if (propertyType?.includes(item?.label)) {
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
    convertRequired(BorwellData, filterDetails?.borwell_available)
  );

  const changeStatus = item => {
    const multipleSelected = activateItemByKeyForMultiple(multipleSelectable, item.key);

    setFilterDetails({
      ...filterDetails,
      borwell_available: multipleSelected.filter((item: any) => item.active === true).map((item: any) => item.label),
    });

    setMultipleSelectable(multipleSelected);
  };
  return (
    <RNView style={styles.filterView}>
      {multipleSelectable?.map((item: any, i: any) => {
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
      if (propertyType?.includes(item?.label)) {
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
      {multipleSelectable?.map((item: any, i: any) => {
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
      if (propertyType?.includes(item?.label)) {
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
      posted_by: multipleSelected?.filter((item: any) => item.active === true).map((item: any) => item.label)[0],
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
    // console.log('propertyTpe', propertyType, data);

    const temp = data?.map(item => {
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
    convertRequired(LandPropertyType, filterDetails?.property_type)
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
        {multipleSelectable?.map((item: any, i: any) => (
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
