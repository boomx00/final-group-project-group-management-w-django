import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as RootNavigation from '../../middleware/RootNavigation'
import { setBookmark,getOwnGroupAction } from './groupSlices'
import { Alert } from 'react-native';

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: {},
        isLogged: false
    },
    reducers: {
        getUser: (state, action) => {
            state.user = {
                id: action.payload.id,
                email: action.payload.email,
                studentId: action.payload.username,
                firstName: action.payload.first_name,
                lastName: "",
                phoneNumber: "not defined",
                biograph: action.payload.bio,
                major: action.payload.major,
                applied: action.payload.applied,
                isTeacher: action.payload.isTeacher,
                groupId: action.payload.is_in,
                role: action.payload.role
            },
                state.isLogged = true
        },
        setOwner:(state,action)=>{
            state.user.groupId = action.payload,
            state.user.role = "gm"
        },
        editProfile: (state, action) => {
            state.user.major = action.payload.major
            state.user.biograph = action.payload.bio
        },

        onLogout: (state, action) => {
            state.user = {}
            state.isLogged = false
        },
        editUserAction:(state,action)=>{
            state.user.biograph= action.payload.bio
            state.user.major = action.payload.major
        },
        setIn: (state,action)=>{
            
            state.user.groupId = action.payload.groupname_id
            state.user.role = "member"
            state.user.applied = []
            console.log(state.user)
        },
        setRemove: (state,action)=>{
            // state.user = { ...state.user, groupId: null }
            state.user.groupId=""
            state.user.role=""

        },
        setApplied:(state,action)=>{
            // console.log(action.payload)
            state.user.applied = action.payload
            // console.log(state.user.applied)
        }
    }
})

export const { getUser, editProfile, onLogout,setOwner,setIn, editUserAction, setRemove,setApplied } = authSlice.actions

export default authSlice.reducer

export const checkToken=()=>{
    return async dispatch=>{
        let msg = "";
        let refmsg="";
        let token = await AsyncStorage.getItem('token');  
        let refresh = await AsyncStorage.getItem('refresh');  
        
    console.log(token)
    console.log(refresh)
        const user = await axios.get("user/checktoken",{
            headers:{
                'Authorization': 'JWT ' + token,
            }
        }).then((response) => {
            msg="valid"
            }, (error) => {
              if(error.response.status=="401"){
                  msg="token expired"
              }
          }); 
          console.log(msg)
        if(msg=="token expired"){
            const data = {
                
                "refresh": refresh
            
        }
        const ref= await axios.post("token/refresh/",data).then((response)=>{
            refmsg=response.status
            AsyncStorage.setItem("token", response.data.access)
            AsyncStorage.setItem("refresh", response.data.refresh)
            
        },(error)=>{
            refmsg=error.response.data.code
        })
        console.log(refmsg)
        if(refmsg==200){
            // console.log(refresh)

            console.log('popo')
            dispatch(getUserAction())
        }else{
            alert("You have been logged out, please login again")
        }
        }else{
            dispatch(getUserAction())

        }
    }
}


export const userRegisterAction = (studentID,email,password,navigation) => {
    return async dispatch => {
        let data = {} ;
        let msg = "";
        let errors ="";
        let duplicate = "";
        if(studentID!="teacher"){
             data = {
                email: email,
                username: studentID,
                password: password,
                first_name: email,
                isTeacher:false
            }
        }else{
            data = {
                email: email,
                username: studentID,
                password: password,
                first_name: email,
                isTeacher:true
            }
        }
            const res = await axios.post("user/create/",data).then((response) => {
                console.log(response)
              }, (error) => {
                  if(error.response.status==500){
                      alert("Account already exist")
                      msg = "duplicate"
                  }else{
                  errors = error.response.data
                  for (const error in errors) {
                    msg += `${error}: ${errors[error]} \n`
                  }
              alert(msg)

                  }
              });
              if(msg==""){
                  alert("Account has been Made")
            navigation.navigate("Login")
              }
            //   errors.forEach((error)=>{console.log('aa')})

            // for (var i = 4; i < 58; i++) {
            //     const data = {
            //         email: i+"@gmail.com",
            //         username: i,
            //         password: "admin123",
            //         first_name: i
            //     }

       
        

    }
}

// get user details
export const getUserAction = () => {
    return async dispatch => {
        try {
            let token = await AsyncStorage.getItem('token');  
            if(token){
            const user = await axios.get("user/getuser/",{
                headers:{
                    'Authorization': 'JWT ' + token,
                }
            })

            if (user.status == 200) {
                console.log(user.data)
                dispatch(getUser(user.data))
                dispatch(setBookmark(user.data.likes))
                if(user.data.is_in){
                dispatch(getOwnGroupAction(user.data.is_in))
                }else{
                dispatch(getOwnGroupAction(null))
                }
            }
        }
        } catch (err) {
            alert(err)
        }
    }
}

// login
export const loginAction = (userName, passWord) => {
    return async dispatch => {
        try {
            const res = await axios.post("token/", {
                username: userName,
                password: passWord
            })
            // console.log(res.data.refresh)
            if (res.data.access != null) {
                await AsyncStorage.setItem("token", res.data.access)
                await AsyncStorage.setItem("refresh", res.data.refresh)
 
                dispatch(getUserAction())
            }
        } catch (err) {
            alert("Incorrect Username/Password")
        }

    }
}

// edit profile
export const editProfileAction = (data) => {
    return async dispatch => {
        try {
            let token = await AsyncStorage.getItem('token');  
            const updateProfile = await axios.put("user/edituser/", data,{
                headers:{
                    'Authorization': 'JWT ' + token,
                }
            })
            dispatch(editProfile(data))
            alert('Successfully edit profile data!')
           
        } catch (err) {
            alert(err.response.data.MESSAGE)
        }
    }
}

// Change password
export const changePasswordAction = (editedData, navigation) => {
    return async dispatch => {
        try {
            let token = await AsyncStorage.getItem('token');  

            const data = {
                
                    old_password: editedData.oldPassword,
                    password: editedData.password,
                    password2: editedData.password
                

            }
            // console.log(data)
            const changePassword = await axios.put("user/changepassword/"+editedData.userId,data,{
                headers:{
                    'Authorization': 'JWT ' + token,
                }
            })
            console.log(changePassword.status)
            // const res = await axios.patch("/auth/change-password", editedData)
            if (changePassword.status==200) {
                alert('Change password successfully!')
                navigation.navigate("Profile")
            }
            //     alert('Your Password Is Too Simple')
            // }
        } catch (err) {
            console.log(err.response.data)
            if(err.response.data){
            if(err.response.data.old_password && err.response.data.password){
                alert("Password Incorrect")
            }else
            if(err.response.data.old_password){
                alert("Password Incorrect")
            }else 
            if(err.response.data.password){
                alert("Password Too Simple")
            }
        }
          
            
        }
    }
}

// Logout
export const logoutAction = (navigate) => {
    return async dispatch => {
        try {
            let token = await AsyncStorage.getItem('token');  
            let refresh = await AsyncStorage.getItem('refresh');  
            let msg = "";
            const data={
                "refresh_token":refresh
            }
            const logout = await axios.post("user/logout/blacklist/",data).then((response)=>{
                msg=response.status
        },(error)=>{
                console.log(error)
            })
            console.log(msg)
            if(msg=="205"){  
                 await AsyncStorage.removeItem("token")
                await AsyncStorage.removeItem("refresh")
    
                dispatch(onLogout())
                dispatch({
                    type: "RESET_APP"
                })
                navigate.navigate("Login")
    
            }
         
        } catch (err) {
            alert(err)
        }
    }
}

export const randomizeUser = () =>{
    return async dispatch=>{
        try{
            let stat = ""
            console.log('aa')
            const updateProfile = await axios.get("user/randomize/").then((response)=>{
                stat = response.status
            },(error)=>{
                console.log(error)

            })
            if(stat=="200"){
                alert("Groupless students have been randomly allocated!")
            }
        }catch{

        }
    }
}