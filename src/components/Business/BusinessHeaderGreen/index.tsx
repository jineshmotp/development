import React, { memo } from 'react';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme, SIZES } from '@/theme';

import { styles } from './styles';

interface greenHeaderProp {
  heading?: string;
  description?: string;
  pageno?: number;
  totalstepno?: number;
  stepheading?: string;
}

const BusinessHeaderGreen: React.FC<greenHeaderProp> = ({ heading, description, pageno, totalstepno, stepheading }) => {
  return (
    <>
      <RNView style={styles.initialContainer}>
        <RNText style={styles.initialText}>{heading}</RNText>
        <RNText style={styles.lineText}>{description}</RNText>
      </RNView>

      <RNView style={styles.HeaderView}>
        <RNView style={styles.LineView}>
          <RNView style={pageno >= 1 ? styles.headerLineSelection : styles.headerLine} />
          <RNView style={pageno >= 2 ? styles.headerLineSelection : styles.headerLine} />
          <RNView style={pageno >= 3 ? styles.headerLineSelection : styles.headerLine} />
        </RNView>

        <RNView style={styles.StepTextView}>
          <RNText style={styles.StepText}>
            Step {pageno} of {totalstepno} :{'   '}
            <RNText style={[styles.StepText, { color: '#333333', fontSize: SIZES.small, fontWeight: '600' }]}>
              {stepheading}
            </RNText>
          </RNText>
        </RNView>
      </RNView>
    </>
  );
};

export default memo(BusinessHeaderGreen);
