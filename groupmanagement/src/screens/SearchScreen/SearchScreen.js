import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView, Text } from 'react-native'
import { Searchbar } from 'react-native-paper';
import GroupList from '../../components/Group/GroupList'

import { connect } from 'react-redux'

const SearchScreen = ({ groupList }) => {
    const [filteredData, setFilteredData] = useState();

    const filterData = (filter) => {
        const filtered = groupList.filter(group => {
            return group.name.toLowerCase().includes(filter.toLowerCase())
        })
        setFilteredData(filtered)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Searchbar
                placeholder="Search by name, topics, tags or owner"
                onChangeText={(text) => filterData(text)}
            />
            <GroupList groupData={filteredData} />

        </SafeAreaView>
    )
}

const mapStateToProps = (state) => ({
    groupList: state.group.list
})

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
export default connect(mapStateToProps, null)(SearchScreen)
