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
                biograph: action.payload.profile.biograph,
                major: action.payload.profile.major,
                phoneNumber: action.payload.profile.phoneNumber,
                isTeacher: action.payload.isTeacher,
                groupId: action.payload.groupId
            },
                state.isLogged = true
        },

        editProfile: (state, action) => {
            state.user.major = action.payload.major
            state.user.biograph = action.payload.biograph
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
            const res = await axios.post("/auth/register", {
                studentId,
                email,
                password
            })
            if (res.data.STATUS == "REGISTER_SUCCESS") {
                console.log("Triggered")
                navigation.navigate("Done")
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }

    }
}

export const getUserAction = () => {
    return async dispatch => {
        try {
            const user = await axios.get("/auth/getUser")
            if (user.data != null) {
                dispatch(getUser(user.data.userData))
                dispatch(getOwnGroupAction())
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const loginAction = (userName, passWord) => {
    return async dispatch => {
        try {
            const res = await axios.post("/auth/login", {
                email: userName,
                password: passWord
            })
            if (res.data.token != null) {
                await AsyncStorage.setItem("token", res.data.token)
                dispatch(getUserAction())
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }

    }
}

export const editProfileAction = (editedData) => {
    return async dispatch => {
        try {
            const res = await axios.patch("/profile/edit-profile", editedData)
            if (res.data.STATUS == "PROFILE_EDIT_SUCCESS") {
                dispatch(editProfile(editedData))
                alert('Successfully edit profile data!')
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const changePasswordAction = (editedData, navigation) => {
    return async dispatch => {
        try {
            const res = await axios.patch("/auth/change-password", editedData)
            if (res.data.STATUS == "CHANGE_PASSWORD_SUCCESS") {
                alert('Change password successfully!')
                navigation.navigate("Profile")
            }
        } catch (err) {
            console.log(err)
            alert(err.repsonse.data.MESSAGE)
        }
    }
}


export const logoutAction = () => {
    return async dispatch => {
        try {
            await AsyncStorage.removeItem("token")
            RootNavigation.navigate("Login")
            dispatch(onLogout())
            dispatch({
                type: "RESET_APP"
            })
            alert('You are unauthorized to load this screen, please try to login')
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}