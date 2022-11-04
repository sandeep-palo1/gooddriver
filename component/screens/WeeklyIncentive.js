import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import goodstyle from '../../utility/GoodStyles'
import WalkBottomView from "../../utility/WalkBottomView";
import GoodString from "../../utility/GoodString";
import { useNavigation } from "@react-navigation/core";
import { index } from "d3-array";

const WeeklyIncentive = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image source={require('../../resources/images/incentive.png')} />
            </View>
            <WalkBottomView
                title={GoodString.WEEKLY_INCETIVE}
                desc={GoodString.WEEKLY_INCETIVE_DESC}
                title_button={GoodString.NEXT}
                onClick={() => { 
                    navigation.reset({index:0, routes:[{name:'SafeSecure'}]}) }} />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 16,

    }
});

export default WeeklyIncentive;