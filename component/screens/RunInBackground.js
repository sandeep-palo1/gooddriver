import { useNavigation } from "@react-navigation/core";
import React, { useState } from "react";
import { View, Text, Image } from "react-native";
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from "react-native-simple-radio-button";
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import PermissionScreenBottom from "../../utility/PermissionScreenBottom";
import ActivityPermissionModal from "../../utility/AcitvityPermissionModal";


const RunInBackground = () => {
    const navigation = useNavigation();
    const [isVisible, setVisible] = useState(false);

    const mNext = () => {

        navigation.navigate('HomeScreen');
    };


    return (
        <View style={{ flexDirection: 'column', height: '100%' }}>

            <View style={{ width: 200, height: 200, borderRadius: 100, backgroundColor: GoodColors.gray, marginTop: 50, alignSelf: "center" }}></View>

            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

                <Image source={require('../../resources/images/run_background.png')} />
            </View>



            <PermissionScreenBottom
                title={GoodString.RUN_IN_BACKGROUND}
                desc={GoodString.RUN_IN_BACKGROUND_DESC}
                title_button={GoodString.ALLOW}
                onClick={() => { mNext() }} />


        </View>
    );
}

export default RunInBackground;