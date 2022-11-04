import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Pressable, Alert, FlatList } from "react-native";
import GoodLoader from "../../../utility/GoodLoader";
import GoodString from "../../../utility/GoodString";
import HomeScreenTitle from "../../../utility/HomeScreenTitle";
import axiosClient from '../../../api/ApiClient';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUser, timeSince } from "../../../utility/ValidationUtil";
import GoodColors from "../../../utility/GoodColors";


const Notifications = () => {
    const navigation = useNavigation();
    const [loaderViesible, setLoaderVisible] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [notificationData, setNotificationData] = useState([]);
    const [noItem, setNoItem] = useState(false);

    useEffect(() => {
        const tokenAsync = async () => {
            const userDetail = await getUser()
            if (userDetail != null) {
                setUserInfo(userDetail);
            }
        }
        tokenAsync();
    }, []);

    useEffect(() => {
        if (userInfo != '') {
            fetchNotification()
        }
    }, [userInfo]);

    //Fetch Survey question
    const fetchQuestion = (question_type) => {

        setLoaderVisible(true);
        axiosClient.get(`/api/survey/${question_type}`, {
            headers: {
                'content-type': 'application/json',
                'token': userInfo.token
            },
        }).then(function (response) {
            setLoaderVisible(false);

            if (response.data.type === 'BOOLEAN') {
                navigation.navigate('BooleanQuestion', { datan: response.data });
            } else {
                navigation.navigate('TextualQuestion', { datan: response.data });
            }

        }).catch(function (error) {
            setLoaderVisible(false);
            Alert.alert(GoodString.APP_NAME, JSON.stringify(error.response.data.message));

        }).then(function () {
            setLoaderVisible(false);

            // always executed
        });

    }

    //Fetch notification question
    const fetchNotification = () => {

        setLoaderVisible(true);
        axiosClient.get(`api/device/notification/list?userId=${userInfo.phone}`, {
            headers: {
                'content-type': 'application/json',
                'token': userInfo.token
            },
        }).then(function (response) {
            // alert(JSON.stringify(response.data))
            if (response.data.length > 0) {
                setNotificationData(response.data)
                setNoItem(false)
            } else {
                setNoItem(true)
            }
            setLoaderVisible(false);

        }).catch(function (error) {
            setLoaderVisible(false);
            Alert.alert(GoodString.APP_NAME, JSON.stringify(error.response.data.message));

        }).then(function () {
            setLoaderVisible(false);

            // always executed
        });

    }


    return (
        <SafeAreaView style={{ backgroundColor: GoodColors.backgroundCol, height: '100%' }}>
            <HomeScreenTitle title={GoodString.NOTIFICATIONS} style={{ marginHorizontal: 16, }} />


            {noItem ?
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Text>No Notification yet</Text>
                </View>
                : <FlatList
                    style={{ marginHorizontal: 16, }}
                    data={notificationData}
                    renderItem={({ item, index }) => {
                        return (

                            <View>
                                <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, }}>
                                    <View style={{ height: 6, width: 6, borderRadius: 3, backgroundColor: '#CB99ED', }}></View>
                                    <Text style={{ fontSize: 14, marginLeft: 4, color: GoodColors.blueText }}>{item.title} </Text>
                                </View>
                                {item.type === "SURVEY" ?
                                    <Pressable onPress={() => { fetchQuestion(item.question_id) }}>
                                        <Text style={{ fontSize: 12, marginLeft: 10, color: '#62074D', fontWeight: 'bold', paddingTop: 7, paddingRight: 7 }}>{GoodString.TAKE_SURVEY} </Text>
                                    </Pressable>
                                    : null}

                                <Text style={{ fontSize: 12, color: '#99ACB7', marginTop: 1, marginLeft: 10, }}>{timeSince(item.created_at)} </Text>
                                <View style={{ height: 1, backgroundColor: '#EEEEEE', marginTop: 5 }}></View>
                            </View>

                        );
                    }}
                    keyExtractor={(item) => item.id}
                />}

            <GoodLoader alertVisible={loaderViesible} />
        </SafeAreaView>
    );
}

export default Notifications;