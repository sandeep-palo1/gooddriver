import React from "react";
import { View, Text } from "react-native";
import GoodStyles from "./GoodStyles";


const QuestionView=(prop)=>{
    return (
        <View style={{marginTop:40}}>

            <Text style={GoodStyles.questionStyle}>{prop.question}</Text>
            
        </View>
    );

}

export default QuestionView;