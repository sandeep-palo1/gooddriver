import React, { useState, useEffect, useCallback, useRef } from "react";
import { View, Text, Image, ScrollView, Linking, PermissionsAndroid, AppState, Platform, Pressable, Alert, Modal } from "react-native";
import GoodColors from "../../../utility/GoodColors";
import GoodStyles from "../../../utility/GoodStyles";
import GoodLoader from "../../../utility/GoodLoader";
import PermissionPending from "../../../utility/PermissionPending";
import PermissionDone from "../../../utility/PermissionDone";
import DashboardData from "../../../utility/DashboardData";
import { getActivityPermission, getUser, getVehicle, fetchDate, clearPrefereance } from '../../../utility/ValidationUtil';
import axiosClient from '../../../api/ApiClient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import GoodString from "../../../utility/GoodString";
import { useNavigation } from "@react-navigation/core";
import AcitvityPermissionModal from "../../../utility/AcitvityPermissionModal";
import { NativeModules } from 'react-native';
import LOC from '../../../LocationModule';
import LogoutModal from "../../../utility/LogoutModal";
import SystemSetting from "react-native-system-setting";
import GpsModal from "../../../utility/GpsModal";
import Geolocation from 'react-native-geolocation-service';

const Dashboard = () => {
    const navigation = useNavigation();
    const [dashboardData, setDashboardData] = useState('');
    const [userInfo, setUserInfo] = useState('');
    const [vehicleInfo, setVehicleInfo] = useState('');
    const [activityPermission, setActivityPermission] = useState('');
    const [visibleScreen, setVisibilityScreen] = useState(0);
    const [isLogoutModalVisible, setLogoutModalVisible] = useState(false);
    const [loaderViesible, setLoaderVisible] = useState(false);
    const [isVisibleActivity, setVisibleActivity] = useState(false);
    const [locationPermission, setLocationPermission] = useState(false);
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [GPSVisible, setGPSVisible] = useState(false);
    const monthNames = ["January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];


    useEffect(() => {

        activityPermissionM();
        tokenAsync();
        vehicleAsync();
        getLocationStatus();

    }, []);

    useEffect(() => {
        const locationListener = SystemSetting.addLocationListener(
            (locationEnabled) => {
                if (!locationEnabled && !GPSVisible) {

                    setGPSVisible(true)
                } else {
                    setGPSVisible(false)
                }
            }
        );

        return () => SystemSetting.removeListener(locationListener);

    }, []);

    const tokenAsync = async () => {
        const userDetail = await getUser()
        if (userDetail != null) {
            setUserInfo(userDetail);
        }
    }

    //Fetch Vehicle information
    const vehicleAsync = async () => {
        const vechile = await getVehicle()
        if (vechile != null) {
            setVehicleInfo(vechile);
        }
    }

    //Activity permission fetch from AsyncStorage
    const activityPermissionM = async () => {
        const activityPermissio = await getActivityPermission()

        setActivityPermission(activityPermissio);
    }

    useEffect(() => {

        if (userInfo != '') {
            // LOC.userId(userInfo.phone, userInfo.token)
            // console.log(NativeModules.SaveLocationToCoreData.getConstants());
            if (Platform.OS === 'android') {
                LOC.userId(userInfo.phone, userInfo.token)
            } else {
                NativeModules.SaveLocationToCoreData.getLocationUpdate(userInfo.token, userInfo.phone);
            }
        }
        const d = new Date();
        if (Platform.OS === 'android') {
            PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION, PermissionsAndroid.PERMISSIONS.ACCESS_BACKGROUND_LOCATION).then(response => {
                setLocationPermission(response)
                if (response == true) {
                    if (activityPermission == 'deny') {
                        setVisibilityScreen(1)
                    }
                    if (userInfo != '') {

                        getDashboard(fetchDate(monthNames[d.getMonth()]))
                    }


                } else { setVisibilityScreen(1) }
            });
        } else {

            checkIosPermission();
        }


    }, [userInfo]);

    const checkIosPermission = async () => {
        const d = new Date();
        const status = await Geolocation.requestAuthorization('whenInUse');

        if (status === 'granted') {
            if (activityPermission == 'deny') {
                setVisibilityScreen(1)
            }
            if (userInfo != '') {
                setLocationPermission(true)
                getDashboard(fetchDate(monthNames[d.getMonth()]))
            }
        }
    }

    //Start record data on permission update
    useEffect(() => {
        if (locationPermission && activityPermission == 'allow') {
            recordData();
        }
    }, [locationPermission, activityPermission]);

    useEffect(() => {
        const subscription = AppState.addEventListener("change", nextAppState => {

            if (
                appState.current.match("background") &&
                nextAppState === "active"
            ) {
                activityPermissionM();
                tokenAsync();
                vehicleAsync();
                getLocationStatus();
            }

            appState.current = nextAppState;
            setAppStateVisible(appState.current);
            console.log("AppState", appState.current);
        });
        return () => {
            subscription.remove();
        };
    }, []);

    const getLocationStatus = async () => {
        const isLoc = await SystemSetting.isLocationEnabled();
        if (!isLoc) {
            Alert.alert(GoodString.GPS_DISABLE);
        }
    }

    useEffect(() => {
        //    alert('sdfsd')
        // alert("locpermission::::"+locationPermission+'  activitypermission::::'+activityPermission+'  DashboardData::::'+dashboardData)
        if (dashboardData != '' && locationPermission && activityPermission == 'allow') {
            setVisibilityScreen(3);
        } else if (locationPermission && activityPermission == 'allow') {
            setVisibilityScreen(2)
        } else {
            setVisibilityScreen(1)
        }

    }, [dashboardData]);


    //Permission Check
    const checkPermission = () => {
        if (Platform.OS == 'ios') {

        } else {
            // PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.FINE).then(response=>{
            //});
            requestAndroidPermission();
        }
    }

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
                alert("useEffect90")
                if (activityPermission == 'deny') {

                    setVisibilityScreen(1)
                }
            } else {

                setVisibilityScreen(1)
            }
        } catch (err) {

            console.warn(err);
        }
    };

    const _openAppSetting = useCallback(async () => {
        // Open the custom settings if the app has one
        await Linking.openSettings();
    }, []);

    //Start record location and accelerometer data
    const recordData = () => {
        if (Platform.OS === 'android') {
            LOC.startService()
        }
    }

    // Fetch Dashboard data
    const getDashboard = (dateRange) => {

        setLoaderVisible(true);
        axiosClient.get(`/api/device/dashboard?userId=${userInfo.phone}&start_date=${dateRange.start_date}&end_date=${dateRange.end_date}`, {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'multipart/form-data',
                'token': userInfo.token
            },
        }).then(function (response) {
            //Set stack bar sata
            // alert(JSON.stringify(response.data))
            setLoaderVisible(false);
            setDashboardData(response.data)

        }).catch(function (error) {
            setLoaderVisible(false);
            Alert.alert('Car registration', JSON.stringify(error.response.data.error));
        }).then(function () {
            setLoaderVisible(false);

            // always executed
        });

    }

    const getDataOfMonth = (month) => {
        // alert(""+ JSON.stringify(fetchDate(month)))
        getDashboard(fetchDate(month));
    }

    const logoutM = () => {
        if (Platform.OS == 'android') {
            LOC.stopService()
        } else {
            NativeModules.SaveLocationToCoreData.stopIosService()
        }

        clearPrefereance();

        navigation.reset({
            index: 0,
            routes: [{ name: 'MobileVerification' }],
        });
    }

    return (
        <View style={{ backgroundColor: GoodColors.backgroundCol, height: '100%' }}>
            <View style={{ justifyContent: 'flex-start', flexDirection: 'row', padding: 16, alignItems: 'center' }}>
                <View style={{
                    backgroundColor: GoodColors.carNumberBg, borderColor: '#000000', borderWidth: 1, borderRadius: 4
                }}>
                    {vehicleInfo === '' ?
                        <Text style={[GoodStyles.vehicleNuber, { fontSize: 18, }]}>{'XXXXXX'}</Text>
                        : <Text style={[GoodStyles.vehicleNuber, { fontSize: 18, }]}>{vehicleInfo.valuation?.Vrm}</Text>}
                </View>
                <View style={{ flex: 1 }}></View>
                <Pressable onPress={() => { setLogoutModalVisible(true) }}>
                    <Image source={

                        (vehicleInfo === null || vehicleInfo === '' || vehicleInfo.vehicle_image === null || vehicleInfo.vehicle_image?.VehicleImages?.ImageDetailsCount == 0) ?
                            require('../../../resources/images/car.png')
                            :
                            { uri: vehicleInfo?.vehicle_image?.VehicleImages?.ImageDetailsList[0]?.ImageUrl }

                    }
                        style={{ width: 40, height: 40, borderRadius: 20 }} />
                </Pressable>
            </View>
            <ScrollView style={{ backgroundColor: GoodColors.backgroundCol }}>
                <View>
                    {
                        (visibleScreen == 1) ?
                            //  PermissionPending View 
                            < PermissionPending
                                activityPermissionStatus={activityPermission == 'allow'}
                                isLocation={locationPermission}
                                onClickActivity={() => setVisibleActivity(true)} />
                            : visibleScreen == 2 ?
                                //  Permission done and no data available 
                                < PermissionDone />
                                : visibleScreen == 3 ?
                                    //  Dashboard data view 
                                    < DashboardData
                                        back={(month) => {
                                            getDataOfMonth(month)
                                        }}
                                        data={dashboardData}
                                    />
                                    : null
                    }
                </View>
            </ScrollView>

            <AcitvityPermissionModal
                cancelDialog={(key) => {
                    setVisibleActivity(false)
                    setActivityPermission(key)
                    AsyncStorage.setItem(GoodString.ACTIVITY_PERMISSION, key);
                    const d = new Date();
                    getDashboard(fetchDate(monthNames[d.getMonth()]))

                }}
                isVisible={isVisibleActivity} />

            <LogoutModal isVisible={isLogoutModalVisible}
                pressLogout={() => {
                    setLogoutModalVisible(false)
                    Alert.alert(GoodString.APP_NAME, GoodString.ARE_YOU_SURE_LOGOUT,
                        [
                            { text: 'Cancel' },
                            { text: 'Ok', onPress: () => logoutM() },
                        ])
                }}
                dismiss={() => setLogoutModalVisible(false)} />
            <GoodLoader alertVisible={loaderViesible} />

            <GpsModal
                isVisible={GPSVisible}
                dismiss={() => { setGPSVisible(false) }}
            />
        </View>

    );
}

export default Dashboard;