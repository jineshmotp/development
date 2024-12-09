import { ColorTheme, FONT } from "@/theme";
import { deviceHeight, deviceWidth, px } from "@/utils";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    imageContainerStyle:{
        borderRadius:px(5),
        backgroundColor:ColorTheme.white,
        padding:px(5),
        margin:px(5)
    },
    businessBackgroundImage: {
        width: '100%',
        height: deviceHeight/ 4,
        borderRadius:px(5)
      },
      cardContainer:{
        borderRadius:px(10),
        elevation:px(5),
        shadowOffset:{width:0,height:1},
        shadowColor:ColorTheme.black,
        justifyContent:'center',
        alignItems:'center',
        padding:px(10),
        backgroundColor:ColorTheme.white,
        position:'absolute',
        alignSelf:'center',
        width:'85%',
        marginTop:px(180),
        shadowOpacity: .2,
      },
      imgStyle:{
        width:px(30),
        height:px(30),
        borderRadius:px(15)
      },
      imgContainer:{
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'row'
      },
      nameTextStyle:{
        fontFamily:FONT.PoppinsSemiBold,
        fontSize:px(16),
        color:ColorTheme.black,
        fontWeight:'400',
        paddingHorizontal:px(5)
      },
      flatTextStyle:{
        fontFamily:FONT.PoppinsSemiBold,
        fontSize:px(11),
        color:ColorTheme.black,
        padding:px(5),
        fontWeight:'400',
        paddingHorizontal:px(5)
      },
      descriptionTextStyle: {
        fontFamily: FONT.PoppinsRegular,
        fontSize: px(11),
        fontWeight: 'bold',
        color: ColorTheme.onboardingButton,
        paddingVertical:px(5),
        paddingHorizontal:px(10),
        marginTop:px(45),
        marginHorizontal:px(10)
      },
      businessDescriptionStyle: {
        fontFamily: FONT.PoppinsBold,
        fontSize: px(12),
        fontWeight: '400',
        color: ColorTheme.black,
        paddingHorizontal:px(10),
        paddingVertical:px(5),
        marginHorizontal:px(10)
      },
      buttonStyle:{
        alignSelf:'center',
        marginVertical:px(10),
        width:'90%'
      }
      

})