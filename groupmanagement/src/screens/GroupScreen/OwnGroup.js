import React, { useState, useEffect, useRef } from 'react'

//  Stylings
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import colors from '../../../assets/colors/colors'
import normalize from 'react-native-normalize'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

// Redux
import { connect, useDispatch } from 'react-redux'
import {
    getOwnGroupAction,
    leaveGroupAction,
    editGroupAction,
    sendGroupProposalAction
} from '../../redux/slices/groupSlices'

// Navigation
import { useNavigation } from '@react-navigation/native';

//  Components
import Sprint from '../../components/Sprint/Sprint'
import GroupDesc from './GroupDesc'

const OwnGroup = ({ ownGroup, userId }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch()
    const refContainer = useRef();
    const [onSprintClicked, setSprintClicked] = useState(false);
    const [clickedSprintData, setClickedSprint] = useState();

    const [visible, setVisible] = useState(false);
    const showDialog = () => {
        const tagArray = ownGroup.tags.map(tag => { return tag.name })
        setTags(tagArray)
        setName(ownGroup.name)
        setTopic(ownGroup.topic)
        setDescription(ownGroup.description)
        setVisible(true)
    };
    const hideDialog = () => setVisible(false);
    const [step, setStep] = useState(1)
    const [onAddTags, setOnAddTags] = useState(false)
    const [name, setName] = useState(ownGroup.name)
    const [topic, setTopic] = useState(ownGroup.topic)
    const [description, setDescription] = useState(ownGroup.description)
    const [tags, setTags] = useState(ownGroup.tags)

    const addTag = (e) => {
        if (tags.length <= 4) {
            setTags([...tags, e.nativeEvent.text])
        } else {

        }

        refContainer.current.clear()
    }
    const deleteTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    }
    useEffect(() => { }, [ownGroup, ownGroup.sprints])

    return (
        <View style={styles.container}>
            <View>
                <View style={styles.header}>
                    <View style={styles.inHeader}>
                        <Text style={styles.textName}>{ownGroup.name}</Text>
                        <Text style={styles.textMember}>{ownGroup.members.length} MEMBERS</Text>
                    </View>
                    {ownGroup.projectApproved == "ACCEPTED" ?
                        <Ionicons
                            style={{ marginRight: normalize(50) }}
                            name="checkmark-done-circle-outline"
                            size={normalize(50)} />
                        : null}
                    <View style={styles.inHeader}>
                        {ownGroup.projectApproved == "ACCEPTED" || ownGroup.projectApproved == "ON_REVIEW" ? null :
                            <View style={{ flexDirection: 'row' }}>
                                <TouchableOpacity
                                    onPress={() => {
                                        showDialog()
                                        setStep(1)
                                    }
                                    }
                                    style={styles.btn1}>
                                    <Text style={styles.textBtn}>EDIT</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btn1}
                                    onPress={() => {
                                        dispatch(leaveGroupAction())
                                        navigation.navigate("Home")
                                    }}
                                >
                                    {ownGroup.ownerId == userId ?
                                        <Text style={styles.textBtn}>DELETE</Text> :
                                        <Text style={styles.textBtn}>LEAVE</Text>}
                                </TouchableOpacity>
                            </View>
                        }
                    </View>
                </View>
                <View style={styles.tagBox}>
                    {ownGroup.tags.map((tag, index) => (
                        <View style={styles.tag}
                            key={index}>
                            <Text >{tag.name}</Text>
                        </View>
                    ))}
                </View>
            </View>
            {onSprintClicked ?
                <Sprint clickedSprintData={clickedSprintData} goBack={() => {
                    setClickedSprint()
                    setSprintClicked(false)
                }} />
                :
                <GroupDesc ownGroup={ownGroup} />
            }
            <View style={styles.sprintsBtn}>
                {ownGroup.sprints.map((sprint, index) => (
                    <TouchableOpacity
                        style={{
                            alignItems: 'center'
                        }}
                        key={index}
                        onPress={() => {
                            setSprintClicked(true)
                            setClickedSprint(sprint)
                        }}>
                        <Ionicons name={sprint.progress == "NOT_STARTED" ?
                            "lock-closed-outline" :
                            sprint.progress == "ON_PROGRESS" ? "play-outline" : "checkmark-done-outline"} size={30} color={colors.textDark} />
                        <Text style={{
                            textAlign: 'center'
                        }}>Sprint {index + 1}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog} style={styles.modalContainer}>
                    <Dialog.Title style={styles.modalTitle}>EDIT GROUP</Dialog.Title>
                    <ScrollView contentContainerStyle={styles.modalContent}>
                        {step == 1 ?
                            <View>
                                <Text style={styles.modalTextSub}>Group Name:</Text>
                                <TextInput
                                    style={styles.modalTextInput}
                                    placeholder={"Enter your group name"}
                                    onChangeText={(text) => setName(text)}
                                    value={name} />
                                <Text style={styles.modalTextSub}>Group Topic:</Text>
                                <TextInput
                                    style={styles.modalTextInput}
                                    placeholder={"Enter your group topic"}
                                    onChangeText={(text) => setTopic(text)}
                                    value={topic} />
                                <Text style={styles.modalTextSub}>Group Description:</Text>
                                <TextInput
                                    multiline={true}
                                    style={styles.modalTextInput}
                                    placeholder={"Enter your group description"}
                                    onChangeText={(text) => setDescription(text)}
                                    value={description} />

                                <View style={styles.tagsList}>
                                    {tags.map((tag, index) => (
                                        <View style={styles.tag} key={index}>
                                            <Text>{tag}</Text>
                                            <TouchableOpacity onPress={() => deleteTag(index)}>
                                                <Ionicons name="close" size={normalize(18)} color={colors.textDark} />
                                            </TouchableOpacity>
                                        </View>
                                    ))}
                                    <TouchableOpacity style={styles.tag} onPress={() => setOnAddTags(!onAddTags)}>
                                        <Ionicons name={onAddTags ? "remove" : "add"} size={normalize(15)} color={colors.textDark} />
                                    </TouchableOpacity>
                                </View>
                                {onAddTags ? <TextInput
                                    ref={refContainer}
                                    style={styles.tagsInput}
                                    placeholder="Press ENTER when finish to type the tag"
                                    onSubmitEditing={(event) => addTag(event)}
                                /> : null}
                            </View>
                            :
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.modalTextSub}>ARE YOU SURE YOU WANT TO EDIT YOUR GROUP WITH THIS INFORMATION?</Text>
                                <Text style={styles.modalTextConfirm}>GROUP NAME: {name}</Text>
                                <Text style={styles.modalTextConfirm}>GROUP TOPIC: {topic}</Text>
                                <Text style={styles.modalTextConfirm}>GROUP DESCRIPTION: {description}</Text>
                                <Text style={styles.modalTextConfirm}>GROUP TAGS: {tags.toString()}</Text>
                            </View>
                        }
                    </ScrollView>
                    <Dialog.Actions>
                        <Button onPress={() => {
                            if (step == 1) {
                                hideDialog()
                            } else {
                                setStep(1)
                            }
                        }}>Cancel</Button>
                        <Button onPress={() => {
                            if (step == 2) {
                                //Dispatch to edit group...
                                dispatch(editGroupAction({ id: ownGroup.id, name, topic, description, tags }))
                                hideDialog()
                            } else {
                                setStep(2)
                            }

                        }}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'wrap'
    },
    inHeader: {
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignContent: 'center',
        marginLeft: normalize(50),
        marginRight: normalize(50)
    },
    textName: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(25)
    },
    textMember: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(20)
    },
    btn1: {
        backgroundColor: '#008BFF',
        borderRadius: normalize(10),
        margin: normalize(5),
        padding: normalize(7)
    },
    textBtn: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(15),
        color: colors.white,
        textAlign: 'center'
    },
    sprintsBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        marginTop: normalize(80),
        margin: normalize(20),

    },
    projectDescBox: {
        height: normalize(150)
    },
    tagBox: {
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },
    tag: {
        backgroundColor: '#C4C4C4',
        padding: normalize(7),
        borderRadius: normalize(7)
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modalContent: {
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        alignSelf: 'flex-start'
    },
    modalTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(30)
    },
    modalTextSub: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(18),
        margin: normalize(5)
    },
    modalTextConfirm: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(20),
        margin: normalize(5)
    },
    modalTextInput: {
        backgroundColor: '#F2F2F2',
        borderRadius: normalize(10),
        width: normalize(270)
    },
    tagsList: {
        marginLeft: normalize(20),
        marginRight: normalize(20),
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    tag: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'baseline',
        margin: normalize(5),
        padding: normalize(7),
        elevation: normalize(5),
        borderRadius: normalize(7),
        backgroundColor: '#C4C4C4'
    },
    tagsInput: {
        marginLeft: normalize(20),
        marginRight: normalize(20)
    }
})
export default OwnGroup
