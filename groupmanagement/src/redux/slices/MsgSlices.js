import { createSlice } from '@reduxjs/toolkit'

export const MsgSlice = createSlice({
    name: 'Msg',
    initialState: {
        list: [
            {
                idm: 1,
                name: "Jay",
                mssg: "your idea sounds great",
                time: '11.20',
            },
            {
                idm: 2,
                name: "Cindy",
                mssg: "can i join you group",
                time: '00.22',
            },
            {
                idm: 3,
                name: "Peter",
                mssg: "Hello, do you want to  join my group ?",
                time: '16.20',
            },
            {
                idm: 4,
                name: "Peter",
                mssg: "Hello, do you want to  join my group ?",
                time: '16.20',
            },
            {
                idm: 5,
                name: "Peter",
                mssg: "Hello, do you want to  join my group ?",
                time: '16.20',
            },
            {
                idm: 6,
                name: "Peter",
                mssg: "Hello, do you want to  join my group ?",
                time: '16.20',
            },
            {
                idm: 7,
                name: "Peter",
                mssg: "Hello, do you want to  join my group ?",
                time: '16.20',
            },
        
        ],
    },
    reducers: {

    }
})

export const { } = MsgSlice.actions

export default MsgSlice.reducer