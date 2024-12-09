import React, { useEffect, useMemo, useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';

import { useNavigation, useRoute } from '@react-navigation/native';
import qs from 'qs';

import HeaderBar from '@/components/common/HeaderBar';
import Loader from '@/components/common/Loader';
import {
  ColivingFilterList,
  CommercialFilterList,
  filterList,
  LandFilterList,
} from '@/components/global/Common/Constant/filterList';
import SearchCard from '@/components/global/Common/SearchCard';
import Coliving from '@/components/home/Explore/Coliving';
import Commercial from '@/components/home/Explore/Commercial';
import Land from '@/components/home/Explore/Land';
import Residential from '@/components/home/Explore/Residential';
import { isArray } from '@/constants/function/isArray';
import { activateItem } from '@/constants/function/property.helperFunctions';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { useLazyElasticSearchQuery } from '@/redux/global/globalService';
import { getUserData } from '@/redux/login/loginReducer';
import { RootStackParamList } from '@/routes/RootNavigator';
import { ColorTheme } from '@/theme';

import { styles } from './styles';
import {  useLazyGetInvestmentListQuery, useLazyGetSharingPropertyListQuery } from '@/redux/onboarding/onboardingService';
import { Platform } from 'react-native';
import { px } from '@/utils';
import { ImageBackground } from 'react-native';
import { formatNumberWithNotation } from '@/constants/function/property.helper';

const Explore = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'EXPLORE'>>();
  const [searchText, setSearchText] = useState(route?.params?.type);
  const [elasticData] = useLazyElasticSearchQuery();
  const [showData, setShowData] = useState(null);
  const [countData, setCountData] = useState(null);
  // console.log('countData ======>', countData?.data?.hints?.category);
  const [showFilters, setShowFilters] = useState(false);
  const [showLandFilters, setShowLandFilters] = useState(false);
  const [showColivingFilters, setShowColivingFilters] = useState(false);
  const [showCommercialFilters, setShowCommercialFilters] = useState(false);
  const selectedUserData = useAppSelector(getUserData);
  const [getInvestmentProperty] = useLazyGetInvestmentListQuery()
  const [getPropertyList] = useLazyGetSharingPropertyListQuery()
  const [listOfSharing,setListOfSharing] = useState()
  const [pageNo,setPageNo] = useState(0);

  const filterKeyType = name => {
    switch (name) {
      case 'Residential':
        return filterList;
      case 'Commercial':
        return CommercialFilterList;
      case 'Coliving':
        return ColivingFilterList;
      case 'Office space':
        return CommercialFilterList;
      case 'Land or Plot':
        return LandFilterList;
      default:
        return filterList;
    }
  };

  const [filterKey, setFilterKey] = useState(filterKeyType(searchText));

  const [listOfInvestment,setListOfInvestment] = useState()

  const [activeKey, setActiveKey] = useState('most_favourite');
  const selectFilter = (item: any) => {
    activateItem(item, '', filterKey, setFilterKey);
    setActiveKey(item.key);
  };

  const initial = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    property_for: '',
    posted_by: '',
    property_type: route?.params?.propertyType ? route?.params?.propertyType : [],
    price_range: [],
    transaction_type: [],
    availability: [],
    furnishing_status: [],
    bhk_type: [],
    age_of_property: '',
    amenities: [],
  };

  const initialFilterData = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    property_for: '',
    posted_by: '',
    property_type: [],
    price_range: [],
    transaction_type: [],
    availability: [],
    furnishing_status: [],
    bhk_type: [],
    age_of_property: '',
    amenities: [],
  };

  const commercialData = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    property_for: '',
    posted_by: '',
    price_range: [],
    property_type: route?.params?.propertyType ? route?.params?.propertyType : [],
    transaction_type: '',
    availability: [],
    furnishing_status: [],
    age_of_property: '',
    amenities: [],
  };

  const commercialFilterData = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    property_for: '',
    posted_by: '',
    price_range: [],
    property_type: [],
    transaction_type: '',
    availability: [],
    furnishing_status: [],
    age_of_property: '',
    amenities: [],
  };
  const colivinglData = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    property_for: '',
    posted_by: '',
    price_range: [],
    property_type: route?.params?.propertyType ? route?.params?.propertyType : [],
    sharing_type: [],
    attached_washroom: '',
    gender_preference: [],
    transaction_type: '',
    availability: [],
    furnishing_status: [],
    age_of_property: '',
    amenities: [],
  };

  const colivingFilterData = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    property_for: '',
    posted_by: '',
    price_range: [],
    property_type: [],
    sharing_type: [],
    attached_washroom: '',
    gender_preference: [],
    transaction_type: '',
    availability: [],
    furnishing_status: [],
    age_of_property: '',
    amenities: [],
  };

  const landData = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    corner_property: '',
    boundary_fencing_available: '',
    borwell_available: '',
    property_for: '',
    posted_by: '',
    property_type: route?.params?.propertyType ? route?.params?.propertyType : [],
    price_range: [],
  };

  const landFilterData = {
    most_favourite: '',
    verified: '',
    approved_by_rera: '',
    corner_property: '',
    boundary_fencing_available: '',
    borwell_available: '',
    property_for: '',
    posted_by: '',
    property_type: [],
    price_range: [],
  };

  const filterSheetType = name => {
    switch (name) {
      case 'Residential':
        return initial;
      case 'Commercial':
        return commercialData;
      case 'Coliving':
        return colivinglData;
      case 'Land or Plot':
        return landData;
      default:
        return filterList;
    }
  };

  const handleClearData = name => {
    if (name === 'Residential') {
      return setInitialData(initialFilterData);
    } else if (name === 'Commercial') {
      return setInitialData(commercialFilterData);
    } else if (name === 'Coliving') {
      return setInitialData(colivingFilterData);
    } else if (name === 'Land or Plot') {
      return setInitialData(landFilterData);
    }
  };

  const [loading, setLoading] = useState(true);
  const [initialData, setInitialData] = useState(filterSheetType(searchText));
  // console.log('initialData =========>', initialData);

  const openFilterSheet = () => {
    if (countData?.data?.hints?.category[0] === 'Residential') {
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
    if (countData?.data?.hints?.category[0] === 'Residential') {
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
      // console.log('propertyStsringObject =====>', propertyStringObject);

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
      //  console.log('propertyStringObject =====>', propertyStringObject);

      //  console.log('qs.stringify(propertyStringObject) ======>', qs.stringify(propertyStringObject));

      return qs.stringify(propertyStringObject);
    }
  };

  const getSharePropertyPayload = (page , limit ) => {
    const getListPayload = {
      page: page,
      limit:limit,
    };
    return qs.stringify(getListPayload);
  };

  const globalSearch = (data, page = 1, limit = 10) => {
    // console.log('data ======>', data);

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
      });
    } catch (error) {
      // console.log('error =====>', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    route?.params?.label==='Investment Sharing' ? investmentProperty(pageNo,10):sharingPropListApi(pageNo,10)
    setInitialData(initial);
    globalSearch(initialData);
    setTimeout(() => {
      setLoading(false); // Hide loader after 3 seconds
    }, 1000);
    setSearchText(route?.params?.type);
  }, [route?.params?.propertyType]);



const investmentProperty =(page,limit)=>{

  getInvestmentProperty(getSharePropertyPayload(page,limit)).then(res=>{
    
    setListOfInvestment(res?.data?.data?.data)
    if(res?.status==='fulfilled'){
      if ( res?.data?.data?.data?.length && page >= 1) {
        setPageNo(pageNo+1)
        setListOfInvestment(prev => prev?.concat(res?.data?.data?.data));
      } else {
        if (!res?.data?.data?.data?.length && page > 1) {
          setListOfInvestment(listOfInvestment);
        } else {
          setListOfInvestment(res?.data?.data?.data)   
          setPageNo(pageNo+1)  
        }
      }
      
    }
  }).catch(err=>{
    console.log('error check',JSON.stringify(err));
    
  })

}

  const sharingPropListApi=(page,limit)=>{
    getPropertyList(getSharePropertyPayload(page,limit)).then(res=>{
      if(res?.status==='fulfilled'){
        if ( res?.data?.data?.data?.length && page >= 1) {
          setPageNo(pageNo+1)
          setListOfSharing(prev => prev?.concat(res?.data?.data?.data));
        } else {
          if (!res?.data?.data?.data?.length && page > 1) {
            setListOfSharing(prev => prev?.concat(res?.data?.data?.data));
          } else {
            setListOfSharing(res?.data?.data?.data)   
            setPageNo(pageNo+1)  
          }
        }
        
      }
    }).catch(err=>{console.log('checking on error',JSON.stringify(err));
    })
  }

  const renderItem = useMemo(() => {
    return ({ item }) => {
      // console.log('item =========>', item);

      return (
        <RNView style={styles.renderView}>
          <SearchCard
            data={item}
            onPress={() =>
              navigation.navigate('PROPERTY_DETAILS', {
                id: item?._source?.property_location_id,
                owner: item?._source?.owned_by,
              })
            }
          />
        </RNView>
      );
    };
  }, []);

  const renderSharingList =({item})=>{
    return(
      <RNView style={{height:px(280)}} >
        <ImageBackground 
        style={
          { height: Platform.OS === 'android' ? px(200) : px(200),
          borderRadius: px(15),
          overflow: 'hidden',
          marginHorizontal:px(10)
        }}
          source={{
            uri: route?.params?.label==='Sharing Properties'?
           ( item?.propertyDetails?.gallery.length>0?item?.propertyDetails?.gallery[0]?.url:
            'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png')
            :(item?.propertyDetails?.gallery.length>0?item?.propertyDetails?.gallery[0]?.url 
            :'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png'  )            }}
          />
          <RNView style={
            {position:'absolute',
              width:'90%',
              height:px(130),
              backgroundColor:'#f0f0f0',
              marginTop:px(140),
              alignSelf:'center',
              borderRadius:px(10),
              justifyContent:'space-between'
            }}>
              <RNView style={styles.viewContainer}>
                <RNText style={styles.textTitleStyling}>property sharing</RNText>
                <RNView>
                  <RNView style={{backgroundColor:'#212529',height:px(30),width:px(90)
                    ,alignItems:'center',justifyContent:'center',borderTopLeftRadius:px(10),borderBottomLeftRadius:px(10)}}>
                  <RNText
                   style={[styles.textStyle,{color:'white'}]}>
                    {route?.params?.label==='Sharing Properties'?
                    formatNumberWithNotation(item?.propertyDetails?.rent_amount)
                    :formatNumberWithNotation(item?.propertyDetails?.property_price)}
                    </RNText>
                  </RNView>
                </RNView>
              </RNView>
              {route?.params?.label==='Investment Sharing'?
              <RNView style={styles.viewContainer}>
              <RNText style={styles.textTitleStyling}>Seeking Investment</RNText>
              <RNView>
              <RNText style={styles.textStyle}>{item?.investment_percent?.toFixed(2)+' %'}</RNText>
              </RNView>
            </RNView>
              :<></>}              
              <RNView style={styles.viewContainer}>
                <RNText style={styles.textTitleStyling}>property Type</RNText>
                <RNView>
                <RNText style={styles.textStyle}>{item?.propertyDetails?.property_type}</RNText>
                </RNView>
              </RNView>

              <TouchableOpacity 
              style={{alignSelf:'flex-end'}}
              onPress={()=>{
                navigation.navigate('PROPERTY_DETAILS', {
                  id: item?.property_loc_id,
                  owner: item?.propertyDetails?.owned_by,
                })
              }}>
                <RNText style={[styles.textStyle,{color:ColorTheme.nearLukBaseSecondaryColor3,marginBottom:px(5)}]}>{'View Details >'}</RNText>
              </TouchableOpacity>
          </RNView>
      </RNView>
    )
  }

  return (
    <Container backgroundColor="white" hasHeader={true} isTab={false}>
      <HeaderBar backPress={() => navigation?.goBack()} label={route?.params?.label} />
      {loading ? (
        <Loader size="large" color={ColorTheme.primary} />
      ) : (
        <RNView style={styles.mainContainer}>
          <RNView style={styles.miniContainer}>
            {route?.params?.label==='Investment Sharing'?
            <FlatList data={listOfInvestment}
            renderItem={renderSharingList} 
            onEndReached={()=>{
              investmentProperty(pageNo,10)
            }}
            ListEmptyComponent={
              <RNView style={styles.lastContainer}>
                <RNImage
                  source={require('@/assets/images/exclusive-service/comming-soon.gif')}
                  style={styles.commingImage}
                />
                <RNText style={styles.lastText}>No Data</RNText>
              </RNView>
            }
            />
            :route?.params?.label==='Sharing Properties'?
            <FlatList data={listOfSharing}
            renderItem={renderSharingList}
            onEndReached={()=>{
              sharingPropListApi(pageNo,10)
            }}
            ListEmptyComponent={
              <RNView style={styles.lastContainer}>
                <RNImage
                  source={require('@/assets/images/exclusive-service/comming-soon.gif')}
                  style={styles.commingImage}
                />
                <RNText style={styles.lastText}>No Data</RNText>
              </RNView>
            }
            />
            :
           <>
            <FlatList
            data={showData}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.contentView}
            renderItem={renderItem}
            // ListHeaderComponent={
            //   showData &&
            //   showData?.length > 0 && (
            //     <RNView style={styles.resultView}>
            //       <RNText style={styles.propertyText}>Showing results for {searchText} |</RNText>
            //       <RNText style={styles.propertyText}> {countData?.data?.count} Results</RNText>
            //     </RNView>
            //   )
            // }

            ListEmptyComponent={
              <RNView style={styles.lastContainer}>
                <RNImage
                  source={require('@/assets/images/exclusive-service/comming-soon.gif')}
                  style={styles.commingImage}
                />
                <RNText style={styles.lastText}>Coming Soon</RNText>
              </RNView>
            }
            onEndReached={() => {
              if (showData && showData?.length > 0) {
                globalSearch(initialData, Math.ceil(showData.length / 10) + 1, 10);
              }
            }}
            onEndReachedThreshold={0.1}
          />

          {isArray(showData) ? (
            <RNView style={styles.filterView}>
              <TouchableOpacity onPress={openFilterSheet} style={styles.touchableView}>
                <RNImage source={require('@/assets/images/userProfile/filter.png')} style={styles.filterImage} />
                <RNText style={styles.filterText}>Filters</RNText>
              </TouchableOpacity>
            </RNView>
          ) : (
            <RNView></RNView>
          )}
           </>
            }
            

          </RNView>
        </RNView>
      )}

      <Residential
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        globalSearch={data => {
          globalSearch(data);
          setInitialData(data);
        }}
        initialData={initialData}
        clearFilters={handleClearData}
        setFilterDetails={setInitialData}
        filterKey={filterKey}
        setFilterKey={setFilterKey}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        selectFilter={selectFilter}
      />

      <Land
        showLandFilters={showLandFilters}
        setShowLandFilters={setShowLandFilters}
        globalSearch={data => {
          globalSearch(data);
          setInitialData(data);
        }}
        initialData={initialData}
        clearFilters={handleClearData}
        setFilterDetails={setInitialData}
        filterKey={filterKey}
        setFilterKey={setFilterKey}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        selectFilter={selectFilter}
      />
      <Coliving
        showColivingFilters={showColivingFilters}
        setShowColivingFilters={setShowColivingFilters}
        globalSearch={data => {
          globalSearch(data);
          setInitialData(data);
        }}
        initialData={initialData}
        clearFilters={handleClearData}
        setFilterDetails={setInitialData}
        filterKey={filterKey}
        setFilterKey={setFilterKey}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        selectFilter={selectFilter}
      />
      <Commercial
        showCommercialFilters={showCommercialFilters}
        setShowCommercialFilters={setShowCommercialFilters}
        globalSearch={data => {
          globalSearch(data);
          setInitialData(data);
        }}
        initialData={initialData}
        clearFilters={handleClearData}
        setFilterDetails={setInitialData}
        filterKey={filterKey}
        setFilterKey={setFilterKey}
        activeKey={activeKey}
        setActiveKey={setActiveKey}
        selectFilter={selectFilter}
      />
    </Container>
  );
};

export default Explore;
