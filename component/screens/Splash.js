import React, { useEffect } from "react";
import { View, Text, SafeAreaView, StyleSheet, StatusBar } from 'react-native';
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import { useNavigation } from "@react-navigation/native";
import { getUser, getLastScreen } from "../../utility/ValidationUtil";


const Splash = () => {
    const navigation = useNavigation();
   
    useEffect(() => {
        StatusBar.setHidden(true);

        const tokenAsync = async () => {
            await getLastScreen().then((resolve) => {
                if (resolve != null) {
                    navigateToNext(resolve)
                } else {
                    navigateToNext('Walkthrough')
                }
            }).catch((err => {
                console.log("error Splash" + err)
                navigateToNext('Walkthrough')
            }
            ))


        }
        tokenAsync();


    }, [])

    const navigateToNext = (screen) => {
        setTimeout(() => {
            navigation.reset({
                index: 0,
                routes: [{ name: screen }],
            });
        }, 3000);

    }

    return (
        <SafeAreaView style={{ justifyContent: 'center', flex: 1 }}>
            <Text style={styles.textStyle}>{GoodString.APP_NAME}</Text>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    textStyle: {
        fontSize: 20,
        alignSelf: 'center',
        fontWeight: "bold",
        color: GoodColors.accentText,
    }
});

export default Splash;

