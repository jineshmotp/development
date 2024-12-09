import React, { useState } from 'react';
import { FlatList, ScrollView, TouchableOpacity } from 'react-native';
import { useToast } from 'react-native-toast-notifications';

import { useNavigation } from '@react-navigation/native';

import HeaderBar from '@/components/common/HeaderBar';
import ModalWrapper from '@/components/common/ModalWrapper';
import { Container } from '@/custom/Container';
import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';

import AllResponses from './AllResponses';
import ContactTab from './ContactTab';
import FavouriteTab from './FavouriteTab';
import ListingResponse from './ListingResponse';
import { styles } from './styles';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { px } from '@/utils';
import { useGetBuilderLeadsQuery } from '@/redux/builder/builderService';

const CustomRightIcon = ({ onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <RNImage source={require('@/assets/images/userProfile/filter.png')} style={styles.imgStyle} />
  </TouchableOpacity>
);
const MyLeads = () => {
  const toast = useToast();
  const navigation = useNavigation();
  //   const dispatch = useDispatch();
  const [showActionsheet, setShowActionsheet] = React.useState({
    show: false,
    data: '',
  });
  const [showFilters, setShowFilters] = useState(false);
  const [day, setDay] = useState(-7);

  const [isActive, setIsActive] = useState('All Responses');
  const selectedData = useAppSelector(getUserData)
  const { data: leadsData } = useGetBuilderLeadsQuery({});

  

  const handleSelection = day => {
    setDay(day);
    setShowFilters(false);
  };

  return (
    <Container isTab={false} hasHeader={true} backgroundColor="white">
      {isActive !== 'Listing Responses' ? (
        <HeaderBar
          backPress={() => navigation.goBack()}
          label={'MyLeads'}
          rightIcon={<CustomRightIcon onPress={() => setShowFilters(true)} />}
        />
      ) : (
        <HeaderBar backPress={() => navigation.goBack()} label={'My Leads'} />
      )}
      {selectedData?.role === 'BUILDER'?<RNView horizontal={true} showsHorizontalScrollIndicator={false}>
      <RNView style={styles.leadsContainer}>
                <FlatList
                style={{marginHorizontal:px(10)}}
                data={leadsData?.data}
                renderItem={({item})=>{
                  return(

                    <RNView style={[styles.leadsViewStyle,{justifyContent:'space-between'}]}>
                  <RNView>
                  <RNText style={styles.totalLeadsTextStyle}>Total no. of leads </RNText>
                  <RNText style={styles.totalLeadsLabelStyle}>{item?.totalLeads}</RNText>
                  </RNView>
                 <RNView>
                 <RNText style={styles.totalLeadsTextStyle}>Remaining leads </RNText>
                 <RNText style={styles.totalLeadsLabelStyle}>{item?.availableLeads}</RNText>
                 </RNView>
                </RNView>
                

                  )
                }}
                />
                <RNView></RNView>
              </RNView>
      </RNView>:
       <RNView style={styles.tabContainer}>
       <RNView style={styles.tabContainerView}>
         <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
           {['All Responses', 'Contacted', 'Favourite', 'Listing Responses'].map((item, ind) => {
             return (
               <TouchableOpacity
                 key={ind}
                 onPress={() => {
                   setIsActive(item);
                 }}
                 style={[styles.tabView, { borderBottomColor: isActive === item ? ColorTheme.primary : 'white' }]}>
                 <RNText style={styles.tabText}>{item}</RNText>
               </TouchableOpacity>
             );
           })}
         </ScrollView>
       </RNView>
     </RNView>}
     

      {isActive === 'All Responses' && <AllResponses day={day} />}
      {isActive === 'Contacted' && <ContactTab day={day} />}
      {isActive === 'Favourite' && <FavouriteTab day={day} />}
      {isActive === 'Listing Responses' && <ListingResponse />}
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

export default MyLeads;
