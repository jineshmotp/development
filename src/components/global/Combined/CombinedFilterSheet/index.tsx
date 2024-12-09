import { memo, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';



import { Actionsheet, ActionsheetBackdrop, ActionsheetContent, ActionsheetDragIndicator, ActionsheetDragIndicatorWrapper, Box } from '@gluestack-ui/themed';



import { activateItem } from '@/constants/function/property.helperFunction';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';



import { CombinedFilterList, CombinedFilterListFun } from '../../Common/Constant/filterList';
import FilterValues from '../../Common/FilterValues';
import CombinedRightFilter from '../CombinedRightFilter';
import { styles } from './styles';


const CombinedFilterSheet = ({ showCombinedFilters, setShowCombinedFilters, globalSearch }: any) => {
   const initialData = {
     most_favourite: '',
     verified: '',
     approved_by_rera: '',
     property_for: '',
     posted_by: '',
     price_range: [],
     property_type: [],
     bhk_type: [],
     transaction_type: '',
     availability: [],
     furnishing_status: [],
     age_of_property: '',
     amenities: [],
   };
  // const [filterKey, setFilterKey] = useState(CombinedFilterList);
    const [filterKey, setFilterKey] = useState(CombinedFilterListFun(initialData));
    const [activeKey, setActiveKey] = useState('most_favourite');

 
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
  useEffect(() => {
    setFilterKey(CombinedFilterListFun(filterDetails));
  }, [JSON.stringify(filterDetails.property_type)]);

  return (
    <RNView>
      <Box>
        <Actionsheet
          isOpen={showCombinedFilters}
          onClose={() => {
            setShowCombinedFilters(false);
          }}
          zIndex={999}
          snapPoints={
            Object.values(filterDetails)
              .flat(3)
              .filter((item: any) => {
                // console.log('filterDetails =====>', filterDetails);
                return item !== '';
              }).length
              ? [90]
              : [85]
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
                  setShowCombinedFilters(false);
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
                                borderBottomWidth: CombinedFilterList?.length === i + 1 ? 0 : 1,
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
                  <CombinedRightFilter
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
                      setShowCombinedFilters(false);
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

export default memo(CombinedFilterSheet);