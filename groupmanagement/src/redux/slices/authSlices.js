import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../middleware/RootNavigation'
import { setBookmark,getOwnGroupAction } from './groupSlices'

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
                studentId: action.payload.username,
                firstName: action.payload.first_name,
                lastName: "",
                phoneNumber: "not defined",
                biograph: action.payload.bio,
                major: action.payload.major,
                applied: action.payload.applied,
                isTeacher: action.payload.isTeacher,
                groupId: action.payload.is_in,
                role: action.payload.role
            },
                state.isLogged = true
        },
        setOwner:(state,action)=>{
            state.user.groupId = action.payload,
            state.user.role = "gm"
        },
        editProfile: (state, action) => {
            state.user.major = action.payload.major
            state.user.biograph = action.payload.bio
        },

        onLogout: (state, action) => {
            state.user = {}
            state.isLogged = false
        },
        editUserAction:(state,action)=>{
            state.user.biograph= action.payload.bio
            state.user.major = action.payload.major
        },
        setIn: (state,action)=>{
            state.user.groupId = action.payload.groupname_id
            state.user.role = "member"
            // console.log(state.user)
        },
        setRemove: (state,action)=>{
            // state.user = { ...state.user, groupId: null }
            state.user.groupId=""
            state.user.role=""

        },
        setApplied:(state,action)=>{
            state.user.applied = action.payload
        }
    }
})

export const { getUser, editProfile, onLogout,setOwner,setIn, editUserAction, setRemove,setApplied } = authSlice.actions

export default authSlice.reducer

// export const userRegisterAction = (studentId, email, password, navigation) => {
//     return async dispatch => {
//         try {
//             const res = await axios.post("/auth/register", {
//                 studentId,
//                 email,
//                 password
//             })
//             if (res.data.STATUS == "REGISTER_SUCCESS") {
//                 console.log("Triggered")
//                 navigation.navigate("Done")
//             }
//         } catch (err) {
//             alert(err.response.data.MESSAGE)
//         }

//     }
// }

export const getUserAction = () => {
    return async dispatch => {
        try {
            let token = await AsyncStorage.getItem('token');  
            if(token){
            const user = await axios.get("http://boomx00.pythonanywhere.com/api/user/getuser/",{
                headers:{
                    'Authorization': 'JWT ' + token,
                }
            })

            if (user.status == 200) {
                console.log(user.data)
                dispatch(getUser(user.data))
                dispatch(setBookmark(user.data.likes))
                if(user.data.is_in){
                dispatch(getOwnGroupAction(user.data.is_in))
                }
            }
        }
        } catch (err) {
            alert(err)
        }
    }
}

export const loginAction = (userName, passWord) => {
    return async dispatch => {
        try {
            const res = await axios.post("http://boomx00.pythonanywhere.com/api/token/", {
                username: userName,
                password: passWord
            })
            console.log(res.data)
            if (res.data.access != null) {
                await AsyncStorage.setItem("token", res.data.access)
                dispatch(getUserAction())
            }
        } catch (err) {
            alert("Incorrect Username/Password")
        }

    }
}

export const editProfileAction = (data) => {
    return async dispatch => {
        try {
            let token = await AsyncStorage.getItem('token');  
            const updateProfile = await axios.put("http://boomx00.pythonanywhere.com/api/user/edituser/", data,{
                headers:{
                    'Authorization': 'JWT ' + token,
                }
            })
            dispatch(editProfile(data))
            alert('Successfully edit profile data!')
           
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

// export const changePasswordAction = (editedData, navigation) => {
//     return async dispatch => {
//         try {
//             const res = await axios.patch("/auth/change-password", editedData)
//             if (res.data.STATUS == "CHANGE_PASSWORD_SUCCESS") {
//                 alert('Change password successfully!')
//                 navigation.navigate("Profile")
//             }
//         } catch (err) {
//             console.log(err)
//             alert(err.repsonse.data.MESSAGE)
//         }
//     }
// }


export const logoutAction = () => {
    return async dispatch => {
        try {
            await AsyncStorage.removeItem("token")
            dispatch({
                type: "RESET_APP"
            })
            alert('You are unauthorized to load this screen, please try to login')
            dispatch(onLogout())

            RootNavigation.navigate("Login")

        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}