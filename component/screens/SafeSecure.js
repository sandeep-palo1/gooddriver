import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import goodstyle from '../../utility/GoodStyles'
import WalkBottomView from "../../utility/WalkBottomView";
import GoodString from "../../utility/GoodString";
import { useNavigation } from "@react-navigation/core";

const SafeSecure = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image source={require('../../resources/images/circle.png')} />
            </View>
            <WalkBottomView
                title={GoodString.SAFE_SECURE}
                desc={GoodString.SAFE_SECURE_DESC}
                isVisible={true}
                title_button={GoodString.get_started}
                onClick={() => { 
                    navigation.reset({index:0, routes:[{name:'MobileVerification'}]}) }} />

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 16,

    }
});

export default SafeSecure;