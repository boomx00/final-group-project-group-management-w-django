import React, { useState } from 'react'
import {KeyboardAvoidingView, ScrollView,StyleSheet,SafeAreaView,Text, View,TouchableOpacity, TextInput} from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Title } from 'react-native-paper';


const Group = () => {
    const navigation = useNavigation();
    return (       
         <View style={styles.view1}>
            <View style={styles.header}>
            <Text style={styles.text}>MY GROUP</Text>
        </View>
        <View style={styles.items}>
        <Ionicons name="people-outline"
              size={70} 
             >
             </Ionicons>
             <Text style={styles.title}>YOU ARE NOT </Text>
             <Text style={styles.title}>REGISTERED IN </Text>
             <Text style={styles.title}>ANY GROUP</Text>
             <TouchableOpacity
                    style={styles.button1}
                    onPress={() => navigation.navigate("Home")}
            >
                    <Text>FIND A GROUP</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate("Home")}
            >
                    <Text>CREATE A GROUP</Text>
                </TouchableOpacity>

             </View>
        </View>

  
    )
}
const styles = StyleSheet.create({
    button1:{
        marginTop:40,
        width:292,
        height:50,
        backgroundColor: 'orange',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },

    button:{
        marginTop:20,
        width:292,
        height:50,
        backgroundColor: 'orange',
        borderRadius:10,
        justifyContent:'center',
        alignItems:'center'
    },

    items:{
        justifyContent:'center',
        alignItems:'center',
        marginTop:70
        
    },
    title:{
        fontSize:20
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
    view1:{
        flex:1,
    }

})
export default Group