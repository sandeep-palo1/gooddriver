import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Alert } from 'react-native';
import StackNavigator from './utility/StackNavigator';
import SystemSetting from 'react-native-system-setting'
import GoodString from './utility/GoodString';

const App = () => {

  // useEffect(() => {

  //   const locationListener = SystemSetting.addLocationListener(
  //     (locationEnabled) => {
  //       if (!locationEnabled) {
  //         alert(GoodString.GPS_DISABLE)
  //       }
  //     }
  //   );

  //   return () => SystemSetting.removeListener(locationListener);

  // }, []);

  return (
    
    <StackNavigator />
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
