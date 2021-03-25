import React, { useState } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize';

//  Redux
import { connect } from 'react-redux'
import colors from '../../../assets/colors/colors'
import { onLogin } from '../../redux/slices/authSlices'

//  React Navigation
import { useNavigation } from '@react-navigation/native';


const LoginScreen = ({ onLogin }) => {
    const navigation = useNavigation();
    const [username, setUsername] = useState()
    const [password, setPassword] = useState()

    const Login = () => {
        console.log(username, 'xx')
        onLogin({ username: username, password: password })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}> Soon's Group Management</Text>
            <View style={styles.card}>
                <Text style={styles.subtitle}>Login</Text>
                <TextInput
                    style={styles.textinput}
                    placeholder="Username"
                    onChangeText={text => setUsername(text)} />
                <TextInput
                    style={styles.textinput}
                    autoCompleteType={'password'}
                    secureTextEntry={true}
                    placeholder="Password"
                    onChangeText={text => setPassword(text)}
                />
                <TouchableOpacity
                    style={username && password != null ? styles.loginButton : styles.loginButtonBlocked}
                    onPress={() => Login()}
                    disabled={username && password != null ? false : true}
                >
                    <Text>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => navigation.navigate("Register")}
                >
                    <Text>Go To Register</Text>
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

const mapDispatchToProps = ({
    onLogin
})
export default connect(null, mapDispatchToProps)(LoginScreen)
