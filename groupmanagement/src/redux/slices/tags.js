import { createSlice } from '@reduxjs/toolkit'

export const tags = createSlice({
    name: 'tag',
    initialState: {
        list: [
            {
                id_: 1,
                name: "A",
            },
            {
                id_: 2,
                name: "B",

            },
            {
                id_: 3,
                name: "C",
            },
        
        ],
    },
    reducers: {

    }
})

export const { } = tags.actions

export default tags.reducer