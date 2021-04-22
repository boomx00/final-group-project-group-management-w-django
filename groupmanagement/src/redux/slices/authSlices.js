import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../middleware/RootNavigation'
import { getOwnGroupAction } from './groupSlices'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        isLogged: false
    },
    reducers: {
        getUser: (state, action) => {
            state.user = {
                id: action.payload.id,
                email: action.payload.email,
                studentId: action.payload.studentId,
                firstName: action.payload.profile.firstName,
                lastName: action.payload.profile.lastName,
                phoneNumber: action.payload.profile.phoneNumber,
                isTeacher: action.payload.isTeacher,
                groupId: action.payload.groupId
            },
                state.isLogged = true
        },

        editProfile: (state, action) => {
            state.user.major = action.payload.data.major
            state.user.interestedIn = action.payload.data.bio
        },

        onLogout: (state, action) => {
            state.user = {}
            state.isLogged = false
        }
    }
})

export const { getUser, editProfile, onLogout } = authSlice.actions

export default authSlice.reducer

export const userRegisterAction = (studentId, email, password, navigation) => {
    return async dispatch => {
        try {
            const res = await axios.post("http://10.10.10.124:3002/api/v1/auth/register", {
                studentId,
                email,
                password
            })
            console.log(res.data)
            if (res.data.STATUS == "REGISTER_SUCCESS") {
                console.log("Triggered")
                navigation.navigate("Done")
            }
        } catch (err) {
            alert(err.response.data)
        }

    }
}

export const getUserAction = () => {
    return async dispatch => {
        try {
            const user = await axios.get("http://10.10.10.124:3002/api/v1/auth/getUser")
            if (user.data != null) {
                dispatch(getUser(user.data.userData))
                dispatch(getOwnGroupAction())
            }
        } catch (err) {
            alert(err.response.data)
        }
    }
}

export const loginAction = (userName, passWord) => {
    return async dispatch => {
        try {
            const res = await axios.post("http://10.10.10.124:3002/api/v1/auth/login", {
                email: userName,
                password: passWord
            })
            console.log(res.data)
            if (res.data.token != null) {
                await AsyncStorage.setItem("token", res.data.token)
                dispatch(getUserAction())
                dispatch({
                    type: "RESET_APP"
                })
            }
        } catch (err) {
            alert(err)
        }

    }
}

export const editProfileAction = (editedData) => {
    return async dispatch => {

    }
}

export const logoutAction = () => {
    return async dispatch => {
        try {
            await AsyncStorage.removeItem("token")
            RootNavigation.navigate("Login")
            dispatch(onLogout())
            alert('You are unauthorized to load this screen, please try to login')
        } catch (err) {
            console.log("Trigger")
            alert(err)
        }
    }
}