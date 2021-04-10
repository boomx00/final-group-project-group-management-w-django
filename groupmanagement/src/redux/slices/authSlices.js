import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
            studentID: '12858390',
            email: 'john_doe@gmail.com',
            phoneNumber: '081-123-123-123',
            major: 'Information System and Computing Science',
            interestedIn: 'I am interseted in ....'
        },
        isLogged: true
    },
    reducers: {
        onLogin: (state, action) => {
            state.user = { ...action.payload }
            if(action.payload.login === 1){
                state.isLogged = true
            }
        },

        updateState: (state,action) => {
            // console.log(action.payload.data.major)
            state.user.major = action.payload.data.major,
            state.user.interestedIn = action.payload.data.bio
        }
    }
})

export const { onLogin, updateState } = authSlice.actions

export default authSlice.reducer

export const loginAction = (userName, passWord) => {
    return async dispatch => {
        try {
            const res = await axios.post('http://boomx00.pythonanywhere.com/api/token/', {
                username: userName,
                password: passWord
            })
            if (res.data.access != null) {
                await AsyncStorage.setItem('token', res.data.access);
                const value = await AsyncStorage.getItem('token');
                // Kalo udah dapet token simpen di asyncstorage / redux persist
                const userData = await axios.get('http://boomx00.pythonanywhere.com/api/user/getuser/',{
                    headers:{
                        'Authorization': 'JWT ' + value,
                    }
                })
                console.log(userData.data)
                dispatch(onLogin({ 
                    id: userData.data.id,
                    firstName: userData.data.first_name,
                    lastName: 'Doe',
                    studentID: userData.data.username,
                    email: 'john_doe@gmail.com',
                    phoneNumber: '081-123-123-123',
                    major: userData.data.major,
                    interestedIn: userData.data.bio,
                    token: value,
                    login: 1
                }))

                // Kalo udah dapet token simpen di asyncstorage / redux persist
                //const userData = await axios.get() // kalo udah harusnya fetch userdata
                //dispatch(onLogin({ username, password, first_name, last_name, .... })) //Panggil reducer diatas buat set userData
            }
        } catch (err) {
            console.log(err.response.data)
        }

    }
}