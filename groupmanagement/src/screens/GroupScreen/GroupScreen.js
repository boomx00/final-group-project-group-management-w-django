import React, { useState } from 'react'
import {Alert,TouchableOpacity,KeyboardAvoidingView, ScrollView,StyleSheet,Text, View, TextInput} from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { green100, yellow100 } from 'react-native-paper/lib/typescript/styles/colors';
import normalize from 'react-native-normalize';
// Approved or not blm dibenerin

const yes = () =>{
    <View style={styles.n}>
    <Text style={styles.aprval}> NOT APPROVED</Text>
    </View>
}
const no = () =>{
    <View style={styles.n}>
    <Text style={styles.aprval}>APPROVED</Text>
    </View>
}
// up
const GroupScreen = () => {
    const navigation = useNavigation();
    const [Description, setDesc] = useState()
    const [Dev, setDev] = useState()
    const [Git, setGit] = useState()
    const [Role, setRole] = useState()
    const [Ingroup, setIngroup] = useState()



    return (       
        <View style={{ flex: 1, backgroundColor: colors.textlight }}>
        <KeyboardAvoidingView style={{flex:1}} behavior='height'>
        <ScrollView>
            <View style={styles.header}>
            <Ionicons name="arrow-back-outline"
              size={30} style={styles.arrow }
              onPress={() =>navigation.navigate('Main','Group')}>
             </Ionicons> 
            <Text style={styles.text}>MY GROUP</Text>
            </View>
        <View style={styles.top}>
        <Ionicons name="people-outline"
              size={50} 
             >
             </Ionicons>
             <View style={styles.topin}>
                 <Text style={styles.project}>PROJECT NAME</Text>
                 <Text style={styles.group}>GROUP NAME</Text>
                 <Text style={styles.group}>MEMBERS/7</Text>
                 </View>
     <View style={styles.n}>
    <Text style={styles.aprval}> NOT APPROVED</Text>
    </View>

            </View>
        <View style = {styles.content}>
        <Text style={styles.labell}>Project Description:</Text>
        <TextInput
                    style={{
                        marginBottom:5,
                        borderBottomWidth:1,
                        borderBottomColor:'black',
                        fontSize: 14}}
                    placeholder="Type Here..."
                    placeholderTextColor='grey'
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='next'
                    onChangeText={text => setDesc(text)}
                /> 

        <Text style={{marginTop:5, color:'black'}}>Roles:</Text>
   
        <TextInput
                    style={{
                        marginBottom:5,
                        borderBottomWidth:1,
                        borderBottomColor:'black',
                        fontSize: 14}}
                    placeholder="Type Here..."
                    placeholderTextColor='grey'
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='next'
                    onChangeText={text => setRole(text)}
                />    
                            <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('Aprv')}>
             </Ionicons>

        <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Request sent!")}
                >
            <Text style={styles.txt}>Request for Approval</Text>
         </TouchableOpacity>
             </View>

             </ScrollView>

        </KeyboardAvoidingView>

        </View>

    )
}
//kalo approved  ini br ada

/* 
                <Text style={styles.labell}>Azure DevOps Link:</Text>
        <TextInput
                    style={{
                        marginBottom:5,
                        borderBottomWidth:1,
                        borderBottomColor:'black',
                        fontSize: 14}}
                    placeholder="Type Here..."
                    placeholderTextColor='grey'
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='done'
                    onChangeText={text => setDev(text)}
                /> 
        <Text style={styles.labell}>GitHub Link:</Text>
        <TextInput
                    style={{
                        marginBottom:5,
                        borderBottomWidth:1,
                        borderBottomColor:'black',
                        fontSize: 14}}
                    placeholder="Type Here..."
                    placeholderTextColor='grey'
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='done'
                    onChangeText={text => setGit(text)}
                />       
                
*/
/*
 <Text style={styles.labell}>Sprints:</Text>
            <View style={styles.sprints}>
            <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 1"
              })}>
             </Ionicons>
             <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 2"
              })}>
             </Ionicons>
             <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 3"
              })}>
             </Ionicons>
             <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 4"
              })}>
             </Ionicons>
             <Ionicons name="folder"
              size={30} style={styles.fab }
              color='black'
              onPress={() =>navigation.navigate('sprint1',{
                  title :"sprint 5"
              })}>
                               </Ionicons>

                 </View>

*/ 

const styles = StyleSheet.create({
    txt:{
        fontSize:14,
        fontWeight:'bold',
        color: 'white'
    },
    button:{
        marginTop:10,
        alignItems: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        width: normalize(300),
        height: normalize(40),
        margin: normalize(10),
        borderRadius: normalize(10),
        backgroundColor: '#0000CC',
    },
    aprval:{
        fontSize:8,
        textAlign:'center',
        color:'white'
    },
    y:{
        width:60,
        height:20,
        backgroundColor:'green',
        borderRadius:12,
        marginLeft:20,
        marginTop:5,
        justifyContent:'center'

    },
    n:{
        width:60,
        height:20,
        backgroundColor:'grey',
        borderRadius:12,
        marginLeft:20,
        marginTop:5,
        justifyContent:'center'

    },
    project:{
        width:150,
        fontWeight:'bold',
        fontSize:18
    },
    group:{
        fontSize:12,
        color:'grey'

    },
    topin:{
        marginLeft:30
    },
    top:{
        flexDirection:'row',
        margin:20
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
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        alignSelf:'center'
    },
    fab: {
        marginTop:5,
        marginRight:17,
        marginLeft:17,
        
    },
    sprints:{
        flexDirection:'row',
        
    },
    pagetitle:{
        marginTop:20,
        marginBottom:10,
        backgroundColor:"white",
        textAlign:'center',
        alignSelf:'center',
        borderBottomColor:'orange',
        borderBottomWidth:3,
        width:'90%',
        height: 80,
        borderRadius:8,

    },
    Text: {
        marginTop: 5,
        fontSize: 20,
        textAlign:'center',
        color:'black',

    },
    Textsml: {
        marginTop:1,
        fontSize: 16,
        textAlign:'center',
        color:'grey',

    },
    content:{
        marginLeft:20,
        marginRight:20
        },
    labell:{
        marginTop:5,
        fontSize:13,
        color:'black',

    },
    view1:{
        flex:1,
        backgroundColor: 'orange',        
    }

})
export default GroupScreen