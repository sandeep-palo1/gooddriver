
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, Keyboard, TouchableWithoutFeedback } from 'react-native';
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import OnBoardTitle from "../../utility/OnBoardTitle";
import BlueButton from "../../utility/BlueButton";
import RegionModal from "../../utility/RegionModal";
import { useNavigation } from "@react-navigation/core";
import { validateEmail, getUser } from '../../utility/ValidationUtil'
import axiosClient from '../../api/ApiClient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoodLoader from "../../utility/GoodLoader";


const EmailVerification = () => {
    const navigation = useNavigation();
    const [loaderViesible, setLoaderVisible] = useState(false);
    const [visibleEmaileError, setVisibleEmailError] = useState(false);
    const [getEmail, setEmail] = useState('');

    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        AsyncStorage.setItem(GoodString.SCREEN_NAME, 'EmailVerification');
        const tokenAsync = async () => {
            const userDetail = await getUser()
            if (userDetail != null) {
                setUserInfo(userDetail);
            }
        }
        tokenAsync();
    }, []);

    // Validaion of email
    const validateMail = () => {

        if (validateEmail(getEmail)) {
            emailVerification();
            // navigation.navigate('VehicleRegistration')
        } else {
            setVisibleEmailError(true)
        }
    }

    // Upload email on server
    const emailVerification = () => {
        const paramRequsest = {
            email: getEmail,
            phone: userInfo.phone
        }
        setLoaderVisible(true);
        axiosClient.patch('api/device/profile', JSON.stringify(paramRequsest), {

            headers: {
                'content-type': 'application/json',
                'token': userInfo.token
            },
        }).then(function (response) {
            setLoaderVisible(false);
            navigation.reset(
                {
                    index: 0,
                    routes: [{ name: 'VehicleRegistration' }],
                });


        }).catch(function (error) {
            setLoaderVisible(false);
            console.log('Login' + JSON.stringify(error.response.data));
        }).then(function () {
            setLoaderVisible(false);

            // always executed
        });

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{ marginHorizontal: 16, flexDirection: 'column', flex: 1 }}>
            <View style={{ height: "100%" }}>
                <OnBoardTitle title={GoodString.WHAT_EMAIL} desc={GoodString.WHAT_EMAIL_DESC} isVisible={false}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <TextInput placeholder={GoodString.EMAIL_ID} style={GoodStyles.email_input} keyboardType="email-address" placeholderTextColor={GoodColors.placeholderCol}
                        onChangeText={(text) => { setEmail(text) }} />
                </View>
                {
                    visibleEmaileError ?
                        <Text style={GoodStyles.errorText}>{GoodString.errorEmail}</Text> : null
                }
                <View style={{ flex: 1 }}></View>
                <BlueButton title={GoodString.CONTINUE} style={{ marginBottom: 30 }} onPressNext={() => { validateMail() }} />
            </View>
            <GoodLoader alertVisible={loaderViesible} />

        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}



export default EmailVerification;