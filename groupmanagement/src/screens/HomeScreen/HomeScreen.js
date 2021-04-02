import React from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { FAB } from 'react-native-paper';
//  Redux
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';
import GroupList from '../../components/Group/GroupList'
import colors from '../../../assets/colors/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Draggable from 'react-native-draggable';
import normalize from 'react-native-normalize'

const HomeScreen = ({ groupList }) => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.textlight }}>
            <View style={styles.header}>
            <Text style={styles.text}>Home</Text>
            <View style={styles.viewmsg}>
            <Ionicons name="mail-outline"
              size={25} style={styles.msg }
              onPress={() =>navigation.navigate('Msg')}>
             </Ionicons>
             </View>
            </View>
            <Draggable x={normalize(320)} y={normalize(600)} z={10} style={{}}>
                <FAB
                    icon="plus"
                    onPress={() => navigation.navigate("Add")}
                /></Draggable>
            <GroupList groupData={groupList} style={{ zIndex: -1 }} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    header:{
        backgroundColor:'orange',
        borderBottomWidth:1,
        borderBottomColor:'black',
        width:'100%',
        height: 40,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'center',

        
         }, 
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        alignSelf:'center'
  
    },
    msg:{
        color:'white'
        

    },
    viewmsg:{
        position: 'absolute',
        right: 15,
        top: 8,
        

    }

})
const mapStateToProps = (state) => ({
    groupList: state.group.list
})

export default connect(mapStateToProps, null)(HomeScreen)
