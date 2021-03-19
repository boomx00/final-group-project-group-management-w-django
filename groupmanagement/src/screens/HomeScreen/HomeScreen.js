import React from 'react'
import { SafeAreaView, Text } from 'react-native'

//  Redux
import { connect } from 'react-redux'

import GroupList from '../../components/Group/GroupList'

const HomeScreen = ({ groupList }) => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GroupList groupData={groupList} />
        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    groupList: state.group.list
})

export default connect(mapStateToProps, null)(HomeScreen)
