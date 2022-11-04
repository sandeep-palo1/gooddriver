import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { TextInput, SafeAreaView, View, Image, Pressable, Alert, Text } from "react-native";
import BlueButton from "../../utility/BlueButton";

import CustomSwitch from "../../utility/CustomSwitch";
import GoodColors from "../../utility/GoodColors";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import QuestionView from "../../utility/QuestionView";
import axiosClient from "../../api/ApiClient";
import { getUser } from "../../utility/ValidationUtil";
import GoodLoader from "../../utility/GoodLoader";


const TextualQuestion = ({ route }) => {
    const question = route.params.datan;
    const navigation = useNavigation();
    const [answer, setAnswer] = useState('');
    const [loaderViesible, setLoaderVisible] = useState(false);
    const [userInfo, setUserInfo] = useState('');

    useEffect(() => {
        const tokenAsync = async () => {
            const userDetail = await getUser()
            if (userDetail != null) {
                setUserInfo(userDetail);
            }
        }
        tokenAsync();
    }, []);

    //Submit Survey Answer
    const submitAnswer = () => {
        if (answer == '') {
            Alert.alert(GoodString.APP_NAME, GoodString.PLEASE_ANS)
            return;
        }
        var data = JSON.stringify({
            "answer": [
                answer
            ]
        });

        setLoaderVisible(true);
        axiosClient.post('/api/survey/2', data, {
            headers: {
                'content-type': 'application/json',
                'token': userInfo.token
            },
        }).then(function (response) {
            setLoaderVisible(false);

            Alert.alert(GoodString.APP_NAME, GoodString.ANSWER_SUBMIT_SUCCESS);
            navigation.goBack();

        }).catch(function (error) {
            setLoaderVisible(false);
            Alert.alert(GoodString.APP_NAME, JSON.stringify(error.response.data.message));

        }).then(function () {
            setLoaderVisible(false);

            // always executed
        });

    }

    return (
        <SafeAreaView style={{ marginHorizontal: 16, flexDirection: 'column', height: '100%' }}>

            <Pressable onPress={() => { navigation.goBack() }}>
                <Image style={{ width: 30, height: 30, marginTop: Platform.OS == 'ios' ? 0 : 10 }} source={require('../../resources/images/back_icon.png')} />
            </Pressable>

            <QuestionView question={question?.title} />

            <TextInput style={{ width: '100%', height: 140, marginTop: 10, backgroundColor: '#EDEDED', borderRadius: 7, textAlignVertical: 'top', padding: 10, color: GoodColors.blueText }} multiline={true} placeholder={GoodString.ENTER_YOUR_ANSWER}
                onChangeText={(text) => setAnswer(text)} />

            <View style={{ flex: 1 }}>
                <GoodLoader alertVisible={loaderViesible} />
            </View>

            <BlueButton
                style={{ marginBottom: 16 }}
                title={GoodString.SUBMIT}
                onPressNext={() => { submitAnswer() }} />


        </SafeAreaView>
    );

}

export default TextualQuestion;