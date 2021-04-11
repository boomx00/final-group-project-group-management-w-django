import React, { useState } from 'react'
import {Image,KeyboardAvoidingView, ScrollView,StyleSheet,Text, View, TextInput, FlatList, Dimensions} from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { green100 } from 'react-native-paper/lib/typescript/styles/colors';




const Sprint1 = ({route}) => {
     const navigation = useNavigation();
     const{title} = route.params
     const [Description, setDesc] = useState()
     const [File, setFile] = useState()


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
        <Text style={styles.labell}>{title}:</Text>
        <TextInput
                    style={{
                        marginBottom:10,
                        borderRadius:12,
                        backgroundColor:'lightgrey',
                        height:200,
                        fontSize: 14}}
                    placeholder="Type Here..."
                    placeholderTextColor='grey'
                    multiline={true}
                    scrollEnabled ={true}
                    editable={true}
                    returnKeyType='next'
                    onChangeText={text => setDesc(text)}
                /> 
      <Text style={styles.labell}>Attach File:</Text>
      <Ionicons name="chatbubble-ellipses-outline"
              size={25} 
              onPress={()=>{}}>
             </Ionicons>
             </View>

             </ScrollView>

        </KeyboardAvoidingView>

        </View>
        )
    }
    const styles = StyleSheet.create({
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
            marginRight:20,
            width:'85%',
            
            },
        labell:{
            marginTop:5,
            marginBottom:5,
            fontSize:16,
            color:'black',
    
        },
        view1:{
            flex:1,
            backgroundColor: 'orange',        
        }
    })
export default Sprint1
