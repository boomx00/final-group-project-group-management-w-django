// Stylings
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
//import { Modal, Portal } from 'react-native-paper';
//import Ionicons from 'react-native-vector-icons/Ionicons';

//Redux
import { connect } from 'react-redux'

const Msg = ({ name, mssg, time }) => {

    return (

        <View style={styles.groupCard}>
            <View style={styles.insideCard}>
            <View style={styles.content}>
                <Text style={styles.name}>
                    {name}
                </Text>
                <View style={styles.time}>
                <Text>
                    {time}
                    </Text>
                    </View>
                </View>
                <View style={styles.content}>
                <View>
                <Text style={styles.msg}>
                    {mssg}
                </Text>
                </View>
                </View>
            </View>
            </View>

    )
}

const styles = StyleSheet.create({
    groupCard: {
        margin: normalize(5),
        elevation: normalize(10),
        height: normalize(80),
        borderRadius: 10,
        backgroundColor: colors.white
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
    }
})

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Msg)
