import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import goodstyle from '../utility/GoodStyles'
import BlueButton from "./BlueButton";
import GoodString from "./GoodString";


const WalkBottomView = (prop) => {
    const navigation = useNavigation();
    return (
        <View style={{ marginBottom: 16 }}>
            <Text style={goodstyle.walk_title}>{prop.title}</Text>
            <Text style={[goodstyle.walk_desc, { marginBottom: 16 }]}>{prop.desc}</Text>
            <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                <BlueButton
                    style={{ width: 130 }}
                    title={prop.title_button}
                    onPressNext={prop.onClick} />
                <View style={{ flex: 1 }} ></View>
                {!prop.isVisible ?
                    <Text style={{ fontWeight: 'bold', padding: 10 }} onPress={() => { navigation.navigate('MobileVerification') }}>{GoodString.SKIP}</Text>
                    : null}
            </View>
        </View>
    );
}



export default WalkBottomView;