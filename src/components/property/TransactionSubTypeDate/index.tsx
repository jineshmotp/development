import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import moment from 'moment';

import Divider from '@/components/common/Divider';
import PropertyCategoryChips from '@/components/common/PropertyCategoryChips';
import SectionHoc from '@/components/common/SectionHoc';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

import { styles } from './styles';

interface PropertyProps {
  setDetails?: any;

  data?: any;
  details?: any;
  control?: any;
  controlConstraints?: any;
  checkingData?: any;
  errors?: any;
  activefunction?: any;
}

const TransactionSubTypeDate: React.FC<PropertyProps> = ({
  control,
  controlConstraints,
  checkingData,
  data,
  errors,
  setDetails,

  details,
  activefunction,
}) => {
  return (
    <>
      {data.length > 0 && (
        <RNView>
          <RNView style={styles.container}>
            <SectionHoc title="" mandatory={true}>
              <RNView
                style={{
                  flexDirection: 'row',
                  flexWrap: 'wrap',
                  gap: 10,
                }}>
                {data.length > 0 && (
                  <PropertyCategoryChips
                    item={{
                      label: checkingData.ready_for_possession_by
                        ? String(moment(checkingData.ready_for_possession_by).format('YYYY-MM-DD'))
                        : 'Available From',
                    }}
                    onPress={() => activefunction()}
                    rightIcon={<AntDesign name="calendar" size={20} color="gray" />}
                  />
                )}
              </RNView>
            </SectionHoc>
          </RNView>

          <RNView style={styles.containerDivider}>
            <Divider
              borderColor="#D9D6D6"
              style={{
                marginTop: px(20),
                gap: px(10),
              }}
            />
          </RNView>
        </RNView>
      )}
    </>
  );
};

export default TransactionSubTypeDate;
