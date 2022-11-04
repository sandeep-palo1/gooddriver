import React, { useState } from 'react';
import { View, StyleSheet, Alert, Image, Modal } from 'react-native';
import * as Progress from 'react-native-progress';

const GoodLoader = prop => {
    return (
        <View style={styles.centeredView}>
            <Modal
                style={{ margin: 0 }}
                transparent={true}
                visible={prop.alertVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View
                    style={[
                        styles.centeredView,
                        {
                            backgroundColor: prop.alertVisible ? 'rgba(0, 0, 0, 0.0)' : '',
                        },
                    ]}>
                    <Progress.Circle size={40} indeterminate={true} borderWidth={3} />
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
        width: '100%',
        height: '100%',
    },
});
export default GoodLoader;
