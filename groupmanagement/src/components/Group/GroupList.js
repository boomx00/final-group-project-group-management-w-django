import React from 'react'
import { StyleSheet, View, Text, FlatList } from 'react-native'
import normalize from 'react-native-normalize'

import Group from './Group'

const renderItem = ({ item }) => {
    return <Group
        key={item.id}
        style={styles.groupCard}
        key={item.id}
        topic={item.topic}
        name={item.name}
        description={item.description}
        memberNumber={item.membersID.length}
        likesID={item.likesID}
    />
}

const GroupList = ({ groupData }) => {
    return (
        <FlatList data={groupData} keyExtractor={item => item.id} renderItem={renderItem} />
    )
}

const styles = StyleSheet.create({
    groupList: {

    },
})

export default GroupList
