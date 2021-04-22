// Stylings
import React, { useState } from 'react'
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
//import { Modal, Portal } from 'react-native-paper';
//import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

//Redux
import { connect, useDispatch } from 'react-redux'
import { acceptJoinGroupAction, declineJoinGroupAction } from '../../redux/slices/groupSlices'

const Req = ({ id, firstName, lastName, approved, studentId }) => {
    const dispatch = useDispatch()

    return (
        <View style={styles.container}>
            <View style={styles.card}>
                <View>
                    <Text style={styles.textName}>{firstName} {lastName}</Text>
                    <Text style={styles.studIdText}>{studentId}</Text>
                    <Text style={styles.textMsg}>I would like to join your group</Text>
                </View>
                {approved == null ?
                    <View>
                        <TouchableOpacity onPress={() => dispatch(acceptJoinGroupAction(id))}
                            style={styles.acceptBtn}>
                            <Text style={styles.textAccept}>Accept</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => dispatch(declineJoinGroupAction(id))}
                            style={styles.declineBtn}>
                            <Text style={styles.textDecline}>Decline</Text>
                        </TouchableOpacity>
                    </View>
                    :
                    <View style={styles.statusBox}>
                        <Text style={styles.textStatus}>{approved == true ? "Accepted" : "Declined"}</Text>
                    </View>
                }

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        borderRadius: normalize(10),
        elevation: normalize(10),
        width: normalize(350),
        height: normalize(100),
        marginTop: normalize(10),
        marginBottom: normalize(10),
        alignSelf: 'center'
    },
    card: {
        margin: normalize(10),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    textName: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(25)
    },
    studIdText: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(20)
    },
    textMsg: {
        fontFamily: 'Roboto-Light',
        fontSize: normalize(18)
    },
    acceptBtn: {
        backgroundColor: '#008BFF',
        borderRadius: normalize(10),
        elevation: normalize(10),
        margin: normalize(5)
    },
    declineBtn: {
        backgroundColor: colors.white,
        borderRadius: normalize(10),
        elevation: normalize(10),
        margin: normalize(5)
    },
    textAccept: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(15),
        padding: normalize(10),
        color: colors.white

    },
    textDecline: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(15),
        padding: normalize(10)
    },
    statusBox: {
        borderWidth: 0.5,
        borderRadius: normalize(10),
        padding: normalize(10)
    },
    textStatus: {
        fontFamily: 'Roboto-bold',
        fontSize: normalize(18),
        color: colors.textDark
    }
})

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Req)
