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
                    topic={group.topic}
                    name={group.name}
                    description={group.description}
                    memberNumber={group.membersID.length}
                    likesID={group.likesID}
                />
            )) : null}
        </View>
    )
}

const styles = StyleSheet.create({
    groupList: {

    },
})

export default GroupList
