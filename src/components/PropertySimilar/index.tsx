import React, { memo } from 'react';
import { TouchableOpacity, ViewStyle } from 'react-native';
import { LinearGradient } from 'react-native-linear-gradient';

import { useNavigation } from '@react-navigation/native';

import { formatNumberWithNotation } from '@/constants/function/property.helper';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';

import { styles } from './styles';

type Props = {
  data?: any;
  containerStyle?: ViewStyle;
  scrollToTop?: any;
};

const SimilarPropertiesCard: React.FC<Props> = ({ data, containerStyle, scrollToTop }) => {
  //   console.log('data =======>', data);

  const navigation = useNavigation();
  const selectedData = useAppSelector(getUserData);

  return (
    <LinearGradient colors={['rgba(255, 255, 255, 1)', '#C9FCFF']} style={[styles.container, containerStyle]}>
      <RNView style={styles.rowContainer}>
        <RNView style={styles.imageContainer}>
          {data?.property?.gallery?.length === 0 ? (
            <RNImage
              resizeMode="cover"
              source={{
                uri:
                  data?.owned_by === selectedData?._id
                    ? 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/upload-property968276.png'
                    : 'https://nearluk-media.s3.ap-south-1.amazonaws.com/nearluk-dev/Frame%201024900966.png',
              }}
              style={styles.imageStyle}
            />
          ) : (
            <RNImage
              resizeMode="cover"
              source={{
                uri:
                  data?.property?.gallery[0]?.url ||
                  'https://images.pexels.com/photos/25649809/pexels-photo-25649809/free-photo-of-colors.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
              }}
              style={styles.imageStyle}
            />
          )}
          {/* <RNImage
            resizeMode="cover"
            source={{
              uri:
                data?.property?.gallery[0]?.url ||
                'https://images.pexels.com/photos/25649809/pexels-photo-25649809/free-photo-of-colors.jpeg?auto=compress&cs=tinysrgb&w=800&lazy=load',
            }}
            style={styles.imageStyle}
          /> */}
          <RNView style={styles.reraView}>
            {data?.property?.iwant == 'Rent' ? (
              <RNText style={styles.reraText}>₹ {`${formatNumberWithNotation(data?.property?.rent_amount)}`} </RNText>
            ) : (
              <RNText style={styles.reraText}>
                ₹ {`${formatNumberWithNotation(data?.property?.property_price)}`}{' '}
              </RNText>
            )}
          </RNView>
        </RNView>
        <RNView style={styles.imgContainer}>
          <RNView style={styles.rowView}>
            <RNView style={styles.flexView}>
              <RNText numberOfLines={2} style={styles.propertyText}>
                {data?.property?.property_name || 'Sunshine Destino'}
              </RNText>
            </RNView>
          </RNView>

          <RNText style={styles.propLocality} numberOfLines={2}>
            {data?.property?.description || 'by Sunshine Developers'}
          </RNText>
          {data?.property?.bhk ? (
            <RNView style={styles.bhkView}>
              <RNText style={styles.bhkText}>{data?.property?.bhk}</RNText>
            </RNView>
          ) : (
            <RNView></RNView>
          )}

          <TouchableOpacity
            style={styles.btnView}
            onPress={() => {
              navigation.navigate('PROPERTY_DETAILS', { id: data?._id, owner: data?.owned_by });
            //   scrollToTop();
            }}>
            <RNText style={styles.btnText}>View Details</RNText>
          </TouchableOpacity>
        </RNView>
      </RNView>
    </LinearGradient>
  );
};

export default memo(SimilarPropertiesCard);
