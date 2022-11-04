import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React, { useEffect } from 'react';
import { Image, View } from 'react-native';
import Dashboard from './Home/Dashboard'
import Trips from './Home/Trips'
import Notifications from './Home/Notifications'
import Quote from './Home/Quote'
import GoodColors from '../../utility/GoodColors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GoodString from '../../utility/GoodString';
import number from 'd3-array/src/number';
import SystemSetting from 'react-native-system-setting'

const Tab = createBottomTabNavigator();
const HomeScreen = () => {
   
    useEffect(() => {
        AsyncStorage.setItem(GoodString.SCREEN_NAME, 'HomeScreen');
    
                  
    }, []);

    return (
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Dashboard}
                options={{
                    tabBarLabel: 'Home',
                    headerShown: false,

                    tabBarInactiveTintColor: GoodColors.inactiveBottom,
                    tabBarActiveTintColor: GoodColors.bottomTint,
                    tabBarLabelStyle: { fontSize: 12, },
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../resources/images/dashboard.png')
                                    : require('../../resources/images/dashboard_unselect.png')
                            }
                        />
                    ),

                }} />
            <Tab.Screen name="Trips" component={Trips}
                options={{
                    headerShown: false,
                    tabBarInactiveTintColor: GoodColors.inactiveBottom,
                    tabBarActiveTintColor: GoodColors.bottomTint,
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../resources/images/trip_select.png')
                                    : require('../../resources/images/trip_unselect.png')
                            }

                        />
                    ),

                }} />
            <Tab.Screen name="Notifications" component={Notifications}
                options={{
                    tabBarLabel: 'Notifications',
                    headerShown: false,
                    tabBarInactiveTintColor: GoodColors.inactiveBottom,
                    tabBarActiveTintColor: GoodColors.bottomTint,
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../resources/images/notification_select.png')
                                    : require('../../resources/images/notification_unselect.png')
                            }

                        />
                    ),

                }} />
            <Tab.Screen name="Quote" component={Quote}
                options={{
                    tabBarLabel: 'Quote',
                    headerShown: false,
                    tabBarInactiveTintColor: GoodColors.inactiveBottom,
                    tabBarActiveTintColor: GoodColors.bottomTint,
                    tabBarLabelStyle: { fontSize: 12 },
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                            source={
                                focused
                                    ? require('../../resources/images/quote_select.png')
                                    : require('../../resources/images/quote_unselect.png')
                            }

                        />
                    ),

                }} />
        </Tab.Navigator>
        
    );
}

export default HomeScreen;