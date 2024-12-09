import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Platform, ScrollView, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';

import * as qs from 'qs';
import { useNavigation } from '@react-navigation/native';

import Loader from '@/components/common/Loader';
import Header from '@/components/nearu/Common/Header';
import SearchCard from '@/components/nearu/Common/SearchCard';
import NearuFilterSheet from '@/components/nearu/NearuFilterSheet';
import { isArray } from '@/constants/function/isArray';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import { getScrollToTop, hideBottomTabs } from '@/redux/home/homeReducer';
import { getUserData } from '@/redux/login/loginReducer';
import { getLatLongData, setLatLongData } from '@/redux/nearu/nearuReducer';
import { useLazyNearuGlobalDataQuery } from '@/redux/nearu/nearuService';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const Nearu = () => {
  const navigation = useNavigation();
  const flatListRef = useRef(null);
  const userSetLocation = useAppSelector(getLatLongData);
  // const getLocation = useAppSelector(getLatLongData);
  const autoSetLocation = useAppSelector(setLatLongData);
  const getLocation = userSetLocation?.lat ? userSetLocation : autoSetLocation;
  const scrollData = useAppSelector(getScrollToTop);
  const dispatch = useAppDispatch();

  // console.log('getLocation nearuuuuuuuu =====>', getLocation);

  const [getNearUData] = useLazyNearuGlobalDataQuery({});
  const [showData, setShowData] = useState(null);
  const [countData, setCountData] = useState(null);

  const [showNearuFilters, setShowNearuFilters] = useState(false);
  const [selectedLabels, setSelectedLabels] = useState([]);

  const selectedUserData = useAppSelector(getUserData);
  const [areaValue, setAreaValue] = useState('');
  // console.log('areaValue =====>', areaValue);

  const [isAreaFocus, setIsAreaFocus] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState('');
  // console.log('selectedIndex =======>', selectedIndex);

  const [selectedSubIndex, setSelectedSubIndex] = useState('');
  // console.log('selectedSubIndex =======>', selectedSubIndex);
  const [loader, setLoader] = useState(true);

  const [passData, setPassData] = useState({
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    category: '',
    distance: '',
    property_for: '',
    posted_by: '',
    price_range: [],
    property_type: [],
    bhk_type: [],
    sharing_typ: [],
    attached_washroom: '',
    gender_preference: [],
    transaction_type: '',
    availability: [],
    furnishing_status: [],
    age_of_property: '',
    amenities: [],
  });

  const buttonLabels = [{ label: 'Buy' }, { label: 'Rent' }];

  const buttonData = [
    { text: 'Residential', imageSource: require('@/assets/images/nearu/res.png') },
    { text: 'Commercial', imageSource: require('@/assets/images/nearu/com.png') },
    { text: 'Coliving', imageSource: require('@/assets/images/nearu/col.png') },
    { text: 'Land or Plot', imageSource: require('@/assets/images/nearu/lan.png') },
  ];
  const ResidentialData = [
    {
      label: 'Flat',
      key: 'flat',
      active: false,
    },
    {
      label: 'Studio Apartment',
      key: 'studio_apartment',
      active: false,
    },
    {
      label: 'Apartment',
      key: 'apartment',
      active: false,
    },

    {
      label: 'Villa',
      key: 'villa',
      active: false,
    },
    {
      label: 'Independent House',
      key: 'independent_house',
      active: false,
    },
    {
      label: 'Farm House',
      key: 'farm_house',
      active: false,
    },
    {
      label: 'Guest House',
      key: 'guest_house',
      active: false,
    },
  ];

  const LandData = [
    {
      label: 'Residential',
      key: 'residential',
      active: false,
    },
    {
      label: 'Agricultural',
      key: 'agriculture',
      active: false,
    },
    {
      label: 'Industrial',
      key: 'industrial',
      active: false,
    },
    {
      label: 'Institutional',
      key: 'institutional',
      active: false,
    },
  ];

  const ColivingData = [
    {
      label: 'Flat',
      key: 'flat',
      active: false,
    },
    {
      label: 'Studio Apartment',
      key: 'studio_apartment',
      active: false,
    },
    {
      label: 'Apartment',
      key: 'apartment',
      active: false,
    },

    {
      label: 'Villa',
      key: 'villa',
      active: false,
    },
    {
      label: 'Independent House',
      key: 'independent_house',
      active: false,
    },
    {
      label: 'PG',
      key: 'pg',
      active: false,
    },
    {
      label: 'Coliving space',
      key: 'coliving_space',
      active: false,
    },
    {
      label: 'Hostel',
      key: 'hostel',
      active: false,
    },
  ];
  const CommercialData = [
    {
      label: 'Hotels',
      key: 'hotels',
      active: false,
    },
    {
      label: 'Resorts',
      key: 'resorts',
      active: false,
    },
    {
      label: 'Retail',
      key: 'retail',
      active: false,
    },
    {
      label: 'Showroom',
      key: 'showroom',
      active: false,
    },

    {
      label: 'Shopping mall',
      key: 'shopping_mall',
      active: false,
    },
    {
      label: 'Educational',
      key: 'educational',
      active: false,
    },
    {
      label: 'Office spaces',
      key: 'office_space',
      active: false,
    },
    {
      label: 'Industrial',
      key: 'industrial',
      active: false,
    },
    {
      label: 'Land/plot',
      key: 'land_plot',
      active: false,
    },
  ];

  const filterObject = (filterData, page = 1, limit = 10) => {
    const priceRangeValues =
      typeof filterData?.price_range === 'string'
        ? filterData.price_range.split('-').map(val => parseInt(val.trim()) * 100000)
        : !isArray(filterData?.price_range) && null;

    const bhkTypeValues = filterData?.bhk_type
      ? filterData?.bhk_type.map(val => {
          if (val === '1 BHK') return '1';
          if (val === '2 BHK') return '2';
          if (val === '3 BHK') return '3';
          if (val === '4 BHK') return '4';
          if (val === '4+ BHK') return '4+';
          return null;
        })
      : null;
    const queryStringObject = {
      page: page,
      limit: limit,
      user_id: selectedUserData?._id,
      filters: {
        category: selectedIndex ? selectedIndex : '',
        distance: filterData?.distance || 5,
        most_favourite: filterData?.most_favourite ? true : null,
        verified: filterData?.verified ? true : null,
        approved_by_rera: filterData?.approved_by_rera ? true : null,
        property_for: selectedSubIndex && selectedSubIndex === 'Buy' ? 'Sell' : selectedSubIndex || null,
        posted_by: filterData?.posted_by || null,
        property_type: areaValue ? [areaValue] : null,
        price_range: priceRangeValues || null,
        transaction_type: filterData?.transaction_type || null,
        availability: filterData?.availability || null,
        bhk_type: bhkTypeValues || null,
        furnishing_status: filterData?.furnishing_status || null,
        age_of_property: (filterData?.age_of_property && filterData?.age_of_property.split(' ')[0]) || null,
        amenities: filterData?.amenities || null,
        sharing_type: filterData?.sharing_type || null,
        attached_washroom: filterData?.attached_washroom ? true : null,
        gender_preference: filterData?.gender_preference || null,
      },
      lat: getLocation?.lat,
      lng: getLocation?.long,
    };

    Object.entries(queryStringObject.filters).forEach(([key, value]) => {
      // console.log(`${key}:${value}`);

      if (value === null || value === undefined || value === '' || JSON.stringify(value) == '[]') {
        delete queryStringObject.filters[key];
      }
    });
    // console.log('queryStringObject =====>', queryStringObject);

    // console.log('qs.stringify(queryStringObject) ======>', qs.stringify(queryStringObject));

    return qs.stringify(queryStringObject);
  };

  const globalNearu = (data, page = 1, limit = 10) => {
    // console.log('hello ======>', page, limit);

    try {
      const nearuResults = filterObject(data, page, limit);
      getNearUData(nearuResults).then(res => {
        // console.log('res =====>', res?.data);
        setCountData(res);
        setShowData(prevData => {
          if (page === 1) {
            return res?.data?.data;
          } else {
            return [...prevData, ...res?.data?.data];
          }
        });
        setLoader(false);
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  useEffect(() => {
    // console.log('kkkkkkkkkkkkkkk');

    globalNearu(filterObject);
  }, [selectedIndex, selectedSubIndex, areaValue]);

  useEffect(() => {
    if (getLocation?.lat !== undefined && getLocation?.long !== undefined) {
      globalNearu(filterObject);
      setLoader(true);
    }
  }, [getLocation?.lat, getLocation?.long, selectedLabels]);

  const renderItem = useMemo(() => {
    return ({ item }) => {
      // console.log('item ======>', item);

      return (
        <RNView style={styles.renderView}>
          <SearchCard
            data={item}
            onPress={() => {
              navigation.navigate('PROPERTY_DETAILS', { id: item?.property_location_id, owner: item?.owned_by });
            }}
          />
        </RNView>
      );
    };
  }, []);
  const scrollToTop = () => {
    flatListRef.current.scrollToOffset({ offset: 0, animated: true });
  };

  let vericleScroll = 0;
  const handleScroll = event => {
    if (Platform.OS === 'ios') {
      if (vericleScroll <= 0) {
        dispatch(hideBottomTabs(false));
        vericleScroll = event?.nativeEvent?.contentOffset?.y;
      } else if (vericleScroll > event?.nativeEvent?.contentOffset?.y) {
        dispatch(hideBottomTabs(false));
      } else {
        vericleScroll = event?.nativeEvent?.contentOffset?.y;
        dispatch(hideBottomTabs(true));
      }
    } else {
      const currentOffset = event.nativeEvent?.velocity?.y;
      if (currentOffset < 0) {
        // console.log('+++++++');
        dispatch(hideBottomTabs(false));
      } else {
        dispatch(hideBottomTabs(true));
      }
    }
  };
  useEffect(() => {
    scrollToTop();
  }, [scrollData]);

  const handleCategoryChange = category => {
    setSelectedIndex(category);
    setSelectedSubIndex(''); // Reset subcategory
    setAreaValue(''); // Reset area value
  };

  const getDropdownData = selectedIndex => {
    switch (selectedIndex) {
      case 'Residential':
        return ResidentialData;
      case 'Land or Plot':
        return LandData;
      case 'Coliving':
        return ColivingData;
      case 'Commercial':
        return CommercialData;
      default:
        return [];
    }
  };

  return (
    <Container hasHeader={false} isTab={false}>
      {/* {loader && <Loader size={'large'} color={ColorTheme.primary} />} */}

      <Header label="NearU" />

      <RNView style={styles.miniContainer}>
        {loader && <Loader size={'large'} color={ColorTheme.primary} />}
        <FlatList
          ref={flatListRef}
          data={showData}
          onScroll={handleScroll}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.contentView}
          renderItem={renderItem}
          ListHeaderComponent={
            showData && (
              <RNView>
                <RNText style={styles.filterText}>Filters</RNText>
                <RNText style={styles.categText}>Select a category</RNText>
                <ScrollView
                  horizontal
                  contentContainerStyle={{ paddingRight: 20, gap: 10, paddingLeft: 20 }}
                  showsHorizontalScrollIndicator={false}>
                  {buttonData?.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => handleCategoryChange(item?.text)}
                      key={index}
                      style={[
                        styles.button,
                        {
                          backgroundColor: selectedIndex === item?.text ? '#333333' : ColorTheme.white, // Conditional background color
                        },
                      ]}>
                      <RNView style={styles.buttonContent}>
                        <RNImage resizeMode="cover" source={item.imageSource} style={styles.logoImage} />
                        <RNText
                          style={[
                            styles.buttonText,
                            {
                              color: selectedIndex === item?.text ? ColorTheme.white : '#333333', // Conditional text color
                            },
                          ]}>
                          {item.text}
                        </RNText>
                      </RNView>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
                {selectedIndex ? (
                  <>
                    <RNText style={styles.subText}>Select a sub-category</RNText>
                    <ScrollView
                      horizontal
                      contentContainerStyle={{ paddingRight: 20, gap: 10, paddingLeft: 20 }}
                      showsHorizontalScrollIndicator={false}>
                      {buttonLabels.map((item, index) => (
                        <TouchableOpacity
                          onPress={() => setSelectedSubIndex(item?.label)}
                          key={index}
                          style={[
                            styles.subbutton,
                            {
                              backgroundColor: selectedSubIndex === item?.label ? '#333333' : ColorTheme.white, // Conditional background color
                            },
                          ]}>
                          <RNText
                            style={[
                              styles.rentText,
                              {
                                color: selectedSubIndex === item?.label ? ColorTheme.white : '#333333', // Conditional text color
                              },
                            ]}>
                            {item?.label}
                          </RNText>
                        </TouchableOpacity>
                      ))}
                    </ScrollView>
                    <RNText style={styles.subText}>Select a Property Type</RNText>
                    <Dropdown
                      style={[styles.dropdown, isAreaFocus && { borderColor: ColorTheme.primaryColor }]}
                      placeholderStyle={styles.placeholderStyle}
                      selectedTextStyle={styles.selectedTextStyle}
                      inputSearchStyle={styles.inputSearchStyle}
                      iconStyle={styles.iconStyle}
                      data={getDropdownData(selectedIndex)} // Set data dynamically
                      maxHeight={300}
                      labelField="label"
                      valueField="label"
                      placeholder={!isAreaFocus ? 'Please select Property Type' : areaValue}
                      value={areaValue}
                      onFocus={() => setIsAreaFocus(true)}
                      onBlur={() => setIsAreaFocus(false)}
                      onChange={item => {
                        setAreaValue(item.label);
                        setIsAreaFocus(false);
                      }}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setShowNearuFilters(true);
                      }}>
                      <RNText style={styles.viewText}>View all Filters</RNText>
                    </TouchableOpacity>
                  </>
                ) : null}
              </RNView>
            )
          }
          ListFooterComponent={
            (!showData || showData?.length <= 0) && (
              <RNView style={styles.lastContainer}>
                <RNText style={styles.lastText}>No Properties found</RNText>
              </RNView>
            )
          }
          onEndReached={() => {
            // Check if there is existing data and if it's not already loading
            if (showData && showData?.length > 0 && !loader) {
              // Trigger API call for next page
              globalNearu(passData, Math.ceil(showData?.length / 10) + 1, 10);
            }
          }}
          onEndReachedThreshold={0.5}
        />
        <NearuFilterSheet
          showNearuFilters={showNearuFilters}
          setShowNearuFilters={setShowNearuFilters}
          globalNearu={data => {
            globalNearu(data);
            setPassData(data);
          }}
        />
      </RNView>
    </Container>
  );
};

export default Nearu;
