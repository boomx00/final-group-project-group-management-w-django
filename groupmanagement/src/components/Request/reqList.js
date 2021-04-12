import React from 'react'
import  { StyleSheet,FlatList, TouchableOpacity } from 'react-native'
import {connect} from 'react-redux'

import Req from './req'

const renderItemR = ({ item }) => {

    return <Req
    key={item.id}
    name={item.name}
    />
}
//passing
const reqList = ({ joinList }) => {

    return (
     
        <FlatList data={joinList} 
        keyExtractor={item => item.id} 
        renderItem={renderItemR}
        />
    )
}
 

const styles = StyleSheet.create({
    reqList: {

    },
})
const mapStateToProps = (state) => ({
   joinList:state.group.ownGroup.joinReq
})

export default connect(mapStateToProps, null)(reqList)


