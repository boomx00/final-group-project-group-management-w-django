import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity, RefreshControl } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Redux
import { connect, useDispatch } from 'react-redux'
import { getAllGroupAction, getUserBookmarkAction, addUserBookmarkAction, deleteUserBookmarkAction } from '../../redux/slices/groupSlices'

// Navigation
import { useNavigation } from '@react-navigation/native';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GroupList = ({ groupData, user, bookmarkedGroup }) => {
    const navigation = useNavigation()
    const dispatch = useDispatch();
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = useCallback(() => {
        dispatch(getAllGroupAction())
        setRefreshing(true);
        wait(2000).then(() => setRefreshing(false));
    }, []);

    const likePress = (liked, id) => {
        if (liked) {
            dispatch(deleteUserBookmarkAction(parseInt(id)))
        } else {
            dispatch(addUserBookmarkAction(parseInt(id)))
        }
    }
    useEffect(() => {
        dispatch(getAllGroupAction())
        dispatch(getUserBookmarkAction())
    }, [bookmarkedGroup])

    const renderItem = ({ item }) => {
        const { id, name, topic, description, Members, requirements, Tags } = item

        return <TouchableOpacity
            key={item.id}
            style={styles.groupCard}
            onPress={() => {
                navigation.navigate("GroupDetail", { id: id, name: name, topic: topic, description: description, members: Members, requirements: requirements, tags: Tags })
            }}>
            <View style={{ margin: normalize(15), flexDirection: 'column', justifyContent: 'space-around' }}>
                <Text style={{ fontFamily: 'Roboto-Bold', fontSize: normalize(20) }}>
                    {topic.toUpperCase()}</Text>
                <View style={{
                    flexDirection: 'row',
                }}>
                    {Tags.map((tag, index) => (
                        <View key={index} style={{
                            backgroundColor: '#C4C4C4',
                            borderRadius: normalize(7),
                            padding: normalize(5),
                            marginBottom: normalize(10),
                            marginRight: normalize(10)
                        }}>
                            <Text
                                style={{
                                    fontFamily: 'Roboto-Regular',
                                    padding: normalize(5),
                                }}>{tag.name}</Text>
                        </View>
                    ))}
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: normalize(15) }}>
                    <View>
                        <Text
                            style={{
                                fontFamily: 'Roboto-Regular',
                                fontSize: normalize(18),
                            }}
                        >{name.toUpperCase()}</Text>
                        <Text style={{ fontFamily: 'Roboto-Regular', fontSize: normalize(18) }}>MEMBERS: {Members.length}/7</Text>
                    </View>
                    <View style={{ flexDirection: 'row', alignSelf: 'flex-end' }}>
                        <TouchableOpacity onPress={() => {
                            bookmarkedGroup.includes(id) ? likePress(true, id) : likePress(false, id)
                        }}>
                            <Ionicons
                                style={
                                    bookmarkedGroup.includes(id) ? { color: colors.red } : { color: colors.textDark }
                                }
                                name={
                                    bookmarkedGroup.includes(id) ? "heart" : "heart-outline"
                                } size={normalize(30)} />
                        </TouchableOpacity>
                        {user.isTeacher ? <TouchableOpacity>
                            <Ionicons name="ellipsis-vertical-outline" size={normalize(30)} />
                        </TouchableOpacity> : null}
                    </View>
                </View>
            </View>
        </TouchableOpacity >
    }

    return (
        <View>
            <FlatList
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
                data={groupData}
                keyExtractor={item => item.id}
                renderItem={renderItem} />
        </View>

    )
}

const styles = StyleSheet.create({
    groupCard: {
        flex: 1,
        elevation: normalize(10),
        margin: normalize(10),
        width: normalize(350),
        height: normalize(150),
        borderRadius: normalize(10),
        backgroundColor: colors.white
    }
})

const mapStateToProps = (state) => ({
    user: state.auth.user,
    bookmarkedGroup: state.group.bookmarkedGroup
})

export default connect(mapStateToProps, null)(GroupList)
