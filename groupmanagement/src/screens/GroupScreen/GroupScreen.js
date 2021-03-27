import React, { useState } from 'react'
import {KeyboardAvoidingView, ScrollView,StyleSheet,SafeAreaView,Text, View,TouchableOpacity, TextInput} from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';


const GroupScreen = () => {
    const navigation = useNavigation();
    const [Description, setDesc] = useState()
    const [Tags, setTags] = useState()
    const [Role, setRole] = useState()



    return (       
         <View style={styles.view1}>
        <KeyboardAvoidingView style={{flex:1}} behavior='height'>
        <ScrollView>

            <View style ={styles.pagetitle} >
        <Text style={styles.Text}>My Group (No.18)</Text>
        <Text style={styles.Textsml}>Members:...</Text>
        </View>
        <View style = {styles.content}>
        <Text style={styles.label}>Description:</Text>
        <TextInput
                    style={{
                        borderColor:'orange',
                        height:100,
                        borderRadius: 8,
                        borderWidth: 2,
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
                        borderColor:'orange',             
                        borderRadius: 8,
                        borderWidth: 2,
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
                        borderColor:'orange',
                        borderRadius: 8,
                        borderWidth: 2,
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
            <Text style={styles.label}>Sprints:</Text>
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
             </View>

    
        </ScrollView>

</KeyboardAvoidingView>
        </View>

    )
}
const styles = StyleSheet.create({
    fab: {
        marginTop:10,
        marginRight:15,
        marginLeft:25,
        
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
        marginTop: 5,
        },
    label:{
        marginLeft:20,
        fontSize:18,
        color:'black',
    },
    view1:{
        flex:1,
        backgroundColor: 'orange',        
    }

})
export default GroupScreen