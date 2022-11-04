import { PROPERTY_TYPES } from "@babel/types";
import React from "react";
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';

import GoodColors from "./GoodColors";
import GoodString from "./GoodString";
import GoodStyles from "./GoodStyles";

const AcitvityPermissionModal = (prop) => {
    return (
        <View >
            <Modal animationType="slide"
                visible={prop.isVisible}
                transparent={true}>
                <View style={{ flexDirection: 'column', height: '100%' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.9)' }} onPress={() => prop.cancelDialog('')}>
                        <View  ></View>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: 'rgba(52, 52, 52, 0.9)', width:'100%' }} >
                        <View style={{ backgroundColor: GoodColors.white, padding: 16, borderTopLeftRadius: 15, borderTopRightRadius: 15, width:'100%' }}>
                            <Text style={{ color: '#000000', fontSize: 14, marginBottom: 16 }}>{GoodString.ACTIVITY_TRACK_PERMISSION_MSG}</Text>
                            <TouchableOpacity onPress={() => prop.cancelDialog('allow')}>
                                <Text style={[GoodStyles.activityAllowText, { color: GoodColors.allowTextCol, padding:12 }]}>{GoodString.ALLOW}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => prop.cancelDialog('deny')}>
                                <Text style={[GoodStyles.activityAllowText, { color: GoodColors.allowTextCol , padding:12 }]}>{GoodString.DENY}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default AcitvityPermissionModal;