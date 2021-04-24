import React, { useState, useEffect } from 'react'

// Stylings
import { View, ScrollView, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native'
import { Dialog, Portal, RadioButton } from 'react-native-paper';
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'

// Redux
import { connect, useDispatch } from 'react-redux'
import { editSprintAction } from '../../redux/slices/groupSlices'

const Sprint = ({ clickedSprintData, goBack, sprints }) => {
    const dispatch = useDispatch()
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const [summary, setSummary] = useState(clickedSprintData.summary)
    const [progress, setProgress] = useState(clickedSprintData.progress)
    const [sprintData, setSprintData] = useState(clickedSprintData)
    useEffect(() => {
        sprints.map(sprint => {
            if (sprint.id == clickedSprintData.id) {
                setSprintData(sprint)
            }
        })
    }, [sprints])
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.nameHeader}>
                    <Text style={styles.sprintTitle}>Sprint {clickedSprintData.type}</Text>
                    <TouchableOpacity style={styles.progressBtn}>
                        <Text style={styles.progressText}>
                            {sprintData.progress == "NOT_STARTED"
                                ? "NOT STARTED"
                                :
                                sprintData.progress == "ON_PROGRESS" ? "PROGRESS" : "DONE"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.infoBox}>
                    <Text style={styles.infoHeader}>
                        Tasks:
                    </Text>
                    <Text style={styles.infoParagraph}>
                        {sprintData.summary}
                    </Text>
                </ScrollView>
            </View>

            <View style={{ justifyContent: 'flex-end' }}>
                <View style={styles.bottomBox}>
                    <TouchableOpacity style={styles.bottomBtn}
                        onPress={() => {
                            goBack()
                        }}>
                        <Text style={styles.bottomBtnText}>
                            Go Back
                </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => showDialog()}
                        style={styles.bottomBtn}>
                        <Text style={styles.bottomBtnText}>
                            Edit
                </Text>
                    </TouchableOpacity>
                </View>
            </View>

            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>Editing Sprint {clickedSprintData.type}</Dialog.Title>
                    <Dialog.Content>
                        <View>
                            <Text style={styles.textDescription}>Summary of the sprint:</Text>
                            <TextInput
                                style={styles.summaryInput}
                                placeholder="Enter your sprint summary here.."
                                multiline={true}
                                value={summary}
                                onChangeText={(text) => setSummary(text)}
                            />
                            <Text style={styles.textDescription}>Progress of the sprint:</Text>
                            <RadioButton.Group onValueChange={value => setProgress(value)} value={progress}>
                                <RadioButton.Item label="Not Started" value="NOT_STARTED" />
                                <RadioButton.Item label="Progress" value="ON_PROGRESS" />
                                <RadioButton.Item label="Finished" value="FINISHED" />
                            </RadioButton.Group>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => hideDialog()}>
                                    <Text style={styles.btnText}>CLOSE</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    style={styles.btn}
                                    onPress={() => {
                                        dispatch(editSprintAction({ summary, progress }, clickedSprintData.id))
                                        hideDialog()
                                    }}>
                                    <Text style={styles.btnText}>EDIT</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Dialog.Content>
                </Dialog>
            </Portal>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: normalize(25),
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    nameHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sprintTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(25)
    },
    progressBtn: {
        backgroundColor: colors.darkYellow,
        borderRadius: normalize(10),
        padding: normalize(5),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: normalize(5)
    },
    progressText: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(15),
        padding: normalize(5)
    },
    infoBox: {
        marginTop: normalize(20),
        flexDirection: 'column',
        flexGrow: 4
    },
    infoHeader: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
        borderBottomWidth: 0.5
    },
    infoParagraph: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(18)
    },
    bottomBox: {
        justifyContent: 'space-between',
        alignItems: 'flex-end',
        flexDirection: 'row',
    },
    bottomBtn: {
        backgroundColor: colors.darkYellow,
        borderRadius: normalize(10),
        width: normalize(100),
        height: normalize(30),
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    bottomBtnText: {
        fontFamily: 'Roboto-Regular',
        textAlign: 'center',
        color: colors.textDark
    },
    textDescription: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
        marginTop: normalize(10),
        marginBottom: normalize(10)
    },
    summaryInput: {
        borderRadius: normalize(10),
        borderWidth: 0.5,
        height: normalize(150)
    },
    btn: {
        elevation: normalize(10),
        borderRadius: normalize(10),
        backgroundColor: colors.white,
    },
    btnText: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(18),
        padding: normalize(10)
    }
})

const mapStateToProps = (state) => ({
    sprints: state.group.ownGroup.sprints
})
export default connect(mapStateToProps, null)(Sprint)
