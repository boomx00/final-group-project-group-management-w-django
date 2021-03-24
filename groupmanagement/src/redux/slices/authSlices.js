import { createSlice } from '@reduxjs/toolkit'
import 'localstorage-polyfill';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {
            id: 1,
            firstName: 'Johnxxx',
            lastName: 'Doe',
            studentID: '12858390',
            email: 'john_doe@gmail.com',
            phoneNumber: '081-123-123-123',
            major: 'Information System and Computing Science',
            interestedIn: 'I am interseted in ....'
        },
        isLogged: false,
    },
    reducers: {
        onLogin: (state, action) => {
            //get token is login credentials are ok
            fetch(`http://192.168.137.1:8000/api/token/`,{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({username:action.payload.username,password:action.payload.password})
        })
        .then(resp => resp.json())
        .then(data => {

            //get userdata from token
            fetch(`http://192.168.137.1:8000/api/user/getuser`,{
                        method: 'GET',
                        // withCredentials: true,
                        // credentials: 'include',
                        headers:{
                            'Content-Type': 'application/json',
                            'Authorization': 'JWT ' + data.access,
                        },
                    })
                    .then(resp => resp.json())
                    .then(data => {
                        console.log(data.username)
                    })
        })
        .catch(error => console.log("error"))

        
     
            // if (action.payload.username == "coba123" && action.payload.password == "123123") {
            //     state.isLogged = true
            //     console.log("After Change the state", state)
            // } else {
            //     console.log("Failed to login")
            // }
        }
    }
})

export const { onLogin } = authSlice.actions

export default authSlice.reducer