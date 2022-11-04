
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, TextInput, Alert, TouchableWithoutFeedback, Keyboard } from 'react-native';
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import OnBoardTitle from "../../utility/OnBoardTitle";
import BlueButton from "../../utility/BlueButton";
import RegionModal from "../../utility/RegionModal";
import { useNavigation } from "@react-navigation/core";
import { getUser } from '../../utility/ValidationUtil';
import axiosClient from '../../api/ApiClient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoodLoader from "../../utility/GoodLoader";

const VehicleRegistration = () => {
    const navigation = useNavigation();

    const [visibleCarError, setVisibleCarError] = useState(false);
    const [getCar, setCar] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [loaderViesible, setLoaderVisible] = useState(false);

    useEffect(() => {
        AsyncStorage.setItem(GoodString.SCREEN_NAME, 'VehicleRegistration');
        const tokenAsync = async () => {
            const userDetail = await getUser()
            if (userDetail != null) {
                setUserInfo(userDetail);
            }
        }
        tokenAsync();
    }, []);

    const validateCar = () => {

        if (getCar == '') {
            setVisibleCarError(true)
        } else {
            //    navigation.navigate('CarDetail')
            carRegistration();
        }
    }

    // Vehicle registration
    const carRegistration = () => {
        setLoaderVisible(true);
        axiosClient.get('api/device/search-vehicle?reg_no=' + getCar, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'token': userInfo.token
            },
        }).then(function (response) {
            setLoaderVisible(false);
            AsyncStorage.setItem(GoodString.VEHICLE_DETAIL_PREF_KRY, JSON.stringify(response.data));
            // const params = {
            //     dataCar: response.data,

            // };
            navigation.reset(
                {
                    index: 0,
                    routes: [{ name: 'CarDetail' }], //, 'params':params
                });

        }).catch(function (error) {
            setLoaderVisible(false);
            Alert.alert(GoodString.APP_NAME, JSON.stringify(error.response.data.error));
        }).then(function () {
            setLoaderVisible(false);

            // always executed
        });

    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <SafeAreaView style={{ marginHorizontal: 16, flexDirection: 'column', flex: 1 }}>
            <View style={{ height: "100%" }}>
                <OnBoardTitle title={GoodString.WHAT_CAR} desc={GoodString.WHAT_CAR_DESC} isVisible={false}
                />
                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                    <TextInput placeholder={GoodString.CAR_NUMBER} style={[GoodStyles.email_input, { marginStart: 0, backgroundColor: GoodColors.inputBg, borderRadius: 8, fontSize: 16, paddingHorizontal: 7 }]} placeholderTextColor={GoodColors.placeholderCol}
                        onChangeText={(text) => { setCar(text) }} />
                </View>
                {
                    visibleCarError ?
                        <Text style={GoodStyles.errorText}>{GoodString.errorCar}</Text> : null
                }
                <View style={{ flex: 1 }}></View>
                <BlueButton title={GoodString.get_started} style={{ marginBottom: 30 }} onPressNext={() => { validateCar() }} />

            </View>
            <GoodLoader alertVisible={loaderViesible} />
        </SafeAreaView>
        </TouchableWithoutFeedback>
    );
}



export default VehicleRegistration;