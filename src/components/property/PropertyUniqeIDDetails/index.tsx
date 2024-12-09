import React, { useEffect, useState } from 'react';

import { uniqueIdCreation } from '@/constants/function/property.helper';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

interface PropertyAreaProps {
  details?: any;
  goBack?: () => void;
}

const PropertyUniqueIDDetails: React.FC<PropertyAreaProps> = ({ details }) => {
  // console.log('Details -->', details);

  const [uniqId, setUniqId] = useState(() => uniqueIdCreation(details?.createdAt, details?._id));

  useEffect(() => {
    let uidval;
    if (details?.business_id) {
      uidval = 'NRLB';
    } else {
      uidval = 'NRLK';
    }

    const uniqidval = `${uidval}${uniqueIdCreation(details?.createdAt, details?._id)}`;
    setUniqId(uniqidval);
  }, [details]);

  return (
    <RNView>
      <RNView style={styles.containerViewStyle}>
        <RNView style={{ marginBottom: 20 }}>
          {/* <RNText style={styles.selectionHeader}>Property description</RNText> */}
        </RNView>

        <RNView style={styles.sectionView}>
          <RNText style={styles.descriptionText}>{uniqId}</RNText>
        </RNView>
      </RNView>
    </RNView>
  );
};

export default PropertyUniqueIDDetails;
