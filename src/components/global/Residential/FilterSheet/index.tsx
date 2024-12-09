import { memo, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import {
  Actionsheet,
  ActionsheetBackdrop,
  ActionsheetContent,
  ActionsheetDragIndicator,
  ActionsheetDragIndicatorWrapper,
  Box,
} from '@gluestack-ui/themed';

import { activateItem } from '@/constants/function/property.helperFunction';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { filterList } from '../../Common/Constant/filterList';
import FilterValues from '../../Common/FilterValues';
import RightFilterComponent from '../RightFilterComponent';
import { styles } from './styles';

const FilterSheet = ({ showFilters, setShowFilters, globalSearch }: any) => {
  const [filterKey, setFilterKey] = useState(filterList);
  const [activeKey, setActiveKey] = useState('most_favourite');

  const initialData = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    property_for: '',
    posted_by: '',
    property_type: '',
    price_range: [],
    transaction_type: [],
    availability: [],
    furnishing_status: [],
    bhk_type: [],
    age_of_property: '',
    amenities: [],
  };
  const [filterDetails, setFilterDetails] = useState(initialData);

  // console.log('filterDetails ====>', filterDetails);

  const selectFilter = (item: any) => {
    activateItem(item, '', filterKey, setFilterKey);
    setActiveKey(item.key);
  };

  // console.log("hello ===>", filterDetails);
  const clearFilters = () => {
    setFilterDetails(initialData);
  };

  return (
    <RNView>
      <Box>
        <Actionsheet
          isOpen={showFilters}
          onClose={() => {
            setShowFilters(false);
          }}
          zIndex={999}
          snapPoints={
            Object.values(filterDetails)
              .flat(3)
              .filter((item: any) => {
                // console.log('filterDetails =====>', filterDetails);
                return item !== '';
              }).length
              ? [85]
              : [80]
          }>
          <ActionsheetBackdrop />
          <ActionsheetContent zIndex={999}>
            <ActionsheetDragIndicatorWrapper>
              <ActionsheetDragIndicator />
            </ActionsheetDragIndicatorWrapper>

            <RNView style={styles.mainContainer}>
              <RNText style={styles.initialText}>Filters</RNText>

              <TouchableOpacity
                onPress={() => {
                  setShowFilters(false);
                }}
                style={styles.closeView}>
                <Entypo name="cross" size={30} color="black" />
              </TouchableOpacity>
            </RNView>

            <RNView style={styles.heightView}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  paddingHorizontal: 10, 
                }}>
                <RNView style={styles.valuesView}>
                  {Object.values(filterDetails)
                    .flat(3)
                    .filter((item: any) => {
                      // console.log('filterDetails =====>', filterDetails);
                      return item !== '';
                    })
                    .map((item: any, i: any) => {
                      return (
                        <FilterValues
                          style={styles.filterStyles}
                          textStyle={{
                            color: 'black',
                          }}
                          key={i}
                          item={{ label: item }}
                        />
                      );
                    })}
                </RNView>
              </ScrollView>
            </RNView>

            <RNView>
              <RNView style={styles.rowContainer}>
                <RNView style={styles.widthView}>
                  <ScrollView showsVerticalScrollIndicator={false}>
                    <RNView style={styles.leftValues}>
                      {filterKey?.map((item: any, i) => {
                        return (
                          <TouchableOpacity
                            key={i}
                            style={[
                              styles.subView,
                              {
                                borderBottomWidth: filterList?.length === i + 1 ? 0 : 1,
                                borderRightWidth: item.active ? 5 : 0,
                              },
                            ]}
                            onPress={() => selectFilter(item)}>
                            <RNText style={styles.filterKeyText}>{item.label}</RNText>
                          </TouchableOpacity>
                        );
                      })}
                    </RNView>
                  </ScrollView>
                </RNView>
                <RNView style={styles.rightView}>
                  <RightFilterComponent
                    active={activeKey}
                    filterDetails={filterDetails}
                    setFilterDetails={setFilterDetails}
                  />
                </RNView>
              </RNView>
              <RNView style={styles.endContainer}>
                <RNView style={styles.lastView}>
                  <TouchableOpacity onPress={clearFilters}>
                    <RNText style={styles.clearFilterText}>Clear Filters</RNText>
                  </TouchableOpacity>
                  <CommonButton
                    onPress={() => {
                      setShowFilters(false);
                      globalSearch(filterDetails);
                    }}
                    title="Apply"
                    style={styles.buttonContainer}
                    textStyle={styles.buttonText}
                  />
                </RNView>
              </RNView>
            </RNView>
          </ActionsheetContent>
        </Actionsheet>
      </Box>
    </RNView>
  );
};

export default memo(FilterSheet);
