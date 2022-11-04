
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, StyleSheet, Image } from 'react-native';
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import OnBoardTitle from "../../utility/OnBoardTitle";
import BlueButton from "../../utility/BlueButton";
import RegionModal from "../../utility/RegionModal";
import { useNavigation } from "@react-navigation/core";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getVehicle } from "../../utility/ValidationUtil";

const CarDetail = ({ route }) => {
    const navigation = useNavigation();
    // const dataCar = route.params.dataCar;
    const [dataCar, setDataCar] = useState('');

    useEffect(() => {
        AsyncStorage.setItem(GoodString.SCREEN_NAME, 'CarDetail');
        vehicleAsync();
    }, []);

    const vehicleAsync = async () => {
        const vechile = await getVehicle()
        if (vechile != null) {
            setDataCar(vechile);
        }
    }

    const validateCar = () => {
        // alert(dataCar?.vehicle_image?.VehicleImages?.ImageDetailsList[0]?.ImageUrl)
        // navigation.navigate('SettingDetail')
        navigation.reset(
            {
                index: 0,
                routes: [{ name: 'SettingDetail' }],
            });
    }

    return (
        <SafeAreaView style={{ flexDirection: 'column', flex: 1 }}>
            <View style={{ flex: 1 }}>
                <View style={{ marginHorizontal: 16, }}>

                    <Image source={

                        (dataCar === null || dataCar.vehicle_image === null || dataCar.vehicle_image?.VehicleImages?.ImageDetailsCount == 0) ?
                            require('../../resources/images/car.png')
                            :
                            { uri: dataCar?.vehicle_image?.VehicleImages?.ImageDetailsList[0]?.ImageUrl }

                    }
                        style={{ width: '80%', height: 120, borderRadius: 20, marginTop: 50, alignSelf: 'center' }} />
                    <Text style={GoodStyles.vehicleName}>{dataCar?.valuation?.VehicleDescription}</Text>
                    <View style={{ justifyContent: 'flex-start', flexDirection: 'row' }}>
                        <View style={{
                            backgroundColor: GoodColors.carNumberBg,
                            marginTop: 5, borderColor: '#000000', borderWidth: 1, borderRadius: 4
                        }}>
                            <Text style={GoodStyles.vehicleNuber}>{dataCar?.valuation?.Vrm}</Text>
                        </View>
                    </View>
                </View>
                <View style={{ backgroundColor: '#f0dbff', paddingBottom: 16, paddingTop: 10, paddingHorizontal: 16, marginTop: 16 }}>
                    <Text style={GoodStyles.carDetailText}>{dataCar.vehicle?.SmmtDetails?.NumberOfDoors + ' Door, ' + dataCar.vehicle?.VehicleRegistration?.TransmissionType} </Text>
                    <Text style={GoodStyles.carDetailText}>{dataCar.vehicle?.VehicleRegistration?.YearOfManufacture + ', ' + dataCar.vehicle?.SmmtDetails?.EngineCapacity + 'cc'} </Text>
                    <Text style={GoodStyles.carDetailText}>{dataCar.vehicle?.SmmtDetails?.BodyStyle + ', ' + dataCar.vehicle?.SmmtDetails?.FuelType} </Text>
                </View>

            </View>

            <BlueButton title={GoodString.CONTINUE} style={{ marginBottom: 30, marginHorizontal: 16 }} onPressNext={() => { validateCar() }} />



        </SafeAreaView >
    );
}



export default CarDetail;