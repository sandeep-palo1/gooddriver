import { StyleSheet } from "react-native"
import GoodColors from "./GoodColors"

export default StyleSheet.create({

    walk_title: {
        color: GoodColors.TEXT_BLACK,
        fontSize: 20,
        fontWeight: 'bold',

    },
    walk_desc: {
        color: GoodColors.TEXT_BLACK,
        fontSize: 14,

    },
    setting_title: {
        color: GoodColors.TEXT_BLACK,
        fontSize: 16,
        fontWeight: 'bold',

    },
    setting_desc: {
        color: GoodColors.TEXT_BLACK,
        fontSize: 12,

    },

    button_text: {
        color: GoodColors.white,
        alignSelf: 'center',
        fontSize: 16,
        letterSpacing: 1
    },

    onBoardTitle: {
        color: GoodColors.onBoardingTitle,
        alignSelf: 'center',
        flex: 1,
        fontSize: 24,
        letterSpacing: 1,
        fontWeight: 'bold',
    },
    onBoardDesc: {
        color: GoodColors.onBoardingDesc,
        fontSize: 14,
        marginTop: 16,
    },
    country_input: {
        color: GoodColors.placeholderCol,
        fontSize: 20,
        letterSpacing: 1,
    },
    mobile_input: {
        color: GoodColors.inputTextCol,
        fontSize: 20,
        letterSpacing: 1,
        flex: 1,
        marginStart: 12,

    },
    email_input: {
        color: GoodColors.inputTextCol,
        fontSize: 16,
        letterSpacing: 1,
        flex: 1,
        backgroundColor: GoodColors.inputBg,
        borderRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 7

    },

    region_text: {
        color: GoodColors.accentText,
        fontSize: 16,
        flex: 1,
        textAlign: 'center'
    },

    errorText: {
        fontSize: 10,
        color: GoodColors.errorColor
    },

    privacyText: {
        fontSize: 14,
        color: GoodColors.onBoardingDesc,
        fontWeight: 'bold',
        textTransform: 'uppercase',
    },
    tc_modal: {
        backgroundColor: GoodColors.white, padding: 16, height: '100%', borderTopStartRadius: 15, borderTopRightRadius: 15
    },

    vehicleName: {
        fontSize: 18,
        color: GoodColors.carNameCol,
        marginTop: 20,
    },
    vehicleNuber: {
        fontSize: 22,
        color: GoodColors.carNameCol,
        fontWeight: 'bold',
        letterSpacing: 1,

    },

    carDetailText: {
        fontSize: 14,
        marginTop: 4,
        color: GoodColors.cardetailText,
    },

    permissionCard: {
        backgroundColor: GoodColors.gray, margin: 30, borderRadius: 15
    },

    permissionText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: GoodColors.permissionText,
        marginStart: 10,

    },
    activityAllowText: {
        fontSize: 14,
        fontWeight: 'bold',
        color: GoodColors.permissionText,
        padding: 20,
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        textAlign: 'center'
    },

    diconnectCard: {
        backgroundColor: GoodColors.diconnectCardCol,
        margin: 22,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
    },
    connectionStatusCard: {
        backgroundColor: GoodColors.connectStatusCardCol,
        margin: 22,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
    },
    tripRecordCard: {
        backgroundColor: GoodColors.tripRecordCard,
        margin: 22,
        borderRadius: 20,
        padding: 16,
        alignItems: 'center',
    },

    accelerateText: {
        fontSize: 12,
        textAlign: 'right',
        marginTop: 10,
        color: GoodColors.accelerateText,
    },
    accelerateView: {
        height: 15,
        flexDirection: "row",
        marginTop: 10
        , width: '100%',
        marginLeft: 16,
        borderRadius: 4
    },
    disconnectacceView: {
        flexDirection: "row",
        width: '100%',
        height: 50,
        marginLeft: 16,
        borderRadius: 4
    },
    disconnectacceText: {
        fontSize: 12,
        textAlign: 'right',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
        height: 40,
        color: GoodColors.accelerateText,
    },

    cube_style: {
        width: 10,
        height: 10,
        borderRadius:2,
        
    },

    toolbarText:{
        fontSize:20,
        color: GoodColors.blueText,
        fontWeight:'bold',
    },

    questionStyle:{
        fontSize:20,
        color: GoodColors.blueText,
        fontWeight:'bold',
    }

});



