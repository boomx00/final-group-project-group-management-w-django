import React,{useState,useEffect,useCallback} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen =({route})=>{
    const navigation = useNavigation();
    const{data} = route.params
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        setMessages([
          {
            _id: 1,
            text: 'Hello developer',
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'React Native',
              avatar: 'https://placeimg.com/140/140/any',
            },
          },
        ])
      }, [])

return (
    <View style={styles.header}>
         <Ionicons name="arrow-back-outline"
              size={30} style={styles.arrow }
              onPress={() =>navigation.navigate('Msg')}>
             </Ionicons>   
        <Text style={styles.nama}>
            {data}
        </Text>
    
        <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={{
          _id: 1,
        }}/>
        </View>
)
}
const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])


const styles = StyleSheet.create({
    nama:{
        fontSize:20,
        fontWeight:'bold'
    },
    header:{
        backgroundColor:'orange',
        borderBottomWidth:1,
        borderBottomColor:'black',
        width:'100%',
        height: 40,
        marginBottom:5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'

        
         }, 
    arrow:{
        top:5,
        left:10,
        position:'absolute',
        color:'white'
    },
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center' 
    }
})
export default ChatScreen