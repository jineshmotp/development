import { TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

import { styles } from './styles';

type Props = {
  leftIcon?: any;
  label?: any;
  onPress?: any;
};
const PersonalInfoCard: React.FC<Props> = ({ leftIcon, label, onPress }) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={styles.topView}>
        {label === 'Personal Info' ? (
          <AntDesign name="idcard" size={24} color="black" />
        ) : label === 'My Properties' ? (
          <FontAwesome name="building-o" size={24} color="black" />
        ) : label === 'My Favourite' ? (
          <AntDesign name="hearto" size={24} color="black" />
        ) : label === 'Chat' ? (
          <Ionicons name="chatbox-outline" size={24} color="black" />
        ) : label === 'Logout' ? (
          <AntDesign name="logout" size={21} color="black" />
        ) : label === 'Investment Sharing' ? (
          <MaterialIcons name="attach-money" size={24} color="black" />
        ) : label === 'Subscriptions' ? (
          <RNImage
            source={require('@/assets/images/userProfile/subscription.png')}
            style={{ width: px(24), height: px(24) }}
          />
        ) : label === 'Payments' ? (
          <RNImage
            source={require('@/assets/images/userProfile/payments.png')}
            style={{ width: px(24), height: px(24) }}
          />
        ) : label === 'My Leads' ? (
          <AntDesign name="inbox" size={21} color="black" />
        ) : label === 'Pending Verified' ? (
          <Ionicons name="stopwatch-outline" size={24} color="black" />
        ) : label === 'My Bidding' ? (
          <Ionicons name="stopwatch-outline" size={24} color="black" />
        ) : label === 'My Booking' ? (
          <RNImage
            source={require('../../../assets/images/business/booking-filled.png')}
            style={{
              height: 25,
              width: 25,
            }}
          />
        ) : (
          ''
        )}

        <RNView style={styles.textContainer}>
          {leftIcon}
          <RNText style={styles.textStyle}>{label}</RNText>
        </RNView>
      </TouchableOpacity>
    </>
  );
};

export default PersonalInfoCard;
