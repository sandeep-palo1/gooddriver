import { useNavigation } from "@react-navigation/core";
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Image, Pressable, Alert } from "react-native";
import BlueButton from "../../utility/BlueButton";
import CustomSwitch from "../../utility/CustomSwitch";
import GoodColors from "../../utility/GoodColors";
import GoodLoader from "../../utility/GoodLoader";
import GoodString from "../../utility/GoodString";
import GoodStyles from "../../utility/GoodStyles";
import QuestionView from "../../utility/QuestionView";
import { getUser } from "../../utility/ValidationUtil";
import axiosClient from "../../api/ApiClient";


const BooleanQuestion = ({ route }) => {
    const question = route.params.datan;
    const navigation = useNavigation();
    const [isCheck, setIsCheck] = useState(false)

    const onSelectSwitch = index => {
        setIsCheck(index)
    };

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
        var data = JSON.stringify({
            "answer": isCheck
            
        });

        setLoaderVisible(true);
        axiosClient.post('/api/survey/1', data, {
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
            
            <QuestionView question={question.title} />

            <CustomSwitch
                selectionMode={false}
                roundCorner={false}
                option1={GoodString.YES}
                option2={GoodString.NO}
                onSelectSwitch={onSelectSwitch}
                selectionColor={GoodColors.switch_selector_bg}
            />

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

export default BooleanQuestion;