import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        list: [
            {
                id: 1,
                name: "Z Group",
                description: "Open Recruit For International Students Only"
            },
            {
                id: 2,
                name: "X Group",
                description: "We're open for every students in XJTLU"
            },
            {
                id: 3,
                name: "Y  Group",
                description: "Hello we are group on fire, we want to do our job as the best we could"
            }
        ],
    },
    reducers: {

    }
})

export const { } = groupSlice.actions

export default groupSlice.reducer