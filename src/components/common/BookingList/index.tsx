import React, { useEffect, useState } from 'react';
import { FlatList, RefreshControl, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Feather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';

import { BOOKING_TAB, BOOKING_TAB_CATEGORY } from '@/constants/function/bookingTab.helper';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import { activateItemByKey } from '../../../constants/function/property.helperFunctions';
import BookingCard from '../BookingCard';
import HeaderBar from '../HeaderBar';
import ListEmptyComponent from '../ListEmptyComponent';
import { style } from './styles';

type Props = {
  headerShow?: boolean;
};

const BookingList: React.FC<Props> = ({ headerShow = true }) => {
  const navigation = useNavigation();
  const [bookingTab, setBookingTab] = useState(BOOKING_TAB);
  const [bookingCategoryTab, setBookingCategoryTab] = useState(BOOKING_TAB_CATEGORY);
  const [tabkey, setTabKey] = useState<string>('Upcoming');
  const [categoryTabkey, setCategoryTabKey] = useState<string>('Parking');

  const [bookingData, setBookingData] = useState([]);
  const [bookingLoader, setBookingLoader] = useState(false);
  //   const selectedData = useSelector((state: any) => state?.loginReducer);
  const [pageNumber, setPageNumber] = useState<number>(1);

  const loadNextPage = () => {
    setPageNumber(pageNumber + 1);
  };

  const activateBookingCategoryTab = (item: any) => {
    setCategoryTabKey(item.key);
    const shallow = [...bookingCategoryTab];
    const activated = activateItemByKey(shallow, item.key);
    setBookingCategoryTab(activated);
  };
  const activateBookingTab = (item: any) => {
    setTabKey(item.key);
    const shallow = [...bookingTab];
    const activated = activateItemByKey(shallow, item.key);
    setBookingTab(activated);
  };

  //   const fetcgBooking = async () => {
  //     setBookingLoader(true);
  //     try {
  //       const response = await Apis.getBookingApi({
  //         user: selectedData?.user?.user?._id,
  //         user_type: 'user',
  //         booking_type: categoryTabkey,
  //         history_type: tabkey,
  //         pageSize: `${pageNumber * 10}`,
  //         pageNumber: `${pageNumber}`,
  //       });

  //       console.log('response', response?.data);

  //       setBookingLoader(false);
  //       // if (response?.data?.status && isArray(response?.data?.data)) {
  //       setBookingData(prev => [...prev, response?.data?.data ? response?.data?.data : []]);
  //       // }
  //     } catch (e) {
  //       console.log('fetcgBooking', e.response.data);
  //       setBookingLoader(false);
  //       setBookingData([]);
  //     }
  //   };

  useEffect(() => {
    // fetcgBooking();
  }, [tabkey, categoryTabkey]);
  // console.log('bookingData==========', bookingData);
  useEffect(() => {
    switch (categoryTabkey) {
      case 'Parking':
        // console.log('hyy1========>');
        break;
      case 'Play Ground':
        // console.log('hyy2========>');
        break;
      case 'Event Space':
        // console.log('hyy3========>');
        break;
      case 'Service Apartment':
        // console.log('hyy4========>');
        break;
      case 'Coworking Space':
        // console.log('hyy5========>');
        break;
      default:
    }
  }, [categoryTabkey]);

  // if (bookingLoader) {
  //   return <Loader size={"large"} />;
  // }

  return (
    <Container isTab={false} hasHeader={headerShow} backgroundColor="white">
      {headerShow && (
        <HeaderBar
          backIcon={<Feather name="chevron-left" size={24} color="black" />}
          backPress={() => {
            navigation.goBack();
          }}
          rightIcon={<AntDesign name="search1" size={20} color="black" />}
          rightPress={() => {
            // navigation.navigate(ROUTES.GlobalSearchScreen);
          }}
          label="My Bookings"
        />
      )}

      {/* ======= Category Tabs ========== */}
      <RNView style={style.categoryContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} nestedScrollEnabled>
          {bookingCategoryTab.map(
            (
              item: {
                label: string;
                key: string;
                active: boolean;
              },
              i
            ) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    activateBookingCategoryTab(item);
                  }}
                  style={[
                    style.categoryChips,
                    {
                      backgroundColor: item.active ? ColorTheme.white : 'transparent',
                    },
                  ]}
                  key={i}>
                  <RNText
                    style={[
                      style.categoryChipsText,
                      {
                        color: item.active ? ColorTheme.primaryColor : ColorTheme.nearLukGray,
                      },
                    ]}>
                    {item.label}
                  </RNText>
                </TouchableOpacity>
              );
            }
          )}
        </ScrollView>
      </RNView>

      {/* ======== Tabs ======== */}
      <RNView style={style.tabContainer}>
        <RNView style={style.contentContainerStyle}>
          {bookingTab.map((item, i) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  activateBookingTab(item);
                }}
                style={[
                  style.tabCategoryChips,
                  {
                    borderBottomWidth: item.active ? 2 : 0,
                    borderBottomColor: item.active ? ColorTheme.primaryColor : ColorTheme.nearLukGray,
                  },
                ]}
                key={i}>
                <RNText
                  style={[
                    style.tabCategoryChipsText,
                    {
                      color: item.active ? 'black' : ColorTheme.nearLukGray,
                    },
                  ]}>
                  {item.label}
                </RNText>
              </TouchableOpacity>
            );
          })}
        </RNView>
      </RNView>

      <RNView style={style.flatView}>
        <FlatList
          bounces={true}
          initialNumToRender={10}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={style.flatContent}
          data={bookingData}
          renderItem={({ item }) => {
            return <BookingCard item={item} cardfor={tabkey} />;
          }}
          extraData={bookingData}
          keyExtractor={item => item._id}
          onEndReached={loadNextPage}
          onEndReachedThreshold={0.1}
          refreshControl={
            <RefreshControl
              onRefresh={() => {
                // console.log('loading...');
              }}
              refreshing={bookingLoader}
            />
          }
          ListEmptyComponent={() => <ListEmptyComponent text={'No Booking Found'} type="default" />}
        />
      </RNView>
    </Container>
  );
};

export default BookingList;
