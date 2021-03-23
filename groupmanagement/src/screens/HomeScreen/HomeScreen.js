import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper';
//  Redux
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import GroupList from '../../components/Group/GroupList'
import colors from '../../../assets/colors/colors';

const HomeScreen = ({ groupList }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.textlight }}>
            <FAB style={styles.fab}
                icon="plus"
                onPress={() => navigation.navigate('Add')}
            />
            <GroupList groupData={groupList} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fab: {
        position: 'absolute',
        margin: 16,
        right: 0,
        bottom: 0,
    }
})
const mapStateToProps = (state) => ({
    groupList: state.group.list
})

export default connect(mapStateToProps, null)(HomeScreen)
