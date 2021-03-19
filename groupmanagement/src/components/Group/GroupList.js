import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import normalize from 'react-native-normalize'

import Group from './Group'

const GroupList = ({ groupData }) => {
    return (
        <View style={styles.groupList}>
            {groupData != null ? groupData.map((group) => (
                <Group
                    style={styles.groupCard}
                    key={group.id}
                    name={group.name}
                    description={group.description} />
            )) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    groupList: {
        flex: 1,
    },
    groupCard: {

    }
})

export default GroupList
