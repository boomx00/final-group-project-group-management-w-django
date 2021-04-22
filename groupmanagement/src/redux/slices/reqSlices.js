import { createSlice } from '@reduxjs/toolkit'

export const reqSlices = createSlice({
    name: 'req',
    initialState: {
        list: [
            {
                ids: 1,
                nn: "Jay",
            },
            {
                ids: 2,
                nn: "d",
            },
            {
                ids: 3,
                nn: "f",
            },
            {
                ids: 4,
                nn: "d",
            },
        
        ],
    },
    reducers: {

    }
})

export const { } = reqSlices.actions

export default reqSlices.reducer