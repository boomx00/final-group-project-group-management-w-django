import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const groupSlice = createSlice({
    name: 'group',
    initialState: {
        list: [],
        ownGroup: {
            id: '',
            name: '',
            topic: '',
            description: '',
            requirements: '',
            ownerId: '',
            members: [],
            sprints: [],
            tags: [],
            projectApproved: ''
        },
        bookmarkedGroup: [],
        joinGroupRequest: [],
        groupProposal: {
        },
        groupProposalList: [],
        ownRequestJoin: [

        ]
    },
    reducers: {
        onGetGroup: (state, action) => {
            state.list = action.payload.groups
        },
        onGetOwnGroup: (state, action) => {
            if (action.payload == null) {
                state.ownGroup = {
                    id: '',
                    name: '',
                    topic: '',
                    description: '',
                    requirements: '',
                    ownerId: '',
                    members: [],
                    sprints: [],
                    tags: [],
                    projectApproved: ''

                }
                state.GroupProposal = {}
            } else {
                state.ownGroup = {
                    id: action.payload.id,
                    name: action.payload.name,
                    topic: action.payload.topic,
                    description: action.payload.description,
                    tags: action.payload.Tags,
                    requirements: action.payload.requirements,
                    members: action.payload.Members,
                    ownerId: action.payload.ownerId,
                    sprints: action.payload.Sprints,
                    projectApproved: action.payload.projectApproved
                }
                state.groupProposal = action.payload.GroupProposal
            }

        },
        setBookmark: (state, action) => {
            if (action.payload == null) {
                state.bookmarkedGroup = []
            } else {
                state.bookmarkedGroup = action.payload
            }

        },
        setJoinGroupReq: (state, action) => {
            state.joinGroupRequest = action.payload
        },
        setOwnRequest: (state, action) => {
            state.ownRequestJoin = action.payload
        },
        setAcceptJoinGroupReq: (state, action) => {
            const req = state.joinGroupRequest.find((req) => req.id === action.payload)
            if (req) {
                req.approved = true
            }
        },
        setDeclineJoinGroupReq: (state, action) => {
            const req = state.joinGroupRequest.find((req) => req.id === action.payload)
            if (req) {
                req.approved = false
            }
        },
        setConfirmJoin: (state, action) => {
            state.ownRequestJoin.map(req => {
                if (req.approved == null) {
                    req.approved == false
                }
            })
        },
        setCancelJoin: (state, action) => {
            state.ownRequestJoin.map(req => {
                if (req.id == action.payload.id) {
                    req.confirm = false
                }
            })
        },
        editGroup: (state, action) => {
            state.ownGroup = { ...state.ownGroup, ...action.payload }
        },
        editSprint: (state, action) => {
            state.ownGroup.sprints.map(sprint => {
                if (sprint.id == action.payload.id) {
                    sprint.progress = action.payload.progress
                    sprint.summary = action.payload.summary
                }
            })
        },
        getGroupProposals: (state, action) => {
            state.groupProposalList = action.payload
        },
        acceptProposal: (state, action) => {
            state.groupProposalList.map(proposal => {
                if (proposal.id == action.payload.id) {
                    proposal.progress == "ACCEPTED"
                    proposal.feedback = action.payload.feedback
                }
            })
        },
        declineProposal: (state, action) => {

        }
    }
})

export const {
    onGetGroup,
    onGetOwnGroup,
    setBookmark,
    setOwnRequest,
    setJoinGroupReq,
    setAcceptJoinGroupReq,
    setDeclineJoinGroupReq,
    setConfirmJoin,
    setCancelJoin,
    editGroup,
    editSprint,
    getGroupProposals,
    acceptProposal,
    declineProposal } = groupSlice.actions

export default groupSlice.reducer

export const getAllGroupAction = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/group/get-all-group")
            dispatch(onGetGroup({ groups: res.data.groups }))
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const createGroupAction = (name, topic, description, tags, requirements, navigation) => {
    return async dispatch => {
        try {
            const res = await axios.post("/group/create-group", {
                name,
                topic,
                description,
                tags,
                requirements
            })
            if (res.data.STATUS == "CREATE_GROUP_SUCCESS") {
                dispatch(getOwnGroupAction())
                alert('Successfully create the group!')
                navigation.navigate("Group")
            } else {
                alert("You already own a group!")
            }
        } catch (err) {
            alert(err)
        }
    }
}
export const getOwnGroupAction = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/group/get-own-group")
            if (res.data.STATUS == "GET_OWN_GROUP_SUCCESS") {
                dispatch(onGetOwnGroup(res.data.GROUP))
            } else if (res.data.STATUS == "GET_OWN_GROUP_NOT_EXISTS") {
                dispatch(onGetOwnGroup(null))
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const editGroupAction = (newGroupDetails) => {
    return async dispatch => {
        try {
            const res = await axios.patch("/group/edit-group", newGroupDetails)
            if (res.data.STATUS == "GROUP_EDIT_SUCCESS") {
                dispatch(getOwnGroupAction())
                alert('Successfully edit the group!')
            } else {
                throw res.data
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

// Group Membership Actions
export const getOwnJoinRequestAction = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/group/get-own-request")
            dispatch(setOwnRequest(res.data.REQUESTS))
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const getJoinGroupReqAction = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/group/get-request-join-group")
            console.log(res.data.Requests)
            dispatch(setJoinGroupReq(res.data.Requests))
        } catch (err) {
            console.log(err)
            alert(err.response.data.MESSAGE)
        }
    }
}

export const joinGroupAction = (groupId) => {
    return async (dispatch, getState) => {
        try {
            if (getState().auth.groupId == null) {
                const res = await axios.post("/group/join-group", { groupId: groupId })
                console.log(res.data.result)
                if (res.data.STATUS == "JOIN_GROUP_REQUEST_SUCCESS") {
                    alert("Successfully request to join a group, check the progress at messages screen!")
                } else {
                    alert("Failed to join the group, please try again!")
                }
            } else {
                alert("You are in a group, please leave or delete your group.")
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const leaveGroupAction = () => {
    return async dispatch => {
        try {
            const res = await axios.patch("/group/leave-group")
            if (res.data.STATUS == "LEAVE_GROUP_SUCCESS") {
                dispatch(onGetOwnGroup(null))
                alert('Successfully leave the group!')
            } else {
                throw err
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const acceptJoinGroupAction = (id) => {
    return async dispatch => {
        try {
            const res = await axios.patch("/group/accept-join-group", { joinId: id })
            dispatch(setAcceptJoinGroupReq(id))
            alert('Successfully accept student to join the group!')
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const declineJoinGroupAction = (id) => {
    return async dispatch => {
        try {
            const res = await axios.post("/group/decline-join-group", { joinId: id })
            dispatch(setDeclineJoinGroupReq(id))
            alert('Successfully decline join group!')
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const confirmJoinAction = (id) => {
    return async dispatch => {
        try {
            const res = await axios.patch("/group/confirm-join-group", { joinId: id })
            if (res.data.STATUS == "CONFIRM_JOIN_SUCCESS") {
                dispatch(setConfirmJoin())
                dispatch(getOwnGroupAction())
                alert('Confirm join group success!')
            }
        } catch (err) {
            alert(err.repsonse.data.MESSAGE)
        }
    }
}

export const cancelJoinAction = (id) => {
    return async dispatch => {
        try {
            const res = await axios.patch("/group/cancel-join-group", { joinId: id })
            if (res.data.STATUS == "CANCEL_JOIN_SUCCESS") {
                dispatch(setCancelJoin())
                alert('Cancel to join group success!')
            }
        } catch (err) {
            alert(err.repsonse.data.MESSAGE)
        }
    }
}

//  Group Proposal System

export const sendGroupProposalAction = () => {
    return async dispatch => {
        try {
            const res = await axios.patch("/group/send-group-proposal")
            if (res.data.STATUS == "SEND_GROUP_DATA SUCCESS") {
                alert("You're successfully send the group proposal to the teacher.")
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const getGroupProposalAction = () => {
    return async dispatch => {
        try {
            const res = await axios.get("/group/get-group-proposals")
            if (res.data.STATUS == "GET_GROUP_PROPOSALS_SUCCESS") {
                dispatch(getGroupProposals(res.data.Result))
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const acceptGroupProposalAction = (groupId, feedback) => {
    return async dispatch => {
        try {
            const res = await axios.patch("/group/approve-group-proposal", { groupId, approval: "ACCEPT", feedback })
            if (res.data.STATUS == "APPROVAL_GROUP_PROPOSAL_SUCCESS") {
                dispatch(acceptProposal({ id: groupId, feedback }))
                alert(res.data.MESSAGE)
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const declineGroupProposalAction = (groupId, feedback) => {
    return async dispatch => {
        try {
            const res = await axios.patch("/group/approve-group-proposal", { groupId, approval: "DECLINE", feedback })
            if (res.data.STATUS == "APPROVAL_GROUP_PROPOSAL_SUCCESS") {
                console.log("DECLINED SUCCESS")
                dispatch(declineProposal({ id: groupId, feedback }))
                alert(res.data.MESSAGE)
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

//  Group Sprints System
export const editSprintAction = (newData, sprintId) => {
    return async dispatch => {
        try {
            console.log(newData)
            const res = await axios.patch("/group/edit-sprint", { newData, sprintId })
            if (res.data.STATUS == "SPRINT_EDIT_SUCCESS") {
                dispatch(editSprint(res.data.EDITED_SPRINT))
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

//  Bookmark actions
export const addUserBookmarkAction = (groupId) => {
    return async dispatch => {
        try {
            console.log(groupId)
            const bookmarked = await AsyncStorage.getItem("Bookmark")

            if (bookmarked == null) {
                await AsyncStorage.setItem("Bookmark", JSON.stringify([groupId]))
            } else {
                const restoredBookmark = JSON.parse(bookmarked)
                const newBookmark = [...restoredBookmark, groupId]
                await AsyncStorage.setItem("Bookmark", JSON.stringify(newBookmark))
            }
            const afterAdd = await AsyncStorage.getItem("Bookmark")
            dispatch(setBookmark(afterAdd))
        } catch (err) {
            alert(err)
        }
    }
}
export const deleteUserBookmarkAction = (delGroupId) => {
    return async dispatch => {
        try {
            const bookmarked = await AsyncStorage.getItem("Bookmark")
            const bookmarkParsed = JSON.parse(bookmarked)
            const afterDelete = bookmarkParsed.filter(groupId => {
                return groupId != delGroupId
            })
            await AsyncStorage.setItem("Bookmark", JSON.stringify(afterDelete))
            dispatch(setBookmark(afterDelete))
        } catch (err) {
            alert(err)
        }
    }
}
export const getUserBookmarkAction = () => {
    return async dispatch => {
        try {
            const bookmarked = await AsyncStorage.getItem("Bookmark")
            dispatch(setBookmark(bookmarked))
        } catch (err) {
            alert(err)
        }
    }
}