import React from 'react'
import { Text, View, StyleSheet, Platform, I18nManager, PixelRatio, Dimensions } from "react-native";
import Svg, {
    LinearGradient,
    Text as TextSvg,
    Defs,
    Stop,
    TSpan
} from 'react-native-svg';

const scale = Dimensions.get("window").width; 
const GradientText = ({ text1, style, titleStyle }) => {
    if(Platform.OS === 'android' && !I18nManager.isRTL ){
        return (
            <View style={{...styles.wrap, ...style}}>
                <Svg viewBox="0 0 300 300" height="300" width="300">
                    <Defs>
                        <LinearGradient id="rainbow" x1="0" x2="50%" y1="0" y2="100%" gradientUnits="userSpaceOnUse" >
                            <Stop stopColor="#BF245A" offset="0%" />
                            <Stop stopColor="#EE813C" offset="50%" />
                            <Stop stopColor="#F6C552" offset="100%" />
                        </LinearGradient>
                    </Defs>
                    <TextSvg fill="url(#rainbow)" style={{...styles.title, ...titleStyle}}>
                        <TSpan fonSize="72" x="30" dy="140">
                            {text1}
                        </TSpan>
                    </TextSvg>
                </Svg>
            </View>
        )
    }
    let text3 = text1.split(" ");
    return (
        <View style={{...styles.wrap, ...style}}>
            <View style={{ flexDirection: "row" }}>
                <Text style={{...styles.title, ...titleStyle, color: "#BF245A"}}>
                    {text3[0] && text3[0]+' '}
                </Text>
                <Text style={{...styles.title, ...titleStyle, color: "#BF245A"}}>
                    {  text3[1] && text3[1]+' '}
                </Text>
                <Text style={{...styles.title, ...titleStyle, color: "#EE813C"}}>
                    { text3[2] && text3[2] + ' '}
                </Text>
                <Text style={{...styles.title, ...titleStyle, color: "#EE813C"}}>
                    { text3[3] && text3[3]}
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    wrap: {
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    title: {
        fontWeight: "bold",
        fontSize: Math.round(PixelRatio.roundToNearestPixel(scale / 23)),
        textAlign: "center"
    },
})

export default GradientText