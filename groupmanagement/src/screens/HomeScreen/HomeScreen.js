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
            <Text style={styles.text}>HOME</Text>
            <View style={styles.viewmsg}>
            <Ionicons name="chatbubble-ellipses-outline"
              size={25} style={styles.msg }
              onPress={() =>navigation.navigate('Msg')}>
             </Ionicons>
             </View>
            </View>
            <Draggable  x={normalize(300)} y={normalize(490)} z={10} >
                <FAB
                    style={styles.fab}
                    small
                    color= 'black'
                    icon="plus"                    
                    onPress={() => navigation.navigate("Add")}
                /></Draggable>
                <View style={{marginBottom:70}}>
            <GroupList groupData={groupList} style={{ zIndex: -1}} />
            </View>
            
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    fab:{
        backgroundColor:'white',
         borderWidth:2,
          borderColor:'black'
    },
    header:{
        backgroundColor:'white',
        width:'100%',
        height: 50,
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
        color:'black',
        marginTop:5
        

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
