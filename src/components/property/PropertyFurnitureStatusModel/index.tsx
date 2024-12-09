import React, { useEffect, useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

import { changingUnderScore, furnishingItems } from '@/constants/function/property.helper';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { ColorTheme } from '@/theme';
import { px } from '@/utils';

import PropertyModalWrapper from '../PropertyModalWrapper';
import { styles } from './styles';

type Props = {
  showModal?: boolean;
  setShowModal?: any;
  data?: any;
  setVal?: any;
  setFurnishingItemsList?: any;
  placeholder?: string;
  onPressItem?: (item: Item) => void;
  activateKeyForFurnishing?: any;
  setDetails?: any;
  details?: any;
};

const PropertyFurnishingStatusModel: React.FC<Props> = ({
  showModal,
  setShowModal,
  setVal,

  placeholder,
  onPressItem,
  activateKeyForFurnishing,
  setDetails,
  details,
}) => {
  const [furnishingItemsList, setFurnishingItemsList] = useState(furnishingItems);

  const gotonumval = (numval: any, mitem: any) => {
    if (
      numval === '' ||
      numval === null ||
      numval === '0' ||
      numval.length !== 10 ||
      numval === '' ||
      isNaN(parseInt(numval)) || // Not a valid number
      !/^\d+$/.test(numval)
    ) {
      // console.log('num val : ', numval, ' itemval ', mitem);
    }

    setFurnishingItemsList(prevFurnishing => {
      return prevFurnishing.map(item => {
        if (item.key === mitem.key) {
          return { ...item, count: numval };
        }
        return item;
      });
    });
  };

  const inncreaseQuantity = (mitem: any) => {
    setFurnishingItemsList(prevFurnishing => {
      return prevFurnishing.map(item => {
        if (item.key === mitem.key) {
          return { ...item, count: item.count + 1 };
        }
        return item;
      });
    });
  };

  const decreaseQuantity = (mitem: any) => {
    setFurnishingItemsList(prevFurnishing => {
      return prevFurnishing.map(item => {
        if (item.key === mitem.key && item.count > 0) {
          return { ...item, count: item.count - 1 };
        }
        return item;
      });
    });
  };

  const clearall = () => {
    setVal([]);
    activateKeyForFurnishing([]);
    // setShowModal(false);
  };

  const closeall = () => {
    const shallow = [...furnishingItemsList];
    const filtered = shallow.filter(item => item.count !== 0);

    // console.log(' value------->', filtered.length);

    if (filtered.length <= 0) {
      setVal([]);
      // setFurnishingItemsList(furnishingItemsList);
      activateKeyForFurnishing([]);
    }

    setShowModal(false);
  };

  const filterItems = () => {
    const shallow = [...furnishingItemsList];
    const filtered = shallow.filter(item => item.count !== 0);
    setVal(filtered);
  };

  const gotoScreen = () => {
    const shallow = [...furnishingItemsList];
    const filtered = shallow.filter(item => item.count !== 0);
    setVal(filtered);

    setShowModal(false);
  };

  const updateFurnishingItemsList = updatedItems => {
    // console.log(' updated image ->', updatedItems);
    // const updatedList = furnishingItemsList.map(item => {
    //   const updatedItem = updatedItems.find(uItem => uItem.key === item.key);
    //   return updatedItem ? { ...item, count: updatedItem.count } : item;
    // });
    // setFurnishingItemsList(updatedList);
  };

  useEffect(() => {
    filterItems();
  }, [details]);

  return (
    <PropertyModalWrapper visible={showModal}>
      <RNView style={styles.modelViewStyle}>
        <RNView style={styles.topView}>
          <TouchableOpacity
            // onPress={() => {

            //   setShowModal?.(false);
            // }}
            onPress={closeall}>
            <Entypo name="cross" size={px(24)} color={ColorTheme.black} />
          </TouchableOpacity>

          <TouchableOpacity onPress={clearall}>
            <RNText style={styles.clearAllText}>Clear all</RNText>
          </TouchableOpacity>
        </RNView>

        <RNView style={styles.HeaderView}>
          <RNText style={styles.placeHolderText}>{changingUnderScore(placeholder)}</RNText>
          <RNText style={styles.placeHolderSubText}>It’s recommended to give more furnishing details.</RNText>
        </RNView>

        <RNView
          style={{
            paddingBottom: 100,
          }}>
          <ScrollView style={styles.furnishingScrollStyle}>
            {furnishingItemsList.map(item => {
              return (
                <>
                  <View key={item.key} style={styles.ScrollViewStyle}>
                    <Text style={styles.countText}>{item.label}</Text>

                    <View style={styles.countViewStyles}>
                      <View style={styles.countViewsubMinuse}>
                        <TouchableOpacity
                          onPress={() => decreaseQuantity(item)}
                          disabled={item.count === 0}
                          style={styles.countView}>
                          <AntDesign name="minus" size={px(15)} color={ColorTheme.primary} />
                        </TouchableOpacity>
                      </View>

                      <View style={styles.numberpadStyle}>
                        <TextInput
                          style={styles.countText}
                          keyboardType="number-pad"
                          maxLength={5}
                          onChangeText={num => gotonumval(num, item)}>
                          {item.count}
                        </TextInput>
                      </View>

                      <View style={styles.countViewsubPluse}>
                        <TouchableOpacity onPress={() => inncreaseQuantity(item)} style={styles.countView}>
                          <AntDesign name="plus" size={px(15)} color={ColorTheme.primary} />
                        </TouchableOpacity>
                      </View>
                    </View>

                    
                  </View>

                </>
              );
            })}
          </ScrollView>

          <RNView style={{ marginBottom: px(50) }}>
            <CommonButton
              title="Add & continue"
              style={styles.saveButton}
              textStyle={{ color: ColorTheme.black }}
              onPress={() => {
                gotoScreen();
              }}
            />
          </RNView>
        </RNView>
      </RNView>
    </PropertyModalWrapper>
  );
};

export default PropertyFurnishingStatusModel;
