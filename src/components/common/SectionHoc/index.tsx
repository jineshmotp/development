import React, { ReactNode } from 'react';
import { Text } from 'react-native';

import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { deviceWidth } from '@/utils';

import Divider from '../Divider';
import { styles } from './styles';

interface WithTitleProps {
  title?: string;
  mandatory?: boolean; // Change Boolean to boolean
  children?: ReactNode;
}

const withTitle = (WrappedComponent: React.FC<WithTitleProps>) => {
  return ({ title, mandatory, children }: WithTitleProps) => {
    return (
      <RNView>
        {title !== '' ? (
          <>
            <RNView style={styles.sectionHocStyle}>
              <Text style={[styles.sectionHocHeading]}>{title}</Text>
              {mandatory && <Text style={styles.sectionHocHeadingMandatory}>*</Text>}
            </RNView>

            <Divider
              dividerWidth={deviceWidth / 3.5}
              dividerHeight={1.5}
              alignSelf="flex-start"
              borderColor={ColorTheme.primary}
              style={{
                marginBottom: 20,
                marginTop: 3,
              }}
            />
          </>
        ) : (
          <>
            <RNView style={styles.sectionHocStyle}>
              <RNView
                style={{
                  marginBottom: 0,
                  marginTop: 3,
                }}></RNView>
            </RNView>
          </>
        )}

        <WrappedComponent title={title} mandatory={mandatory}>
          {children}
        </WrappedComponent>
      </RNView>
    );
  };
};

// Usage of the HOC
const SectionHoc: React.FC<WithTitleProps> = withTitle(({ children }: WithTitleProps) => {
  return <RNView>{children}</RNView>;
});

export default SectionHoc;
