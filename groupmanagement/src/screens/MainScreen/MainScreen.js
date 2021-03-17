import React from 'react'
import { SafeAreaView, Text } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';
//  Auntenticated Screens
import HomeScreen from '../HomeScreen/HomeScreen'
import SettingsScreen from '../SettingsScreen/SettingsScreen';
import colors from '../../../assets/colors/colors';

const MainScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ focused, color, size }) => {
                        let iconName;
                        let iconSize;

                        if (route.name === 'Home') {
                            iconName = focused ? 'home' : 'home-outline'
                            iconSize = focused ? 25 : 20
                        } else if (route.name === "Settings") {
                            iconName = focused ? 'settings' : 'settings-outline'
                            iconSize = focused ? 25 : 20
                        }

                        return <Ionicons name={iconName} size={iconSize} color={color} />
                    }
                })}
                tabBarOptions={{
                    activeTintColor: colors.red,
                    inactiveTintColor: colors.orange
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Settings" component={SettingsScreen} />
            </Tab.Navigator>
        </SafeAreaView>

    )
}

export default MainScreen
