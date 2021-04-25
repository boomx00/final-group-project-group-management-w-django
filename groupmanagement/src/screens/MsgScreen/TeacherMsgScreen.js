import React, { useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'

import ProposalList from '../../components/TeacherGroupProposal/ProposalList'

//  Redux
import { connect, useDispatch } from 'react-redux'
import { getGroupProposalAction } from '../../redux/slices/groupSlices'

const TeacherMsgScreen = ({ proposalList }) => {
    useEffect(() => {
        dispatch(getGroupProposalAction())
    }, [])
    const dispatch = useDispatch()
    return (
        <View>
            <View style={styles.header}>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: normalize(20)
                }}>GROUP PROPOSALS</Text>
            </View>
            <ProposalList groupProposalList={proposalList} />
        </View>
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
