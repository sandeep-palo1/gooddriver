/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect, useState } from 'react';
import {
    Button,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
} from 'react-native';
import LOC from './LocationModule';

import {
    Colors,
    DebugInstructions,
    Header,
    LearnMoreLinks,
    ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import axiosClient from './api/ApiClient';

const App = () => {
    const isDarkMode = useColorScheme() === 'dark';

    const [deviceId, setDeviceId] = useState("");
    const [dataLocation, setDataLocation] = useState("");

    const backgroundStyle = {
        backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    };


    const deviceFetchId = async () => {
        const id = await LOC.getDeviceId();
        setDeviceId(id);
    }

    const fetchDbLocation = () => {
        let locationData = [];
        let accelerateData = [];
        LOC.fetchLocation("123", (error, data, dataAccelerometer) => {
            if (error) {
                console.log(`Error found! ${error}`);
            }


            data.map((item) => {
                let locationRaw = item.timestamp + '|' + item.longitude + '|' + item.latitude + '|' + item.altitude + '|' + item.accuracy + '|' + item.speed
                locationData.push(locationRaw);

            });

            dataAccelerometer.map((item) => {
                let laccelerateRaw = item.timestamp + '|' + item.x_accelerate + '|' + item.y_accelerate + '|' + item.z_accelerate
                accelerateData.push(laccelerateRaw);
            });

            // console.log(`Accelerometer ${accelerateData} returned`);
            // console.log(`event id ${locationData} returned`);

            let param = {
                deviceId: deviceId,
                locData: locationData,
                accelerometerData: accelerateData,
                tripId: '111213Asd-qwerzxcandorid',
                userId: '918103801418'
            };

            param = JSON.stringify(param)
            // console.log(`event id ${param} returned`); 
            uploadData(param)


        })

    }

    const uploadData = (param) => {

        axiosClient.post('api/trip', param, {
            headers: {
                'content-type': 'application/json',
                'token': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjoiOTE4MTAzODAxNDE4In0.NlkemH6xFZl-bKY-3wTE2F437fdHCXumTugpMaqgyKI',
            },
        }).then(function (response) {

            console.log(JSON.stringify(response));
        }).catch(function (error) {
            console.log('Error::::' + JSON.stringify(error));
        })

    }


    useEffect(() => {
        deviceFetchId();
    }, []);

    LOC.show();

    return (
        <SafeAreaView style={backgroundStyle}>

            <ScrollView
                contentInsetAdjustmentBehavior="automatic"
                style={backgroundStyle}>

                <View
                    style={{
                        backgroundColor: isDarkMode ? Colors.black : Colors.white,
                    }}>
                    <Text>Hello</Text>
                    <Text>{"Device ID : " + deviceId}</Text>


                    <Button title='Stop Service' onPress={() => { LOC.stopService() }}></Button>
                    <View style={{ margin: 10 }}></View>
                    <Button title='Start Service' onPress={() => { LOC.startService() }}></Button>
                    <View style={{ margin: 10 }}></View>
                    <Button title='Fetch Location' onPress={() => { fetchDbLocation() }}></Button>

                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
    },
    sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
    },
    sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
    },
    highlight: {
        fontWeight: '700',
    },
});

export default App;
