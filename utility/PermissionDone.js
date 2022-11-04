import React from "react";
import { View, Text, Image, Animated, StyleSheet } from "react-native";
import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
    Marks,
    Indicator,
    DangerPath,
} from 'react-native-cool-speedometer';
import GoodColors from "./GoodColors";
import GoodStyles from "../utility/GoodStyles";
import GoodString from "../utility/GoodString";


const PermissionDone = () => {

    return (
        <View>
            <View style={GoodStyles.diconnectCard}>


                <Speedometer
                    value={0}
                    angle={250} >
                    <Background color={'rgba(52, 52, 52, 0)'} />
                    <Arc arcWidth={50} color={GoodColors.speedometerPermissionCol} />
                    <Needle color={'#C4C4C4'} arcWidth={1} circleColor={GoodColors.backgroundCol} >
                    </Needle>
                    <Progress color={'yellow'} strokeWidth={50} arcWidth={50} />

                    <Indicator color={GoodColors.accentColor} fontSize={24} fontWeight={'bold'} >


                    </Indicator>
                </Speedometer>

                <Text style={{ color: '#0F1B42', fontSize: 16, textTransform: 'capitalize' }} >{GoodString.NO_RUSH}</Text>
                <Text style={{ textAlign: 'center', color: GoodColors.accentText, marginTop: 16 }}>{GoodString.WAITING_FOR_YOU_TO_TAKE}</Text>
            </View>
            <View style={GoodStyles.tripRecordCard}>
                <Image source={require('../resources/images/info.png')} />
                <Text style={{ color: GoodColors.accentText, marginTop: 16, fontSize: 14, textAlign: 'center', lineHeight: 20, }}>{GoodString.YOUR_TRIP_AUTOMATICALLY}</Text>

            </View>
        </View>
    );
}

export default PermissionDone;