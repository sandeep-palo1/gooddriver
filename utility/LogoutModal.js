import { getVersion } from "@jest/core";
import React, { version } from "react";
import { Modal, View, Text, Pressable, TouchableOpacity } from 'react-native';
import ReactNativeVersionInfo from "react-native-version-info";

const LogoutModal = (prop) => {
    return (
        <Modal
            visible={prop.isVisible}
            transparent={true}
            style={{ backgroundColor: 'rgba(52, 52, 52, 0.9)', flexDirection: 'column' }}>
            <TouchableOpacity style={{ flex: 1 }} onPress={() => prop.dismiss()}>
                <View style={{ flex: 1 }} ></View>
            </TouchableOpacity>
            <View style={{ backgroundColor: 'white', height: 100, borderTopLeftRadius: 15, borderTopRightRadius: 15, alignItems: 'center', justifyContent: 'center' }}>
                <Pressable onPress={() => prop.pressLogout()}>
                    <Text style={{ padding: 16, fontWeight: 'bold', fontSize: 16 }}>Logout</Text>
                </Pressable>
                <Text>{ReactNativeVersionInfo.appVersion}</Text>
            </View>
        </Modal>
    );
}

export default LogoutModal;