import React from 'react'
import  { StyleSheet,FlatList, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import { useNavigation } from '@react-navigation/native';

import Msg from './Msg'

const renderItems = ({ item }) => {

    return <Msg
    key={item.idm}
    name={item.name}
    mssg={item.mssg}
    time={item.time}
    />
}
//passing
const MsgList = ({ mssg }) => {
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={{width:'100%'}}
        onPress={() => navigation.navigate('Chat', {name:renderItems.name})}>       
        <FlatList data={mssg} 
        keyExtractor={item => item.idm} 
        renderItem={renderItems}
        />
        </TouchableOpacity>

    )
}

const styles = StyleSheet.create({
    MsgList: {

    },
})

export default MsgList
