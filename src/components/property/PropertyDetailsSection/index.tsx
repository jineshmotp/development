import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';

import SectionHoc from '@/components/common/SectionHoc';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { deviceWidth } from '@/utils';

import { styles } from './styles';

interface ProptypeDetailsProps {
  data?: any[];
  furnishingStatus: any;
  activefunction?: any;
}

const PropertyDetailsSection: React.FC<ProptypeDetailsProps> = ({ data, activefunction, furnishingStatus }) => {
  const [furnitems, setFurnItems] = useState(data);

  useEffect(() => {
    // console.log(' fur value ->', data);

    setFurnItems(data);
  }, [data]);

  return (
    furnitems?.length > 0 && (
      <RNView style={styles.container}>
        {/* <SectionHoc title="" mandatory={false}> */}
        {furnitems?.length > 0 && (
          <RNView style={styles.sectionView}>
            <RNText>Furnishing Details</RNText>
            <RNView style={styles.subView}>
              {data?.map((item: any, i) => {
                return (
                  <RNText
                    key={i}
                    style={{
                      fontWeight: '500',
                    }}>
                    {item?.count} {item?.label} ,
                  </RNText>
                );
              })}
            </RNView>
            {furnitems?.length > 0 && (
              <TouchableOpacity onPress={() => activefunction(furnishingStatus)} style={styles.addMoreTouchable}>
                <RNText style={styles.addmoreText}>+ Add more</RNText>
              </TouchableOpacity>
            )}
          </RNView>
        )}
        {/* </SectionHoc> */}
      </RNView>
    )
  );
};

export default PropertyDetailsSection;
