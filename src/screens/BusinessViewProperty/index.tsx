import { Container } from "@/custom/Container"
import RNImage from "@/custom/RNImage"
import RNView from "@/custom/RNView"
import { ScrollView } from "react-native"
import { styles } from "./styles"
import { RNText } from "@/custom/RNText"
import CommonButton from "@/custom/CommonButton"
import { px } from "@/utils"

 const BusinessViewProperty=()=>{
    return(
        <Container hasHeader={true}>
            <ScrollView>
                <RNView>
                    <RNView style={styles.imageContainerStyle}>
                        <RNImage style={styles.businessBackgroundImage} source={require('../../assets/images/business/playground.png')}/>
                    </RNView>
                    <RNView style={styles.cardContainer}>
                        <RNView style={styles.imgContainer}>
                        <RNImage style={styles.imgStyle} source={require('../../assets/images/business/phone.png')}/>
                        <RNText style={styles.nameTextStyle}>{'AYRA HEIGHTS'}</RNText>
                        </RNView>
                        <RNText style={styles.flatTextStyle}>{'2BHK FLATS'}</RNText>
                    </RNView>
                    <RNText style={styles.descriptionTextStyle}>{"Description"}</RNText>
                    <RNText style={styles.businessDescriptionStyle}>{"Lorem ipsum dolor sit amet consectetur. Consectetur nec pellentesque eu nisl sapien enim volutpat necentesque nisl savolutpat nec Lorem ipsum dolor sit ameonsectetur. Consectetur nec pellentesque eu nisl sapien enim lutpat nec pellentesque nisl savolutpat necenim volutpat nec "}</RNText>
                    <CommonButton
                    style={styles.buttonStyle}
                    textStyle={styles.businessDescriptionStyle}
                    title="Contact us to know more"/>
                    <RNView>
                    <RNText style={[styles.descriptionTextStyle,{marginTop:px(10)}]}>{"Basic Details"}</RNText>

                    </RNView>
                </RNView>
            </ScrollView>

        </Container>

    )
}
export default BusinessViewProperty