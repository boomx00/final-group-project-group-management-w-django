import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'

//  Redux
import { useDispatch } from 'react-redux'
import { sendGroupProposalAction } from '../../redux/slices/groupSlices'

const GroupDesc = ({ ownGroup }) => {
    useEffect(() => { }, [ownGroup])
    const dispatch = useDispatch()
    return (
        <View style={styles.infoBox}>
            <View>
                <View style={styles.projectDescBox}>
                    <Text style={styles.textDetail}>Project Description:</Text>
                    <Text style={styles.textParagraph}>
                        {ownGroup.description}
                    </Text>
                </View>
            </View>
            <View>
                {ownGroup.projectApproved == "ON_REVIEW" ?
                    <Text>Your group already send the proposal, please check on another screen to check the progress</Text>
                    :
                    ownGroup.projectApproved == "ACCEPTED" ? null :
                        <TouchableOpacity
                            onPress={() => dispatch(sendGroupProposalAction())}
                            style={styles.btn1}>
                            <Text style={styles.textBtn}>SEND PROPOSAL</Text>
                        </TouchableOpacity>
                }
            </View>
            <View style={styles.memberBox}>
                <Text style={styles.textDetail}>Members:</Text>
                {ownGroup.members.map((member, index) =>
                (
                    <Text style={styles.textParagraph}
                        key={index} >{index + 1}.{member.profile.firstName} {member.profile.lastName}</Text>
                )
                )}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    infoBox: {
        flex: 1,
        margin: normalize(30),
    },
    textDetail: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
        borderBottomWidth: 1
    },
    textParagraph: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(18),
    },
    btn1: {
        backgroundColor: '#008BFF',
        borderRadius: normalize(10),
        margin: normalize(20),
        padding: normalize(7)
    },
    textBtn: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(15),
        color: colors.white,
        textAlign: 'center'
    },
})

export default GroupDesc
