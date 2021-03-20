import React, { useState } from 'react'
import {KeyboardAvoidingView, ScrollView,StyleSheet,SafeAreaView,Text, View,TouchableOpacity, TextInput} from 'react-native'
import colors from '../../../assets/colors/colors'

// ini diganti fab
const GroupScreen = () => {
    const [Description, setDesc] = useState()
    const [Tags, setTags] = useState()
    const [Role, setRole] = useState()



    return (       
         <View style={styles.view1}>
        <KeyboardAvoidingView style={{flex:1}} behavior='height'>
        <ScrollView>

            <View style ={styles.pagetitle} >
        <Text style={styles.Text}>My Group</Text>
        </View>
        <View style = {styles.content}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
                    style={{height:100,
                        borderRadius: 8,
                        borderWidth: 1,
                        alignSelf:'center',
                        width: "90%",
                        marginBottom:15,
                        marginTop: 5,
                        fontFamily: "Roboto-Regular",
                        fontSize: 15}}
                    placeholder="Description"
                    placeholderTextColor='grey'
                    backgroundColor='white'
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='next'
                    onChangeText={text => setDesc(text)}
                />    
             <Text style={styles.label}>Tags:</Text>
   
                <TextInput
                    style={{
                        borderRadius: 8,
                        borderWidth: 1,
                        alignSelf:'center',
                        width: "90%",
                        marginTop: 5,
                        marginBottom:15,
                        fontFamily: "Roboto-Regular",
                        fontSize: 15}}
                    placeholder="Tags"
                    placeholderTextColor='grey'
                    backgroundColor='white'
                    editable={true}
                    returnKeyType='next'
                    onChangeText={text => setTags(text)}
                /> 

                <Text style={styles.label}>Role:</Text>                        
                <TextInput
                    style={{height:100,
                        borderRadius: 8,
                        borderWidth: 1,
                        width: "90%",
                        alignSelf:'center',
                        marginBottom:15,
                        marginTop: 5,
                        fontFamily: "Roboto-Regular",
                        fontSize: 15}}
                    placeholder="Role"
                    placeholderTextColor='grey'
                    backgroundColor='white'
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='next'
                    onChangeText={text => setRole(text)}
                /> 
         
             </View>
    
        </ScrollView>

</KeyboardAvoidingView>
        </View>

    )
}
const styles = StyleSheet.create({
    pagetitle:{
        marginTop:15,
        backgroundColor:"white",
        alignSelf:'center',
        borderColor:'black',
        borderWidth:3,
        width:'95%',
        height: 100,
        borderRadius:8,

    },
    Text: {
        fontSize: 20,
        color:'black',
        borderRadius:8,
        backgroundColor:'white',
        padding: 5,
        width: '85%',

    },
    content:{
        marginTop: 10,
        padding: 10,
        },
    label:{
        marginLeft:20,
        fontSize:18,
       color:'white',
       fontWeight:'bold'
    },
    view1:{
        flex:1,
        backgroundColor: 'orange',        
    }

})
export default GroupScreen