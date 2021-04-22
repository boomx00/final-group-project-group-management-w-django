import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import colors from '../../../assets/colors/colors'
//  React Navigation
import { useNavigation } from '@react-navigation/native';
import normalize from 'react-native-normalize';


const Done = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.title}> REGISTER SUCCESSFULL</Text>
                <Text style={{ fontFamily: 'Roboto-Regular', fontSize: 20, color: colors.teal, margin: 20 }}>
                    Your register is succesfull, please try to login with your account.
                </Text>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text>Back to login</Text>
                </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
    },
    card: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.white,
        width: 350,
        paddingTop: 100,
        paddingBottom: 100,
        borderRadius: 10,
        elevation: 10
    },
    title: {
        fontSize: normalize(40),
        fontFamily: "Roboto-Bold",
        color: colors.textDark,
        textAlign: 'center'
    },
    subtitle: {
        fontFamily: "Roboto-Bold",
        fontSize: normalize(18),
        color: colors.textDark,
        marginBottom: 10
    },
    textinput: {
        borderRadius: 5,
        borderWidth: 1,
        width: 300,
        margin: 5,
        fontFamily: "Roboto-Regular",
        fontSize: 20
    },
    loginButton: {
        alignItems: 'center',
        padding: 10,
        width: 200,
        margin: 15,
        borderRadius: 5,
        backgroundColor: colors.lightYellow
    },
    loginButtonBlocked: {
        alignItems: 'center',
        padding: 10,
        width: 200,
        margin: 15,
        borderRadius: 5,
        backgroundColor: colors.textLight
    }
})




export default Done
