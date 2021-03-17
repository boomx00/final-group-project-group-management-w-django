import React from 'react'
import { SafeAreaView, Text } from 'react-native'

//  Redux
import { connect } from 'react-redux'

import GroupList from '../../components/Group/GroupList'

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <GroupList />
        </SafeAreaView>
    )
}

export default HomeScreen
