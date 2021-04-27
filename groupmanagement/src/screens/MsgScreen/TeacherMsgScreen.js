import React, { useState, useEffect, useCallback } from 'react'

//  Styling
import { View, Text, ScrollView, RefreshControl, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'

//  Components
import ProposalList from '../../components/TeacherGroupProposal/ProposalList'

//  Redux
import { connect, useDispatch } from 'react-redux'
import { getGroupProposalAction } from '../../redux/slices/groupSlices'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const TeacherMsgScreen = ({ proposalList }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getGroupProposalAction())
    }, [])

    // Refresh Control
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getGroupProposalAction())
        wait(500).then(() => setRefreshing(false));
    }, []);
    return (
        <ScrollView
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
        >
            <View style={styles.header}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: normalize(20)
                }}>GROUP PROPOSALS</Text>
            </View>
            <ProposalList groupProposalList={proposalList} />
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containter: {
        flex: 1
    },
    header: {
        backgroundColor: colors.white,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => ({
    proposalList: state.group.groupProposalList
})

export default connect(mapStateToProps, null)(TeacherMsgScreen)
