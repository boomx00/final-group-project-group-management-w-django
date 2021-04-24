import React, { useEffect } from 'react'
import { SafeAreaView } from 'react-native'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Ionicons from 'react-native-vector-icons/Ionicons';

//  Authenticated Screens
import HomeScreen from '../HomeScreen/HomeScreen';
import SearchScreen from '../SearchScreen/SearchScreen';
import GroupScreen from '../GroupScreen/GroupScreen';
import ProfileScreen from '../ProfileScreen/ProfileScreen';
import CreateGroupScreen from '../CreateGroupScreen/CreateGroupScreen';
import Details from '../HomeScreen/Details';
import MsgScreen from '../MsgScreen/MsgScreen';
import BookmarkScreen from '../BookmarksScreen/BookmarkScreen'
import ChangePasswordScreen from '../ChangePasswordScreen/ChangePasswordScreen'

// Redux-Action
import { useDispatch } from 'react-redux'
import { getUserAction } from '../../redux/slices/authSlices'
import { getOwnGroupAction } from '../../redux/slices/groupSlices'

import colors from '../../../assets/colors/colors';

const MainScreen = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getUserAction())
        dispatch(getOwnGroupAction())
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarButton: [
                        "CreateGroup",
                        "GroupDetail",
                        "Messages",
                        "Bookmark",
                        "ChangePassword",
                    ].includes(route.name)
                        ? () => {
                            return null;
                        }
                        : undefined,
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
                <Tab.Screen name="Group" component={GroupScreen} />
                <Tab.Screen name="Profile" component={ProfileScreen} />
                <Tab.Screen name="CreateGroup" component={CreateGroupScreen} />
                <Tab.Screen name="GroupDetail" component={Details} />
                <Tab.Screen name="Messages" component={MsgScreen} />
                <Tab.Screen name="Bookmark" component={BookmarkScreen} />
                <Tab.Screen name="ChangePassword" component={ChangePasswordScreen} />
            </Tab.Navigator>
        </SafeAreaView>

    )
}


export default MainScreen
