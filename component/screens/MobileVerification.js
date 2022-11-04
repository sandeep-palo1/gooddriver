import React, { useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, Alert, Pressable, Keyboard, TouchableWithoutFeedback } from 'react-native';
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import OnBoardTitle from "../../utility/OnBoardTitle";
import BlueButton from "../../utility/BlueButton";
import RegionModal from "../../utility/RegionModal";
import { useNavigation } from "@react-navigation/core";
import { mobilevalidate } from "../../utility/ValidationUtil";
import axiosClient from '../../api/ApiClient';
import GoodLoader from "../../utility/GoodLoader";

const MobileVerification = () => {
    const navigation = useNavigation();
    const [isRegionVisible, setRegionVisible] = useState(false);
    const [countryFlag, setCountryFlag] = useState(require('../../resources/images/Flag_of_the_United_Kingdom.svg.png'))
    const [countryCode, setCountryCode] = useState('+44')
    const [visiblePhoneError, setVisiblePhoneError] = useState(false);
    const [getPhone, setPhone] = useState('');
    const [loaderViesible, setLoaderVisible] = useState(false);

    const validatePhone = () => {
        // alert('' + getPhone);
        if (getPhone === '') {
            alert('Enter phone number');
        } else if (mobilevalidate(getPhone)) {
            uploadMobile(countryCode.substr(1, countryCode.length) + getPhone)
        } else {
            setVisiblePhoneError(true)
        }

    }

    //Verification of mobile nymber
    const uploadMobile = (param) => {
        const paramRequsest = {
            phone: param
        }
        setLoaderVisible(true);
        axiosClient.post('api/otp/', JSON.stringify(paramRequsest), {
            headers: {
                'content-type': 'application/json',
            },
        }).then(function (response) {
            setLoaderVisible(false);
            const params = {
                phone: param,

            };

            navigation.reset({
                index: 0,
                routes: [{ name: 'OtpVerification', params: params }],
            });

            Alert.alert('Mobile verification', GoodString.ENTER_CODE_DESC + ' +' + param );
        }).catch(function (error) {
            setLoaderVisible(false);
            Alert.alert('Login', JSON.stringify(error.response.data.message));
        }).then(function () {
            setLoaderVisible(false);

            // always executed
        });

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}> 
        <SafeAreaView style={{ marginHorizontal: 16, flexDirection: 'column', flex: 1 }} >
            <View style={{height:'100%'}}>
            <OnBoardTitle title={GoodString.ENTER_MOBILE} desc={GoodString.ENTER_MOBILE_DESC} isVisible={true}
                changeCountry={() => { setRegionVisible(true) }} flag={countryFlag} />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                <Pressable onPress={() => { setRegionVisible(true) }}>
                    <Text style={GoodStyles.country_input}>{countryCode}</Text>
                </Pressable>
               
                <TextInput placeholder={GoodString.ENTER_NUMBER} style={GoodStyles.mobile_input} maxLength={10} keyboardType="phone-pad" placeholderTextColor={GoodColors.placeholderCol}
                    onChangeText={(text) => { setPhone(text) }} 
                    
                    />

            </View>
            {
                visiblePhoneError ?
                    <Text style={GoodStyles.errorText}>{GoodString.emphtyPhone}</Text>
                    : null
            }

            <View style={{ flex: 1 }}></View>
            <BlueButton title={GoodString.NEXT} style={{ marginBottom: 30 }} onPressNext={() => { validatePhone() }} />

            <RegionModal
                isVisible={isRegionVisible}
                cancelDialog={(region) => {
                    if (region != '') {
                        if (region == 'in') {
                            setCountryCode('+91')
                            setCountryFlag(require('../../resources/images/india.png'))
                        } else {
                            setCountryCode('+44')
                            setCountryFlag(require('../../resources/images/Flag_of_the_United_Kingdom.svg.png'))

                        }
                    }
                    setRegionVisible(false)
                }} />
                </View>
                <GoodLoader alertVisible={loaderViesible}/>

        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}



export default MobileVerification;