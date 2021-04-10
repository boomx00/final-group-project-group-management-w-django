import React, { useState, useCallback, useEffect } from 'react'
import {Alert ,SafeAreaView,StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { BottomNavigation } from 'react-native-paper';


const Details =({route})=>{
    const navigation = useNavigation();
    const{group,project,people,desc} = route.params

return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.textlight }}>
    <View style={styles.header}>
    <Ionicons name="arrow-back-outline"
              size={30} style={styles.arrow }
              onPress={() =>navigation.navigate('Home')}>
             </Ionicons> 
     <Text style={styles.text}>DETAILS</Text>
     </View>
     <View style={styles.item}>
    <View style={{height:'75%'}}>
     <Text style={styles.project}>{project}</Text>
     <Text style={styles.group}>{group}</Text>
     <View style={styles.group2}>
     <Ionicons name="people-outline"
              size={20} 
              style={styles.ppl}
             >
             </Ionicons>
     <Text style={styles.ppl}>: {people}/7</Text>
     </View>
     <Text style={styles.desc}>Project Description:</Text>
     <Text style={styles.desc2}>{desc}</Text>
     </View>
     <View>
     <TouchableOpacity
            style={styles.button}
            onPress={() => Alert.alert("Request Sent!")}
                >
    <Text style={styles.req}>Request to Join</Text>
    </TouchableOpacity>
    </View>

     </View>
    </SafeAreaView>

)
}


const styles = StyleSheet.create({
    req:{
        fontSize:18
    },
    button:{
        marginTop:20,
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
    header:{
        backgroundColor:'white',
        width:'100%',
        height: 50,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'center',

        
         }, 
    arrow:{
        top:5,
        left:10,
        position:'absolute',
        color:'black'
        },
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        alignSelf:'center'
  
    },
    viewmsg:{
        position: 'absolute',
        right: 15,
        top: 8,
        

    
    }
})
export default Details