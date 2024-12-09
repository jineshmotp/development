import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

import { ColorTheme } from '@/theme';

import { styles } from './styles';

type Propertyheadertickprop = {
  currentStep?: number;
  bubbleclick?: any;
};

const PropertyHeaderTick = ({ currentStep, bubbleclick }: Propertyheadertickprop) => {
  // Assuming each step increments the progress by 20%
  const progress = currentStep * 20;
  // console.log('value : ', currentStep);

  return (
    <View style={styles.headerViewStyle}>
      <TouchableOpacity
        //onPress={() => bubbleclick(1)}
        style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.baseDesign}>
            <View
              style={
                progress === 20
                  ? styles.selectedpage
                  : null || progress === 40
                    ? styles.nextpage
                    : null || progress === 60
                      ? styles.nextpage
                      : null || progress === 80
                        ? styles.nextpage
                        : null || progress === 100
                          ? styles.nextpage
                          : null
              }>
              {progress === 40 || progress === 60 || progress === 80 || progress === 100 ? (
                <Entypo name="check" size={15} color={ColorTheme.white} />
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.mainView}>
        <View style={styles.headerLine} />
      </View>

      <TouchableOpacity
        // onPress={() => bubbleclick(2)}
        style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.baseDesign}>
            <View
              style={
                progress === 40
                  ? styles.selectedpage
                  : null || progress === 60
                    ? styles.nextpage
                    : null || progress === 80
                      ? styles.nextpage
                      : null || progress === 100
                        ? styles.nextpage
                        : null
              }>
              {progress === 60 || progress === 80 || progress === 100 ? (
                <Entypo name="check" size={15} color={ColorTheme.white} />
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.mainView}>
        <View style={styles.headerLine} />
      </View>

      <TouchableOpacity
        // onPress={() => bubbleclick(3)}
        style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.baseDesign}>
            <View
              style={
                progress === 60
                  ? styles.selectedpage
                  : null || progress === 80
                    ? styles.nextpage
                    : null || progress === 100
                      ? styles.nextpage
                      : null
              }>
              {progress === 80 || progress === 100 ? <Entypo name="check" size={15} color={ColorTheme.white} /> : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.mainView}>
        <View style={styles.headerLine} />
      </View>

      <TouchableOpacity
        //onPress={() => bubbleclick(4)}
        style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.baseDesign}>
            <View style={progress === 80 ? styles.selectedpage : null || progress === 100 ? styles.nextpage : null}>
              {progress === 100 ? <Entypo name="check" size={15} color={ColorTheme.white} /> : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <View style={styles.mainView}>
        <View style={styles.headerLine} />
      </View>

      <TouchableOpacity
        //onPress={() => bubbleclick(5)}
        style={styles.mainView}>
        <View style={styles.mainSubView}>
          <View style={styles.baseDesign}>
            <View style={progress === 100 ? styles.selectedpage : null}></View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PropertyHeaderTick;
