import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import normalize from 'react-native-normalize'

//  Redux
import { connect, groupList } from 'react-redux'

import Group from './Group'

const GroupList = ({ groupList }) => {
    return (
        <View style={styles.groupList}>
            {groupList.map((group) => (
                <Group
                    style={styles.groupCard}
                    key={group.id}
                    name={group.name}
                    description={group.description} />
            ))}
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

const mapStateToProps = (state) => {
    return {
        groupList: state.group.list
    }
}

export default connect(mapStateToProps, null)(GroupList)
