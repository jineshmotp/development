import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ToastProvider } from 'react-native-toast-notifications';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import RNImage from '@/custom/RNImage';
import { RNText } from '@/custom/RNText';
import RNView from '@/custom/RNView';
import { px } from '@/utils';

// import { MaterialCommunityIcons } from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from './styles';

type Props = {
  children: React.ReactNode;
};
const ToastProviderCompo: React.FC<Props> = ({ children }) => {
  return (
    <ToastProvider
      placement="top"
      //   dangerIcon={<MaterialCommunityIcons name="close" color="#fff" />}
      //   successIcon={<MaterialCommunityIcons name="check" color="#fff" size={18} />}
      offset={px(30)}
      // Custom type example
      renderType={{
        custom_toast: toast => (
          <RNView style={styles.custom}>
            <RNText style={styles.heading}>{toast.data.title}</RNText>
            <RNText style={styles.subtext}>{toast.message}</RNText>
          </RNView>
        ),
        success_toast: toast => (
          <RNView style={styles.custom}>
            <RNView style={styles.iconView}>
              <FontAwesome6 name="check-circle" size={px(25)} color={'white'} />
            </RNView>
            <RNView style={styles.rightPart}>
              <RNText style={styles.heading}>{toast.data.title}</RNText>
              <RNText style={styles.subtext}>{toast.message}</RNText>
            </RNView>
          </RNView>
        ),
        info_toast: toast => (
          <RNView style={[styles.custom, styles.infoView]}>
            <RNView style={styles.iconView}>
              <MaterialIcons name="info" size={px(25)} color={'white'} />
            </RNView>
            <RNView style={styles.rightPart}>
              <RNText style={styles.heading}>{toast.data.title}</RNText>
              <RNText style={styles.subtext}>{toast.message}</RNText>
            </RNView>
          </RNView>
        ),
        marketing_toast: toast => (
          <RNView style={[styles.custom, styles.infoView]}>
            <RNView style={styles.iconView}>
              <RNImage source={require('@/assets/images/bottomTab/logo.png')} style={styles.imgStyle} />
            </RNView>
            <RNView style={styles.rightPart}>
              <RNText style={styles.heading}>{toast.data.title}</RNText>
              <RNText style={styles.subtext}>{toast.message}</RNText>
            </RNView>
          </RNView>
        ),
        error_toast: toast => (
          <RNView style={[styles.custom, styles.errorView]}>
            <RNView style={styles.iconView}>
              <MaterialIcons name="error" size={px(25)} color={'white'} />
            </RNView>
            <RNView style={styles.rightPart}>
              <RNText style={styles.heading}>{toast.data.title}</RNText>
              <RNText style={styles.subtext}>{toast.message}</RNText>
            </RNView>
          </RNView>
        ),
        warn_toast: toast => (
          <RNView style={[styles.custom, styles.warnView]}>
            <RNView style={styles.iconView}>
              <MaterialIcons name="error" size={px(25)} color={'white'} />
            </RNView>
            <RNView style={styles.rightPart}>
              <RNText style={styles.heading}>{toast.data.title}</RNText>
              <RNText style={styles.subtext}>{toast.message}</RNText>
            </RNView>
          </RNView>
        ),
        with_close_button: toast => (
          <RNView style={styles.withClose}>
            <RNText style={styles.msgRNText}>{toast.message}</RNText>
            <TouchableOpacity onPress={() => toast.onHide()} style={styles.closeBtn}>
              <RNText style={styles.btnClose}>x</RNText>
            </TouchableOpacity>
          </RNView>
        ),

        notificationView: toast => (
          <RNView style={[styles.notificationView]}>
            {/* <RNView style={styles.iconView}>
              <FontAwesome6 name="check-circle" size={px(25)} color={'white'} />
            </RNView> */}

            <RNView style={styles.NotificationImagePart}>
              <RNImage source={require('@/assets/images/notification/bell.png')} style={styles.imgStyleNotification} />
            </RNView>

            <RNView style={styles.NotificationTextPart}>
              <RNText style={[styles.headingNotification, { marginBottom: px(4) }]}>{toast.data.title}</RNText>
              <RNText style={styles.subtextNotification}>{toast.message}</RNText>
            </RNView>

            <RNView style={styles.NotificationTimePart}>
              <RNText style={styles.TimeTextNotification}></RNText>
            </RNView>
          </RNView>
        ),
      }}>
      {children}
    </ToastProvider>
  );
};

export default ToastProviderCompo;
