import React, {useState} from 'react';

import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import GoodColors from './GoodColors';

const CustomSwitch = ({
  navigation,
  selectionMode,
  roundCorner,
  option1,
  option2,
  onSelectSwitch,
  selectionColor
}) => {
  const [getSelectionMode, setSelectionMode] = useState(selectionMode);
  const [getRoundCorner, setRoundCorner] = useState(roundCorner);

  const updatedSwitchData = val => {
    setSelectionMode(val);
    onSelectSwitch(val);
  };

  return (
    <View>
      <View
        style={{
          height: 45,
          width: '100%',
          marginTop:18,
          backgroundColor: GoodColors.switch_bg,
          borderRadius:  8 ,
          flexDirection: 'row',
          justifyContent: 'center',
          padding: 2,
        }}>
        <TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(true)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == true ? selectionColor : GoodColors.switch_bg,
            borderTopLeftRadius: 8,
            borderBottomLeftRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == true ? 'white' : GoodColors.switch_unselector_text,
            }}>
            {option1}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          TouchableOpacity
          activeOpacity={1}
          onPress={() => updatedSwitchData(false)}
          style={{
            flex: 1,

            backgroundColor: getSelectionMode == false ? selectionColor : 'white',
            borderTopRightRadius: 8,
            borderBottomRightRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: getSelectionMode == false ? 'white' : GoodColors.switch_unselector_text,
            }}>
            {option2}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
export default CustomSwitch;