import React, { useState } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import moment from 'moment';

import Divider from '@/components/common/Divider';
import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
import PropertyList from '@/components/common/PropertyList';
import ResponseCard from '@/components/common/ResponseCard';
import { formatNumberWithNotation } from '@/constants/function/property.helper';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { RootStackParamList } from '@/routes/RootNavigator';
import { px } from '@/utils';

import AllResponses from '../MyLeads/AllResponses';
import ContactTab from '../MyLeads/ContactTab';
import AllPropertyResponse from './AllPropertyResponse';
import { styles } from './styles';

const ListingResponse = () => {
  const navigation = useNavigation();
  const route = useRoute<RouteProp<RootStackParamList, 'LISTING_RESPONSE'>>();
  const [showFilters, setShowFilters] = useState(false);
  const [day, setDay] = useState(-7);

  // console.log('route++', route?.params?.data);
  const propertyData = route?.params?.data;

  const handleSelection = day => {
    setDay(day);
    setShowFilters(false);
  };
  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      <HeaderBar backPress={() => navigation.goBack()} label={'Listing Responses'} />
      <RNView style={styles.topView}>
        <RNView style={styles.container}>
          <RNView style={styles.propView}>
            <RNView style={styles.propDetail}>
              <RNText style={styles.propName}>{propertyData?.property?.property_name}</RNText>
              <RNText style={styles.priceText}>
                {`₹ ${formatNumberWithNotation(propertyData?.property?.property_price)}`}
              </RNText>
            </RNView>
            <RNView style={styles.propLoc}>
              <RNView style={styles.textContainer}>
                <Ionicons name="time" size={px(14)} color="black" />
                <RNText
                  style={
                    styles.postedText
                  }>{`Posted on : ${moment(propertyData?.createdAt).format('DD-MM-YYYY hh:mm')}`}</RNText>
              </RNView>
              <RNView style={styles.textContainer}>
                <Ionicons name="location-sharp" size={px(14)} color="black" />
                <RNText style={styles.postedText}>{propertyData?.property?.locality}</RNText>
              </RNView>
            </RNView>
          </RNView>
          <RNView style={styles.filterView}>
            <RNView></RNView>
            <TouchableOpacity onPress={() => setShowFilters(!showFilters)}>
              <RNImage source={require('@/assets/images/userProfile/filter.png')} style={{ width: 20, height: 20 }} />
            </TouchableOpacity>
          </RNView>
          {/* <FlatList
            data={[1, 2, 3, 4, 5, 6, 7, 8]}
            renderItem={({ item }) => {
              return (
                <RNView style={styles.cardView}>
                  <ResponseCard />
                </RNView>
              );
            }}
            style={styles.flatListStyle}
            ItemSeparatorComponent={() => (
              <RNView style={styles.dividerView}>
                <Divider style={styles.divider} />
              </RNView>
            )}
            // refreshControl={
            //   <RefreshControl
            //     onRefresh={() => {
            //     //   dispatch(
            //     //     userAction.fetchUserLeads(selectedData?.user?.user?._id)
            //     //   );
            //     }}
            //     refreshing={userleadsloading}
            //   />
            // }
            ListEmptyComponent={
              <RNView style={styles.noDataView}>
                <RNText style={styles.noDataText}>No Leads Found</RNText>
              </RNView>
            }
          /> */}
          <AllPropertyResponse day={day} propertyId={route?.params?.propertyId} />
        </RNView>
      </RNView>
      <ModalWrapper
        header={false}
        modalStyle={styles.filterModal}
        visible={showFilters}
        onClose={() => setShowFilters(!showFilters)}
        modalHeight={200}
        modalWidth={200}>
        <RNView style={styles.ModalView}>
          <TouchableOpacity style={styles.optionView} onPress={() => handleSelection(-1)}>
            <RNText style={styles.optionText}>Yesterday</RNText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionView} onPress={() => handleSelection(-7)}>
            <RNText style={styles.optionText}>Last 7 days</RNText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.optionView} onPress={() => handleSelection(-30)}>
            <RNText style={styles.optionText}>Last 30 days</RNText>
          </TouchableOpacity>
        </RNView>
      </ModalWrapper>
    </Container>
  );
};

export default ListingResponse;
