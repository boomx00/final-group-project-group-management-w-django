import React from 'react'
import { SafeAreaView, Text } from 'react-native'

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

//  Auntenticated Screens
import HomeScreen from '../HomeScreen/HomeScreen'
import SettingsScreen from '../SettingsScreen/SettingsScreen';

const MainScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator>
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </SafeAreaView>

    )
}

export default MainScreen
