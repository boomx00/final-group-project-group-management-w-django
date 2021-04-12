import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';
//  Authenticated Screens
import HomeScreen from '../HomeScreen/HomeScreen'
import SearchScreen from '../SearchScreen/SearchScreen';
import Group from '../GroupScreen/Group';
import ProfileScreen from '../ProfileScreen/ProfileScreeen';

// Redux-Action
import { useDispatch } from 'react-redux'
import { getUserAction } from '../../redux/slices/authSlices'

import colors from '../../../assets/colors/colors';

const MainScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserAction())
    }, [])
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
                        } else if (route.name === "Search") {
                            iconName = focused ? 'search' : 'search-outline'
                            iconSize = focused ? 25 : 20
                        } else if (route.name === "Group") {
                            iconName = focused ? 'people' : 'people-outline'
                            iconSize = focused ? 25 : 20
                        } else if (route.name === "Profile") {
                            iconName = focused ? 'person' : 'person-outline'
                            iconSize = focused ? 25 : 20
                        }

                        return <Ionicons name={iconName} size={iconSize} color={color} />
                    }
                })}
                tabBarOptions={{
                    inactiveTintColor: 'black',
                    keyboardHidesTabBar: true,
                }}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Search" component={SearchScreen} />
                <Tab.Screen name="Group" component={Group} />
                <Tab.Screen name="Profile" component={ProfileScreen} />


            </Tab.Navigator>
        </SafeAreaView>

    )
}


export default MainScreen
