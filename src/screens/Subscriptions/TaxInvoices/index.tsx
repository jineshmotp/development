import React, { useEffect, useState } from 'react';
import { FlatList, Platform, RefreshControl, ScrollView, Share, TouchableOpacity } from 'react-native';
// import ReactNativeBlobUtil from 'react-native-blob-util';
import AntDesign from 'react-native-vector-icons/AntDesign';

import moment from 'moment';

import ListEmptyComponent from '@/components/common/ListEmptyComponent';
import { isArray } from '@/constants/function/isArray';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useLazyGetTaxInvoicesQuery } from '@/redux/Subscription/subscriptionService';
import { px } from '@/utils';

import { styles } from './styles';

const TaxInvoices = () => {
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [usertaxResult, setUsertaxResult] = useState([]);
  const [getTaxesMutation] = useLazyGetTaxInvoicesQuery();

  type globalProps = {
    pageNumber: string;
    pageSize: string;
  };
  // const getTaxInvoicesData = async (payload: globalProps) => {
  //   getTaxesMutation(payload).then(respose => {
  //     // console.log('resposne', respose);
  //     if (respose?.data?.status) {
  //       if (respose?.data?.data.length && payload?.pageNumber > 1) {
  //         setUsertaxResult(prev => prev.concat(respose?.data?.data));
  //       } else {
  //         setUsertaxResult(prev => prev.concat(respose?.data?.data));
  //       }
  //     } else {
  //       if (respose?.error?.status === false) {
  //         if (payload?.pageNumber == 1) {
  //           onRefresh();
  //         } else {
  //           setUsertaxResult(usertaxResult);
  //         }
  //       }
  //     }
  //   });
  // };
  // const loadNextPage = () => {
  //   // console.log('loadNextPage================================', pageNumber + 1, loadData?.data?.length);
  //   if (usertaxResult?.data?.length) {
  //     setPageNumber(pageNumber + 1);
  //     getTaxInvoicesData({
  //       pageSize: '10',
  //       pageNumber: `${pageNumber + 1}`,
  //     });
  //   }
  // };

  // const onRefresh = () => {
  //   getTaxInvoicesData({
  //     pageSize: '10',
  //     pageNumber: '1',
  //   });
  // };
  // useEffect(() => {
  //   onRefresh();
  // }, []);

  // const downloadFile = item => {
  //   // console.log('source', item);
  //   // const source = 'https://www.africau.edu/images/default/sample.pdf';
  //   const fileName = item.split('/')[item.split('/').length - 1];
  //   // console.log('fileName', fileName);
  //   const dirs = ReactNativeBlobUtil.fs.dirs;
  //   ReactNativeBlobUtil.config({
  //     fileCache: true,
  //     appendExt: 'pdf',
  //     path: `${dirs.DocumentDir}/${fileName}`,
  //     addAndroidDownloads: {
  //       useDownloadManager: true,
  //       notification: true,
  //       title: fileName,
  //       description: 'File downloaded by download manager.',
  //       mime: 'application/pdf',
  //     },
  //   })
  //     .fetch('GET', item)
  //     .then(res => {
  //       // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
  //       // whereas in android, the download manager is handling the download for us.
  //       if (Platform.OS === 'ios') {
  //         const filePath = res.path();
  //         const options = {
  //           type: 'application/pdf',
  //           url: filePath,
  //           saveToFiles: true,
  //         };
  //         Share.open(options)
  //           .then(resp => console.log(resp))
  //           .catch(err => console.log(err));
  //       }
  //     })
  //     .catch(err => console.log('BLOB ERROR -> ', err));
  // };

  const renderTaxItem = ({ item, index }) => {
    return (
      <RNView key={index} style={styles.row}>
        <RNView style={styles.cellView}>
          <RNText style={styles.cell}>{moment(item?.createdAt).format('MMM D, YYYY')}</RNText>
        </RNView>
        <RNView style={styles.cellViewTaxNumber}>
          <RNText style={styles.cellTaxNumber}>{item?.invoice_no}</RNText>
        </RNView>
        <RNView style={styles.cellView}>
          <RNText style={styles.cell}>{`RS.${item?.amount}`}</RNText>
        </RNView>
        <RNView style={styles.cellView}>
          {/* <TouchableOpacity style={styles.cell} onPress={() => downloadFile(item?.tax_invoice)}> */}
            {/* <AntDesign size={px(20)} name="download" color={'black'} onPress={() => downloadFile(item?.tax_invoice)} /> */}
          {/* </TouchableOpacity> */}
        </RNView>
      </RNView>
    );
  };
  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      <FlatList
        refreshControl={<RefreshControl refreshing={false} 
        // onRefresh={onRefresh}
         />}
        ListHeaderComponent={() => {
          return (
            <RNView style={styles.rowHeader}>
              <RNView style={styles.cellHeaderView}>
                <RNText style={styles.cellHeader}> Date</RNText>
              </RNView>
              <RNView style={styles.cellHeaderViewTaxNumber}>
                <RNText style={styles.cellHeader}>Tax Invoice Number</RNText>
              </RNView>
              <RNView style={styles.cellHeaderView}>
                <RNText style={styles.cellHeader}>Total Amount</RNText>
              </RNView>
              <RNView style={styles.cellHeaderView}>
                <RNText style={styles.cellHeader}>Download</RNText>
              </RNView>
              {/* Add more headers as needed */}
            </RNView>
          );
        }}
        data={usertaxResult}
        renderItem={renderTaxItem}
        style={styles.flatlistHeight}
        ListEmptyComponent={() => {
          return <ListEmptyComponent text={'No Tax Invoices'} type="default" />;
        }}
        onEndReached={
          isArray(usertaxResult) && usertaxResult?.length >= 10
            ? loadNextPage
            : () => console.log('loadNextPage++++++++++')
        }
        onEndReachedThreshold={usertaxResult?.length > 10 ? 5 : 2}
      />
    </ScrollView>
  );
};

export default TaxInvoices;
