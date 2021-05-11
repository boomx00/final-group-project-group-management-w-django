import React, { useState, useEffect, useCallback } from 'react'

// Redux
import { connect, useDispatch } from 'react-redux'
import { getOwnGroupAction } from '../../redux/slices/groupSlices'

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

//  Styling
import normalize from 'react-native-normalize';
import { RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native'
import colors from '../../../assets/colors/colors'

// Components
import OwnGroup from './OwnGroup'
import NoGroup from './NoGroup'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GroupScreen = ({ ownGroup, userId,user }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        if(user.groupId){
        dispatch(getOwnGroupAction(user.groupId))
        }
    },[])
  
   
    const [refreshing, setRefreshing] = useState(false);
    const onRefresh = useCallback(() => {
        setRefreshing(true);
        dispatch(getOwnGroupAction(user.groupId))
        wait(500).then(() => setRefreshing(false));
    }, []);

    return (
        <ScrollView refreshControl={
            <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
            />}
            contentContainerStyle={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>MY GROUP</Text>
            </View >
            {ownGroup.id ?
                <OwnGroup ownGroup={ownGroup} userId={userId} />
                :
                <NoGroup />
            }
        </ScrollView >
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.white,
    },
    header: {
        justifyContent: 'center',
        margin: normalize(20)
    },
    textHeader: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(30),
        textAlign: 'center'
    }
})

const mapStateToProps = (state) => ({
    ownGroup: state.group.ownGroup,
    userId: state.auth.user.id,
    user:state.auth.user
})
export default connect(mapStateToProps, null)(GroupScreen)