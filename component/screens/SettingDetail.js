import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/core";
import React, { useCallback, useEffect } from "react";
import { View, Text, Linking, PermissionsAndroid, Platform } from "react-native";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import PermissionScreenBottom from "../../utility/PermissionScreenBottom";
import Geolocation from 'react-native-geolocation-service';
import { NativeModules } from 'react-native';
const SettingDetail = () => {
    const navigation = useNavigation();
    const mNext = () => {
        _openAppSetting();
        navigation.navigate('ActivityTrack')
    };

    useEffect(() => {
        AsyncStorage.setItem(GoodString.SCREEN_NAME, 'SettingDetail');
        
        if (Platform.OS == 'ios') {
            NativeModules.SaveLocationToCoreData.askForPermission()
            // const hasPermission = await hasPermissionIOS();
            // return hasPermission;
        } else {
            // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.FINE).then(response=>{
            //});
            requestAndroidPermission();

        
    }
    }, [])
    
    const hasPermissionIOS = async () => {
        try {
          const openSetting = () => {
            Linking.openSettings().catch(() => {
              Alert.alert('Good Driver', 'Unable to open settings');
            });
          };
          const status = await Geolocation.requestAuthorization('whenInUse');
    
          if (status === 'granted') {
            return true;
          }
    
          if (status === 'denied') {
    
    
    
            Alert.alert('KiDSiE',
              `Turn on Location Services to allow Kidsie to determine your location.`,
              [
                { text: 'Go to Settings', onPress: () => { openSetting() } },
                { text: "Select your location", onPress: () => { setPlacePickerVisible(true) } },
              ],
            );
          }
    
          if (status === 'disabled') {
    
            Alert.alert('KiDSiE',
              `Turn on Location Services to allow Kidsie to determine your location.`,
              [
                { text: 'Go to Settings', onPress: () => { openSetting() } },
                { text: "Select your location", onPress: () => { setPlacePickerVisible(true) } },
              ],
            );
          }
        } catch (error) {
    
        }
    
        return false;
      };
    

    const requestAndroidPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {

            } else {
                alert("Location permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const _openAppSetting = useCallback(async () => {
        // Open the custom settings if the app has one
        await Linking.openSettings();
    }, []);

    return (
        <View style={{ flexDirection: 'column', height: '100%' }}>

            <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: GoodColors.gray, marginTop: 50, alignSelf: "center" }}></View>

            <View style={[GoodStyles.permissionCard, { padding: 16 }]}>

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                    <RadioButtonInput
                        obj={'obj'}
                        index={0}
                        isSelected={true}
                        onPress={() => { }}
                        borderWidth={1}
                        buttonInnerColor={GoodColors.permissionText}
                        buttonOuterColor={GoodColors.permissionText}
                        buttonSize={7}
                        buttonOuterSize={15}
                        buttonStyle={{}}
                        buttonWrapStyle={{}}
                    />

                    <Text style={[GoodStyles.permissionText]}>{GoodString.ALLOW_ALL_TIME}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>

                    <RadioButtonInput
                        obj={'obj'}
                        index={0}
                        isSelected={true}
                        onPress={() => { }}
                        borderWidth={1}
                        buttonInnerColor={null}
                        buttonOuterColor={GoodColors.permissionTextGray}
                        buttonSize={7}
                        buttonOuterSize={15}
                        buttonStyle={{}}
                        buttonWrapStyle={{}}
                    />
                    <Text style={[GoodStyles.permissionText, { fontWeight: 'normal', color: GoodColors.permissionTextGray }]}>{GoodString.ALLOW_ONLY}</Text>
                </View>

                <View style={{ flexDirection: 'row', marginTop: 16, alignItems: 'center' }}>

                    <RadioButtonInput
                        obj={'obj'}
                        index={0}
                        isSelected={true}
                        onPress={() => { }}
                        borderWidth={1}
                        buttonInnerColor={null}
                        buttonOuterColor={GoodColors.permissionTextGray}
                        buttonSize={7}
                        buttonOuterSize={15}
                        buttonStyle={{}}
                        buttonWrapStyle={{}}
                    />
                    <Text style={[GoodStyles.permissionText, { fontWeight: 'normal', color: GoodColors.permissionTextGray }]}>{GoodString.ASK_EVERY_TIME}</Text>
                </View>
            </View>

            <View style={{ flex: 1 }} ></View>

            <PermissionScreenBottom
                title={GoodString.WE_CANT_RECORD}
                desc={GoodString.WE_CANT_RECORD_DESC}
                title_button={GoodString.GOTO_SETTING}
                onClick={() => { mNext() }} />
        </View>
    );
}

export default SettingDetail;