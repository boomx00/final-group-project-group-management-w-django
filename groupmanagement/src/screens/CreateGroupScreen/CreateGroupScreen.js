import React, { useState, useEffect, useRef } from 'react'
import { View, Text, TextInput, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard, ScrollView } from 'react-native'

//  Redux
import { connect, useDispatch } from 'react-redux';
import { createGroupAction } from '../../redux/slices/groupSlices'

//  Styling
import normalize from 'react-native-normalize'
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from '../../../assets/colors/colors';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';


//  Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

const CreateGroupScreen = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    const refContainer = useRef();

    //  Dialogs for confirmation state
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);

    //  States
    const [onAddTags, setOnAddTags] = useState(false);
    const [topic, setTopic] = useState("")
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [tags, setTags] = useState([])
    const [requirements, setRequirements] = useState("");
    useFocusEffect(
        React.useCallback(() => {
            setOnAddTags(false)
            setTopic("")
            setName("")
            setDescription("")
            setRequirements("")
            setTags([])
        }, [])
    );

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
    const createGroup = () => {
        if (name == "" || topic == "") {
            alert("Please enter Group Name and Project Title!")
        } else {
            dispatch(createGroupAction(name, topic, description, tags, requirements, navigation))
        }
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="close-outline" size={normalize(40)} color={colors.textDark} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>CREATE GROUP</Text>
                <TouchableOpacity onPress={() => showDialog()}>
                    <Ionicons name="paper-plane" size={normalize(30)} color={colors.textDark} />
                </TouchableOpacity>
            </View>
            <View
                style={styles.card}>
                <KeyboardAvoidingView style={{ flex: 1 }}>
                    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                        <View style={styles.insideCard}>
                            <TextInput style={styles.cardTitle}
                                multiline={true}
                                textAlign={'center'}
                                placeholder="PROJECT TITLE ..."
                                onChangeText={(text) => setTopic(text)}
                                value={topic}
                            />
                            <TextInput style={styles.cardSub}
                                textAlign={'center'}
                                placeholder="ENTER GROUP NAME"
                                onChangeText={(text) => setName(text)}
                                value={name}
                            />
                        </View>
                        <View style={{ alignItems: 'flex-start', alignContent: 'flex-start' }}>
                            <Text style={styles.descriptionText}>Project Description: </Text>
                            <TextInput style={styles.descriptionInput}
                                placeholder="Write your project description here..."
                                onChangeText={(text) => setDescription(text)}
                                multiline={true}
                                value={description}
                            />
                        </View>
                        <View style={styles.lineStyle} />
                        <View style={{ alignItems: 'flex-start', alignContent: 'flex-start' }}>
                            <Text style={styles.descriptionText}>Tags: </Text>
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
                        <View style={styles.lineStyle} />
                        <View style={{ alignItems: 'flex-start', alignContent: 'flex-start' }}>
                            <Text style={styles.descriptionText}>Requirements for Candidates: </Text>
                            <TextInput style={styles.descriptionInput}
                                placeholder="Write your member requirements..."
                                onChangeText={(text) => setRequirements(text)}
                                value={requirements}
                                multiline={true}
                            />
                        </View>
                    </ScrollView>
                </KeyboardAvoidingView>
            </View>
            <Portal>
                <Dialog visible={visible} onDismiss={() => hideDialog()}>
                    <Dialog.Title>CREATE GROUP</Dialog.Title>
                    <Dialog.Content>
                        <Paragraph>Make sure you have correct information about the group that you want to create before press the create button</Paragraph>
                        <Paragraph>Group Name: {name}</Paragraph>
                        <Paragraph>Group Topic: {topic}</Paragraph>
                        <Paragraph>Group Description: {description}</Paragraph>
                        <Paragraph>Group Tags: {tags.toString()}</Paragraph>
                        <Paragraph>Group Requirements: {requirements}</Paragraph>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={() => hideDialog()}>CANCEL</Button>
                        <Button onPress={() => {
                            createGroup()
                            hideDialog()

                        }}>CREATE</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </View >
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white
    },
    card: {
        flex: 1,
        backgroundColor: colors.white,
        elevation: normalize(10),
        borderRadius: normalize(10),
        margin: normalize(10),
        height: normalize(570),
    },
    insideCard: {
        alignContent: 'center',
        alignItems: 'center',
        margin: normalize(20)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: normalize(15),
    },
    tagsList: {
        flex: 1,
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
    lineStyle: {
        borderWidth: 0.4,
        borderColor: colors.textLight,
        width: '90%',
        marginLeft: '5%',
        marginTop: normalize(10),
        marginBottom: normalize(10)
    },
    headerTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
    },
    cardTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(30),
        color: colors.textLight,
        width: normalize(300),
        borderBottomWidth: 0.5
    },
    cardSub: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(20),
        color: colors.textLight,
        textAlign: 'center'
    },
    memberText: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(20),
        color: colors.textDark
    },
    descriptionText: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(18),
        borderBottomWidth: 0.5,
        marginLeft: normalize(20)
    },
    descriptionInput: {
        marginLeft: normalize(20),
        marginRight: normalize(20),
        height: normalize(80)
    },
    tagsInput: {
        marginLeft: normalize(20),
        marginRight: normalize(20)
    }
})

const mapStateToProps = (state) => ({

})

export default connect(mapStateToProps, null)(CreateGroupScreen)
