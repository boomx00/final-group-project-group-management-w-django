import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors/colors'
//  React Navigation
import { useNavigation } from '@react-navigation/native';


const RegisterScreen = () => {
    const navigation = useNavigation();
    const [studentID, setStudentID] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()

    const insertData = () => {
        fetch(`http://192.168.137.1:8000/api/users/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email:email,password:password})
        })
        .then(resp => resp.json())
        .then(data => {
            navigation.navigate('Done')
        })
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}> REGISTER</Text>
            <View style={styles.card}>
                <Text style={styles.subtitle}>Fill this form</Text>
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
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                    style={ email && password != null ? styles.loginButton : styles.loginButtonBlocked}
                    onPress={() => insertData()}
                >
                    <Text>Register</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Login")}
                >
                    <Text>Go Back to Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.orange,
        justifyContent: 'center',
        alignItems: 'center',
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
        fontSize: 30,
        fontFamily: "Roboto-Bold",
        paddingBottom: 50,
        color: colors.white,
    },
    subtitle: {
        fontFamily: "Roboto-Bold",
        fontSize: 30,
        paddingBottom: 10,
        color: colors.darkYellow,
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


export default RegisterScreen
