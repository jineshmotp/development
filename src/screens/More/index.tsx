import React from 'react';
import { ScrollView } from 'react-native';

import MoreScreenElement from '@/components/more/MoreScreenElement';
import { drawerContentData } from '@/constants/more.helper';
import { Container } from '@/custom/Container';
import RNView from '@/custom/RNView';

import { styles } from './styles';

const MenuScreen = () => {
  return (
    <Container isTab={false} hasHeader={false} backgroundColor="#DFDFDF">
      <ScrollView style={styles.scroll}>
        <RNView style={styles.topView}>
          <RNView style={styles.listContainer}>
            {drawerContentData.map((item: any, i) => {
              return <MoreScreenElement item={item} key={i} type={item?.type} propertyType={item?.propertyType} 
              propertyFor={item?.propertyFor}
              />;
            })}
          </RNView>
        </RNView>
      </ScrollView>
    </Container>
  );
};

export default MenuScreen;
