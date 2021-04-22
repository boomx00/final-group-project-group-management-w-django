import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors/colors'
//  React Navigation
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'

//  Redux
import { useDispatch } from 'react-redux';
import { userRegisterAction } from '../../redux/slices/authSlices'


const RegisterScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [studentID, setStudentID] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const onRegister = () => {
        dispatch(userRegisterAction(studentID, email, password, navigation))
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}> REGISTER</Text>
                <Text style={styles.subtitle}> Please Fill This Form</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="Your Student ID"
                    onChangeText={text => setStudentID(text)} />
                <TextInput
                    style={styles.textinput}
                    placeholder="e-mail address"
                    onChangeText={text => setEmail(text)}
                />
                <TextInput
                    style={styles.textinput}
                    placeholder="Password"
                    autoCompleteType={'password'}
                    secureTextEntry={true}
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                    style={email && password != null ? styles.loginButton : styles.loginButtonBlocked}
                    onPress={() => onRegister()}
                >
                    <Text style={styles.txt}>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text style={styles.txt}>Go Back to Login</Text>
                </TouchableOpacity>
        </View>
    )
}
const styles = StyleSheet.create({
    txt:{
        color: colors.white,
         fontFamily: 'Roboto-Regular',
          fontSize: normalize(18)
    },
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
    loginButtonBlocked: {
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(300),
        height: normalize(40),
        margin: normalize(10),
        borderRadius: normalize(10),
        backgroundColor: 'grey',
    }
})


export default RegisterScreen
