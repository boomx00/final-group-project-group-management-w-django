import React from 'react'
import { SafeAreaView,StyleSheet } from 'react-native'
import { FAB } from 'react-native-paper';
//  Redux
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import GroupList from '../../components/Group/GroupList'

const HomeScreen = ({ groupList }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FAB style={styles.fab}
                small
                icon="plus"
                onPress={() => navigation.navigate('Add')}
  />
            <GroupList groupData={groupList} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fab:{
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
