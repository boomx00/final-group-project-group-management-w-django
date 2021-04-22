import React from 'react'

// Stylings
import { View, ScrollView, Text, TouchableOpacity, StyleSheet } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'

const Sprint = ({ clickedSprintData, goBack }) => {
    return (
        <View style={styles.container}>
            <View>
                <View style={styles.nameHeader}>
                    <Text style={styles.sprintTitle}>Sprint {clickedSprintData.type}</Text>
                    <TouchableOpacity style={styles.progressBtn}>
                        <Text style={styles.progressText}>
                            {clickedSprintData.progress == "NOT_STARTED"
                                ? "NOT STARTED"
                                :
                                clickedSprintData.progress == "ON_PROGRESS" ? "PROGRESS" : "DONE"}
                        </Text>
                    </TouchableOpacity>
                </View>
                <ScrollView style={styles.infoBox}>
                    <Text style={styles.infoHeader}>
                        Tasks:
                    </Text>
                    <Text style={styles.infoParagraph}>
                        {clickedSprintData.summary}
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
                    <TouchableOpacity style={styles.bottomBtn}>
                        <Text style={styles.bottomBtnText}>
                            Edit
                </Text>
                    </TouchableOpacity>
                </View>
            </View>


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
    }
})
export default Sprint
