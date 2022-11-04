import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import goodstyle from '../../utility/GoodStyles'
import WalkBottomView from "../../utility/WalkBottomView";
import GoodString from "../../utility/GoodString";
import { useNavigation } from "@react-navigation/core";

const SaveInsurance = () => {
    const navigation = useNavigation();
    return (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 16 }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems:'center' }}>

                <Image source={require('../../resources/images/circle.png')} />
            </View>
            <WalkBottomView
                title={GoodString.SAVE_INSURANCE}
                desc={GoodString.SAVE_INSURANCE_DESC}
                title_button={GoodString.NEXT}
                onClick={() => { navigation.reset({
                    index: 0,
                    routes: [{ name: 'WeeklyIncentive' }],
                  }); }} />


        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 16,

    }
});

export default SaveInsurance;