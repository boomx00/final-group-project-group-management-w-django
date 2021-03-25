import React, { useState, useRef } from 'react'
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize'
import Animated from 'react-native-reanimated';
import BottomSheet from 'reanimated-bottom-sheet';
import colors from '../../../assets/colors/colors';

import Group from './Group'

const GroupList = ({ groupData }) => {
    const [groupDetails, setClickedGroupDetail] = useState();
    const sheetRef = useRef(null);
    const fall = new Animated.Value(1);
    const openBottom = () => {
        sheetRef.current.snapTo(0)
    }
    const renderItem = ({ item }) => {
        return <TouchableOpacity onPress={() => {
            setClickedGroupDetail(item)
            openBottom
        }}>
            <Group
                key={item.id}
                style={styles.groupCard}
                key={item.id}
                topic={item.topic}
                name={item.name}
                description={item.description}
                memberNumber={item.membersID.length}
                likesID={item.likesID}
            />
        </TouchableOpacity >
    }

    const renderContent = () => (
        <View
            style={{
                height: 600,
                padding: 20,
                backgroundColor: colors.white,
            }}
        >
            <Text>{groupDetails == null ? null : groupDetails.name}</Text>
        </View>
    );

    return (
        <FlatList data={groupData} keyExtractor={item => item.id} renderItem={renderItem} />
    )
}

const styles = StyleSheet.create({
    header: {
        backgroundColor: colors.white,
        shadowColor: '#000000',
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    panelHeader: {
        alignItems: 'center',
    },
    panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
    },
})

export default GroupList
