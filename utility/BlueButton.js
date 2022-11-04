import React from "react";
import { View,StyleSheet, Text ,TouchableOpacity} from "react-native";
import GoodColors from "./GoodColors";
import GoodStyles from "./GoodStyles";

const BlueButton=(prop)=>{

    return(
        <TouchableOpacity onPress={prop.onPressNext}>
        <View style={[styles.bg, prop.style]} >
            <Text style={GoodStyles.button_text} >{prop.title}</Text>
        </View>
        </TouchableOpacity>
    );

}

const styles=StyleSheet.create({
    bg:{
        backgroundColor:GoodColors.buttonBg,
        height:45 ,
        justifyContent:'center'  ,
        borderRadius:10
    },

   
});

export default BlueButton;