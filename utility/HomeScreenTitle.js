import React from "react";
import { View,Text, Platform } from "react-native";
import GoodStyles from "./GoodStyles";

const HomeScreenTitle =(prop)=>{
    return (
        <View style={[prop.style, {marginTop: Platform.OS == 'ios'?0:10}]}>
            <Text style={GoodStyles.toolbarText}>{prop.title}</Text>
        </View>
    )
}

export default HomeScreenTitle;