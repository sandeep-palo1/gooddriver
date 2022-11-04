import React, { useEffect, useState } from "react";
import { View, Text, Image, Animated, StyleSheet, SafeAreaView, Alert, TouchableOpacity, } from "react-native";
import Speedometer, {
    Background,
    Arc,
    Needle,
    Progress,
    Marks,
    Indicator,
    DangerPath,
} from 'react-native-cool-speedometer';
import GoodColors from "./GoodColors";
import GoodStyles from "../utility/GoodStyles";
import GoodString from "../utility/GoodString";
import SpeedSplitsIndicator from "../utility/SpeedSplitsIndicator";
// import PieChart from 'react-native-pie-chart';
import { ScrollView } from "react-native-gesture-handler";
import { BarChart, LineChart, PieChart } from "react-native-gifted-charts";
import StackBarChart from "./StackBarChart";
import * as Progres from 'react-native-progress';
import { monthList } from '../utility/ValidationUtil';
import SpeedometerGood from '../utility/speedometer/SpeedometerGood';


const DashboardData = (prop) => {

    const colors = [GoodColors.col_20, GoodColors.col_30, GoodColors.col_40, GoodColors.col_50, GoodColors.col_60, GoodColors.col_70]
    const keys = ['accele_20', 'accele_30', 'accele_40', 'accele_50', 'accele_60', 'accele_70']


    const [dashboardData, setDashboardData] = useState('');
    const [dataStackAcceleration, setDataStackAcceleration] = useState([]);
    const [dataStackBreaking, setDataStackBreaking] = useState([]);
    const [dataStackSpeeding, setDataStackSpeeding] = useState([]);
    const [dataStackSmoothness, setDataStackSmoothness] = useState([]);
    const [dataPie, setDataPie] = useState([]);
    const [selectedMonth, setSelectedMonth] = useState(2);
    const [getMonthList, setMonthList] = useState(monthList());

    useEffect(() => {
        setStackData(prop.data);
        setDashboardData(prop.data)
    }, []);

    const setStackData = (dataStack) => {
        //Acceleration
        const dataStackAcce = [
            {

                accele_20: dataStack.acceleration.twenty_accel,
                accele_30: dataStack.acceleration.thirty_accel,
                accele_40: dataStack.acceleration.forty_accel,
                accele_50: dataStack.acceleration.fifty_accel,
                accele_60: dataStack.acceleration.sixty_accel,
                accele_70: dataStack.acceleration.seventy_accel,

            },
        ]
        setDataStackAcceleration(dataStackAcce);

        //Breaking
        const dataStackBrak = [
            {

                accele_20: dataStack.breaking.twenty_accel,
                accele_30: dataStack.breaking.thirty_accel,
                accele_40: dataStack.breaking.forty_accel,
                accele_50: dataStack.breaking.fifty_accel,
                accele_60: dataStack.breaking.sixty_accel,
                accele_70: dataStack.breaking.seventy_accel,

            },
        ]
        setDataStackBreaking(dataStackBrak);

        //Speeding
        const dataStackSped = [
            {

                accele_20: dataStack.speeding.twenty_accel,
                accele_30: dataStack.speeding.thirty_accel,
                accele_40: dataStack.speeding.forty_accel,
                accele_50: dataStack.speeding.fifty_accel,
                accele_60: dataStack.speeding.sixty_accel,
                accele_70: dataStack.speeding.seventy_accel,

            },
        ]
        setDataStackSpeeding(dataStackSped);

        //Smoothness
        const dataStackSmooth = [
            {

                accele_20: dataStack.smooth.twenty_accel,
                accele_30: dataStack.smooth.thirty_accel,
                accele_40: dataStack.smooth.forty_accel,
                accele_50: dataStack.smooth.fifty_accel,
                accele_60: dataStack.smooth.sixty_accel,
                accele_70: dataStack.smooth.seventy_accel,

            },
        ]
        setDataStackSmoothness(dataStackSmooth);

        //Miles Driven
        const data = [{ value: dataStack.speeding.seventy_accel + dataStack.smooth.seventy_accel + dataStack.breaking.seventy_accel + dataStack.acceleration.seventy_accel, color: GoodColors.col_70, },
        { value: dataStack.speeding.sixty_accel + dataStack.smooth.sixty_accel + dataStack.breaking.sixty_accel + dataStack.acceleration.sixty_accel, color: GoodColors.col_60, },
        { value: dataStack.speeding.fifty_accel + dataStack.smooth.fifty_accel + dataStack.breaking.fifty_accel + dataStack.acceleration.fifty_accel, color: GoodColors.col_50, },
        { value: dataStack.speeding.forty_accel + dataStack.smooth.forty_accel + dataStack.breaking.forty_accel + dataStack.acceleration.forty_accel, color: GoodColors.col_40, },
        { value: dataStack.speeding.thirty_accel + dataStack.smooth.thirty_accel + dataStack.breaking.thirty_accel + dataStack.acceleration.thirty_accel, color: GoodColors.col_30, },
        { value: dataStack.speeding.twenty_accel + dataStack.smooth.twenty_accel + dataStack.breaking.twenty_accel + dataStack.acceleration.twenty_accel, color: GoodColors.col_20, }]

        setDataPie(data)
    }

    const getProgress = (progress) => {
        if (progress) {
            return progress / 12;
        } else
            return 0;
    }

    const onNext = () => {

        setSelectedMonth(selectedMonth + 1);
        prop.back
    }

    return (
        <SafeAreaView style={{ backgroundColor: GoodColors.backgroundCol }}>
            <ScrollView>
                <View>
                    <View style={GoodStyles.diconnectCard}>


                        <View style={{ marginTop: 40 }}>
                            {/* <Speedometer
                                value={30}
                                angle={250}
                            >
                                <Background color={'rgba(52, 52, 52, 0)'} />
                                <Arc arcWidth={50} color={GoodColors.speedometerPermissionCol} />
                                <Needle color={'#C4C4C4'} arcWidth={1} circleColor={GoodColors.backgroundCol} >
                                </Needle>
                                <Progress color={'yellow'} strokeWidth={50} arcWidth={50} />

                                <Indicator color={GoodColors.accentColor} fontSize={24} fontWeight={'bold'} >


                                </Indicator>
                            </Speedometer> */}

                            <SpeedometerGood
                                size={250}
                                value={50}
                                labelStyle={{ fontSize: 20, color: GoodColors.blueText }}
                            />
                        </View>
                        {/* Top month navigation view */}
                        <View style={{ position: 'absolute', flexDirection: 'row', marginTop: 16 }}>
                            {selectedMonth > 0 ?
                                <TouchableOpacity onPress={() => {
                                    if (selectedMonth - 1 >= 0) {
                                        setSelectedMonth(selectedMonth - 1);
                                        prop.back(getMonthList[selectedMonth - 1])
                                    }
                                }}>
                                    <Image source={require('../resources/images/backward_ic.png')} />
                                </TouchableOpacity>
                                : null}
                            <Text style={{ flex: 1, textAlign: 'center', fontSize: 14, color: GoodColors.blueText }}>{getMonthList[selectedMonth]} </Text>

                            {selectedMonth < 2 ?
                                <TouchableOpacity onPress={() => {
                                    if (selectedMonth + 1 < 3) {
                                        setSelectedMonth(selectedMonth + 1);
                                        prop.back(getMonthList[selectedMonth + 1])
                                    }
                                }}>
                                    <Image source={require('../resources/images/forward_ic.png')} />
                                </TouchableOpacity>
                                : null}
                        </View>

                        {/* <Text style={{ color: '#0F1B42', fontSize: 16, textTransform: 'capitalize' }} >{GoodString.NO_RUSH}</Text> */}

                        <View style={{ flexDirection: 'row', marginTop: 50 }}>
                            <Text style={[GoodStyles.accelerateText, { flex: 1, textAlign: 'center' }]}>{GoodString.MILES_DRIVEN}</Text>
                            <Text style={[GoodStyles.accelerateText, { flex: 1, textAlign: 'center' }]}>{GoodString.TRIPS}</Text>
                            <Text style={[GoodStyles.accelerateText, { flex: 1, textAlign: 'center' }]}>{GoodString.TOTAL_FAULTS}</Text>
                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[GoodStyles.accelerateText, { flex: 1, textAlign: 'center', color: GoodColors.blueText, fontSize: 16 }]}>{dashboardData.miles_driven + ' mi'}</Text>
                            <Text style={[GoodStyles.accelerateText, { flex: 1, textAlign: 'center', color: GoodColors.blueText, fontSize: 16 }]}>{dashboardData.trips}</Text>
                            <Text style={[GoodStyles.accelerateText, { flex: 1, textAlign: 'center', color: GoodColors.blueText, fontSize: 16 }]}>{dashboardData.total_faults}</Text>
                        </View>


                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 16 }}>
                            <View>
                                <Text style={GoodStyles.accelerateText}>{GoodString.ACCELEration}</Text>
                                <Text style={GoodStyles.accelerateText}>{GoodString.BREAKING}</Text>
                                <Text style={GoodStyles.accelerateText}>{GoodString.SPEEDING}</Text>
                                <Text style={GoodStyles.accelerateText}>{GoodString.SMOOTHNES}</Text>
                            </View>
                            <View style={{ flex: 1, marginRight: 16 }}>
                                <View style={{ flexDirection: 'row', flex: 1, alignItems: 'center', marginTop: 5 }}>
                                    <Text style={GoodStyles.accelerateText}></Text>

                                    <Progres.Bar marginLeft={10} progress={getProgress(dashboardData?.acceleration?.average)} width={200} height={9} color={'#98C0FF'} borderColor={'#FFF6F2'} borderRadius={5} />

                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', }}>
                                    <Text style={GoodStyles.accelerateText}></Text>

                                    <Progres.Bar marginLeft={10} progress={getProgress(dashboardData?.breaking?.average)} width={200} height={9} color={'#98C0FF'} borderColor={'#FFF6F2'} borderRadius={5} />

                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', }}>
                                    <Text style={GoodStyles.accelerateText}></Text>
                                    <Progres.Bar marginLeft={10} progress={getProgress(dashboardData?.speeding?.average)} width={200} height={9} color={'#98C0FF'} borderColor={'#FFF6F2'} borderRadius={5} />
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', }}>
                                    <Text style={GoodStyles.accelerateText}></Text>
                                    <Progres.Bar marginLeft={10} progress={getProgress(dashboardData?.smooth?.average)} width={200} height={9} color={'#98C0FF'} borderColor={'#FFF6F2'} borderRadius={5} />
                                </View>
                            </View>
                            <View style={{ width: 30 }}>
                                <Text style={[GoodStyles.accelerateText, { color: GoodColors.accentText }]}>{dashboardData?.acceleration?.average}</Text>
                                <Text style={[GoodStyles.accelerateText, { color: GoodColors.accentText }]}>{dashboardData?.breaking?.average}</Text>
                                <Text style={[GoodStyles.accelerateText, { color: GoodColors.accentText }]}>{dashboardData?.speeding?.average}</Text>
                                <Text style={[GoodStyles.accelerateText, { color: GoodColors.accentText }]}>{dashboardData?.smooth?.average}</Text>
                            </View>
                        </View>

                    </View>
                    {/* //Day night view */}
                    <View style={{ flexDirection: 'row', marginLeft: 16, marginRight: 16 }}>
                        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, backgroundColor: GoodColors.dayBg, padding: 12, borderTopLeftRadius: 15, borderBottomLeftRadius: 15 }}>
                            <Text style={{ flex: 1, color: GoodColors.accelerateText, fontSize: 12 }}>{GoodString.DAY.toUpperCase()}</Text>
                            <Text style={{ color: GoodColors.blueText, fontSize: 16 }}>{dashboardData.day_percent + '%'}</Text>
                        </View>
                        <View style={{ alignItems: 'center', flexDirection: 'row', flex: 1, backgroundColor: GoodColors.nightBg, padding: 12, borderTopRightRadius: 15, borderBottomRightRadius: 15 }}>
                            <Text style={{ flex: 1, color: GoodColors.accelerateText, fontSize: 12 }}>{GoodString.NIGHT.toUpperCase()}</Text>
                            <Text style={{ color: GoodColors.blueText, fontSize: 16 }} >{dashboardData.night_percent + '%'}</Text>
                        </View>

                    </View>

                    <View style={{ alignItems: 'center', flexDirection: 'row', margin: 16, backgroundColor: GoodColors.distructionBg, padding: 12, borderRadius: 15 }}>
                        <Text style={{ flex: 1, color: GoodColors.accelerateText, fontSize: 12 }}>{GoodString.PHONE_DISTRACTION.toUpperCase()}</Text>
                        <Text style={{ color: GoodColors.blueText, fontSize: 16 }} >60%</Text>
                    </View>

                    {/* Speed limit Splits */}
                    <View style={GoodStyles.diconnectCard}>

                        <Text style={[GoodStyles.disconnectacceText, { fontWeight: 'bold', marginBottom: 10, marginTop: 0, height: 20 }]}>{GoodString.SPEED_SPLIT}</Text>
                        <View style={{ flexDirection: "row", width: '100%' }}>
                            <SpeedSplitsIndicator title={"20"} colorBg={GoodColors.col_20} />
                            <SpeedSplitsIndicator title={"30"} colorBg={GoodColors.col_30} />
                            <SpeedSplitsIndicator title={"40"} colorBg={GoodColors.col_40} />
                            <SpeedSplitsIndicator title={"50"} colorBg={GoodColors.col_50} />
                            <SpeedSplitsIndicator title={"60"} colorBg={GoodColors.col_60} />
                            <SpeedSplitsIndicator title={"70"} colorBg={GoodColors.col_70} />
                        </View>
                        <View style={{ flexDirection: 'row', width: '100%', marginTop: 16 }}>
                            <View>
                                <Text style={GoodStyles.disconnectacceText}>{GoodString.ACCELEration}</Text>
                                <Text style={GoodStyles.disconnectacceText}>{GoodString.BREAKING}</Text>
                                <Text style={GoodStyles.disconnectacceText}>{GoodString.SPEEDING}</Text>
                                <Text style={GoodStyles.disconnectacceText}>{GoodString.SMOOTHNES}</Text>
                            </View>
                            <View style={{ flex: 1, marginRight: 16 }}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={GoodStyles.disconnectacceText}></Text>
                                    <View style={GoodStyles.disconnectacceView}>
                                        <View style={{ width: "100%" }}>
                                            <StackBarChart
                                                style={{ height: 32, }}
                                                keys={keys}
                                                colors={colors}
                                                data={dataStackAcceleration}
                                                showGrid={false}
                                                horizontal={true}
                                                contentInset={{ top: 40, bottom: 40, }}
                                            />
                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center' }}>
                                    <Text style={GoodStyles.disconnectacceText}></Text>
                                    <View style={GoodStyles.disconnectacceView}>
                                        <View style={{ width: "100%" }}>
                                            <StackBarChart
                                                style={{ height: 32, }}
                                                keys={keys}
                                                colors={colors}
                                                data={dataStackBreaking}
                                                showGrid={false}
                                                horizontal={true}
                                                contentInset={{ top: 40, bottom: 40, }}
                                            />

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', }}>
                                    <Text style={GoodStyles.disconnectacceText}></Text>
                                    <View style={GoodStyles.disconnectacceView}>
                                        <View style={{ width: "100%" }}>
                                            <StackBarChart
                                                style={{ height: 32, }}
                                                keys={keys}
                                                colors={colors}
                                                data={dataStackSpeeding}
                                                showGrid={false}
                                                horizontal={true}
                                                contentInset={{ top: 40, bottom: 40, }}
                                            />

                                        </View>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', width: '100%', alignItems: 'center', }}>
                                    <Text style={GoodStyles.disconnectacceText}></Text>
                                    <View style={GoodStyles.disconnectacceView}>
                                        <View style={{ width: "100%" }}>
                                            <StackBarChart
                                                style={{ height: 32, }}
                                                keys={keys}
                                                colors={colors}
                                                data={dataStackSmoothness}
                                                showGrid={false}
                                                horizontal={true}
                                                contentInset={{ top: 40, bottom: 40, }}
                                            />

                                        </View>
                                    </View>
                                </View>
                            </View>

                        </View>

                        <View style={{ flexDirection: 'row' }}>
                            <Text style={[GoodStyles.disconnectacceText, { flex: 1, textAlign: 'left' }]}>{GoodString.MILES_DRIVEN}</Text>

                        </View>

                        <View style={{ flexDirection: 'row', marginLeft: '20%' }}>
                            <PieChart data={dataPie} donut={true} radius={70} innerRadius={37} />

                        </View>

                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default DashboardData;
