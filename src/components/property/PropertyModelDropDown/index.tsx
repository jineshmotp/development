import React, { memo, useMemo, useState } from 'react';
import { ScrollView, TextInput, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';

import { Modal, ModalBackdrop } from '@gluestack-ui/themed';

import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';

import { styles } from './styles';

type Props = {
  setVal?: any;
  setShow?: any;
  show?: any;
  data?: any;
  item?: any;
  mandatory?: any;
  errortext?: any;
};

const PropertyModelDropDown: React.FC<Props> = ({ setVal, setShow, data, show, item }) => {
  const ref = React.useRef(null);
  const [searchInput, setSearchInput] = useState('');

  const filteredData = data?.filter((item: string) =>
    item?.toString()?.toLowerCase()?.includes(searchInput?.toLowerCase())
  );

  return useMemo(() => {
    return (
      <>
        {show && (
          <TouchableWithoutFeedback onPress={() => setShow(false)}>
            <Modal
              isOpen={show}
              onClose={() => {
                setShow(false);
              }}
              finalFocusRef={ref}>
              <ModalBackdrop />

              <RNView style={styles.container}>
                <TextInput
                  placeholder="Search..."
                  onChangeText={text => setSearchInput(text)}
                  style={{
                    borderBottomWidth: 1,
                    marginBottom: 12,
                  }}
                />

                <ScrollView
                  nestedScrollEnabled
                  keyboardDismissMode="on-drag"
                  keyboardShouldPersistTaps="handled"
                  contentInsetAdjustmentBehavior="automatic"
                  showsVerticalScrollIndicator={false}>
                  {filteredData && filteredData?.length > 0 ? (
                    filteredData?.map((item: any, i: any) => {
                      return (
                        <TouchableOpacity
                          key={i}
                          style={styles.btns}
                          onPress={() => {
                            setVal(item);
                            setShow(false);
                          }}>
                          <RNText
                            style={{
                              padding: 5,
                            }}>
                            {item}
                          </RNText>
                        </TouchableOpacity>
                      );
                    })
                  ) : (
                    <RNView style={styles.notfoundMsg}>
                      <RNText style={{ color: 'black' }}>Nothing Found here</RNText>
                      <RNText
                        style={{
                          fontWeight: 'bold',
                        }}>
                        Close
                      </RNText>
                    </RNView>
                  )}
                </ScrollView>
              </RNView>
            </Modal>
          </TouchableWithoutFeedback>
        )}
      </>
    );
  }, [data, setShow, setVal, show, searchInput]);
};

export default memo(PropertyModelDropDown);
