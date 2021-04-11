import React, { useState } from 'react'
import {Alert,StyleSheet,SafeAreaView,Text, View,TouchableOpacity, TextInput,KeyboardAvoidingView,ScrollView} from 'react-native'
import colors from '../../../assets/colors/colors'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// ini diganti fab
const AddScreen = () => {
    const navigation = useNavigation();

    const [Req, setReq] = useState()
    const [Description, setDesc] = useState()

    return (
        <View style={styles.view1}>

            <View style={styles.header}>
            <Text style={styles.text2}>NEW POST</Text>
             <Ionicons name="arrow-back-outline"
              size={30} style={styles.arrow }
              onPress={() =>navigation.navigate('Main','Home')}>
             </Ionicons> 
            </View>  
        
            <View style={styles.item}>
    <View style={{height:'85%', margin:20}}>
    <KeyboardAvoidingView style={{flex:1}} behavior='height'>
        <ScrollView>
        <Text style={styles.label1}>Project Title</Text>
        <Text style={styles.label2}>Group Name</Text>

    <Text style={styles.label}>Project Description:</Text>
    <TextInput
            style={styles.type}
                    placeholder="Type Prjoct Description..."
                    placeholderTextColor='grey'
                    backgroundColor='lightgrey'
                    onChangeText={text => setProject(text)}
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='next'
                    onChangeText={text => setDesc(text)}
                />
    <Text style={styles.label}>Requirements for candidates:</Text>
    <TextInput
            style={styles.type}
                    placeholder="List Requirement Here..."
                    placeholderTextColor='grey'
                    backgroundColor='lightgrey'
                    onChangeText={text => setProject(text)}
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='done'
                    onChangeText={text => setReq(text)}
                />
        </ScrollView>
    </KeyboardAvoidingView>
     <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("New Post Uploaded!")}
                >
    <Text style={styles.req}>Upload</Text>
    </TouchableOpacity>

    </View>

    </View>
    </View>

        
    )
}
const styles = StyleSheet.create({
    type:{
        borderBottomWidth:1
    },
    req:{
        fontSize:18
    },
    button:{
        width:292,
        height:50,
        backgroundColor: 'orange',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center',
        alignSelf:'center',
        top:40
    },
    desc:{
        marginLeft:20,
        marginRight:20,
        marginTop:20,
        fontSize:18,
        color:'black',
        fontWeight:'bold',
    
    },
    desc2:{
        marginLeft:20,
        marginRight:20,
        marginTop:5,
        fontSize:16,
        color:'black',
    
    },
    group:{
        marginLeft:5,
        marginRight:5,
        marginTop:1,
        fontSize:16,
        color:'grey',
        alignSelf:'center',
        textAlign:'center'
    },
    ppl:{
        marginLeft:3,
        marginTop:1,
        marginBottom:5,
        fontSize:16,
        color:'grey',
        alignSelf:'center',
        textAlign:'center'
    },
    group2:{
        marginTop:1,
        fontSize:16,
        color:'grey',
        alignSelf:'center',
        justifyContent:'center',     
        width:'90%',
        borderBottomWidth:1,
        flexDirection:1,
        flexDirection:'row'
    },
    project:{
        borderRadius:10,
        marginLeft:10,
        marginRight:10,
        marginTop:10,
        marginBottom:2,
        fontWeight:'bold',
        fontSize:24,
        color:'black',
        alignSelf:'center',
        textAlign:'center'
        
    },
    item:{
        alignSelf:'center',
        width:'90%',
        height:'85%',
        marginTop:15,
        backgroundColor:'lightgrey',
        borderRadius:10,
        borderWidth:1
        
    },
    arrow:{
        top:10,
        left:10,
        position:'absolute',
        color:'black'
        },
    header:{
        backgroundColor:'white',
        width:'100%',
        height: 50,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'center',

        
         }, 
    text2:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        alignSelf:'center'
  
    },
    msg:{
        color:'black',
        marginTop:5
        

    },
    plne:{
        position: 'absolute',
        right: 15,
        top: 13,
        

    },
    Text: {
        fontSize: 20,
        color:'orange',
        borderRadius:8,
        backgroundColor:'white',
        textAlign:'center',
        padding: 5,
        marginTop:25,
        marginLeft: 18,
        width: '90%',

    },
    content:{
        marginTop: 15,
        padding: 10,
        alignItems:'center'
    },
    label:{
        fontSize:16,
        color:'black',
        fontWeight:'bold'
    },
    label1:{
        fontSize:16,
        color:'black',
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:3,
    },
    label2:{
        fontSize:14,
        color:'grey',
        fontWeight:'bold',
        textAlign:'center',
        marginBottom:20,
    },
    view1:{
        flex :1,
    }, 
      loginButton: {
        alignItems: 'center',
        padding: 10,
        width: 200,
        margin: 15,
        borderRadius: 5,
        backgroundColor: colors.lightYellow
    },
    loginButtonBlocked: {
        alignItems: 'center',
        padding: 10,
        width: 200,
        margin: 15,
        borderRadius: 5,
        backgroundColor: colors.textLight
    },
    textinput: {
        borderRadius: 5,
        borderWidth: 1,
        width: 300,
        margin: 5,
        fontFamily: "Roboto-Regular",
        fontSize: 20
    },

})
export default AddScreen