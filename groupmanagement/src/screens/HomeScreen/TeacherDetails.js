import React, { useState, useCallback, useEffect } from 'react'

// Stylings
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import normalize from 'react-native-normalize';
import { Dialog, Portal } from 'react-native-paper';

//  Navigation
import { useNavigation } from '@react-navigation/native';

// Redux
import { connect, useDispatch } from 'react-redux'
import { getUserBookmarkAction, addUserBookmarkAction, deleteUserBookmarkAction, joinGroupAction } from '../../redux/slices/groupSlices'

const TeacherDetails = ({ route, user, bookmarkedGroup,groupList }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const [proposalClicked, setProposalClicked] = useState(false);
    const [feedback, setFeedback] = useState("");
    const { id,userid,applications, name, topic, description, requirements,status, tags,member,proposal } = route.params

    const group = groupList.find(x => x.groupid.id == id)
    return (
        <ScrollView contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backIcon} onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back-outline" size={normalize(30)} color={colors.textDark} />
                </TouchableOpacity>
                <Text style={styles.textHeader}>Details</Text>
            </View>

            <View style={styles.card}>
                <View style={{ justifyContent: 'flex-end' }}>
                    <View style={styles.insideCard}>
                        <Text style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: normalize(30),
                            alignSelf: 'center',
                            marginTop: normalize(20)
                        }}>{topic}</Text>
                        <Text style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: normalize(20),
                            alignSelf: 'center'
                        }}>By:{name}</Text>

                        <View style={styles.tagBox}>
                            {tags.map((tag, index) => (
                                <Text key={index} style={styles.tag}>{tag}</Text>
                            ))}

                        </View>
                        <Text style={styles.textDesc}>Description:</Text>
                        <Text>{description}</Text>
                        <Text style={styles.textDesc}>Requirements:</Text>
                        <Text>
                            {requirements}
                        </Text>
                        <Text style={styles.textDesc}>Members: </Text>
                        <Text>
                        <ScrollView contentContainerStyle={{ height: normalize(250) }}>
                    {member.map((member, index) =>
                    (
                        <Text style={styles.textParagraph}
                            key={index} >{index + 1}.{member.firstName}</Text>
                    )
                    )}
                       
                    
                </ScrollView>
                <View style={{
                                marginTop: normalize(60),
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: "blue",
                                // backgroundColor: !group ? "#008BFF" : group.progress == "tbd" || group.progress == "resent" ? "#008BFF" : group.progress == "accepted" ? "green" : "red",
                                borderRadius: normalize(5),
                                padding: normalize(5)
                            }}>
                                <TouchableOpacity 
                                disabled={!proposal?true:false}
                                onPress={() => {
                                            // console.log(id)
                                            setFeedback(group.feedback)
                                            setProposalClicked(true)

                        }}>
                                {/* <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(17),
                                    color: colors.white
                                }}>STATUS: </Text> */}
                                <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(17),
                                    color: colors.white
                                }}> 
                                {!proposal ? "proposal has not been sent" : proposal == "sent" ? "Proposal Sent and On Review" : proposal == "accepted" ? "Proposal Has Been Accepted":"proposal has not been resent" }
                                </Text>
                                </TouchableOpacity>
                            </View>
                        </Text>
                    </View>
                </View>
            </View>
            <Portal>
                <Dialog visible={proposalClicked} onDismiss={() => setProposalClicked(false)}>
                    <Dialog.Content stlye={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <ScrollView nestedScrollEnabled={true}>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(30),
                                    textAlign: 'center'
                                }}
                            >GROUP PROPOSAL</Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(25),
                                    textAlign: 'center'
                                }}
                            >{topic}</Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: normalize(20),
                                    textAlign: 'center'
                                }}
                            >
                                {name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    fontSize: normalize(20),
                                    textAlign: 'center'
                                }}
                            >
                                MEMBER: {member.length}/7
                        </Text>

                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(20),
                                    borderBottomWidth: 0.5,
                                    marginTop: normalize(20)
                                }}
                            >
                                Project Feedback:
                        </Text>
                        <Text
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    fontSize: normalize(20),
                                }}
                            >
                                {feedback}
                            </Text>
                            
                        </ScrollView>
                    </Dialog.Content>
                </Dialog>
            </Portal>
        </ScrollView >
        
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        flexDirection: 'row',
        marginTop: normalize(30),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    textHeader: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
    },
    backIcon: {
        position: 'absolute',
        left: normalize(30)
    },
    textParagraph: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(18),
    },
    card: {
        flex: 1,
        marginTop: normalize(20),
        marginBottom: normalize(20),
        alignSelf: 'center',
        elevation: normalize(20),
        borderRadius: normalize(15),
        width: normalize(350),
        backgroundColor: colors.white
    },
    insideCard: {
        margin: normalize(25),
    },
    bottomView: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: normalize(10)
    },
    bottomViewBox: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: normalize(20)
    },
    tagBox: {
        marginTop: normalize(10),
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        alignContent: 'center'
    },
    tag: {
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#C4C4C4',
        borderRadius: normalize(5),
        elevation: normalize(10),
        marginRight: normalize(10),
        width: normalize(100),
        textAlign: 'center'
    },
    textDesc: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
        borderBottomWidth: 0.5,
        marginTop: normalize(20)
    }
})

const mapStateToProps = (state) => ({
    user: state.auth.user,
    bookmarkedGroup: state.group.bookmarkedGroup,
    groupList: state.group.groupProposalList
})
export default connect(mapStateToProps, null)(TeacherDetails)