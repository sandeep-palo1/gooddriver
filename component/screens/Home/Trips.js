import React, { useEffect, useRef, useState } from "react";
import { View, Text, SafeAreaView, FlatList, Alert, Image, TouchableOpacity, Modal, Touchable } from "react-native";
import GoodLoader from "../../../utility/GoodLoader";
import GoodString from "../../../utility/GoodString";
import HomeScreenTitle from "../../../utility/HomeScreenTitle";
import TripItem from "../list_item/TripItem";
import axiosClient from '../../../api/ApiClient';
import { getUser } from "../../../utility/ValidationUtil";
import GoodColors from "../../../utility/GoodColors";
import { Picker } from '@react-native-picker/picker';
import { monthList, fetchDate } from '../../../utility/ValidationUtil';

const Trips = () => {
    const [tripData, setTripData] = useState([])
    const [loaderViesible, setLoaderVisible] = useState(false);
    const [userInfo, setUserInfo] = useState('');
    const [noItem, setNoItem] = useState(false);
    const [monthModalVisible, setMonthModalVisibility] = useState(false);
    const [selectedMonth, setSelectedMonth] = useState(2);
    const [getPage, setPage] = useState(1);
    const [getMonthList, setMonthList] = useState(monthList());


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
        //alert(""+getPage+":::::"+JSON.stringify(fetchDate(getMonthList[selectedMonth])))
        if (userInfo != '') {
            fetchTrips(fetchDate(getMonthList[selectedMonth]));

        }
    }, [userInfo, getPage]);

 

    //Fetch Trips question
    const fetchTrips = (dateRange) => {
        setLoaderVisible(true);
        axiosClient.get(`/api/device/trip/list?userId=${userInfo.phone}&page=${getPage}&start_date=${dateRange.start_date}&end_date=${dateRange.end_date}`, {
        // axiosClient.get(`/api/device/trip/list?userId=7467406028&page=${getPage}&start_date=2022-01-01&end_date=2022-04-30`, {
            headers: {
                'content-type': 'application/json',
                'token': userInfo.token
            },
        }).then(function (response) {
             console.log("TRIP DATA:::"+JSON.stringify(response.data))
            if (response.data.length > 0) {

                setTripData(tripData.concat(response.data))
                setNoItem(false)
            } else {
                if (tripData.length == 0) {
                    setNoItem(true)
                } else {
                    setNoItem(false)
                }
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <HomeScreenTitle title={GoodString.TRIPS} style={{ marginHorizontal: 16, flex: 1 }} />

                <TouchableOpacity onPress={() => { setMonthModalVisibility(!monthModalVisible) }}>
                    <View style={{ backgroundColor: '#F7F8FA', borderRadius: 5, paddingHorizontal: 7, paddingVertical: 4, marginTop: 16, marginRight: 16, flexDirection: 'row', justifyContent: 'center' }}>
                        <Text style={{ alignSelf: 'center', marginRight: 7, color: '#7D7D7D' }}> {getMonthList[selectedMonth]}</Text>
                        <Image source={require('../../../resources/images/dropdown_ic.png')} style={{ alignSelf: 'center', }} />
                    </View>
                </TouchableOpacity>
            </View>


            {noItem ?
                <View style={{ justifyContent: 'center', alignItems: 'center', height: '100%', width: '100%' }}>
                    <Text>No trip recorded</Text>
                </View>
                : <FlatList
                    data={tripData}
                    renderItem={({ item }) => { return (<TripItem itemTrip={item} />); }}
                    keyExtractor={(item) => item.id}
                    onEndReached={() => { setPage(getPage + 1) }}
                />}
            <GoodLoader alertVisible={loaderViesible} />

            <Modal
                transparent={true}
                visible={monthModalVisible}>
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flex: 1 }}></View>
                    <FlatList
                        style={{ backgroundColor: 'white', marginTop: 50, padding: 7, borderRadius: 3, marginRight: 10 }}
                        data={getMonthList}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity onPress={() => {
                                    setMonthModalVisibility(false);
                                    setSelectedMonth(index);
                                    setPage(1);
                                   // fetchTrips(fetchDate(getMonthList[index]));
                                }}>
                                    <View style={{ padding: 5 }}><Text style={{ fontSize: 16 }}>{item} </Text></View>
                                </TouchableOpacity>
                            );
                        }}
                        keyExtractor={(item) => item.id}
                    />
                </View>
            </Modal>
        </SafeAreaView>
    );
}

export default Trips;