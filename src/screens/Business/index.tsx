import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView } from 'react-native';

import { useNavigation } from '@react-navigation/native';

import BusinessCard from '@/components/Business/BusinessCard';
import Loader from '@/components/common/Loader';
import { Container } from '@/custom/Container';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

// const city = 'hyderabad';
const Business = () => {
  const navigation = useNavigation();
  const [businessList, setBusinessList] = useState([
    { label: 'Parking', count: 1000 },
    { label: 'Play Ground', count: 1000 },
    { label: 'Event Space', count: 1000 },
    { label: 'Service Apartment', count: 1000 },
    { label: 'CoWorking Space', count: 1000 },
  ]);
  const [loader, setLoader] = useState(false);
  //   useEffect(() => {
  //     const fetchBusinessListByCategory = async () => {
  //       try {
  //         setLoader(true);
  //         const response: any = await Apis.getBusinessListApi(city);
  //         setBusinessList(response?.data?.data);
  //         setLoader(false);
  //       } catch (e) {
  //         setLoader(false);
  //       }
  //     };
  //     fetchBusinessListByCategory();
  //   }, []);

  useEffect(() => {
    // console.log("business list value : ", businessList);
  }, []);

  if (loader) {
    return <Loader size={'large'} />;
  }
  return (
    <Container isTab={false} hasHeader={false} backgroundColor="white">
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scroll}>
        <RNView>
          <ImageBackground style={styles.bgImg} source={require('@/assets/images/customImage/hyderabad.png')} />
          <RNView style={styles.imgView}>
            <RNText style={styles.infoText}>
              Hyderabad has numerous hotels and banquet halls that offer event spaces for various occasions. These
              venues often provide catering services and can accommodate both small and large gatherings.
            </RNText>
          </RNView>
        </RNView>

        <RNView style={styles.topView}>{businessList?.map((item, i) => <BusinessCard key={i} item={item} />)}</RNView>
      </ScrollView>
    </Container>
  );
};

export default Business;
