import React from "react";
import { View, Text, SafeAreaView, Image } from "react-native";
import GoodColors from "../../../utility/GoodColors";
import GoodString from "../../../utility/GoodString";
import HomeScreenTitle from "../../../utility/HomeScreenTitle";


const Quote = () => {
    return (
        <SafeAreaView style={{ flexDirection:'column', height:'100%' , backgroundColor: GoodColors.backgroundCol}}>
            <HomeScreenTitle title={GoodString.QUOTE} style={{ marginHorizontal: 16,}}/>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image source={require('../../../resources/images/circle.png')} />
                <Text style={{marginTop:10}}>Coming Soon!</Text>
            </View>
        </SafeAreaView>
    );
}

export default Quote;