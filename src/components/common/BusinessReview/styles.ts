import { ColorTheme, FONT, SIZES } from "@/theme";
import { px } from "@/utils";
import { Platform, StyleSheet } from "react-native";

export const styles = StyleSheet.create({
ratingTextStyle : {
    fontFamily:FONT.PoppinsMedium,
    fontSize:px(20),
    color:ColorTheme.black,
    fontWeight: 'bold',
    marginVertical:px(5)
},
itemStyle: {flexDirection:'row',margin:px(5),flex:5},
enumStyle: {flex:1,alignItems:'center'},
enumTextStyle:{fontFamily:FONT.PoppinsMedium,fontWeight:'700',color:'#333333',fontSize:px(12)},
progressViewStyle: {width:'80%',justifyContent:'center',flex:3,marginHorizontal:px(10)},
nameTextStyle: {
    fontFamily: FONT.PoppinsBold,
    fontSize: px(12),
    fontWeight: 'bold',
    color: ColorTheme.black,
    marginLeft: px(10),
  },
  ratingStyle:{ paddingVertical: 5,alignSelf:'flex-start',marginHorizontal:px(10)},
  profileImg: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  defaultProfile: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: ColorTheme.primary,
  },
  ownerText: {
    fontSize: SIZES.large,
    fontWeight: 'bold',
    color: 'white',
  },
  BtnStyle: {
    fontSize: px(12),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.onboardingPrimary,
  },
  nextContainer: {
    width: px(150),
    borderRadius: 5,
    backgroundColor: ColorTheme.onboardingPrimary,
    elevation: 5,
    marginHorizontal:px(5),

  },
  nextStyle: {
    fontSize: px(12),
    fontFamily: FONT.PoppinsThin,
    fontWeight: '500',
    color: ColorTheme.white,
  },
  buttonContainer: {
    width: px(150),
    marginHorizontal:px(5),
    borderRadius: 5,
    backgroundColor: ColorTheme.white,
    borderWidth: 0.5,
    borderColor: ColorTheme.onboardingPrimary,
    elevation: 5,
  },
  viewOffsetStyle:{height:px(150),width:'100%',backgroundColor:'white',borderRadius:px(10),marginVertical:px(10), shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
  shadowRadius: 3,
  shadowColor: 'gray',
  elevation: 3,},
  viewTextInput:{ shadowOffset: {
    width: 1,
    height: 1,
  },
  shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
  shadowRadius: 3,
  shadowColor: 'gray',
  elevation: 3,height:px(180),width:'100%',backgroundColor:'white',borderRadius:px(10),
paddingHorizontal:px(10),marginVertical:px(5)},
textCardStyle:{ shadowOffset: {
  width: 1,
  height: 1,
},
shadowOpacity: Platform.OS === 'android' ? 1 : 0.3,
shadowRadius: 3,
shadowColor: 'gray',
elevation: 3,height:px(100),width:'100%',backgroundColor:'white',borderRadius:px(10),justifyContent:'center',alignItems:'center'}
})