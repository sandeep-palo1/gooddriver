import { useNavigation } from "@react-navigation/core";
import React from "react";
import { View, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import goodstyle from '../utility/GoodStyles'
import BlueButton from "./BlueButton";
import GoodString from "./GoodString";


const PermissionScreenBottom = (prop) => {
    const navigation = useNavigation();
    return (
        <View style={{ margin:16 }}>
            <Text style={goodstyle.setting_title}>{prop.title}</Text>
            <Text style={[goodstyle.setting_desc, { marginBottom: 16, marginTop:10 }]}>{prop.desc}</Text>
        
                <BlueButton
                    style={{ width:'100%', }}
                    title={prop.title_button}
                    onPressNext={prop.onClick} />
                
        
        </View>
    );
}



export default PermissionScreenBottom;