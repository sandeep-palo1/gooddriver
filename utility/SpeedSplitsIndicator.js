import React from "react";
import { View, Text } from "react-native";
import GoodColors from "./GoodColors";
import GoodString from "./GoodString";
import GoodStyles from "./GoodStyles";


const SpeedSplitsIndicator = (prop) => {

    return (
        <View style={{ flexDirection: "row", alignItems: 'center', justifyContent:'center', flex: 1 }}>
            <View style={[GoodStyles.cube_style, { backgroundColor: prop.colorBg }]}></View>
            <Text style={{ marginStart: 5, fontSize: 11, color: GoodColors.accentText }}>{prop.title}</Text>
        </View>
    );
}

export default SpeedSplitsIndicator;