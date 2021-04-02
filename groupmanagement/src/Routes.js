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
import AddScreen from './screens/AddScreen/AddScreen';
import EditScreen from './screens/ProfileScreen/EditProfileScreen';
import ProfileScreen from './screens/MainScreen/MainScreen';
import MsgScreen from './screens/MsgScreen/MsgScreen';
import ChatScreen from './screens/ChatScreen/ChatScreen';

import SprintScreen1 from './screens/SprintScreen/SprintScreen1';


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
             <mainStack.Screen
                    name="Add"
                    component={AddScreen}
             />
             <mainStack.Screen
                    name="Edit"
                    component={EditScreen}
             />       
            <mainStack.Screen
                    name="Profile"
                    component={ProfileScreen}
             />
            <mainStack.Screen
                    name="sprint1"
                    component={SprintScreen1}
             /> 
            <mainStack.Screen
                   name="Msg"
                   component={MsgScreen}
             />     
            <mainStack.Screen
                   name="Chat"
                   component={ChatScreen}
             />                                                                      
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
