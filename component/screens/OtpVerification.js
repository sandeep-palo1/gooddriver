import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, Alert, Pressable, TouchableWithoutFeedback, Keyboard } from 'react-native';
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import OnBoardTitle from "../../utility/OnBoardTitle";
import OTPTextInput from 'react-native-otp-textinput';
import BlueButton from "../../utility/BlueButton";
import { useNavigation } from "@react-navigation/core";
import axiosClient from '../../api/ApiClient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoodLoader from "../../utility/GoodLoader";

const OtpVerification = ({ theme, route }) => {

        const paramFromMobileVerification = route.params;
        const navigation = useNavigation();
        const [getOtp, setOtp] = useState('');
        const [visibleOtpError, setVisibleOtpError] = useState(false);
        const [loaderViesible, setLoaderVisible] = useState(false);

        useEffect(() => {
              //  AsyncStorage.setItem(GoodString.SCREEN_NAME, 'OtpVerification');
        }, []);

        const validateCode = () => {

                if (getOtp == '' || getOtp.length < 4) {
                        setVisibleOtpError(true)
                } else {
                        verifyCode(getOtp);
                        // navigation.navigate('PolicyScreen');
                }
        };

        const verifyCode = (param) => {
                const paramRequsest = {
                        phone: paramFromMobileVerification?.phone,
                        code: parseInt(param)
                }
                setLoaderVisible(true);
                axiosClient.post('api/otp/verify', JSON.stringify(paramRequsest), {
                        headers: {
                                'content-type': 'application/json',
                        },
                }).then(function (response) {
                        setLoaderVisible(false);
                        const userDetail = {
                                phone: paramFromMobileVerification?.phone,
                                token: response.data.token
                        }
                        AsyncStorage.setItem(GoodString.USER_PREF_KEY, JSON.stringify(userDetail))

                        if (response.data.new_user) {
                                navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'PolicyScreen' }],
                                });
                        } else {
                                navigation.reset({
                                        index: 0,
                                        routes: [{ name: 'HomeScreen' }],
                                });
                        }

                }).catch(function (error) {
                        setLoaderVisible(false);
                        Alert.alert('OTP Verification', JSON.stringify(error.response.data.message));
                }).then(function () {
                        setLoaderVisible(false);

                        // always executed
                });

        }

        // Resend OTP API
        const resendCode = () => {
                const paramRequsest = {
                        phone: paramFromMobileVerification?.phone
                }
                setLoaderVisible(true);
                axiosClient.post('api/otp/', JSON.stringify(paramRequsest), {
                        headers: {
                                'content-type': 'application/json',
                        },
                }).then(function (response) {
                        setLoaderVisible(false);
                        Alert.alert('OTP Resend', GoodString.ENTER_CODE_DESC + ' +' + paramFromMobileVerification?.phone + '  ' + response.data.code);
                }).catch(function (error) {
                        setLoaderVisible(false);
                        Alert.alert('OTP Resend', JSON.stringify(error.response.data.message));
                }).then(function () {
                        setLoaderVisible(false);
                        // always executed
                });

        }

        return (
                <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <SafeAreaView style={{ marginHorizontal: 16, flex:1 }}>
                        <View style={{ height: '100%' }}>
                                <OnBoardTitle title={GoodString.ENTER_CODE} desc={GoodString.ENTER_CODE_DESC + ' +' + paramFromMobileVerification?.phone} isVisible={true} />

                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                                        <OTPTextInput handleTextChange={(otp) => { setOtp(otp) }}
                                                textInputStyle={{ backgroundColor: GoodColors.OTP_bg }}
                                                secureTextEntry={true}
                                        />
                                </View>
                                {
                                        visibleOtpError ?
                                                <Text style={GoodStyles.errorText}>{GoodString.OTP_ERROR}</Text> : null
                                }
                                <View style={{ flex: 1 }}></View>
                                <Pressable onPress={() => { resendCode() }}>
                                        <Text style={{ padding: 10, alignSelf: 'center' }}>{GoodString.RESEND_CODE}</Text>
                                </Pressable>

                                <BlueButton title={GoodString.CONTINUE} style={{ marginBottom: 30 }} onPressNext={() => { validateCode() }} />
                        </View>
                        <GoodLoader alertVisible={loaderViesible} />
                </SafeAreaView>
                </TouchableWithoutFeedback>
        );
}

const styles = StyleSheet.create({
        textStyle: {
                fontSize: 16,

        }
});

export default OtpVerification;