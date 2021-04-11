import React, { useState } from 'react'
import {ScrollView,StyleSheet,SafeAreaView,Text, View,TouchableOpacity, TextInput} from 'react-native'
//import colors from '../../../assets/colors/colors'
import MsgList from '../../components/Message/Msglist';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { connect } from 'react-redux'
import colors from '../../../assets/colors/colors';


const aprvgroup = () => {
    const navigation = useNavigation()

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.textlight }}>
            <View style={styles.header}>
            <Text style={styles.text}>APPROVAL REQUEST</Text>
        <View style={styles.backk}>
        <Ionicons name="arrow-back-outline"
              size={25} style={styles.back }
              onPress={() =>navigation.navigate('Main:Group')}>
             </Ionicons>
        </View>
        </View>
     
            
       
        </SafeAreaView>
    )
}
//<MsgList mssg={msgList} style={{ zIndex: -1 }} />

const styles = StyleSheet.create({
    choice:{
        backgroundColor:'white',
        flexDirection: 'row',
        height: 30,
        marginBottom:5
    },
    container:{
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft:5,
        marginRight:5, 
    },
    box:{
        borderBottomColor: 'black',
        borderBottomWidth: 2,       
    },
    boxx:{
        borderBottomColor: 'white',
        borderBottomWidth:2,
    },
    header:{
        backgroundColor:'white',
        width:'100%',
        height: 50,
        flexDirection:'row',
        justifyContent:'center',

        
         }, 
    text:{
        fontSize:20,
        fontWeight:'bold',
        color:'black',
        alignSelf:'center'
  
    },
    text2:{
        fontSize:14,
        color:'black',
        fontWeight:'bold',
        alignSelf:'center'
        
  
    },

    back:{
        marginTop:10,
        color:'black'
        

    },
    backk:{
        position: 'absolute',
        left: 15,
        top: 8,
    }
})
const mapStateToProps = (state) => ({
    msgList: state.msg.list
})
export default connect(mapStateToProps, null)(aprvgroup)