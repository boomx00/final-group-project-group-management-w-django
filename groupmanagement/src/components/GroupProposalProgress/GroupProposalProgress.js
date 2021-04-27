import React from 'react'
import { View, Text, Image } from 'react-native'
import colors from '../../../assets/colors/colors'
import normalize from 'react-native-normalize'

import { connect } from 'react-redux'

const GroupProposalProgress = ({ groupProposal, ownGroup }) => {
    return (
        <View style={{
            flex: 1,
            backgroundColor: colors.white,
            borderRadius: normalize(10),
            elevation: normalize(10),
            margin: normalize(20)
        }}>
            <View>
                <Text style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: normalize(25),
                    textAlign: 'center',
                    marginTop: normalize(20)
                }}>GROUP PROPOSAL</Text>
                {
                    groupProposal.progress == "NOT_SENDED" ?
                        <View style={{
                            margin: normalize(30),
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignContent: 'center',
                        }}>
                            <Image source={require('../../../assets/images/Humans1.png')} />
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(30),
                                    textAlign: 'center',
                                    color: colors.textMedium
                                }}
                            >YOUR GROUP HASN'T SEND THE GROUP PROPOSAL</Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: normalize(18),
                                    textAlign: 'center',
                                    color: colors.textMedium
                                }}
                            >PLEASE CONTACT YOUR GROUP OWNER TO SEND THE PROPOSAL</Text>
                        </View>
                        :
                        <View style={{
                            margin: normalize(20),
                            justifyContent: 'center',
                            alignContent: 'center'
                        }}>
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                backgroundColor: '#008BFF',
                                borderRadius: normalize(5),
                                padding: normalize(5)
                            }}>
                                <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(17),
                                    color: colors.white
                                }}>STATUS: </Text>
                                <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(17),
                                    color: colors.white
                                }}> {groupProposal.progress == "ON_REVIEW" ? "ON REVIEW BY THE TEACHER" : groupProposal.progress == "ACCEPTED" ? "GROUP PROPOSAL ACCEPTED" : "GROUP PROPOSAL DECLINED"}</Text>
                            </View>
                            <View style={{
                                justifyContent: 'space-between'
                            }}>
                                <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(18),
                                    marginTop: normalize(10)
                                }}>
                                    Project Description:
                            </Text>
                                <Text style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: normalize(17),
                                }}>
                                    {ownGroup.description}
                                </Text>
                                <Text style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(17),
                                    marginTop: normalize(10)
                                }}>
                                    Feedback:
                            </Text>
                                <Text style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: normalize(17),
                                }}>
                                    {groupProposal.feedback}
                                </Text>
                            </View>
                        </View>
                }
            </View>
        </View>
    )
}
const mapStateToProps = (state) => ({
    ownGroup: state.group.ownGroup,
    groupProposal: state.group.groupProposal
})

export default connect(mapStateToProps, null)(GroupProposalProgress)
