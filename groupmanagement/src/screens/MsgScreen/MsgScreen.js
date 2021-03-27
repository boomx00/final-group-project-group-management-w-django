import React, { useState } from 'react'
import {Alert,StyleSheet,SafeAreaView,Text, View,TouchableOpacity, TextInput} from 'react-native'
//import colors from '../../../assets/colors/colors'
import MsgList from '../../components/Message/Msglist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'

const MsgScreen = ({msgList}) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView>
        <View style={styles.header}>
        <Text style={styles.text}>Message</Text>
        <View style={styles.backk}>
        <Ionicons name="arrow-back-outline"
              size={25} style={styles.back }
              onPress={() =>navigation.navigate('Profile')}>
             </Ionicons>
        </View>
        </View>
        
        <MsgList mssg={msgList} style={{ zIndex: -1 }} />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    header:{
        backgroundColor:'orange',
        borderBottomWidth:1,
        borderBottomColor:'black',
        width:'100%',
        height: 40,
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
    back:{
        color:'white'
        

    },
    backk:{
        position: 'absolute',
        left: 15,
        top: 8,
    }
})
const mapStateToProps = (state) => ({
    msgList: state.msg.list
})
export default connect(mapStateToProps, null)(MsgScreen)