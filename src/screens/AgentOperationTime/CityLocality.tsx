import React, { Fragment, useEffect, useState } from 'react';
import { useToast } from 'react-native-toast-notifications';
import AntDesign from 'react-native-vector-icons/AntDesign';

import DetailSectionHeader from '@/components/common/DetailSectionHeader';
import MultiSelectDropdown from '@/components/common/MultiSelectDropdown';
import SingleSelectDropdown from '@/components/common/SingleSelectDropdown';
import RNView from '@/custom/RNView';
import { useLazyCityListBySearchQuery, useLazyLocalityByCityQuery } from '@/redux/login/loginService';

type Props = {
  agentInfo: any;
  setAgentInfo: any;
  locationDetail: any;
  index: number;
  cityListData?: { value: string; label: string }[];
};

const CityLocality: React.FC<Props> = ({ ...Props }) => {
  const { agentInfo, setAgentInfo, locationDetail, index, cityListData } = Props;

  const toast = useToast();

  const [getCityListApi] = useLazyCityListBySearchQuery();
  const [getLocalityApi] = useLazyLocalityByCityQuery();

  const [tempInfo, setTempInfo] = useState<any>({ ...agentInfo });
  const [cityList, setCityList] = useState<any>(cityListData);
  const [localityList, setLocalityList] = useState([]);

  useEffect(() => {
    setTempInfo({ ...agentInfo });
  }, [agentInfo]);

  const onChangeAreaFields = (fieldName: string, val: any, locationDetail: any, index: number) => {
    // console.log('onChangeAreaFields++', val, locationDetail);
    const tempArr = [...tempInfo.location_details];
    const tempObj = { ...locationDetail };
    tempObj[fieldName] = val;
    tempArr[index] = { ...tempObj };
    setAgentInfo({ ...tempInfo, location_details: [...tempArr] });
  };

  const getCityList = (val: string) => {
    if (val && val.length !== 0) {
      setCityList(
        cityList?.map((city: any) => {
          return city;
        })
      );
      // getCityListApi(val).then(response => {
      //   if (response?.data) {
      //     if (response?.data.length !== 0) {
      //       console.log(response?.data);
      //       setCityList(
      //         response?.data.map((city: any) => {
      //           return { value: city.city, label: city.city };
      //         })
      //       );
      //     } else {
      //       setCityList([]);
      //       setLocalityList([]);
      //       toast.show('No data found', {
      //         type: 'custom_toast',
      //         animationDuration: 100,
      //         data: {
      //           title: 'Message',
      //         },
      //         duration: 3000,
      //       });
      //     }
      //   } else {
      //     setCityList([]);
      //     setLocalityList([]);
      //     toast.show('Something went wrong.', {
      //       type: 'custom_toast',
      //       animationDuration: 100,
      //       data: {
      //         title: 'Message',
      //       },
      //       duration: 3000,
      //     });
      //   }
      // });
    }
  };

  const getLocality = (val: string, locationDetail: any, index: number) => {
    onChangeAreaFields('city', val, locationDetail, index);
    setCityList([{ value: val, label: val }]);
    getLocalityApi(val).then(response => {
      if (response?.data?.data?.areas) {
        if (response?.data?.data?.areas.length !== 0) {
          setLocalityList(
            response?.data?.data?.areas.map((city: any) => {
              return { value: city, label: city };
            })
          );
        } else {
          setLocalityList([]);
          toast.show('No data found.', {
            type: 'custom_toast',
            animationDuration: 100,
            data: {
              title: 'Message',
            },
            duration: 3000,
          });
        }
      } else {
        setLocalityList([]);
        toast.show('Something went wrong', {
          type: 'custom_toast',
          animationDuration: 100,
          data: {
            title: 'Message',
          },
          duration: 3000,
        });
      }
    });
  };

  return (
    <Fragment key={'City Renderer ' + index + locationDetail.city}>
      <RNView
        style={{ marginVertical: 10, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <DetailSectionHeader Heading={'Area ' + (index + 1)} />
        {tempInfo.location_details.length >= 2 && (
          <AntDesign
            name="close"
            style={{ right: 20 }}
            size={18}
            color="black"
            onPress={() => {
              let tempArr = [...tempInfo.location_details];
              tempArr.splice(index, 1);
              setAgentInfo({ ...tempInfo, location_details: [...tempArr] });
            }}
          />
        )}
      </RNView>
      <SingleSelectDropdown
        data={cityList}
        value={locationDetail?.city}
        onChange={(val: any) => {
          getLocality(val?.value, locationDetail, index);
        }}
        placeholder="Select City"
        searchPlaceholder="Search for cities..."
        onSearchTxt={(val: string) => {
          getCityList(val);
        }}
      />
      <RNView style={{ height: 20 }} />
      <MultiSelectDropdown
        data={localityList}
        value={locationDetail?.locality}
        onChange={(val: any) => {
          onChangeAreaFields('locality', val, locationDetail, index);
        }}
        placeholder={locationDetail.locality.length === 0 ? 'Select Locality' : 'Selected Localities are'}
        searchPlaceholder="Search for Localities..."
      />
    </Fragment>
  );
};

export default CityLocality;
