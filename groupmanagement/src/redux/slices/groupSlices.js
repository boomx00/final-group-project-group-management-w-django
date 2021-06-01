import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { setIn,setRemove,setApplied,setOwner } from '../../redux/slices/authSlices'

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
            projectApproved: '',
            recruitment: ''
        },
        bookmarkedGroup: [],
        joinGroupRequest: [],
        groupProposal: {
            progress: ""
        },
        groupProposalList: [
            
        ],
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
                    projectApproved: '',
                    recruitment: '',

                }
                state.GroupProposal = {}
            } else {
                state.ownGroup = {
                    id: action.payload.id,
                    name: action.payload.name,
                    topic: action.payload.topic,
                    description: action.payload.description,
                    tags: action.payload.tags,
                    requirements: action.payload.requirements,
                    members: action.payload.member,
                    ownerId: action.payload.owner,
                    proposal: action.payload.proposal,
                    recruitment: action.payload.recruitment,
                    sprints: []
                }
                if(action.payload.proposal == "tbd"){
                state.groupProposal = {
                    progress: ""
                }
                }else if(action.payload.proposal == "sent"){
                    state.groupProposal = {
                        progress: "ON_REVIEW"
                    }
                }else if(action.payload.proposal == "accepted"){
                    state.groupProposal = {
                        progress: "accepted"
                    }
                }else{
                    state.groupProposal = {
                        progress: "declined"
                    }
                }
            }

        },
        setRecruitment: (state,action) => {
            state.ownGroup.recruitment = action.payload
        },
        setBookmark: (state, action) => {
            // console.log(action.payload)
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
            // console.log(action.payload)
            const req = state.joinGroupRequest.find((req) => req.userid === action.payload)
            if (req) {
                req.status = "accepted"
                console.log(req)
                console.log(state.joinGroupRequest)
            }else{
                console.log('nope')
            }
        },
        setDeclineJoinGroupReq: (state, action) => {
           const req = state.joinGroupRequest.find((req) => req.userid === action.payload)
            if (req) {
                req.status = "declined"
                req.confirmed = "declined"
                console.log(req)
                console.log(state.joinGroupRequest)
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
            // console.log(action.payload.feedback)
            state.groupProposalList = action.payload
        },
        acceptProposal: (state, action) => {
            state.groupProposalList.map(proposal => {
                if (proposal.groupid.id == action.payload.id) {
                    proposal.progress = "accepted"
                    proposal.feedback = action.payload.feedback
                }
            })

        },
        declineProposal: (state, action) => {
            state.groupProposalList.map(proposal => {
                if (proposal.groupid.id == action.payload.id) {
                    proposal.progress = "declined"
                    proposal.feedback = action.payload.feedback
                }
            })
        },
        setMember:(state,action)=>{
            state.ownGroup.members = action.payload
        },
        removeGroup:(state,action)=>{
            const groups = state.list.filter(group => group.id != action.payload);
            state.list = groups

        },
        leaveGroup:(state,action)=>{
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
                projectApproved: '',
                recruitment: '',

            }
            state.ownRequestJoin = []

            console.log(state.ownGroup)
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
    declineProposal,
    setMember,
    leaveGroup,
    setRecruitment,
    removeGroup } = groupSlice.actions

export default groupSlice.reducer

export const getAllGroupAction = () => {
    return async dispatch => {
        try {
            
            const res = await axios.get("group/getall/")
            // console.log(res.data)
            dispatch(onGetGroup({ groups: res.data }))
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const createGroupAction = (name, topic, description, tags, requirements, navigation,id,firstName) => {
    return async dispatch => {
        try {
            let token = await AsyncStorage.getItem('token');  
            const data = {
                name:name,
                description:description,
                owner: id,
                member:[{'id':id,'firstName':firstName}],
                requirements: requirements,
                topic: topic,
                tags:tags
            }
            const createGroup = await axios.post(`group/create/`, data, {
                headers:{
                  'Authorization': 'JWT ' + token,
              }
          })
        //   console.log(createGroup.status)


          if(createGroup.status != 400){
            const setgroupdata = {
                "role":'gm',
                "is_in": createGroup.data.id,
                "applied": []
            }
            const setgroup = await axios.put('user/specificuser/'+id, setgroupdata)
            dispatch(getOwnGroupAction(createGroup.data.id))
            dispatch(setOwner(createGroup.data.id))
            alert('Successfully create the group!')
            navigation.navigate("Group")
        }
           
        } catch (err) {
            // alert(err)
        }
    }
}
export const getOwnGroupAction = (id) => {
    return async dispatch => {
        try {
            // console.log("asdasdsa")
            if(id){
                const setGroup = await axios.get('group/getgroup/'+id)
                if (setGroup.data) {
                    dispatch(onGetOwnGroup(setGroup.data))
                } else{
                    dispatch(onGetOwnGroup(null))
                }
            }else{
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
            const newdata = {
                name: newGroupDetails.name,
                description: newGroupDetails.description,
                topic: newGroupDetails.topic,
                tags: newGroupDetails.tags
            }
            const res = await axios.put("group/manage/"+newGroupDetails.id, newdata)
            if (res.status == 200) {
                dispatch(getOwnGroupAction(newGroupDetails.id))
            }
           
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

// // Group Membership Actions
export const getOwnJoinRequestAction = (userid) => {
    return async dispatch => {
        try {
            const res = await axios.get("group/getownrequest/"+userid)
            dispatch(setOwnRequest(res.data))
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const getJoinGroupReqAction = (groupid) => {
    return async dispatch => {
        try {
            const requests = await axios.get("group/getcondition/?groupname="+groupid)
           console.log(requests.data)
            dispatch(setJoinGroupReq(requests.data))
        } catch (err) {
            console.log(err)
            alert(err.response.data.MESSAGE)
        }
    }
}

export const joinGroupAction = (data) => {
    return async (dispatch, getState) => {
        try {
            if (getState().auth.groupId == null) {
                // console.log(data)
                let token = await AsyncStorage.getItem('token');  
                
                const applied = {
                    applied:[]
                }
                const datas = {
                    applications: [data.userid]
                }
                const reqdata = {
                    firstName:data.fName,
                    userid: data.userid,
                    groupname_id: data.groupid
                }
            const getapply = await axios.get(`group/application/`+data.groupid)
            const user = await axios.get("user/getuser/",{
                headers:{
                        'Authorization': 'JWT ' + token,
                }
            })
         
        

            
            if(user.data.applied){

                var applicants = user.data.applied
                applicants.push(data.groupid)
                applied.applied = applicants
                const submit = await axios.put(`user/setapplied/`+data.userid, applied)
            }else{
                console.log('aaaaaas')

                applied.applied= [data.groupid]
                // console.log(applied)
                const submit = await axios.put(`user/setapplied/`+data.userid, applied)
            }
      
            if(getapply.data.applications){
                var applicants = getapply.data.applications
                applicants.push(datas.applications[0])
                datas.applications = applicants
                console.log(data.groupid)
                const submit = await axios.put(`group/application/`+data.groupid, datas)
                const request = await axios.post('group/createrequest/', reqdata)
            }else{
                const submit = await axios.put(`group/application/`+data.groupid, datas)
                const request = await axios.post('group/createrequest/', reqdata)
    
            }
            dispatch(setApplied(applied.applied))

            dispatch(getOwnJoinRequestAction(data.userid))
            // console.log(applied.applied)
            }
            // console.log(applied)

            
        
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}



export const acceptJoinGroupAction = (data,socket) => {
    return async (dispatch, getState) => {
        try {
            const { auth, group } = getState();
            const datas = {
                userid: data.userid,
                groupname_id: data.groupid,
                status: "accepted",
                confirmed: "tbd"
            }
            // console.log(socket)
            const res = await axios.patch("group/updatestatus/", datas)
            // dispatch(setAcceptJoinGroupReq(id))
            dispatch(setAcceptJoinGroupReq(data.userid))
            socket.current.emit("notification:accept-join-group", { sndrId: auth.user.id, recvId: data.userid, type: "ACCEPT_JOIN_GROUP", msg: `You are accepted to join group ${group.ownGroup.name}` })
            // console.log(data)
            alert('Successfully accept student to join the group!')
        } catch (err) {
            console.log(err)
        }
    }
}

export const declineJoinGroupAction = (data, socket) => {
    return async (dispatch, getState) => {
        try {
            const { auth, group } = getState();
            const datas = {
                userid: data.userid,
                groupname_id: data.groupid,
                status: "declined",
                confirmed: "declined"
            }
            const res = await axios.patch("group/updatestatus/", datas)

            socket.current.emit("notification:decline-join-group", { sndrId: auth.user.id, recvId: data.userid, type: "DECLINE_JOIN_GROUP", msg: `You are declined to join group ${group.ownGroup.name}` })

            dispatch(setDeclineJoinGroupReq(id))
            dispatch(setDeclineJoinGroupReq(data.userid))

            alert('Successfully decline join group!')
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const removeUsers = (data) => {
    return async dispatch=>{
        try{
            const res = await axios.get("group/member/"+data.groupid)
            // const res = await axios.get("http://boomx00.pythonanywhere.com/api/group/member/"+data.groupid)

            if(res.data){
            var userdata = res.data.member
            for( var i = 0; i < userdata.length; i++){ 
                if(userdata[i].id == data.userid){
                    userdata.splice(i, 1);
                }
            }
            const sentData = {
                member:userdata,
                groupid:data.groupid,
                userid:data.userid
            }
            console.log(sentData)

            const remove = await axios.put("group/removeuser/"+data.groupid,sentData)
            dispatch(setMember(userdata))
            if(data.action){
            dispatch(setRemove())
            dispatch(leaveGroup())
            }
            alert("successfully removed")

        }else{
            alert("something went wrong")
        }
        //     console.log(userdata)
        }catch{

        }
    }
}
export const confirmJoinAction = (id,groupid,firstName,applied) => {
    return async dispatch => {
      
            const getmembers = await axios.get("group/member/"+groupid)
            var memberArray = getmembers.data.member
            if(memberArray.length!=7){
            const newmember = {
                firstName: firstName,
                id: id
            }
            memberArray.push(newmember)
            const members = {
                member: memberArray,
                len: memberArray.length
            }

            const data = {
                role:"member",
                is_in:groupid,
                applied:[]
            }

            const confirm = {
                confirmed:"declined",
                userid:id,
                groupname_id:groupid
            }

            const manageconfirmdata = {
                confirmed: "accepted",
                userid: id,
                groupname_id:groupid
            }

            console.log(applied.length)
            if (applied.length>1){
                const confirms = await axios.put("group/setconfirm/", confirm)                    
                console.log(confirms.data)
                }  
            const setmembers = await axios.put('group/member/'+groupid,members)
            const res = await axios.put("user/specificuser/"+id, data)
            const manageconfirm = await axios.put("group/manageconfirm/", manageconfirmdata)
            dispatch(setIn(confirm))
            }else{
                alert('The Group is Already Full!')
            }
           
       
    }
}

// export const cancelJoinAction = (id) => {
//     return async dispatch => {
//         try {
//             const res = await axios.patch("/group/cancel-join-group", { joinId: id })
//             if (res.data.STATUS == "CANCEL_JOIN_SUCCESS") {
//                 dispatch(setCancelJoin())
//                 alert('Cancel to join group success!')
//             }
//         } catch (err) {
//             alert(err.repsonse.data.MESSAGE)
//         }
//     }
// }

// //  Group Proposal System

export const closeRecruitmentAction = (data) => {
    return async dispatch => {
        try{
            const datas = {
                id: data,
                recruitment: "closed"
            }
            // const closeRec = await axios.put('http://boomx00.pythonanywhere.com/api/group/managerecruitment/'+data, datas)
            dispatch(setRecruitment(datas.recruitment))
        }catch{

        }
    }
}
export const openRecruitmentAction = (data) => {
    return async dispatch => {
        try{
            const datas = {
                id: data,
                recruitment: "open"
            }
            const openRec = await axios.put('group/managerecruitment/'+data, datas)
            dispatch(setRecruitment(datas.recruitment))


        }catch{

        }
    }
}
export const sendGroupProposalAction = (data) => {
    return async dispatch => {
        try {
            const proposalData = {
                groupid_id: data.groupid_id,
                progress:"tbd"
            }

            
            const updateProposal = await axios.put('group/setproposal/'+data.groupid_id,{
                proposal: "sent"
            })
            const createProposal = await axios.post('group/createproposal/', proposalData)

            
            alert("You've successfully send the group proposal to the teacher.")
            dispatch(getOwnGroupAction(data.groupid_id))
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const updateGroupProposalAction = (data) => {
    return async dispatch => {
        try{
            const proposalData = {
                feedback:"",
                progress:"resent"
            }
            const updateProposal = await axios.put('group/setproposal/'+data.groupid_id,{
                proposal: "resent"
            })
            const resendProposal = await axios.put('group/resendproposal/'+data.groupid_id,proposalData)

            alert("You've successfully send the group proposal to the teacher.")
            dispatch(getOwnGroupAction(data.groupid_id))


        }catch(err){

        }
    }
}

export const getGroupProposalAction = () => {
    return async dispatch => {
        try {
            const res = await axios.get("group/getproposal/")
            if (res.data) {
                dispatch(getGroupProposals(res.data))
            }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const acceptGroupProposalAction = (data,socket) => {
    return async (dispatch, getState) => {
        try {
            const { auth } = getState();

            const datas = {
                progress: "accepted",
                feedback:data.feedback
            }
            const res = await axios.put("group/updateproposal/"+data.groupid, datas)
            // console.log(data.members)
            socket.current.emit("notification:accept-group-proposal", { sndrId: auth.user.id, recvId: data.members, type: "ACCEPT_GROUP_PROPOSAL", msg: "Group proposal accepted, please check the feedback!" })

            // if (res.data.STATUS == "APPROVAL_GROUP_PROPOSAL_SUCCESS") {
                dispatch(acceptProposal({ id: data.groupid, feedback: data.feedback }))
            //     alert(res.data.MESSAGE)
            // }
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

export const declineGroupProposalAction = (data,socket) => {
    return async (dispatch, getState) => {
        try {
            const datas = {
                progress: "declined",
                feedback:data.feedback
            }
            socket.current.emit("notification:decline-group-proposal", { sndrId: auth.user.id, recvId: members, type: "DECLINE_GROUP_PROPOSAL", msg: "Group proposal declined, please check the feedback!" })

            const res = await axios.put("group/updateproposal/"+data.groupid, datas)
                dispatch(declineProposal({ id: data.groupid, feedback: data.feedback }))
        } catch (err) {
            alert("declineGroupProposalAction error")
        }
    }
}



// //  Group Sprints System
// export const editSprintAction = (newData, sprintId) => {
//     return async dispatch => {
//         try {
//             console.log(newData)
//             const res = await axios.patch("/group/edit-sprint", { newData, sprintId })
//             if (res.data.STATUS == "SPRINT_EDIT_SUCCESS") {
//                 dispatch(editSprint(res.data.EDITED_SPRINT))
//             }
//         } catch (err) {
//             alert(err.response.data.MESSAGE)
//         }
//     }
// }

// //  Bookmark actions
export const addUserBookmarkAction = (groupId,userId) => {
    return async (dispatch,getState) => {
        try {
            let token = await AsyncStorage.getItem('token');  

            const newBookmark = [...getState().group.bookmarkedGroup, groupId]
            // groups.push(groupId)
            console.log(newBookmark)

            // console.log(groupId)
            // console.log(userId)

            const data = {
                likes: newBookmark
            }
            const setLiked = await axios.put("user/setliked/",data,{
                headers:{
                    'Authorization': 'JWT ' + token,
                }
            })
            dispatch(setBookmark(newBookmark))
        } catch (err) {
            alert(err)
        }
    }
}

export const deleteGroup = (data) =>{
    return async dispatch=>{
        try {
            // console.log(data.groupid)
            const deleteGroup = await axios.delete("group/deletegroup/"+data.groupid)

            dispatch(leaveGroup())
            dispatch(setRemove())
            dispatch(removeGroup(data.groupid))
            
        }catch{

        }
    }
}
export const deleteUserBookmarkAction = (groupId,userId) => {
    return async (dispatch,getState) => {
        try {
            var array = [...getState().group.bookmarkedGroup]
            for( var i = 0; i < array.length; i++){ 
    
                if ( array[i] === groupId) { 
            
                    array.splice(i, 1); 
                }
            
            }
            const data = {
                likes: array
            }
            let token = await AsyncStorage.getItem('token');  

            const setLiked = await axios.put("user/setliked/",data,{
                headers:{
                    'Authorization': 'JWT ' + token,
                }
            })
            dispatch(setBookmark(array))
        } catch (err) {
            alert(err)
        }
    }
}
export const getUserBookmarkAction = () => {
    return async dispatch => {
        try {
            console.log('bookmard')
            // const bookmarked = await AsyncStorage.getItem("Bookmark")
            // dispatch(setBookmark(bookmarked))
        } catch (err) {
            alert(err)
        }
    }
}