import React, { useState, useEffect, useRef } from 'react'
import { AppState, SafeAreaView } from 'react-native'

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
import TeacherDetails from '../HomeScreen/TeacherDetails';

// Redux-Action
import { useDispatch, useSelector } from 'react-redux'
import { getUserAction } from '../../redux/slices/authSlices'
import { getOwnGroupAction } from '../../redux/slices/groupSlices'

// Socket
import { io } from "socket.io-client";

// Notification Helper
import { newNotification } from '../../middleware/PushNotification'

import colors from '../../../assets/colors/colors';

const MainScreen = () => {
    const dispatch = useDispatch();
    const appState = useRef(AppState.currentState)
    const [appStateVisible, setAppStateVisible] = useState(appState.current)

    const user = useSelector(state => state.auth.user)
    const socketRef = useRef()
    useEffect(() => {
        socketRef.current = io("http://192.168.100.246:3005", {
            query: {
                userId: user.id
            }
        })
        socketRef.current.on("notification:unreceived", (notifications, callback) => {
            console.log(notifications)
            notifications.map((notif) => {
                if (notif.notification_type == "ACCEPT_JOIN_GROUP") {
                    newNotification(notif.message)
                } else if (notif.notification_type == "DECLINE_JOIN_GROUP") {
                    newNotification(notif.message)
                } else if (notif.notification_type == "ACCEPT_GROUP_PROPOSAL") {
                    newNotification(notif.message)
                } else if (notif.notification_type == "DECLINE_GROUP_PROPOSAL") {
                    newNotification(notif.message)
                }
            })
            callback(true)
        })
        socketRef.current.on("notification:newNotification", (payload) => {
            newNotification(payload.msg)
        })
        AppState.addEventListener("change", _handleAppStateChange);

        return () => {
            AppState.removeEventListener("change", _handleAppStateChange);
        };
    }, [])
    const _handleAppStateChange = (nextAppState) => {
        if (
            appState.current.match(/inactive|background/) &&
            nextAppState === "active"
        ) {
            console.log("App has come to the foreground!");
        }

        appState.current = nextAppState;
        setAppStateVisible(appState.current);
        if (appState.current == "background") {
            socketRef.current.emit("disconnect")
        }
    };
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
                        "TeacherDetail"
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
                <Tab.Screen name="TeacherDetail" component={TeacherDetails} />

                <Tab.Screen name="Messages">
                    {props => <MsgScreen socket={socketRef} />}
                </Tab.Screen>
                <Tab.Screen name="Bookmark" component={BookmarkScreen} />
                <Tab.Screen name="ChangePassword" component={ChangePasswordScreen} />
            </Tab.Navigator>
        </SafeAreaView>

    )
}


export default MainScreen