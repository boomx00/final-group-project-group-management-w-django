// Stylings
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
//import { Modal, Portal } from 'react-native-paper';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

//Redux
import { connect } from 'react-redux'

const Req = ({key, name}) => {
    const navigation = useNavigation();

    return (
        <View style={styles.groupCard}>
            <View style={styles.insideCard}>
            <View style={styles.content}>
                <Text style={styles.name}>
                    {name}{key}
                </Text>
                <View style={styles.boxx}>
        <TouchableOpacity onPress ={()=>{}}>
                    <View style={styles.box}>
                    <Text style={styles.txt}>Accept</Text>
                    </View>
        </TouchableOpacity>
        <TouchableOpacity onPress ={()=>{}}>
                    <View style={styles.box2}>
                    <Text style={styles.txt}>Decline</Text>
                    </View>
        </TouchableOpacity>
                </View>
                </View>
            </View>
            </View>



    )
}

const styles = StyleSheet.create({
    boxx:{
    },
    box:{
        width:70,
        height:20,
        marginBottom:10,
        borderRadius:12,
        backgroundColor:'green',
        justifyContent:'center',
        alignItems:'center'
    },
    box2:{
        width:70,
        height:20,
        marginBottom:10,
        borderRadius:12,
        backgroundColor:'grey',
        justifyContent:'center',
        alignItems:'center'
    },
    groupCard: {
        margin: normalize(8),
        width:'90%',
        elevation: normalize(10),
        height: normalize(80),
        borderRadius: 10,
        backgroundColor: 'white',
        alignSelf:'center'
    },
    insideCard: {
        margin: normalize(15)
    },
    name: {
        fontFamily: 'Roboto-Bold',
        color: 'black',
        fontSize: normalize(20),
        margin: normalize(5)
    },
    msg: {
        fontFamily: 'Roboto-Regular',
        color: 'black',
        marginLeft:5,
        fontSize: normalize(16),
    },
    content: {
        flexDirection:'row',
        justifyContent:'space-between',
        marginBottom:5

    },
    time:{
        fontSize:12,
        color:'#666'
    },
    txt:{
        fontSize:12,
        color:'white'
    },
})

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Req)
