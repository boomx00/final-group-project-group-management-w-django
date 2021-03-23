import { createSlice } from '@reduxjs/toolkit'

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        list: [
            {
                id: 1,
                name: "Z Group",
                description: "Open Recruit For International Students Only",
                topic: 'ASDX application to make life easier',
                membersID: [1, 5, 4, 6, 7, 3],
                likesID: [1, 4, 5, 6, 7, 8, 9, 10]
            },
            {
                id: 2,
                name: "X Group",
                description: "We're open for every students in XJTLU",
                topic: 'XZ application to make life easier',
                membersID: [10, 2, 4],
                likesID: [2, 3, 4, 5, 6, 10, 20]
            },
            {
                id: 3,
                name: "Y Group",
                description: "Hello we are group on fire, we want to do our job as the best we could",
                topic: 'YX application to make life easier',
                membersID: [5, 20, 56],
                likesID: [1, 2, 3, 4, 5, 6, 7, 8, 10]
            },
            {
                id: 4,
                name: "Hello Group",
                description: "We're open for every students in XJTLU",
                topic: 'QR Code Scanner',
                membersID: [11, 15, 24],
                likesID: [2, 3, 4, 5, 6, 10, 20]
            },
            {
                id: 5,
                name: "Another World Group",
                description: "We're open for every students in XJTLU",
                topic: 'Blackhole Social Media Group',
                membersID: [25, 22, 21],
                likesID: [2, 3, 4, 5, 6, 10, 20]
            },
        ],
        ownGroup: {
            groupID: 1,
            createdBy: 1,
            membersID: [1, 5, 4, 6, 7, 3],
            topic: 'X application to make life easier',
            description: "Open Recruit For International Students Only"
        },
    },
    reducers: {
        //addGroup: (state,action)=>{


        // }
    }
})

export const { } = groupSlice.actions

export default groupSlice.reducer