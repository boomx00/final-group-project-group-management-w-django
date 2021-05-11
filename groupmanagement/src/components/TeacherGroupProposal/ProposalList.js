import React, { useState, useEffect } from 'react'

//  Stylings
import { View, ScrollView, Text, TextInput, FlatList, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors/colors';
import { Dialog, Portal } from 'react-native-paper';

//  Navigation
import { useNavigation } from '@react-navigation/native';

// Redux
import { acceptGroupProposalAction, declineGroupProposalAction } from '../../redux/slices/groupSlices'
import { connect, useDispatch } from 'react-redux'

const ProposalList = ({ groupProposalList, groupList }) => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const [proposalClicked, setProposalClicked] = useState(false);
    const [editClicked, setEditClicked] = useState(false);

    const [clickedProposal, setClickedProposal] = useState({
        member: [],
        item:{
            feedback:"",
            progress:""
        }
    });
    const [feedback, setFeedback] = useState(clickedProposal.item.feedback)


    const acceptProposal = () => {
        const data = {
            groupid:clickedProposal.id,
            feedback: feedback
        }
        dispatch(acceptGroupProposalAction(data))
    }
    const declineProposal = () => {
        const data = {
            groupid:clickedProposal.id,
            feedback: feedback
        }
        dispatch(declineGroupProposalAction(data))
    }
    const editProposal=(data)=>{
        if (data.progress=="accept"){
            dispatch(acceptGroupProposalAction(data))
        }else{
            dispatch(declineGroupProposalAction(data))
        }
    }
    const renderItem = ({ item }) => {
        const group = groupList.find(x => x.id == item.groupid.id)
        console.log(item)
        return (
            <TouchableOpacity onPress={() => {
                setProposalClicked(true)
                setFeedback(clickedProposal.item.feedback)
                const data = {...group,item}
                console.log(data)
                setClickedProposal(data)
            }}
                style={{
                    width: normalize(350),
                    backgroundColor: colors.white,
                    borderRadius: normalize(10),
                    elevation: normalize(5),
                    margin: normalize(10)
                }}>
                <View style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'flex-end',
                    margin: normalize(15)
                }}>
                    <View style={{
                        flexDirection: 'column'
                    }}>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: normalize(25)
                            }}>{group.topic}</Text>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Regular',
                                fontSize: normalize(20)
                            }}>{group.name}</Text>
                    </View>
                    <View>
                        <View>
                            {item.progress == "accepted" ?
                                <Text style={{
                                    backgroundColor: '#5CCDFE',
                                    padding: normalize(7),
                                    elevation: normalize(5),
                                    borderRadius: normalize(5)
                                }}>ACCEPTED</Text>
                                : item.progress == "tbd" || item.progress == "resent"
                                    ? <Text style={{
                                        backgroundColor: colors.darkYellow,
                                        padding: normalize(7),
                                        elevation: normalize(5),
                                        borderRadius: normalize(5)
                                    }}>PENDING</Text>
                                    : <Text style={{
                                        backgroundColor: '#FF3131',
                                        padding: normalize(7),
                                        elevation: normalize(5),
                                        borderRadius: normalize(5)
                                    }}>DECLINED</Text>}

                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    return (
        <View style={{
            justifyContent: 'center',
            alignContent: 'center',
            alignItems: 'center'
        }}>
            <FlatList
                nestedScrollEnabled={true}
                data={groupProposalList}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
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
                                    fontSize: normalize(20),
                                    textAlign: 'center'
                                }}
                            >{clickedProposal.topic}</Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    fontSize: normalize(20),
                                    textAlign: 'center'
                                }}
                            >
                                {clickedProposal.name}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    fontSize: normalize(20),
                                    textAlign: 'center'
                                }}
                            >
                                MEMBER: {clickedProposal.member.length}/7
                        </Text>

                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(20),
                                    borderBottomWidth: 0.5,
                                    marginTop: normalize(20)
                                }}
                            >
                                Project Description:
                        </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Light',
                                    fontSize: normalize(20),
                                }}
                            >
                                {clickedProposal.description}
                            </Text>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(20),
                                    borderBottomWidth: 0.5,
                                    marginTop: normalize(20)
                                }}
                            >
                                Feedback:
                        </Text>
                            <TextInput
                                placeholder="Write your feedback here..."
                                multiline={true}
                                value={proposalClicked && (clickedProposal.item.progress=="accepted" ||clickedProposal.item.progress=="declined") ? clickedProposal.item.feedback : feedback}
                                onChangeText={(text) => setFeedback(text)}
                                style={{
                                    height: normalize(100)
                                }}
                            />
                            {clickedProposal.item.progress=="accepted" || clickedProposal.item.progress=="declined" ? 
                                <View style={{ flexDirection: 'row', justifyContent: 'center',backgroundColor: 'red' }}>
                                <TouchableOpacity onPress={() => {
                                    setEditClicked(true)
                                    }}
                                    style={{borderRadius: normalize(10),
                                        borderWidth: 0.5,
                                        padding: normalize(10),
                                        width: normalize(300),}}>
                                    <Text style={{fontFamily: 'Roboto-Regular',
                                                fontSize: normalize(18),
                                                textAlign: 'center'}}>Edit</Text>
                                </TouchableOpacity>

                            </View>:<View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        declineProposal()
                                        setProposalClicked(false)
                                    }}
                                    style={{
                                        backgroundColor: colors.white,
                                        borderRadius: normalize(10),
                                        elevation: normalize(10),
                                        padding: normalize(15)
                                    }}
                                    
                                    >
                                    <Text style={{
                                        fontFamily: 'Roboto-Bold',
                                        fontSize: normalize(18)
                                    }}>Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        acceptProposal()
                                        setProposalClicked(false)
                                    }}
                                    style={{
                                        backgroundColor: '#008BFF',
                                        borderRadius: normalize(10),
                                        elevation: normalize(10),
                                        padding: normalize(15)
                                    }}>
                                    <Text style={{
                                        fontFamily: 'Roboto-Bold',
                                        fontSize: normalize(18),
                                        color: colors.white
                                    }}>Accept</Text>
                                </TouchableOpacity>
                            </View>
                            }
                            
                        </ScrollView>
                    </Dialog.Content>
                </Dialog>
            </Portal>
            <Portal>
                <Dialog visible={editClicked} onDismiss={() => setEditClicked(false)}>
                <Dialog.Content stlye={{
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                <ScrollView nestedScrollEnabled={true}>
                <Text
                                style={{
                                    fontFamily: 'Roboto-Bold',
                                    fontSize: normalize(20),
                                    borderBottomWidth: 0.5,
                                    marginTop: normalize(20)
                                }}
                            >
                                Feedback:
                        </Text>
                            <TextInput
                                placeholder="Write your feedback here..."
                                multiline={true}
                                value={clickedProposal.item.feedback}
                                onChangeText={(text) => setClickedProposal(prevState => ({
                                    ...prevState,           // copy all other field/objects
                                    item: {              // recreate the object that contains the field to update
                                      ...prevState.item, // copy all the fields of the object
                                      feedback: text    // overwrite the value of the field to update
                                    }
                                  }))}
                                style={{
                                    height: normalize(100)
                                }}
                            />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                            <TouchableOpacity
                                    onPress={() => {
                                        const datas = {groupid:clickedProposal.id, 
                                            feedback: clickedProposal.item.feedback,
                                            progress: "declined"
                                        }
                                        editProposal(datas)
                                        setEditClicked(false)
                                    }}
                                    style={{
                                        backgroundColor: colors.white,
                                        borderRadius: normalize(10),
                                        elevation: normalize(10),
                                        padding: normalize(10)
                                    }}
                                    
                                    >
                                    <Text style={{
                                        fontFamily: 'Roboto-Bold',
                                        fontSize: normalize(18)
                                    }}>Decline</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    onPress={() => {
                                        const datas = {groupid:clickedProposal.id, 
                                            feedback: clickedProposal.item.feedback,
                                            progress: "accept"
                                        }
                                        editProposal(datas)
                                        setEditClicked(false)
                                    }}
                                    style={{
                                        backgroundColor: '#008BFF',
                                        borderRadius: normalize(10),
                                        elevation: normalize(10),
                                        padding: normalize(10)
                                    }}>
                                    <Text style={{
                                        fontFamily: 'Roboto-Bold',
                                        fontSize: normalize(18),
                                        color: colors.white
                                    }}>Accept</Text>
                                </TouchableOpacity>
                                </View>
                </ScrollView>
                </Dialog.Content>
                </Dialog>
            </Portal>
        </View>
    )
}

const mapStateToProps = (state) => ({
    groupList: state.group.list
})

export default connect(mapStateToProps, null)(ProposalList)
