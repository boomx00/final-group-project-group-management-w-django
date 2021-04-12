// Stylings
import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

//Redux
import { connect } from 'react-redux'
import { color } from 'react-native-reanimated';

const Group = ({ name, description, topic, tags, memberNumber, likesID, user }) => {
    const navigation = useNavigation();

    return (
        <View style={styles.groupCard}>
            <TouchableOpacity style={{width:'100%'}}
        onPress={() => navigation.navigate('Details', {
            group: name,
            project: topic,
            people:memberNumber,
            desc: description
        })}> 
            <View style={styles.insideCard}>
            
                <Text style={styles.textTitle}>
                    {topic}
                </Text>
                <Text numberOfLines={1} style={styles.desc}>
                    "{description}""
                </Text>
                <Text style={styles.textSubtitle}>
                    {name}
                </Text>
                <Text style={styles.textSubtitle}>
                    Members: {memberNumber} / 7
                    </Text>
                    </View>
                    </TouchableOpacity>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-end', paddingTop: normalize(0) }}>
                    <TouchableOpacity>
                        <Ionicons
                            style={
                                likesID.includes(user.id) ? { color: colors.red } : {}
                            }
                            name={
                                likesID.includes(user.id) ? "heart" : "heart-outline"
                            } size={20} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }}>
                        <Ionicons name="ellipsis-vertical-outline" size={20} />
                    </TouchableOpacity>
                </View>
            </View>
            )
}

const styles = StyleSheet.create({
    groupCard: {
        margin: normalize(5),
        elevation: normalize(5),
        height: normalize(135),
        borderRadius: 10,
        alignSelf:'center',
        backgroundColor: 'lightgrey',
        width:'93%'
    },
    insideCard: {
        margin: normalize(10),
        backgroundColor: 'lightgrey'
    },
    textTitle: {
        fontFamily: 'Roboto-Bold',
        color: 'black',
        fontSize: normalize(20),
        margin: normalize(5)
    },
    textSubtitle: {
        fontFamily: 'Roboto-Regular',
        color: 'grey',
        fontSize: normalize(18)
    },
    desc: {
        fontFamily: 'Roboto-Regular',
        color: 'black',
        fontSize: normalize(18)
    }
})

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Group)
