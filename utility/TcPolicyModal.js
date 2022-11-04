import { PROPERTY_TYPES } from "@babel/types";
import React from "react";
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';

import GoodColors from "./GoodColors";
import GoodString from "./GoodString";
import GoodStyles from "./GoodStyles";

const TcPolicyModal = (prop) => {
    return (
        <View >
            <Modal animationType="slide"
                visible={prop.isVisible}
                transparent={true} 
                style={{backgroundColor: 'rgba(52, 52, 52, 0.9)' }}>
                <View style={{ flexDirection: 'column', height: '100%' }}>
                    <TouchableOpacity style={{ height:100, backgroundColor: 'rgba(52, 52, 52, 0.9)' }} onPress={()=>prop.cancelDialog('')}>
                        <View  ></View>
                    </TouchableOpacity>
                    <View style={{backgroundColor: 'rgba(52, 52, 52, 0.9)'}} >
                    <View style={GoodStyles.tc_modal}>
                    <Text style={{fontSize:18, fontWeight:'bold', color:GoodColors.accentText}}>{prop.title}</Text>
                        <Text style={{fontSize:14,marginTop:16, color:GoodColors.tcPolicyDesc}}>{prop.desc}</Text>
                        
                    </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default TcPolicyModal;