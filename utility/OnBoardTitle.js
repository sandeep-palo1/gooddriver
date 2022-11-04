import React from "react";
import { View, Image, Text , TouchableOpacity} from 'react-native';
import GoodStyles from './GoodStyles';

const OnBoardTitle = (prop) => {

    return (
        <View style={{ marginTop: 50 }}>
            <View style={{ flexDirection: 'row' }}>
                <Text style={GoodStyles.onBoardTitle}>{prop.title}</Text>

                {prop.isVisible ?
                    <TouchableOpacity onPress={prop.changeCountry}>
                        <Image source={prop.flag}
                            style={{ width: 30, height: 30, borderRadius: 15 }} />
                    </TouchableOpacity> : null
                }
            </View>
            <Text style={GoodStyles.onBoardDesc}>{prop.desc}</Text>
        </View>
    );
}

export default OnBoardTitle;