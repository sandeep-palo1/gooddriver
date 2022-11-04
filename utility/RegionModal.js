import { PROPERTY_TYPES } from "@babel/types";
import React from "react";
import { Modal, View, Text, Image, TouchableOpacity } from 'react-native';

import GoodColors from "./GoodColors";
import GoodString from "./GoodString";
import GoodStyles from "./GoodStyles";

const RegionModal = (prop) => {
    return (
        <View >
            <Modal animationType="slide"
                visible={prop.isVisible}
                transparent={true}>
                <View style={{ flexDirection: 'column', height: '100%' }}>
                    <TouchableOpacity style={{ flex: 1, backgroundColor: 'rgba(52, 52, 52, 0.9)' }} onPress={()=>prop.cancelDialog('')}>
                        <View  ></View>
                    </TouchableOpacity>
                    <View style={{ backgroundColor: GoodColors.white, padding: 16 }}>
                    <Text style={{color:'#000000', fontSize:16, marginBottom:16}}>{GoodString.CHOOSE_COUNTRY}</Text>
                        <TouchableOpacity onPress={()=>prop.cancelDialog('uk')}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Image source={require('../resources/images/Flag_of_the_United_Kingdom.svg.png')}
                                    style={{ width: 30, height: 30, borderRadius: 15 }} />
                                <Text style={[GoodStyles.region_text, {textAlign:"left", marginLeft:10}]}>{'United Kingdom ('+GoodString.UK+')'}</Text>
                                <Text style={GoodStyles.region_text}>{GoodString.UK_CODE}</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={()=>prop.cancelDialog('in')}>
                            <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                                <Image source={require('../resources/images/india.png')}
                                    style={{ width: 30, height: 30, borderRadius: 15 }} />
                                 <Text style={[GoodStyles.region_text, {textAlign:"left", marginLeft:10}]}>{GoodString.INDIA +' (IND)'}</Text>
                                <Text style={GoodStyles.region_text}>{GoodString.INDIA_CODE}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
}
export default RegionModal;