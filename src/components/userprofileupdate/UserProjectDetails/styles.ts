import { ColorTheme, FONT, SIZES } from "@/theme";
import { deviceWidth, px } from "@/utils";
import { StyleSheet } from "react-native";

export const Styles = StyleSheet.create(
    {
        sectionContainer: { width: deviceWidth, alignItems: 'center' },
        inputStyle: {
            height: px(43),
            width: deviceWidth / 1.09,
            fontSize: SIZES.small14,
            fontWeight: '400',
            color: 'black',
            borderColor: ColorTheme.gray,
            backgroundColor: ColorTheme.white,
            alignSelf: 'center',
            marginTop: px(20),
          },
          errorText: { color: ColorTheme.danger, fontSize: SIZES.small, textAlign: 'left', marginLeft: px(20) },
          errorDeal: {
            width: deviceWidth / 1.09,
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: px(20),
          },
          dealView: {
            width: deviceWidth / 1.09,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: px(10),
          },
          agentCheck: {
            width: '45%',
            height: px(50),
            borderWidth: 1,
            borderRadius: px(10),
            flexDirection: 'row',
            borderColor: ColorTheme.gray,
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: px(15),
          },
          modalBackground: {
            flex: 1,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            justifyContent: 'center',
            alignItems: 'center',
          },
          modalContainer: {
            backgroundColor: '#fff',
            borderRadius: 10,
            padding: 20,
            width: '80%',
            maxHeight: '60%',
          },
          renderText: {
            fontSize: px(14),
            fontFamily: FONT.PoppinsThin,
            fontWeight: '500',
            color: ColorTheme.black,
            marginTop: px(10),
            paddingVertical: px(5),
          },
          selectedText: {
            backgroundColor: ColorTheme.onboardingPrimary,
            borderRadius: 5,
            paddingHorizontal: 10,
            color: ColorTheme.white,
          },
          mainBtn: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            width: deviceWidth / 1.09,
            marginTop: 20,
          },
          btnSave: {
            marginBottom: 10,
            width: 100,
            borderRadius: 5,
            marginRight: 5,
            minHeight: 30,
            backgroundColor: '#3FDBD1',
          },
          btnCancel: {
            marginBottom: 10,
            width: 100,
            borderRadius: 5,
            minHeight: 30,
            backgroundColor: '#F6F3F3',
          },
          textStyle: { color: 'black', fontSize: 13, fontWeight: '500' },

    }
)