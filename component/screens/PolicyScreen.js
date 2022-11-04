import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, Linking } from 'react-native';
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import OnBoardTitle from "../../utility/OnBoardTitle";
import OTPTextInput from 'react-native-otp-textinput';
import BlueButton from "../../utility/BlueButton";
import { useNavigation } from "@react-navigation/core";
import TcPolicyModal from "../../utility/TcPolicyModal";
import { index } from "d3-array";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PolicyScreen = () => {
        const navigation = useNavigation();
        const [getOtp, setOtp] = useState('');
        const [isVisible, setVisible] = useState(false);
        const [content, setContent] = useState('');
        const [contentTitle, setContentTitle] = useState('');

        useEffect(() => {
                AsyncStorage.setItem(GoodString.SCREEN_NAME, 'PolicyScreen');
        }, []);


        const validateCode = () => {
                navigation.reset(
                        {
                                index: 0,
                                routes: [{ name: 'EmailVerification' }],
                        });
        };

        const mTermCondition = () => {
                setContent(GoodString.TNC_CONTENT);
                setContentTitle(GoodString.TNC)
                setVisible(true);
        };

        const mPolicy = () => {
                setContent(GoodString.PP_CONTENT);
                setContentTitle(GoodString.PRIVACY_POLICY)
                setVisible(true);
        };

        return (
                <SafeAreaView style={{ marginHorizontal: 16, height: '100%' }}>
                        <OnBoardTitle title={GoodString.HELLO_THERE} desc={GoodString.HELLO_THERE_DESC} isVisible={true} />

                        <View style={{ marginTop: 30 }}>
                                <TouchableOpacity onPress={() => { mTermCondition() }}>
                                        <Text style={[GoodStyles.privacyText, { paddingBottom: 5, paddingRight: 10 }]}>{GoodString.TNC}</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => { mPolicy() }}>
                                        <Text style={[GoodStyles.privacyText, { paddingTop: 5, paddingBottom: 10, paddingRight: 10 }]}>{GoodString.PRIVACY_POLICY}</Text>
                                </TouchableOpacity>
                        </View>

                        <View style={{ flex: 1 }}></View>
                        <BlueButton title={GoodString.I_AGREE} style={{ marginBottom: 30 }} onPressNext={() => { validateCode() }} />
                        <TcPolicyModal
                                isVisible={isVisible}
                                cancelDialog={() => setVisible(false)}
                                title={contentTitle}
                                desc={content} />
                </SafeAreaView>
        );
}

const styles = StyleSheet.create({
        textStyle: {
                fontSize: 16,

        }
});

export default PolicyScreen;