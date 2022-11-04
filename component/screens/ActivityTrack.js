import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text } from "react-native";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import PermissionScreenBottom from "../../utility/PermissionScreenBottom";
import ActivityPermissionModal from "../../utility/AcitvityPermissionModal";
import AsyncStorage from "@react-native-async-storage/async-storage";


const ActivityTrack = () => {
    const navigation = useNavigation();
    const [isVisible, setVisible] = useState(false);

    const mNext = (permission) => {
        AsyncStorage.setItem(GoodString.ACTIVITY_PERMISSION, permission);
        setVisible(false)
        navigation.navigate('RunInBackground')
    };


    return (
        <View style={{ flexDirection: 'column', height: '100%' }}>

            <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: GoodColors.gray, marginTop: 50, alignSelf: "center" }}></View>

            <View style={GoodStyles.permissionCard}>

                <Text style={[GoodStyles.activityAllowText, { backgroundColor: GoodColors.activityAllowBg, color: GoodColors.allowTextCol }]}>{GoodString.ALLOW}</Text>
                <Text style={[GoodStyles.activityAllowText, { fontWeight: 'normal', color: GoodColors.permissionTextGray }]}>{GoodString.DENY}</Text>

            </View>

            <View style={{ flex: 1 }} ></View>

            <PermissionScreenBottom
                title={GoodString.ACTIVITY_TRACK}
                desc={GoodString.ACTIVITY_TRACK_DESC}
                title_button={GoodString.ALLOW}
                onClick={() => { setVisible(true) }} />

            <ActivityPermissionModal
                cancelDialog={(key) => { mNext(key) }}
                isVisible={isVisible} />
        </View>
    );
}

export default ActivityTrack;