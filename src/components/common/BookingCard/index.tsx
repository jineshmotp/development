import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import moment from 'moment';

import CommonButton from '@/custom/CommonButton';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import Divider from '../Divider';
import { styles } from './styles';

type Props = {
  item: any;
  cardfor?: string;
};
const BookingCard: React.FC<Props> = ({ item, cardfor = 'upcoming' }) => {
  // console.log('BookingCard', item);
  return (
    <RNView style={styles.container}>
      <RNView style={styles.containerChild}>
        <RNView style={styles.headerView}>
          <RNImage
            source={{
              uri: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=2662&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            }}
            style={styles.profileStyle}
          />
          <RNText style={[styles.bookingDate]}>12th</RNText>
          <RNText style={styles.bookingDay}>Wednesday</RNText>
          <Divider dividerWidth={70} dividerHeight={0.4} borderColor={ColorTheme.nearLukGray} />
          <RNText style={styles.bookingDay}>Dec 2023</RNText>
        </RNView>
        <RNView style={{ paddingLeft: 5 }}>
          <RNText style={styles.hallName}>Mayank</RNText>
          <RNText style={styles.hall}>Hall: {item?.hall?.name}</RNText>
          <RNText style={styles.hall}>Location: Kondapur</RNText>
          <RNText style={styles.hall}>Booking Amount: ₹ 50,000</RNText>
          <RNText style={styles.hall}>Ocassion: Wedding</RNText>
          <RNText style={styles.hall}>No. of guests : 500</RNText>
          <RNText style={styles.hall}>Food Type : Veg & Nonveg</RNText>
          <RNText style={styles.hall}>Beverages : Non Alcohol</RNText>
          <RNText style={styles.hall}>
            Date & Time : : {moment(item?.start_date).format('DD-MM-YYYY')}, to{' '}
            {moment(item?.end_date).format('DD-MM-YYYY')}
          </RNText>
        </RNView>
      </RNView>
      <RNView style={styles.footerContainer}>
        {cardfor === 'Upcoming' ? (
          <CommonButton textStyle={styles.btnText} title="Cancel Booking" style={styles.cancelBtn} />
        ) : cardfor === 'Completed' ? (
          <RNView style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((item, i) => (
              <AntDesign name="staro" key={i} size={22} color={ColorTheme.nearLukGray} />
            ))}
          </RNView>
        ) : cardfor === 'Cancelled' ? (
          <CommonButton textStyle={styles.btnText} title="Book Again" style={styles.againBtn} />
        ) : null}
      </RNView>
    </RNView>
  );
};

export default BookingCard;
