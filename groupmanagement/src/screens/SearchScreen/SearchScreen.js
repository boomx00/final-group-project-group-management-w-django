import React, { useState, useEffect } from 'react'
import { StyleSheet, SafeAreaView,View, Text } from 'react-native'
import { Searchbar } from 'react-native-paper';
import GroupList from '../../components/Group/GroupList'

import { connect } from 'react-redux'

const SearchScreen = ({ groupList }) => {
    const [filteredData, setFilteredData] = useState();

    const filterData = (filter) => {
        const filtered = groupList.filter(group => {
            return group.name.toLowerCase().includes(filter.toLowerCase()) || group.topic.toLowerCase().includes(filter.toLowerCase())
        })
        setFilteredData(filtered)
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
            <Text style={styles.text}>SEARCH</Text>
             </View>
            <Searchbar
                placeholder="Search by name, topics or tags"
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
    },
    header:{
        backgroundColor:'white',
        width:'100%',
        height: 50,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'center',
        marginBottom:10

        
         }, 
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        alignSelf:'center'
  
    },
})
export default connect(mapStateToProps, null)(SearchScreen)
