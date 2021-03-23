import { createSlice } from '@reduxjs/toolkit'

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
            if (action.payload.username == "coba123" && action.payload.password == "123123") {
                state.isLogged = true
                console.log("After Change the state", state)
            } else {
                console.log("Failed to login")
            }
        }
    }
})

export const { onLogin } = authSlice.actions

export default authSlice.reducer