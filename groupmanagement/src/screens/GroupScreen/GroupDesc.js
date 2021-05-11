import React, { useState, useCallback, useEffect } from 'react'
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
import { Dialog, Portal } from 'react-native-paper';

//  Redux
import { connect, useDispatch } from 'react-redux'
import { sendGroupProposalAction,updateGroupProposalAction,closeRecruitmentAction,openRecruitmentAction,removeUsers } from '../../redux/slices/groupSlices'
import { StackRouter } from '@react-navigation/routers'

const GroupDesc = ({ ownGroup, user }) => {
    const [removeUser, setRemoveUser] = useState(false);
    const [clickedUser, setClickedUser] = useState("");
    const [clickedUserId, setClickedUserId] = useState("");

    const dispatch = useDispatch()
    const sendProposal = () =>{
        const data = {
            user: user.id,
            groupid_id:user.groupId,
        }
        if(ownGroup.proposal == 'declined'){
            dispatch(updateGroupProposalAction(data))
        }else{
        dispatch(sendGroupProposalAction(data))

        }
    }
    const removeUserAction=(userid)=>{
        const data ={
            userid:userid,
            groupid: ownGroup.id
        }
        dispatch(removeUsers(data))
    }
    const closeRecruitment=()=>{
        dispatch(closeRecruitmentAction(ownGroup.id))
    }

    const openRecruitment=()=>{
        dispatch(openRecruitmentAction(ownGroup.id))
    }
    return (
        <ScrollView contentContainerStyle={styles.infoBox}>
            <View>
                <View style={styles.projectDescBox}>
                    <Text style={styles.textDetail}>Project Description:</Text>
                    <View contentContainerStyle={{ height: normalize(120) }}>
                        <Text style={styles.textParagraph}>
                            {ownGroup.description}
                        </Text>
                    </View>
                </View>
            </View>
            <View>
                {
                user.role!='gm'?null:
                ownGroup.members.length<5?null:
                ownGroup.proposal=="sent" || ownGroup.proposal == "resent"  ?
                    <Text>Your group already send the proposal, please check on another screen to check the progress</Text>
                    :
                    ownGroup.proposal == "accepted" ? null :
                        <TouchableOpacity
                            onPress={() => sendProposal()}
                            style={styles.btn1}>
                            <Text style={styles.textBtn}>SEND PROPOSAL</Text>
                        </TouchableOpacity>
                }
            </View>
            <View style={{height: normalize(55*ownGroup.members.length)}}>
                <Text style={styles.textDetail}>Members:</Text>


                    {ownGroup.members.map((member, index) =>
                    (
                        <View style={{flexDirection: "row",
                        flexWrap: "wrap",}}>
                        <Text style={styles.textParagraph}
                            key={index} >{index + 1}.{member.firstName} {member.lastName}</Text>

                            {
                            user.role!='gm'?null:
                            ownGroup.ownerId == member.id ? null:<TouchableOpacity onPress={() => {
                                        setRemoveUser(true)
                                        setClickedUser(member.firstName)
                                        setClickedUserId(member.id)
                                    }}
                                    style={{
                                        backgroundColor: colors.red,
                                        borderRadius: normalize(10),
                                        elevation: normalize(10),
                                        padding: normalize(5),
                                        position: 'absolute',
        right: 15,
        top: 12,
                                    }}
                                    >
                        <Text style={{ }}
                          >REMOVE</Text>
                          </TouchableOpacity> }
                          
                        </View>
                    )
                    )}
                    </View>
                    <View style={{paddingBottom:normalize(0)}}>
                {ownGroup.ownerId!=user.id?null:
                ownGroup.recruitment=="closed"?
                <TouchableOpacity
                style={styles.btn1}
                onPress={() => openRecruitment()}
                >
                        <Text style={styles.textBtn}>OPEN RECRUITMENT</Text>

                </TouchableOpacity>:
                <TouchableOpacity
                style={styles.btn1}
                onPress={() => (ownGroup.members.length >= 5)?closeRecruitment():alert("member not enough")}
                >
                        <Text style={styles.textBtn}>CLOSE RECRUITMENT</Text>

                </TouchableOpacity>
}
            </View>
            <Portal>
                <Dialog visible={removeUser} onDismiss={() => setRemoveUser(false)}>
                    <Dialog.Content stlye={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ScrollView nestedScrollEnabled={true}>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(20),
                                    textAlign: 'center'
                                }}
                            >Are you sure you want to remove {clickedUser} ?</Text>
                          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        setRemoveUser(false)
                                    }}
                                    style={{
                                        backgroundColor: colors.white,
                                        borderRadius: normalize(10),
                                        elevation: normalize(10),
                                        padding: normalize(15),
                                        left:60
                                    }}
                                    
                                    >
                                    <Text style={{
                                        fontFamily: 'Roboto-Bold',
                                        fontSize: normalize(18)
                                    }}>No</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        removeUserAction(clickedUserId)
                                        setRemoveUser(false)
                                    }}
                                    style={{
                                        backgroundColor: '#008BFF',
                                        borderRadius: normalize(10),
                                        elevation: normalize(10),
                                        padding: normalize(15),
                                        right:60
                                    }}>
                                    <Text style={{
                                        fontFamily: 'Roboto-Bold',
                                        fontSize: normalize(18),
                                        color: colors.white
                                    }}>Yes</Text>
                                </TouchableOpacity>
                            </View>
                        </ScrollView>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </ScrollView>
        
    )
}

const styles = StyleSheet.create({
    infoBox: {
        margin: normalize(20)
    },
    textDetail: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
        borderBottomWidth: 1,
        alignContent: 'space-between',
        justifyContent: 'space-between',    
    },
    textParagraph: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(18),
        marginTop:normalize(10),
        flex: 1,
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    btn1: {
        backgroundColor: '#008BFF',
        borderRadius: normalize(10),
        margin: normalize(20),
        padding: normalize(7)
    },textBtns: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(20),
        color: colors.white,
        textAlign: 'center'
    },
    textBtn: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(15),
        color: colors.white,
        textAlign: 'center'
    },
})
const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(GroupDesc)
