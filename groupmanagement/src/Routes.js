import React, { useEffect } from 'react'

//Redux
import { connect } from 'react-redux'

//React Navigation
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';

//Screens
import LoginScreen from './screens/LoginScreen/LoginScreen'
import RegisterScreen from './screens/RegisterScreen/RegisterScreen'
import MainScreen from './screens/MainScreen/MainScreen';
import Done from './screens/RegisterScreen/Done'


const authStack = createStackNavigator();
const mainStack = createStackNavigator();

const Routes = ({ isLogged }) => {
    useEffect(() => {
        console.log(isLogged)
    })
    return (
        (!isLogged ?
            <authStack.Navigator
                screenOptions={{ headerShown: false }}
            >
                <authStack.Screen
                    name="Login"
                    component={LoginScreen}
                />
                <authStack.Screen
                    name="Register"
                    component={RegisterScreen}
                />
                <authStack.Screen
                    name="Done"
                    component={Done}
                />

            </authStack.Navigator>
            :
            <mainStack.Navigator
                screenOptions={{ headerShown: false }}>
                <mainStack.Screen
                    name="Main"
                    component={MainScreen} />
            </mainStack.Navigator>

        )

    )
}
const mapStateToProps = (state) => {
    return {
        isLogged: state.auth.isLogged
    }

}

export default connect(mapStateToProps, null)(Routes)
