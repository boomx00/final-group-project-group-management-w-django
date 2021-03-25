// Stylings
import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Redux
import { connect } from 'react-redux'
import { color } from 'react-native-reanimated';

const Group = ({ name, description, topic, tags, memberNumber, likesID, user }) => {
    return (
        <View style={styles.groupCard}>
            <View style={styles.insideCard}>
                <Text style={styles.textTitle}>
                    {topic}
                </Text>
                <Text style={styles.textSubtitle}>
                    {name}
                </Text>
                <Text>
                    Members: {memberNumber} / 7
                    </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(20) }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                        <Ionicons
                            style={
                                likesID.includes(user.id) ? { color: colors.red } : {}
                            }
                            name={
                                likesID.includes(user.id) ? "heart" : "heart-outline"
                            } size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                        <Ionicons name="ellipsis-vertical-outline" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    groupCard: {
        margin: normalize(5),
        elevation: normalize(5),
        height: normalize(150),
        borderRadius: 10,
        backgroundColor: colors.white
    },
    insideCard: {
        margin: normalize(10),
        backgroundColor: colors.white
    },
    textTitle: {
        fontFamily: 'Roboto-Bold',
        color: colors.red,
        fontSize: normalize(23),
        borderBottomWidth: normalize(4),
        borderBottomColor: colors.teal,
        margin: normalize(5)
    },
    textSubtitle: {
        fontFamily: 'Roboto-Regular',
        color: colors.orange,
        fontSize: normalize(25)
    },
    textParagraph: {

    }
})

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Group)
