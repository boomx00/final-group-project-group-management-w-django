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

const  TagsList = ({name}) => {
    
        return (
                <Text></Text>

    )
}

const styles = StyleSheet.create({

})

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(TagsList)