import  React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Splash from '../component/screens/Splash';
import WalkThrough from '../component/screens/WlakThorugh';
import MobileVerification from '../component/screens/MobileVerification';
import OtpVerification from '../component/screens/OtpVerification';
import { StatusBar } from 'react-native';
import SaveInsurance from '../component/screens/SaveInsurance';
import WeeklyIncentive from '../component/screens/WeeklyIncentive';
import SafeSecure from '../component/screens/SafeSecure';
import PolicyScreen from '../component/screens/PolicyScreen';
import VehicleRegistration from '../component/screens/VehicleRegistration';
import EmailVerification from '../component/screens/EmailVerification';
import CarDetail from '../component/screens/CarDetail';
import SettingDetail from '../component/screens/SettingDetail';
import ActivityTrack from '../component/screens/ActivityTrack';
import RunInBackground from '../component/screens/RunInBackground';
import HomeScreen from '../component/screens/HomeScreen';
import BooleanQuestion from '../component/screens/BooleanQuestion';
import TextualQuestion from '../component/screens/TextualQuestion';

const Stack = createNativeStackNavigator();

const StackNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Splash"
              component={Splash}
        />
        <Stack.Screen name="Walkthrough" component={WalkThrough} />
        <Stack.Screen name="SaveInsurance" component={SaveInsurance} />
        <Stack.Screen name="WeeklyIncentive" component={WeeklyIncentive} />
        <Stack.Screen name="SafeSecure" component={SafeSecure} />
        <Stack.Screen name="MobileVerification" component={MobileVerification} />
        <Stack.Screen name="OtpVerification" component={OtpVerification} />
        <Stack.Screen name="PolicyScreen" component={PolicyScreen} />
        <Stack.Screen name="EmailVerification" component={EmailVerification} />
        <Stack.Screen name="VehicleRegistration" component={VehicleRegistration} />
        <Stack.Screen name="CarDetail" component={CarDetail} />
        <Stack.Screen name="SettingDetail" component={SettingDetail} />
        <Stack.Screen name="ActivityTrack" component={ActivityTrack} />
        <Stack.Screen name="RunInBackground" component={RunInBackground} />
        
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="BooleanQuestion" component={BooleanQuestion} />
        <Stack.Screen name="TextualQuestion" component={TextualQuestion} />
       
      </Stack.Navigator>
    </NavigationContainer>
    
  );
};

export default StackNavigator;