import { createSlice } from '@reduxjs/toolkit'

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {

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