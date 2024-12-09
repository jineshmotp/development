import { StyleSheet } from 'react-native';

import { ColorTheme, SIZES } from '@/theme';
import { px } from '@/utils';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
  },
  test: {
    fontSize: px(16),
    color: 'black',
    marginTop: px(10),
    zIndex: 9999,
  },
  custom: {
    width: '90%',
    paddingHorizontal: px(15),
    paddingVertical: px(10),
    backgroundColor: ColorTheme.nearLukSuccess,
    marginVertical: 4,
    borderRadius: 8,
    borderLeftColor: '#00C851',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorView: {
    backgroundColor: ColorTheme.danger,
  },
  warnView: {
    backgroundColor: ColorTheme.tertiary,
  },
  infoView: {
    backgroundColor: ColorTheme.primaryColor,
  },

  notificationView: {
    width: '90%',
    paddingHorizontal: px(18),
    paddingVertical: px(18),

    marginVertical: 4,
    borderRadius: 8,

    flexDirection: 'row',
    justifyContent: 'space-between',

    backgroundColor: ColorTheme.white,

    borderColor: ColorTheme.gray2,

    borderWidth: px(1),

    elevation: 2,

    // iOS shadow properties
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 1 }, // Shadow offset (spread and height)
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 3.84, // Shadow blur radius
  },

  iconView: {
    justifyContent: 'center',
    alignItems: 'center',
    width: px(50),
    minHeight: px(50),
  },
  rightPart: {
    flex: 9,
  },

  NotificationTextPart: {
    flex: 7,
    paddingLeft: px(5),
    lineHeight: px(5),
  },
  NotificationImagePart: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: px(50),
    minHeight: px(50),
  },

  imgStyleNotification: {
    height: px(50),
    width: px(50),
    borderRadius: px(25),
  },

  NotificationTimePart: {
    flex: 2,
  },

  heading: {
    fontSize: SIZES.small14,
    color: ColorTheme.white,
    fontWeight: 'bold',
  },

  headingNotification: {
    fontSize: SIZES.small,
    color: '#666666',
    fontWeight: 'bold',
  },

  subtext: { color: ColorTheme.white, marginTop: 2, fontSize: SIZES.small14 },
  subtextNotification: { color: ColorTheme.checkboxcolorLine, marginTop: 2, fontSize: SIZES.small14 },

  TimeTextNotification: { color: '#B2B2B2', marginTop: 2, fontSize: SIZES.small },

  withClose: {
    width: '100%',
    paddingVertical: 10,
    backgroundColor: '#fff',
    marginVertical: 4,
    borderRadius: 8,
    borderLeftColor: '#00C851',
    borderLeftWidth: 6,
    justifyContent: 'center',
    paddingHorizontal: 16,
    flexDirection: 'row',
  },
  closeBtn: {
    marginLeft: 'auto',
    width: 25,
    height: 25,
    borderRadius: 5,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnClose: { color: '#fff', fontWeight: '500', marginBottom: 2.5 },
  msgText: { color: '#a3a3a3', marginRight: 16 },
  imgStyle: {
    height: px(25),
    width: px(25),
    borderRadius: px(25),
  },
});
