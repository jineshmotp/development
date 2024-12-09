import React from 'react';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  text?: string;
  type?: string;
};

const ListEmptyComponent: React.FC<Props> = ({ text = 'No data found', type = 'default' }) => {
  const changeIcons = type => {
    switch (type) {
      case 'default':
        return <RNView></RNView>;

      case 'chat':
        return <RNImage source={require('@/assets/images/property/noproperty.png')} style={styles.noProperty} />;

      case 'notification':
        return <RNImage source={require('@/assets/images/property/noproperty.png')} style={styles.noProperty} />;

      case 'gallery':
        return <RNImage source={require('@/assets/images/property/noproperty.png')} style={styles.noProperty} />;

      case 'property':
        return <RNImage source={require('@/assets/images/property/noproperty.png')} style={styles.noProperty} />;

      case 'post':
        return <RNImage source={require('@/assets/images/property/noproperty.png')} style={styles.noProperty} />;
    }
  };
  return (
    <RNView style={styles.noDataView}>
      {changeIcons(type)}
      <RNText style={styles.noDataText}>{text}</RNText>
    </RNView>
  );
};

export default ListEmptyComponent;
