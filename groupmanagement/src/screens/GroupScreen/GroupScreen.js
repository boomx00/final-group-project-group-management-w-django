import React, { useState, useEffect } from 'react'

// Redux
import { connect, useDispatch } from 'react-redux'
import { getOwnGroupAction, leaveGroupAction } from '../../redux/slices/groupSlices'

// Navigation
import { useNavigation } from '@react-navigation/native';

//  Styling
import normalize from 'react-native-normalize';
import { TouchableOpacity, RefreshControl, ScrollView, StyleSheet, Text, View, TextInput } from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

// Components
import OwnGroup from './OwnGroup'
import NoGroup from './NoGroup'

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const GroupScreen = ({ ownGroup, userId }) => {
    const navigation = useNavigation();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getOwnGroupAction())
    }, [])
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setSprintClicked(false)
        dispatch(getOwnGroupAction())
        wait(500).then(() => setRefreshing(false));
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.textHeader}>MY GROUP</Text>
            </View >
            {ownGroup.id != "" ?
                <OwnGroup ownGroup={ownGroup} userId={userId} />
                :
                <NoGroup />
            }
        </View >
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
    userId: state.auth.user.id
})
export default connect(mapStateToProps, null)(GroupScreen)