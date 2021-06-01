import React, { useState, useCallback, useEffect } from 'react'
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Stylings
import { ScrollView, StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import normalize from 'react-native-normalize';

//  Navigation

// Redux
import { connect, useDispatch } from 'react-redux'
import { getUserBookmarkAction, addUserBookmarkAction, deleteUserBookmarkAction, joinGroupAction } from '../../redux/slices/groupSlices'
import { getUserAction,setApplied } from '../../redux/slices/authSlices'

const Details = ({ route, user, bookmarkedGroup }) => {
    const { id,userid,applications, name, topic, description, requirements,status, tags,recruitment,applied } = route.params
    const [appliedd, setAppliedd] = useState(applied);
    useFocusEffect(
        React.useCallback(() => {
            setAppliedd(applied)
        }, [])
      );
    const navigation = useNavigation()
    const dispatch = useDispatch()

    // useFocusEffect(useCallback(() => {
    //     console.log("yes")
    //     setApplied(user.applied)
    //   }, []))

    const likePress = (liked) => {
        console.log(liked)
        if (liked) {
            dispatch(deleteUserBookmarkAction(id,user.id))
        } else {
            dispatch(addUserBookmarkAction(id,user.id))
        }
    }


    const joinGroup = () => {
        
        const data = {
            applied: user.applied,
            fName:user.firstName,
            groupid: id,
            userid: userid
        }
        dispatch(joinGroupAction(data))
        var array= [...applied, id]
        setAppliedd(array)
    

    }

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
                        }}>{name}</Text>

                        <View style={styles.tagBox}>
                            {tags.map((tag, index) => (
                                <Text key={index} style={styles.tag}>{tag}</Text>
                            ))}

                        </View>
                        <Text style={styles.textDesc}>Project Description:</Text>
                        <Text>{description}</Text>
                        <Text style={styles.textDesc}>Requirements:</Text>
                        <Text>
                            {requirements}
                        </Text>
                    </View>
                </View>
                <View style={styles.bottomView}>
                    <View style={styles.bottomViewBox}>
                        {
                        <TouchableOpacity
                        disabled={appliedd.includes(id) || user.groupId!="" ?true:false}
                            onPress={() => joinGroup()}
                            style={{
                                backgroundColor: '#008BFF',
                                borderRadius: normalize(10),
                                padding: normalize(10),
                                width: normalize(200),
                                elevation: normalize(10)
                            }}>
                            <Text style={{
                                fontFamily: 'Roboto-Bold',
                                fontSize: normalize(20),
                                textAlign: 'center',
                                color: colors.white
                            }}>{appliedd.includes(id) ? "Already Requested":"Request to Join"}</Text>
                        </TouchableOpacity>
}
                        <TouchableOpacity onPress={() => {
                            bookmarkedGroup.includes(id) ? likePress(true, id) : likePress(false, id)
                        }}>
                            <Ionicons
                                style={
                                    bookmarkedGroup.includes(id) ? { color: colors.red } : { color: colors.textDark }
                                }
                                name={
                                    bookmarkedGroup.includes(id) ? "heart" : "heart-outline"
                                } size={normalize(40)} />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
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
    bookmarkedGroup: state.group.bookmarkedGroup
})
export default connect(mapStateToProps, null)(Details)