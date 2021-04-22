import React, { useCallback } from 'react'

//  Stylings
import { StyleSheet, SafeAreaView, Text, View } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../assets/colors/colors';
import normalize from 'react-native-normalize'

//  Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

//Redux
import { connect, useDispatch } from 'react-redux'
import { getUser, getUserAction } from '../../redux/slices/authSlices'
import { getOwnJoinRequestAction, getJoinGroupReqAction } from '../../redux/slices/groupSlices'

// Components
import TeacherMsgScreen from './TeacherMsgScreen'
import StudentMsgScreen from './StudentMsgScreen'

const MsgScreen = ({ user, groupProposalList }) => {
    const dispatch = useDispatch();
    useFocusEffect(
        useCallback(() => {
            dispatch(getUserAction())
            dispatch(getOwnJoinRequestAction())
            dispatch(getJoinGroupReqAction())
        }, [])
    );
    const navigation = useNavigation()

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>MESSAGES</Text>
                <View style={styles.backIcon}>
                    <Ionicons name="arrow-back-outline"
                        size={normalize(30)} style={styles.back}
                        onPress={() => navigation.goBack()}>
                    </Ionicons>
                </View>
            </View>
            {user.isTeacher ?
                <TeacherMsgScreen proposalList={groupProposalList} />
                :
                <StudentMsgScreen />}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    header: {
        margin: normalize(20),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    backIcon: {
        position: 'absolute',
        left: normalize(15)
    },
    headerTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20)
    }

})
const mapStateToProps = (state) => ({
    user: state.auth.user,
    ownGroup: state.group.ownGroup,
    groupProposal: state.group.groupProposal,
    groupProposalList: state.group.groupProposalList
})
export default connect(mapStateToProps, null)(MsgScreen)