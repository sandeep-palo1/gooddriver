import React from "react";
import { View, Text, Image } from "react-native";
import GoodColors from "../../../utility/GoodColors";
import GoodString from "../../../utility/GoodString";
import dateFormat, { masks } from "dateformat";
import { is } from "@babel/types";

const TripItem = ({ itemTrip }) => {

    const timeStamp = (time, endtime) => {
        //  2022-06-14T14:17:30.209681+00:00
        var startTime = dateFormat(new Date(time), 'ddd dd, HH:MM');
        var endT = dateFormat(endtime, 'HH:MM');

        return startTime + ' to ' + endT;
    }

    const getMph = (mile, duration) => {
        let durationTime = duration / 60;
        let mph = Math.round(mile / durationTime);
        return mph == Infinity ? 0 : mph;
    }

 

    return (
        <View style={{ marginTop: 24 }}>
            <View style={{ flexDirection: 'row', marginHorizontal: 16 }}>
                <Text style={{ flex: 1, color: GoodColors.blueText, fontSize: 14 }}>{timeStamp(itemTrip.trip_started_at, itemTrip.trip_ended_at)}</Text>
                <Text style={{ color: GoodColors.blueText, fontSize: 14, fontWeight: 'bold' }}>{getMph(itemTrip.total_miles, itemTrip.time_duration) + ' mph'}</Text>
            </View>

            <View>
                <Image source={{ uri: itemTrip.trip_image }} style={{ width: '100%', height: 160, resizeMode: 'cover', marginTop: 7 }} />

                <View style={{ position: 'absolute', borderWidth: 1, borderColor: 'black', backgroundColor: 'white', alignItems: 'center', borderRadius: 2, padding: 3, margin: 16 }}>
                    <Text style={{ color: GoodColors.blueText, fontSize: 12, fontWeight: 'bold' }}>{itemTrip.total_miles}</Text>
                    <Text style={{ color: GoodColors.blueText, fontSize: 9 }}>miles</Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', marginHorizontal: 16, marginTop: 5 }}>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: itemTrip.breaking_color }}></View>
                    <Text style={{ marginStart: 3, color: GoodColors.gray_text, fontSize: 12 }}>{GoodString.BREAKING}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: itemTrip.acceleration_color }}></View>
                    <Text style={{ marginStart: 3, color: GoodColors.gray_text, fontSize: 12 }}>{GoodString.ACCELEration}</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }}>
                    <View style={{ width: 16, height: 16, borderRadius: 8, backgroundColor: itemTrip.smoothness_color }}></View>
                    <Text style={{ marginStart: 3, color: GoodColors.gray_text, fontSize: 12 }}>{GoodString.SMOOTHNES}</Text>
                </View>
            </View>
        </View>
    );

}

export default TripItem;