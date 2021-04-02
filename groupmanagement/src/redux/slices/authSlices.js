import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { AsyncStorage } from 'react-native'
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
        isLogged: false
    },
    reducers: {
        onLogin: (state, action) => {
            state.user = { ...action.payload }
        }
    }
})

export const { onLogin } = authSlice.actions

export default authSlice.reducer

export const loginAction = (userName, passWord) => {
    return async dispatch => {
        try {
            const res = await axios.post('http://boomx00.pythonanywhere.com/api/token/', {
                username: userName,
                password: passWord
            })
            if (res.data.access != null) {
                // Kalo udah dapet token simpen di asyncstorage / redux persist
                //const userData = await axios.get() // kalo udah harusnya fetch userdata
                //dispatch(onLogin({ username, password, first_name, last_name, .... })) //Panggil reducer diatas buat set userData
            }
        } catch (err) {
            console.log(err.response.data)
        }

    }
}