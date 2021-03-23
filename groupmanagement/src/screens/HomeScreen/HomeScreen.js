import React from 'react'
import { SafeAreaView, StyleSheet, Text } from 'react-native'
import { FAB } from 'react-native-paper';
//  Redux
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import GroupList from '../../components/Group/GroupList'
import colors from '../../../assets/colors/colors';

import Draggable from 'react-native-draggable';
import normalize from 'react-native-normalize'

const HomeScreen = ({ groupList }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.textlight }}>
            <Draggable x={normalize(320)} y={normalize(600)} z={10} style={{}}>
                <FAB
                    icon="plus"
                    onPress={() => navigation.navigate("Add")}
                /></Draggable>
            <GroupList groupData={groupList} style={{ zIndex: -1 }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
})
const mapStateToProps = (state) => ({
    groupList: state.group.list
})

export default connect(mapStateToProps, null)(HomeScreen)
