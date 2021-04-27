import React, { useEffect, useState, useCallback } from 'react'

//  Styling
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

//  Components
import GroupList from '../../components/Group/GroupList'

//  Redux
import { connect, useDispatch } from 'react-redux'
import { getAllGroupAction } from '../../redux/slices/groupSlices'

//  Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { ScrollView } from 'react-native-gesture-handler';


const HomeScreen = ({ groupList }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();
    useFocusEffect(
        useCallback(() => {
            dispatch(getAllGroupAction())
        }, [])
    );
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.white }}>
            <View style={styles.header}>
                <Text style={styles.text}>Home</Text>
                <View style={styles.viewmsg}>
                    <Ionicons name="chatbubble-ellipses-outline"
                        size={30} style={styles.msg}
                        onPress={() => navigation.navigate('Messages')}>
                    </Ionicons>
                </View>
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <GroupList groupData={groupList} />
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: normalize(40),
        marginBottom: normalize(5),
        flexDirection: 'row',
        justifyContent: 'center',
    },
    text: {
        fontSize: normalize(20),
        fontWeight: 'bold',
        color: 'black',
        alignSelf: 'center'

    },
    msg: {
        color: 'black'
    },
    viewmsg: {
        position: 'absolute',
        right: 15,
        top: 8,
    }

})
const mapStateToProps = (state) => ({
    groupList: state.group.list
})

export default connect(mapStateToProps, null)(HomeScreen)
