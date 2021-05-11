import React, { useEffect, useState, useCallback } from 'react'


//  Styling
import normalize from 'react-native-normalize'
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, RefreshControl } from 'react-native'
//Redux
import { connect, useDispatch } from 'react-redux'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

//  Components
import GroupProposalProgress from '../../components/GroupProposalProgress/GroupProposalProgress'
import ReqList from '../../components/Request/reqList'
import DontHaveGroup from '../../components/DontHaveGroup/DontHaveGroup'
import StudentReqList from '../../components/DontHaveGroup/StudentReqList';

// Redux
import {
    getOwnGroupAction,
    getOwnJoinRequestAction,
    getJoinGroupReqAction
} from '../../redux/slices/groupSlices'
import { getUserAction } from '../../redux/slices/authSlices'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const StudentMsgScreen = ({ user, ownGroup, ownJoinRequest }) => {
    const dispatch = useDispatch()
    const [focusOn, setFocusOn] = useState("GROUP PROPOSAL")

    useFocusEffect(useCallback(() => {
            dispatch(getOwnGroupAction(user.groupId))
            dispatch(getOwnJoinRequestAction(user.id))
            if (ownGroup.ownerId == user.id) {
                dispatch(getJoinGroupReqAction(ownGroup.id))
            }

    }, []))

    //Refresh Control
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        // dispatch(getUserAction())
        dispatch(getOwnGroupAction(user.groupId))
        dispatch(getOwnJoinRequestAction(user.id))
        if (ownGroup.ownerId == user.id) {
            dispatch(getJoinGroupReqAction(ownGroup.id))
        }
        wait(500).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView
            nestedScrollEnabled={true}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }
            contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <View style={focusOn == "GROUP PROPOSAL" ? styles.subHeader : null}>
                    <TouchableOpacity onPress={() => {
                        setFocusOn("GROUP PROPOSAL")
                    }}
                    >
                        <View
                        >
                            <Text style={styles.text}>GROUP PROPOSAL</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={focusOn == "REQUEST" ? styles.subHeader : null}>

                    <TouchableOpacity onPress={() => {
                        setFocusOn("REQUEST")
                    }}>
                        <View>
                            <Text style={styles.text}>REQUEST</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
            {focusOn == "GROUP PROPOSAL" ?
                user.groupId ?
                <GroupProposalProgress />

                    :
                    <DontHaveGroup />

                :
                !user.groupId ?
                    ownJoinRequest.length != null ?
                        <StudentReqList ownJoinReq={ownJoinRequest} />
                        : <DontHaveGroup />
                    :
                    (ownGroup.ownerId == user.id) && (ownGroup.members.length < 7) ?
                        <ReqList owner={true} />
                        :
                        (ownGroup.ownerId == user.id) && (ownGroup.members.length == 7)?
                        <ReqList full={true} />
                        :
                        <ReqList owner={false} />
            }
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: normalize(600)
    },
    subHeader: {
        borderBottomWidth: 0.5
    },
    text: {
        fontFamily: 'Roboto-Bold'
    }
})

const mapStateToProps = (state) => ({
    user: state.auth.user,
    ownGroup: state.group.ownGroup,
    groupProposal: state.group.groupProposal,
    ownJoinRequest: state.group.ownRequestJoin
})
export default connect(mapStateToProps, null)(StudentMsgScreen)
