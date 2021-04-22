import React from 'react'

// Stylings
import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../assets/colors/colors';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const ChangePasswordScreen = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>CHANGE PASSWORD</Text>
            </View>
            <View style={styles.centerBox}>
                <Text style={styles.textSub}>Change Your Password Here!</Text>
                <TextInput style={styles.inputPass} placeholder="Old password" />
                <TextInput style={styles.inputPass} placeholder="New password" />
                <TextInput style={styles.inputPass} placeholder="Confim new password" />
                <TouchableOpacity style={styles.confirmBtn}>
                    <Text style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: normalize(25),
                        textAlign: 'center',
                        color: colors.white,
                        padding: normalize(7)
                    }}>CONFIRM</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.cancelBtn}
                    onPress={() => navigation.goBack()}>
                    <Text style={{
                        fontFamily: 'Roboto-Regular',
                        fontSize: normalize(25),
                        textAlign: 'center',
                        color: colors.textDark,
                        padding: normalize(7)
                    }}>CANCEL</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        marginTop: normalize(40),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center'
    },
    centerBox: {
        margin: normalize(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20)
    },
    textSub: {
        fontFamily: 'Roboto-Light',
        fontSize: normalize(30),
        textAlign: 'center',
        marginBottom: normalize(80)
    },
    inputPass: {
        backgroundColor: '#F2F2F2',
        borderRadius: normalize(15),
        elevation: normalize(5),
        marginTop: 20,
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(20),
        width: normalize(300),
    },
    confirmBtn: {
        backgroundColor: '#0000CC',
        borderRadius: normalize(15),
        elevation: normalize(10),
        marginTop: normalize(20),
        width: normalize(300),
        alignItems: 'center',
        alignContent: 'center'
    },
    cancelBtn: {
        backgroundColor: colors.white,
        borderRadius: normalize(15),
        elevation: normalize(10),
        marginTop: normalize(15),
        width: normalize(300),
        height: normalize(50)
    }
})

export default ChangePasswordScreen
