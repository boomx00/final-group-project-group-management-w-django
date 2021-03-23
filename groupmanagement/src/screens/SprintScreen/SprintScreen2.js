import React, { useState } from 'react'
import {Alert,StyleSheet,SafeAreaView,Text, View,TouchableOpacity, TextInput} from 'react-native'
//  Redux
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import colors from '../../../assets/colors/colors';

const Sprint2 = () => {
     const navigation = useNavigation();

        const [Summary, setSum] = useState()
        const [Development, setDev] = useState()
    
        return (
            <SafeAreaView style={styles.view1}>
                <View style={styles.back}>
             <Ionicons name="arrow-back-outline"
              size={30} style={styles.arrow }
              onPress={() =>navigation.navigate('Profile')}>
             </Ionicons>
             
            <Text style={styles.Text}>Sprint 2</Text>
            </View>
            <View style = {styles.content}>
            <Text style={styles.label}>Summary:</Text>
            <TextInput
                        style={{height:100,
                            borderRadius: 8,
                            width: 300,
                            margin: 5,
                            fontFamily: "Roboto-Regular",
                            fontSize: 15}}
                        placeholder="Summary"
                        placeholderTextColor='grey'
                        backgroundColor='white'
                        multiline={true}
                        scrollEnabled ={true}
                        editable={true}
                        returnKeyType='next'
                        onChangeText={text => setSum(text)}
                    />       
            <Text style={styles.label}>Description:</Text>
            <TextInput
                        style={{height:100,
                            borderRadius: 8,
                            width: 300,
                            margin: 5,
                            fontFamily: "Roboto-Regular",
                            fontSize: 15}}
                        placeholder="Description..."
                        placeholderTextColor='grey'
                        backgroundColor='white'
                        multiline={true}
                        scrollEnabled ={true}
                        editable={true}
                        returnKeyType='next'
                        onChangeText={text => setDev(text)}
                    />     
                    <TouchableOpacity
                        style={Summary && Development!= null ? styles.loginButton : styles.loginButtonBlocked}
                        onPress={() => Alert.alert("Sprint Submitted")}
                        disabled={Summary && Development!= null ?  false : true}
                    >
                        <Text>Submit</Text>
                    </TouchableOpacity>
                     </View>  
            </SafeAreaView>
        )
    }
    const styles = StyleSheet.create({
        arrow:{
            alignSelf:'center',
            marginLeft: 15,
            color:'black',
        },
          back:{
            borderTopWidth:3,
            borderTopColor:'white',
            borderBottomWidth:3,
            borderBottomColor:'white',
            marginTop: 20,
            flexDirection:'row',
          },
        
        Text: {
            marginLeft:90,
            justifyContent:'center',
            alignItems:'center',
            fontSize: 30,
            fontWeight:'bold',
            color:'black',
            padding: 5,
    
        },
        content:{
            marginTop: 15,
            padding: 10,
            alignItems:'center'
        },
        label:{
            marginLeft:20,
            fontSize:18,
            color:'black',
        },
        view1:{
            backgroundColor: 'orange',
            flex :1,
        },   
        loginButton: {
            alignItems: 'center',
            padding: 10,
            width: 200,
            marginTop: 5,
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
        Button: {
            alignItems: 'center',
            padding: 10,
            width: 200,
            margin: 15,
            borderRadius: 5,
            backgroundColor: colors.lightYellow
        },
    })
export default Sprint2
