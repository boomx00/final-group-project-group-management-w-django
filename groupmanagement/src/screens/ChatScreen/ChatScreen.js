import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const ChatScreen =({item})=>{
    const navigation = useNavigation();

return (
    <View style={styles.header}>
                <Ionicons name="arrow-back-outline"
              size={30} style={styles.arrow }
              onPress={() =>navigation.navigate('Msg')}>
             </Ionicons>
        <Text>
            Chat Screen :
            {item}
        </Text>
    </View>
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
    arrow:{
        top:10,
        left:10,
        position:'absolute'
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
export default ChatScreen