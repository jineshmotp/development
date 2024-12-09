import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, PermissionsAndroid, Platform } from 'react-native';
import ReactNativeBlobUtil from 'react-native-blob-util';
import Share from 'react-native-share';
import { useToast } from 'react-native-toast-notifications';

import moment from 'moment';

import Divider from '@/components/common/Divider';
import ModalWrapper from '@/components/common/ModalWrapper';
import { formatNumberWithComma } from '@/constants/function/property.helper';
import { formatDescription } from '@/constants/function/subscription.helper';
import { userData } from '@/constants/login';
import CommonButton from '@/custom/CommonButton';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { useAppSelector } from '@/hooks/reduxHooks';
import { getUserData } from '@/redux/login/loginReducer';
import { ColorTheme, SIZES } from '@/theme';
import { deviceHeight, deviceWidth } from '@/utils';

import PaymentDetail from '../paymentDetail';
import { styles } from '../styles';
import { modalstyles } from './styles';

type PaymentCardProps = {
  data?: any;
};
const PaymentCard: React.FC<PaymentCardProps> = ({ data }) => {
  // console.log('data ===========>', data);

  const toast = useToast();

  const downloadTaxInvoice = (filename: any) => {
    // console.log(' Download Tax invoice');
    setIsVisible(false);
    checkBrochurePermission(filename);
  };

  const downloadBillInvoice = filename => {
    // console.log(' Download bill invoice');
    setIsVisible(false);
    checkBrochurePermission(filename);
  };

  const ClosePaymentHistory = () => {
    // console.log(' close !');
    setIsVisible(false);
  };

  const downloadBrochureImage = async filename => {
    const date = new Date();
    let image_URL = filename;
    let ext = getExtention(image_URL);
    ext = '.' + ext[0];
    const { config, fs } = ReactNativeBlobUtil;

    // console.log(' path ', fs.dirs.DownloadDir);

    // Determine platform-specific path and options
    let newPath;
    let options;
    if (Platform.OS === 'android') {
      newPath = `${fs.dirs.DownloadDir}/image_${Math.floor(date.getTime() + date.getSeconds() / 2)}${ext}`;

      options = {
        fileCache: true,
        addAndroidDownloads: {
          useDownloadManager: true,
          notification: true,
          path: newPath,
          description: 'Image',
        },
      };

      config(options)
        .fetch('GET', image_URL)
        .then(res => {
          if (res) {
            toast.show('File Downloaded Successfully!', {
              type: 'success_toast',
              animationDuration: 100,
              data: {
                title: 'Success:',
              },
              duration: 2000,
            });
          }
        })
        .catch(error => {
          // console.log('Error downloading image: ', error);
          Alert.alert('Failed to download Project Layout');
        });
    } else {
      newPath = `${fs.dirs.DocumentDir}/image_${Math.floor(date.getTime() + date.getSeconds() / 2)}${ext}`;

      options = {
        fileCache: true,
        path: newPath,
        description: 'Image',
        notification: true,
      };

      const fileName = filename.split('/')[filename.split('/').length - 1];

      // console.log('fileName', fileName);
      const dirs = ReactNativeBlobUtil.fs.dirs;
      ReactNativeBlobUtil.config({
        fileCache: true,
        appendExt: 'pdf',
        path: `${dirs.DocumentDir}/${fileName}`,
      })
        .fetch('GET', filename)
        .then(res => {
          // console.log(' response', res);

          // in iOS, we want to save our files by opening up the saveToFiles bottom sheet action.
          // whereas in android, the download manager is handling the download for us.
          if (Platform.OS === 'ios') {
            const filePath = res.path();
            const options = {
              type: 'application/pdf',
              url: filePath,
              saveToFiles: true,
            };
            Share.open(options)
              .then(resp => console.log(resp))
              .catch(err => console.log(err));
          }
        })
        .catch(err => console.log('BLOB ERROR -> ', err));
    }

    // console.log('options =====>', options);
  };

  const getExtention = filename => {
    return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
  };

  const checkBrochurePermission = async (filename: any) => {
    if (Platform.OS === 'ios') {
      downloadBrochureImage(filename);
    } else {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
          title: 'Storage Permission Required',
          message: 'App needs access to your storage to download Photos',
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // console.log('Storage Permission Granted.');
          downloadBrochureImage(filename);
        } else {
          Alert.alert('Storage Permission Not Granted');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };

  const selectedUserData = useAppSelector(getUserData);

  // console.log(' userdata --->', selectedUserData);

  const [isVisible, setIsVisible] = useState(false);
  return (
    <>
      <RNView style={styles.cardView}>
        <RNView style={styles.planRow}>
          <RNView style={styles.singleDetail}>
            <RNText style={styles.textThin}>Date</RNText>
            <RNText style={styles.textThick}>{moment(data?.createdAt).format('MMM D, YYYY')}</RNText>
          </RNView>
          <RNView style={styles.singleDetail}>
            <RNText style={styles.textThin}>Amount</RNText>
            <RNText style={styles.textThick}>{formatNumberWithComma(data?.paid_amount)}</RNText>
          </RNView>
          <RNView style={styles.singleDetail}>
            <RNText style={styles.textThin}>Status</RNText>
            <RNText style={styles.textThickSuc}>
              {data?.payment_status === 'PAYMENT_SUCCESS' ? 'Success' : 'Fail'}
            </RNText>
          </RNView>
        </RNView>
        <RNView style={styles.planRow}>
          <RNView style={styles.singleDetail}>
            <RNText style={styles.textThin}>Description</RNText>
            <RNText style={styles.textThick}>{`${data?.subscriptionPlan?.subscription_type} ${data?.txn_type}`}</RNText>
          </RNView>
          <RNView style={styles.singleDetail}>
            <RNText style={styles.textThin}></RNText>
            <RNText style={styles.textThickView} onPress={() => setIsVisible(true)}>
              View Details
            </RNText>
          </RNView>
        </RNView>
      </RNView>

      <ModalWrapper
        visible={isVisible}
        onClose={ClosePaymentHistory}
        modalHeight={deviceHeight}
        modalWidth={deviceWidth}
        header={false}>
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ height: deviceHeight }}>
          <RNView style={modalstyles.modelView}>
            <RNView style={modalstyles.modelHeaderView}>
              <RNText style={modalstyles.modelHeaderText}>{data?.subscriptionPlan?.subscription_type}</RNText>

              <RNView style={modalstyles.PaymentTxnNoView}>
                <RNView style={modalstyles.PaymentTxnTextView}>
                  <RNView style={modalstyles.PaymentTxnTextSubLeftView}>
                    <RNText style={modalstyles.modelHeaderBillNo}>Payment Transaction :</RNText>
                  </RNView>

                  <RNView style={modalstyles.PaymentTxnTextSubRightView}>
                    <RNText style={modalstyles.modelHeaderBillNo}>{data?.payment_txn_id}</RNText>
                  </RNView>
                </RNView>

                <RNView style={modalstyles.PaymentTxnTextView}>
                  <RNView style={modalstyles.PaymentTxnTextSubLeftView}>
                    <RNText style={modalstyles.modelHeaderBillNo}>Payment Date :</RNText>
                  </RNView>

                  <RNView style={modalstyles.PaymentTxnTextSubRightView}>
                    <RNText style={modalstyles.modelHeaderBillNo}>
                      {moment(data?.createdAt).format('YYYY-MM-DD')}
                    </RNText>
                  </RNView>
                </RNView>
              </RNView>

              <Divider
                borderColor="#D9D6D6"
                style={{
                  marginTop: 10,
                  gap: 10,
                }}
              />
            </RNView>

            <RNView style={modalstyles.modelSelectionView}>
              <RNView style={modalstyles.planRowHeader}>
                <RNView style={styles.singleDetail}>
                  <RNText style={modalstyles.textThinHHeading}>SUBSCRIPTION PLAN</RNText>
                  <RNText
                    style={styles.textThick}>{`Start Date : ${moment(data?.createdAt).format('YYYY-MM-DD')}`}</RNText>
                </RNView>
              </RNView>

              <RNView style={modalstyles.cardViewModal}>
                <RNView style={styles.planRow}>
                  <RNView style={modalstyles.sectionView}>
                    <RNText style={modalstyles.descriptionText}>
                      {formatDescription(data?.subscriptionPlan?.long_description)}
                    </RNText>
                  </RNView>
                </RNView>

                <RNView style={styles.planRow}>
                  <RNView style={styles.singleDetail}>
                    <RNText style={styles.textThin}>
                      {selectedUserData?.role === 'BUILDER' ? 'Available Leads' : 'Available Listing'}
                    </RNText>
                    <RNText style={styles.textThick}>
                      {selectedUserData?.role === 'BUILDER' ? data?.available_leads : data?.available_listing}
                    </RNText>
                  </RNView>
                  <RNView style={styles.singleDetail}>
                    <RNText style={styles.textThin}>
                      {selectedUserData?.role === 'BUILDER' ? 'Total Leads' : 'Total Listing'}
                    </RNText>
                    <RNText style={styles.textThick}>
                      {selectedUserData?.role === 'BUILDER' ? data?.total_leads : data?.total_listing}
                    </RNText>
                  </RNView>
                  <RNView style={styles.singleDetail}>
                    <RNText style={styles.textThin}>Listing Duration</RNText>
                    <RNText style={styles.textThick}>{data?.subscriptionPlan?.Listing_duration}</RNText>
                  </RNView>
                </RNView>

                <Divider
                  borderColor="#D9D6D6"
                  style={{
                    marginTop: 0,

                    gap: 10,
                  }}
                />
              </RNView>

              <RNView style={modalstyles.planRowHeader}>
                <RNView style={modalstyles.singleDetail2}>
                  <RNText style={modalstyles.textThinHHeading}>PAYMENT SUMMARY</RNText>
                </RNView>
              </RNView>

              <RNView style={modalstyles.cardViewModal}>
                <RNView style={modalstyles.planRowNew}>
                  <RNView style={styles.singleDetail}>
                    <RNText style={styles.textThick}>{'Plan Amount'}</RNText>
                    <RNText style={styles.textThin}>{'Base Amount'}</RNText>
                  </RNView>

                  <RNView style={styles.singleDetailRight}>
                    <RNText style={styles.textThick}>{data?.plan_price}</RNText>
                    <RNText style={styles.textThin}>{data?.plan_price_payable}</RNText>
                  </RNView>
                </RNView>

                <RNView style={modalstyles.planRowNew}>
                  <RNView style={styles.singleDetail}>
                    <RNText style={styles.textThin}>GST(18%)</RNText>
                    <RNText style={modalstyles.textThick}>Amount Paid</RNText>
                  </RNView>

                  <RNView style={styles.singleDetailRight}>
                    <RNText style={styles.textThin}>{data?.gst_taken}</RNText>
                    <RNText style={modalstyles.textThick}>{data?.paid_amount}</RNText>
                  </RNView>
                </RNView>

                <Divider
                  borderColor="#D9D6D6"
                  style={{
                    marginTop: 10,
                    marginBottom: 10,
                    gap: 10,
                  }}
                />

                <RNView style={modalstyles.planRowNew}>
                  <RNView style={styles.singleDetail}>
                    <RNText style={styles.textThin}>Plan Date & Time</RNText>
                    <RNText style={modalstyles.textThick}>
                      {moment(data?.updatedAt).format('ddd, DD MMM, YYYY | hh:mmA')}
                    </RNText>
                  </RNView>

                  {data?.payment_method ? (
                    <RNView style={styles.singleDetailRight}>
                      <RNText style={styles.textThin}>Payment Method</RNText>
                      <RNText style={modalstyles.textThick}>{data?.payment_method}</RNText>
                    </RNView>
                  ) : (
                    <RNView style={styles.singleDetailRight}>
                      <RNText style={styles.textThin}>Payment Status</RNText>
                      <RNText style={modalstyles.textThick}>{data?.payment_status}</RNText>
                    </RNView>
                  )}
                </RNView>

                <Divider
                  borderColor="#D9D6D6"
                  style={{
                    marginTop: 10,
                    gap: 10,
                  }}
                />

                {/* <RNView style={modalstyles.planRowNew}>
                  <RNView style={styles.singleDetail}>
                    <RNText style={styles.textThin}>Plan Date & Time</RNText>
                    <RNText style={modalstyles.textThick}>
                      {moment(data?.subscriptionPlan?.createdAt).format('YYYY-MM-DD hh:mm A')}
                    </RNText>
                  </RNView>

                  <RNView style={styles.singleDetailRight}>
                    <RNText style={styles.textThin}>Payment Method</RNText>
                    <RNText style={modalstyles.textThick}>{data?.payment_method}</RNText>
                  </RNView>
                </RNView> */}
              </RNView>

              {data?.invoices ? (
                <RNView style={modalstyles.cardViewModal}>
                  <RNView style={modalstyles.planRowButtom}>
                    <RNView style={modalstyles.planRowButtomView}>
                      <CommonButton
                        title="Download Tax Invoice"
                        style={modalstyles.saveButton}
                        textStyle={{ color: 'black', fontSize: SIZES.small, textAlign: 'center' }}
                        onPress={() => {
                          downloadTaxInvoice(data?.invoices?.tax_invoice);
                        }}
                      />
                    </RNView>

                    <RNView style={modalstyles.planRowButtomView}>
                      <CommonButton
                        title="Download Bill Invoice"
                        style={modalstyles.saveButton}
                        textStyle={{ color: 'black', fontSize: SIZES.small, textAlign: 'center' }}
                        onPress={() => {
                          downloadBillInvoice(data?.invoices?.bill_invoice);
                        }}
                      />
                    </RNView>
                  </RNView>
                </RNView>
              ) : null}
            </RNView>
          </RNView>
        </KeyboardAvoidingView>
      </ModalWrapper>

      {/* <PaymentDetail isVisible={isVisible} onPressClose={() => setIsVisible(!isVisible)} data={data} /> */}
    </>
  );
};

export default PaymentCard;
