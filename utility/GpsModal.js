import React from "react";
import { Modal, View, Text, Pressable, TouchableOpacity } from 'react-native';
import GoodColors from "./GoodColors";
import GoodString from "./GoodString";

const GpsModal = (prop) => {
    return (
        <Modal
            visible={prop.isVisible}
            transparent={true}
            style={{backgroundColor: 'rgba(52, 52, 52, 0.9)',  flexDirection: 'column' }}>
            <TouchableOpacity style={{ flex: 1,backgroundColor: 'rgba(52, 52, 52, 0.9)' }} onPress={() => prop.dismiss()}>
                <View style={{ flex: 1 }} ></View>
            </TouchableOpacity>
            <View style={{backgroundColor: 'rgba(52, 52, 52, 0.9)'}}>
            <View style={{ backgroundColor: 'white', height: 100, borderRadius: 10, marginHorizontal:18, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={{ padding: 16,  fontSize: 16 }}>{GoodString.GPS_DISABLE}</Text>
                <Pressable onPress={() => prop.dismiss()}>
                    <Text style={{ padding: 16, fontWeight: 'bold', color: GoodColors.blueText, fontSize: 16 }}>OK</Text>
                </Pressable>
            </View>
            </View>
            <TouchableOpacity style={{ flex: 1,backgroundColor: 'rgba(52, 52, 52, 0.9)' }} onPress={() => prop.dismiss()}>
                <View style={{ flex: 1 }} ></View>
            </TouchableOpacity>
        </Modal>
    );
}

export default GpsModal;