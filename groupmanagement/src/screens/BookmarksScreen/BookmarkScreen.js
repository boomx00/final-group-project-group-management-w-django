import React, { useState, useEffect } from 'react'

// Stylings
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';
import normalize from 'react-native-normalize';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

// Components
import GroupList from '../../components/Group/GroupList'

// Redux
import { connect, useDispatch } from 'react-redux'
import { getUserBookmarkAction } from '../../redux/slices/groupSlices'

const BookmarkScreen = ({ bookmarkedGroup, groupList }) => {
    const [filteredGroup, setFilteredGroup] = useState([])
    const dispatch = useDispatch()
    const navigation = useNavigation()

    useFocusEffect(
        React.useCallback(() => {
            const filter = groupList.filter(group => {
                if (bookmarkedGroup.includes(group.id)) {
                    return group
                }
            })
            setFilteredGroup(filter)
        }, [bookmarkedGroup])
    );
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                        position: 'absolute',
                        right: normalize(200)
                    }}>
                    <Ionicons
                        name="arrow-back-outline"
                        size={normalize(30)} color={colors.textDark} />
                </TouchableOpacity>
                <Text
                    style={{
                        fontFamily: 'Roboto-Bold',
                        fontSize: normalize(25)
                    }}
                >Bookmark</Text>
            </View>
            <GroupList groupData={filteredGroup} />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
        alignItems: 'center'
    },
    header: {
        marginTop: normalize(20),
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    }
})

const mapStateToProps = (state) => ({
    bookmarkedGroup: state.group.bookmarkedGroup,
    groupList: state.group.list
})

export default connect(mapStateToProps, null)(BookmarkScreen)
