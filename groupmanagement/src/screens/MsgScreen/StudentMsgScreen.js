import React, { useEffect, useState } from 'react'
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet } from 'react-native'

//  Styling
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

//Redux
import { connect } from 'react-redux'

//  Components
import GroupProposalProgress from '../../components/GroupProposalProgress/GroupProposalProgress'
import ReqList from '../../components/Request/reqList'
import DontHaveGroup from '../../components/DontHaveGroup/DontHaveGroup'
import StudentReqList from '../../components/DontHaveGroup/StudentReqList';

const StudentMsgScreen = ({ user, ownGroup, ownJoinRequest }) => {
    const [focusOn, setFocusOn] = useState("GROUP PROPOSAL")

    return (
        <View style={styles.container}>
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
                user.groupId == null ?
                    <DontHaveGroup />
                    :
                    <GroupProposalProgress />
                :
                user.groupId == null ?
                    ownJoinRequest.length != null ?
                        <StudentReqList ownJoinReq={ownJoinRequest} />
                        : <DontHaveGroup />
                    :
                    ownGroup.ownerId == user.id ?
                        <ReqList owner={true} />
                        :
                        <ReqList owner={false} />
            }
        </View>
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
