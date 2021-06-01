import React, { useState, useEffect } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors/colors'
import axios from 'axios'

//  Redux
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { loginAction, getUserAction,checkToken } from '../../redux/slices/authSlices'

//  React Navigation
import { useNavigation } from '@react-navigation/native';

// Async Storage
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation();
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    useEffect(async () => {
        dispatch(checkToken())

      
    }, [])

    const Login = () => {

        dispatch(loginAction(username, password))
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> WELCOME TO CPT202!</Text>
            <Text style={styles.subtitle}>GROUP PROJECT MANAGEMENT</Text>
            <TextInput
                style={styles.textinput}
                placeholder="E-mail"
                onChangeText={text => setUsername(text)} />
            <TextInput
                style={styles.textinput}
                autoCompleteType={'password'}
                secureTextEntry={true}
                placeholder="Password"
                onChangeText={text => setPassword(text)}
            />
            <TouchableOpacity
                style={styles.loginButton}
                onPress={() => Login()}
                disabled={username && password != null ? false : true}
            >
                <Text style={{ color: colors.white, fontFamily: 'Roboto-Regular', fontSize: normalize(18) }}>SIGN IN</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => navigation.navigate("Register")}
            >
                <Text style={{ color: colors.textDark, fontFamily: 'Roboto-Regular', fontSize: normalize(18) }}>SIGN UP</Text>
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
    },
    textinput: {
        borderRadius: normalize(10),
        width: normalize(300),
        height: normalize(50),
        margin: normalize(10),
        fontFamily: "Roboto-Regular",
        fontSize: normalize(20),
        backgroundColor: '#f2f2f2',
        color: colors.textDark
    },
    loginButton: {
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(300),
        height: normalize(40),
        margin: normalize(10),
        borderRadius: normalize(10),
        backgroundColor: '#0000CC',
    },
})

export default connect(null, null)(LoginScreen)
