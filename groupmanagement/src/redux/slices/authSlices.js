import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../middleware/RootNavigation'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {

        },
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
                phoneNumber: action.payload.profile.phoneNumber
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

export const userRegisterAction = (studentId, email, password) => {
    return async dispatch => {

    }
}

export const getUserAction = () => {
    return async dispatch => {
        try {
            const user = await axios.get("http://10.10.10.124:3002/api/v1/auth/getUser")
            if (user.data != null) {
                dispatch(getUser(user.data.userData))
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