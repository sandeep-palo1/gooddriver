import React, { useCallback } from "react";
import { View, Text, Image, Linking, Pressable } from "react-native";
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


const PermissionPending = (prop) => {


    const _openAppSetting = useCallback(async () => {
        // Open the custom settings if the app has one
        await Linking.openSettings();
    }, []);
    return (
        <View>
            <View style={GoodStyles.diconnectCard}>


                <Speedometer
                    value={0}
                    angle={250} >
                    <Background color={GoodColors.diconnectCardCol} />


                    <Arc arcWidth={50} color={GoodColors.speedometerDefault} />
                    <Needle color={'#C4C4C4'} arcWidth={1} circleColor={GoodColors.backgroundCol} />
                    <Progress color={'yellow'} strokeWidth={25} arcWidth={25} />

                </Speedometer>

                <Text style={{ textAlign: 'center', color: GoodColors.accentText }}>{GoodString.CANNT_RECORD_DRIVES}</Text>
            </View>

            <View style={GoodStyles.connectionStatusCard}>
                <Text style={{ color: '#62074D' }}>{GoodString.PERMISSION}</Text>
                <Text style={{ color: GoodColors.accentText, marginTop: 16, fontSize: 14, textAlign: 'center', lineHeight: 20, }}>{GoodString.BUILD_ACCURATE_SCORE}</Text>
                <View style={{ width: '100%', flexDirection: 'row', marginTop: 16 }}>
                    <Text style={{ color: GoodColors.accentText, fontSize: 14 }}>{GoodString.ACITVITY_SERVICE}</Text>
                    <View style={{ flex: 1 }}></View>
                    {prop.activityPermissionStatus ?
                        <Image source={require('../resources/images/complete.png')} />
                        :
                        
                        <Pressable onPress={prop.onClickActivity }>
                            <Image source={require('../resources/images/pending.png')} />
                        </Pressable>
                    }
                </View>

                <View style={{ width: '100%', flexDirection: 'row', marginTop: 16 }}>
                    <Text style={{ color: GoodColors.accentText, fontSize: 14 }}>{GoodString.LOCATION_SERVICE}</Text>
                    <View style={{ flex: 1 }}></View>
                    {prop.isLocation ?
                        <Image source={require('../resources/images/complete.png')} />
                        :
                        <Pressable onPress={() => { _openAppSetting() }}>
                            <Image source={require('../resources/images/pending.png')} />
                        </Pressable>
                    }
                </View>
            </View>
        </View>
    );
}

export default PermissionPending