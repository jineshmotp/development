import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, ScrollView, TextInput, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
import qs from 'qs';

import Loader from '@/components/common/Loader';
import ColivingFilterSheet from '@/components/global/Coliving/ColivingFilterSheet';
import CombinedFilterSheet from '@/components/global/Combined/CombinedFilterSheet';
import CommercialFilterSheet from '@/components/global/Commercial/CommercialFilterSheet';
import SearchCard from '@/components/global/Common/SearchCard';
import LandFilterSheet from '@/components/global/Land/LandFilterSheet';
import RecommendationModal from '@/components/global/RecommendationModal';
import FilterSheet from '@/components/global/Residential/FilterSheet';
import MoreScreenElement from '@/components/more/MoreScreenElement';
import { isArray } from '@/constants/function/isArray';
import { isValidURL } from '@/constants/function/property.helper';
import { getUniqueSearchedText } from '@/constants/functions/global.functions';
import { popularData, recentSearchData } from '@/constants/functions/global.helper';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHooks';
import {
  useGetMostFavoriteQuery,
  useLazyElasticSearchQuery,
  useLazyGetMostFavoriteQuery,
  useLazySuggesionByTextQuery,
  useSuggesionListingQuery,
} from '@/redux/global/globalService';
import { getUserData } from '@/redux/login/loginReducer';
import { ColorTheme } from '@/theme';

import { styles } from './styles';

const Global = () => {
  const navigation = useNavigation();
  const selectedUserData = useAppSelector(getUserData);
  const dispatch = useAppDispatch();

  // console.log(' globalsearchkey-->', getGlobalSearchKey);

  const [searchText, setSearchText] = useState('');
  const [elasticData] = useLazyElasticSearchQuery();
  const [showData, setShowData] = useState(null);
  const [countData, setCountData] = useState(null);
  // console.log('countData ======>', countData?.data?.hints?.category);

  const [loader, setLoader] = useState(false);

  const [showFilters, setShowFilters] = useState(false);
  const [showLandFilters, setShowLandFilters] = useState(false);
  const [showColivingFilters, setShowColivingFilters] = useState(false);
  const [showCommercialFilters, setShowCommercialFilters] = useState(false);
  const [showCombinedFilters, setShowCombinedFilters] = useState(false);

  const [RecommentData, setRecommentData] = useState([]);
  const [suggestionData, setSuggestionData] = useState([]);
  const [suggestionLimit, setsuggestionLimit] = useState(10);

  const [showRecommendationModal, setShowRecommendationModal] = useState(false);

  const [highDemand, setHighDemand] = useState([]);
  // console.log('highDemand ======>', highDemand);

  const { data } = useSuggesionListingQuery(selectedUserData?._id);

  const [getAllSuggesionfromText] = useLazySuggesionByTextQuery();

  const [getAllFavoriteMutation, { status }] = useLazyGetMostFavoriteQuery();
  // console.log('api status --->', status);

  const [passData, setPassData] = useState({
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
  });
  // console.log('showData =====>', showData?.data?.data);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  const openFilterSheet = () => {
    if (countData?.data?.hints?.category?.length > 1 && countData?.data?.hints?.category[0] === 'Commercial') {
      setShowCombinedFilters(true);
    } else if (countData?.data?.hints?.category[0] === 'Residential') {
      setShowFilters(true);
    } else if (countData?.data?.hints?.category[0] === 'Coliving') {
      setShowColivingFilters(true);
    } else if (countData?.data?.hints?.category[0] === 'Commercial') {
      setShowCommercialFilters(true);
    } else if (countData?.data?.hints?.category[0] === 'Land or Plot') {
      setShowLandFilters(true);
    } else {
      setShowFilters(true);
    }
  };

  const filterObject = (filterData, page = 1, limit = 10) => {
    // console.log(' filter data --->', filterData);

    if (countData?.data?.hints?.category?.length > 1 && countData?.data?.hints?.category[0] === 'Commercial') {
      const priceRangeValues =
        typeof filterData?.price_range === 'string'
          ? filterData.price_range.split('-').map(val => parseInt(val.trim()) * 100000)
          : !isArray(filterData?.price_range) && null;
      // console.log('priceRangeValues =====>', priceRangeValues);
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

      const propertyStringObject = {
        page: page.toString(),
        limit: limit.toString(),
        term: searchText,
        user_id: selectedUserData?._id,
        filters: {
          most_favourite: filterData.most_favourite ? true : null,
          verified: filterData.verified ? true : null,
          approved_by_rera: filterData.approved_by_rera ? true : null,
          property_for:
            filterData.property_For && filterData.property_for === 'Buy' ? 'Sell' : filterData.property_for || null,
          posted_by: filterData.posted_by || null,
          property_type: filterData.property_type || null,
          price_range: priceRangeValues || null,
          transaction_type: filterData.transaction_type || null,
          availability: filterData.availability || null,
          bhk_type: bhkTypeValues || null,
          furnishing_status: filterData.furnishing_status || null,
          age_of_property: (filterData.age_of_property && filterData.age_of_property.split(' ')[0]) || null,
          amenities: filterData.amenities || null,
        },
      };
      Object.entries(propertyStringObject.filters).forEach(([key, value]) => {
        // console.log(`${key}:${value}`);

        if (value === null || value === undefined || value === '' || JSON.stringify(value) == '[]') {
          delete propertyStringObject.filters[key];
        }
      });
      // console.log('propertyStringObject =====>', propertyStringObject);

      // console.log('qs.stringify(propertyStringObject) ======>', qs.stringify(propertyStringObject));

      return qs.stringify(propertyStringObject);
    } else if (countData?.data?.hints?.category[0] === 'Residential') {
      const priceRangeValues =
        typeof filterData?.price_range === 'string'
          ? filterData.price_range.split('-').map(val => parseInt(val.trim()) * 100000)
          : !isArray(filterData?.price_range) && null;
      // console.log('priceRangeValues =====>', priceRangeValues);

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

      const propertyStringObject = {
        page: page.toString(),
        limit: limit.toString(),
        term: searchText,
        user_id: selectedUserData?._id,
        filters: {
          most_favourite: filterData.most_favourite ? true : null,
          verified: filterData.verified ? true : null,
          approved_by_rera: filterData.approved_by_rera ? true : null,
          property_for:
            filterData.property_For && filterData.property_for === 'Buy' ? 'Sell' : filterData.property_for || null,
          posted_by: filterData.posted_by || null,
          property_type: filterData.property_type || null,
          price_range: priceRangeValues || null,
          transaction_type: filterData.transaction_type || null,
          availability: filterData.availability || null,
          furnishing_status: filterData.furnishing_status || null,
          bhk_type: bhkTypeValues || null,
          age_of_property: (filterData.age_of_property && filterData.age_of_property.split(' ')[0]) || null,
          amenities: filterData.amenities || null,
        },
      };
      Object.entries(propertyStringObject.filters).forEach(([key, value]) => {
        // console.log(`${key}:${value}`);

        if (value === null || value === undefined || value === '' || JSON.stringify(value) == '[]') {
          delete propertyStringObject.filters[key];
        }
      });
      // console.log('propertyStringObject =====>', propertyStringObject);

      // console.log('qs.stringify(propertyStringObject) ======>', qs.stringify(propertyStringObject));

      return qs.stringify(propertyStringObject);
    } else if (countData?.data?.hints?.category[0] === 'Coliving') {
      const priceRangeValues =
        typeof filterData?.price_range === 'string'
          ? filterData.price_range.split('-').map(val => parseInt(val.trim()) * 100000)
          : !isArray(filterData?.price_range) && null;
      // console.log('priceRangeValues =====>', priceRangeValues);

      const propertyStringObject = {
        page: page.toString(),
        limit: limit.toString(),
        term: searchText,
        user_id: selectedUserData?._id,
        filters: {
          most_favourite: filterData.most_favourite ? true : null,
          verified: filterData.verified ? true : null,
          approved_by_rera: filterData.approved_by_rera ? true : null,
          property_for:
            filterData.property_For && filterData.property_for === 'Buy' ? 'Sell' : filterData.property_for || null,
          posted_by: filterData.posted_by || null,
          property_type: filterData.property_type || null,
          sharing_type: filterData.sharing_type || null,
          attached_washroom: filterData.attached_washroom ? true : null,
          price_range: priceRangeValues || null,
          transaction_type: filterData.transaction_type || null,
          gender_preference: filterData.gender_preference || null,
          availability: filterData.availability || null,
          furnishing_status: filterData.furnishing_status || null,
          age_of_property: (filterData.age_of_property && filterData.age_of_property.split(' ')[0]) || null,
          amenities: filterData.amenities || null,
        },
      };
      Object.entries(propertyStringObject.filters).forEach(([key, value]) => {
        // console.log(`${key}:${value}`);

        if (value === null || value === undefined || value === '' || JSON.stringify(value) == '[]') {
          delete propertyStringObject.filters[key];
        }
      });
      // console.log('propertyStringObject =====>', propertyStringObject);

      // console.log('qs.stringify(propertyStringObject) ======>', qs.stringify(propertyStringObject));

      return qs.stringify(propertyStringObject);
    } else if (countData?.data?.hints?.category[0] === 'Commercial') {
      const priceRangeValues =
        typeof filterData?.price_range === 'string'
          ? filterData.price_range.split('-').map(val => parseInt(val.trim()) * 100000)
          : !isArray(filterData?.price_range) && null;
      // console.log('priceRangeValues =====>', priceRangeValues);

      const propertyStringObject = {
        page: page.toString(),
        limit: limit.toString(),
        term: searchText,
        user_id: selectedUserData?._id,
        filters: {
          most_favourite: filterData.most_favourite ? true : null,
          verified: filterData.verified ? true : null,
          approved_by_rera: filterData.approved_by_rera ? true : null,
          property_for:
            filterData.property_For && filterData.property_for === 'Buy' ? 'Sell' : filterData.property_for || null,
          posted_by: filterData.posted_by || null,
          property_type: filterData.property_type || null,
          price_range: priceRangeValues || null,
          transaction_type: filterData.transaction_type || null,
          availability: filterData.availability || null,
          furnishing_status: filterData.furnishing_status || null,
          age_of_property: (filterData.age_of_property && filterData.age_of_property.split(' ')[0]) || null,
          amenities: filterData.amenities || null,
        },
      };
      Object.entries(propertyStringObject.filters).forEach(([key, value]) => {
        // console.log(`${key}:${value}`);

        if (value === null || value === undefined || value === '' || JSON.stringify(value) == '[]') {
          delete propertyStringObject.filters[key];
        }
      });
      // console.log('propertyStringObject =====>', propertyStringObject);

      // console.log('qs.stringify(propertyStringObject) ======>', qs.stringify(propertyStringObject));

      return qs.stringify(propertyStringObject);
    } else if (countData?.data?.hints?.category[0] === 'Land or Plot') {
      const priceRangeValues =
        typeof filterData?.price_range === 'string'
          ? filterData.price_range.split('-').map(val => parseInt(val.trim()) * 100000)
          : !isArray(filterData?.price_range) && null;
      // console.log('priceRangeValues =====>', priceRangeValues);

      const propertyStringObject = {
        page: page.toString(),
        limit: limit.toString(),
        term: searchText,
        user_id: selectedUserData?._id,
        filters: {
          most_favourite: filterData.most_favourite ? true : null,
          verified: filterData.verified ? true : null,
          approved_by_rera: filterData.approved_by_rera ? true : null,
          corner_property: filterData.corner_property ? true : null,
          boundary_fencing_available: filterData.boundary_fencing_available ? true : null,
          borwell_available: filterData.borwell_available ? true : null,
          property_for:
            filterData.property_For && filterData.property_for === 'Buy' ? 'Sell' : filterData.property_for || null,
          posted_by: filterData.posted_by || null,
          property_type: filterData.property_type || null,
          sharing_type: filterData.sharing_type || null,
          attached_washroom: filterData.attached_washroom ? true : null,
          price_range: priceRangeValues || null,
          transaction_type: filterData.transaction_type || null,
          gender_preference: filterData.gender_preference || null,
          availability: filterData.availability || null,
          furnishing_status: filterData.furnishing_status || null,
          age_of_property: (filterData.age_of_property && filterData.age_of_property.split(' ')[0]) || null,
          amenities: filterData.amenities || null,
        },
      };
      Object.entries(propertyStringObject.filters).forEach(([key, value]) => {
        // console.log(`${key}:${value}`);

        if (value === null || value === undefined || value === '' || JSON.stringify(value) == '[]') {
          delete propertyStringObject.filters[key];
        }
      });
      // console.log('propertyStringObject =====>', propertyStringObject);

      // console.log('qs.stringify(propertyStringObject) ======>', qs.stringify(propertyStringObject));

      return qs.stringify(propertyStringObject);
    } else {
      const propertyStringObject = {
        page: page.toString(),
        limit: limit.toString(),
        term: searchText,
        user_id: selectedUserData?._id,
        filters: {},
      };
      Object.entries(propertyStringObject.filters).forEach(([key, value]) => {
        // console.log(`${key}:${value}`);

        if (value === null || value === undefined || value === '' || JSON.stringify(value) == '[]') {
          delete propertyStringObject.filters[key];
        }
      });
      // console.log('propertyStringObject =====>', propertyStringObject);

      // console.log('qs.stringify(propertyStringObject) ======>', qs.stringify(propertyStringObject));

      return qs.stringify(propertyStringObject);
    }
  };

  const globalSearch = (data, page = 1, limit = 10) => {
    // console.log('data ==============>', data);

    try {
      const globalResults = filterObject(data, page, limit);
      // console.log('globalResults ======>', globalResults);
      elasticData(globalResults).then(res => {
        // console.log('res =====>', res?.data);
        setCountData(res);
        // setShowData(res);
        setShowData(prevData => {
          if (page === 1) {
            return res?.data?.data;
          } else {
            return [...prevData, ...res?.data?.data];
          }
        });
        setTimeout(() => {
          setLoader(false); // Hide loader after 3 seconds
        }, 1000);
      });
    } catch (error) {
      setLoader(false);
    }
  };

  const recentHistory = () => {
    if (data && Array.isArray(data) && data.length > 0) {
      // setShowData(true);
      const uniqueData = getUniqueSearchedText(data, suggestionLimit);
      // console.log('Data:', uniqueData);
      setRecommentData(uniqueData);
    } else {
      // console.log('No valid data');
      // setShowData(false);
      setRecommentData(recentSearchData);
    }
  };

  useEffect(() => {
    recentHistory();
  }, [data]);

  useEffect(() => {
    const handleSearchSuggestion = async (searchval: string) => {
      getAllSuggesionfromText(searchval)
        .then(response => {
          if (response?.isSuccess) {
            // console.log('daaaaaaa----->', response?.data);

            let uniqueData = getUniqueSearchedText(response?.data, suggestionLimit);
            // console.log('Data:', uniqueData);
            setSuggestionData(uniqueData);
          } else {
            console.log(' else', response?.isSuccess);
          }
        })
        .catch(err => {
          console.log('errrrr', err);
        });
    };

    if (searchText !== null && searchText !== '') {
      handleSearchSuggestion(searchText);
    } else {
      setSuggestionData([]);
    }
  }, [searchText]);

  const handleSearchTextChange = (text: string) => {
    setSearchText(text);
    setShowRecommendationModal(text.trim() !== '');
  };

  useEffect(() => {
    const favFetching = async () => {
      getAllFavoriteMutation(selectedUserData?._id)
        .then(response => {
          // console.log(' Responsessssss --->', response);

          if (response?.isSuccess) {
            // console.log('daaaaaaa----->', response?.data?.data);

            setHighDemand(response?.data?.data);
          } else {
            console.log(' else', response?.isSuccess);
          }
        })
        .catch(err => {
          console.log('errrrr', err);
        });
    };

    favFetching();
  }, []);

  useEffect(() => {
    if (searchText) {
      globalSearch(filterObject);
    }
  }, [searchText]);
  const renderItem = useMemo(() => {
    return ({ item }) => {
      // console.log('item =========>', item);

      return (
        <RNView style={styles.renderView}>
          <SearchCard
            data={item}
            onPress={() => {
              item?._source?.business_id
                ? navigation.navigate('BUILDER_PROPERTY_DETAILS', {
                    id: item?._source?.property_location_id,
                    businessId: item?._source?.business_id,
                  })
                : navigation.navigate('PROPERTY_DETAILS', {
                    id: item?._source?.property_location_id,
                    owner: item?._source?.owned_by,
                  });
            }}
          />
        </RNView>
      );
    };
  }, []);

  return (
    <Container backgroundColor="white">
      {loading ? (
        <Loader size="large" color={ColorTheme.primary} />
      ) : (
        <RNView style={styles.mainContainer}>
          <RNView style={styles.searchParentContainer}>
            <RNView style={styles.searchContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('BOTTOM_TAB');
                }}>
                <AntDesign name="arrowleft" size={24} color="black" />
              </TouchableOpacity>

              <RNView style={styles.searchChild}>
                <TextInput
                  placeholder="Search..."
                  onChangeText={handleSearchTextChange}
                  style={styles.textInput}
                  value={searchText}
                  onSubmitEditing={() => {
                    setShowRecommendationModal(false);
                  }}
                />

                <TouchableOpacity
                  style={styles.micCOntainer}
                  onPress={() => {
                    if (searchText.trim() !== '') {
                      globalSearch(filterObject);
                      recentHistory();
                      setLoader(true);
                    }
                  }}>
                  <AntDesign name="search1" size={24} color="black" />
                </TouchableOpacity>
              </RNView>

              {showRecommendationModal && (
                <RecommendationModal
                  recommendations={suggestionData} // Pass your recommendation data here
                  onSelect={label => {
                    setSearchText(label);
                    setShowRecommendationModal(false); // Hide modal after selection
                  }}
                />
              )}
            </RNView>
          </RNView>

          {!showData ? (
            <ScrollView showsVerticalScrollIndicator={false} style={{ zIndex: -10 }}>
              <RNView>
                <RNView style={styles.popularContainer}>
                  <RNText style={styles.recentText}>YOUR RECENT SEARCHES</RNText>
                  <ScrollView
                    horizontal
                    contentContainerStyle={styles.recentChipCont}
                    showsHorizontalScrollIndicator={false}>
                    {RecommentData?.map((item: any, i) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          style={styles.recentSearchChip}
                          onPress={() => {
                            setSearchText(item?.label);
                            setShowRecommendationModal(false); // Hide modal after selection
                            // globalSearch(filterObject);
                            // setLoader(true);
                          }}>
                          <AntDesign name="clockcircleo" size={15} color={ColorTheme.nearLukGray} />
                          <RNText style={styles.historyText}>{item?.label}</RNText>
                        </TouchableOpacity>
                      );
                    })}
                  </ScrollView>
                </RNView>

                <RNView style={styles.lineContainer}></RNView>
              </RNView>
              <RNView style={styles.popularContainer}>
                <RNText style={styles.popularText}>POPULAR SEARCHES</RNText>
                <RNView style={styles.popularChild}>
                  {popularData.map((item: any, i) => {
                    return (
                      //  <TouchableOpacity key={i} style={styles.cardContainer}>
                      //   <RNImage source={item.img} style={styles.categoryImage} />
                      //   <RNText style={styles.categoryText}>{item.label}</RNText>
                      // </TouchableOpacity>

                      <MoreScreenElement
                        item={item}
                        key={i}
                        type={item?.type}
                        propertyType={item?.propertyType}
                        propertyFor={item?.propertyFor}
                      />
                    );
                  })}
                </RNView>
              </RNView>
              <RNView style={styles.lineContainer}></RNView>

              <RNView style={styles.popularContainer}>
                <RNText style={styles.recentText}>PROJECTS IN HIGH DEMAND</RNText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.highDemandProject}>
                  {highDemand?.map((item: any, i) => {
                    return (
                      <TouchableOpacity
                        key={i}
                        style={{ width: 120, marginBottom: 30 }}
                        onPress={() =>
                          navigation.navigate('PROPERTY_DETAILS', {
                            id: item?.property?._id,
                            owner: item?._source?.owned_by,
                          })
                        }>
                        <RNImage
                          source={{
                            uri: isValidURL(item?.property?.gallery[0]?.url)
                              ? item?.property?.gallery[0]?.url
                              : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png',
                          }}
                          style={styles.demandingProperties}
                        />

                        <RNText numberOfLines={1} style={styles.propertyText}>
                          {item?.property?.property_name}
                        </RNText>
                        <RNText numberOfLines={1} style={styles.residentialText}>
                          {item?.property?.property_type}
                        </RNText>
                        <RNText style={styles.priceText}> ₹ {item?.property?.property_price}</RNText>
                      </TouchableOpacity>
                    );
                  })}
                </ScrollView>
              </RNView>
            </ScrollView>
          ) : (
            <RNView style={styles.miniContainer}>
              {loader && <Loader size={'small'} color={ColorTheme.primary} />}

              <FlatList
                data={showData}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.contentView}
                renderItem={renderItem}
                ListHeaderComponent={
                  showData &&
                  showData?.length > 0 && (
                    <RNView style={styles.resultView}>
                      <RNText style={styles.propertyText}>Showing results for {searchText} |</RNText>
                      <RNText style={styles.propertyText}> {countData?.data?.count} Results</RNText>
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
                onEndReached={() => globalSearch(passData, showData?.length / 10 + 1, 10)} // Load more when end is reached
                onEndReachedThreshold={0.1}
              />

              <RNView style={styles.filterView}>
                <TouchableOpacity onPress={openFilterSheet} style={styles.touchableView}>
                  <RNImage source={require('@/assets/images/userProfile/filter.png')} style={styles.filterImage} />
                  <RNText style={styles.filterText}>Filters</RNText>
                </TouchableOpacity>
              </RNView>
            </RNView>
          )}
        </RNView>
      )}

      <FilterSheet
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        globalSearch={data => {
          globalSearch(data);
          setPassData(data);
        }}
      />

      <LandFilterSheet
        showLandFilters={showLandFilters}
        setShowLandFilters={setShowLandFilters}
        globalSearch={data => {
          globalSearch(data);
          setPassData(data);
        }}
      />
      <ColivingFilterSheet
        showColivingFilters={showColivingFilters}
        setShowColivingFilters={setShowColivingFilters}
        globalSearch={data => {
          globalSearch(data);
          setPassData(data);
        }}
      />
      <CommercialFilterSheet
        showCommercialFilters={showCommercialFilters}
        setShowCommercialFilters={setShowCommercialFilters}
        globalSearch={data => {
          globalSearch(data);
          setPassData(data);
        }}
      />
      <CombinedFilterSheet
        showCombinedFilters={showCombinedFilters}
        setShowCombinedFilters={setShowCombinedFilters}
        globalSearch={data => {
          globalSearch(data);
          setPassData(data);
        }}
      />
    </Container>
  );
};

export default Global;
