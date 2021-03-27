import React, { useState, useCallback, useEffect } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { GiftedChat } from 'react-native-gifted-chat'

const ChatScreen =({route})=>{
    const navigation = useNavigation();
    const{data} = route.params

return (
  <View>
    <View style={styles.header}>
         <Ionicons name="arrow-back-outline"
              size={30} style={styles.arrow }
              onPress={() =>navigation.navigate('Msg')}>
             </Ionicons>   
        <Text style={styles.nama}>
            {data}
        </Text>
        </View>
        <View style={{width:'100%',height:'90%'}}>
          
          <Chat/>
        </View>
        </View>
)
}
const scrollToBottomComponent =()=>{
  return(
    <Ionicons name="arrow-down-outline"
              size={20} style={styles.arrow }>
             </Ionicons>   
  )  
}
const Chat = () => {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello!!!',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'KKKK',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
    ])
  }, [])

  const onSend = useCallback((messages = []) => {
    setMessages(previousMessages => GiftedChat.append(previousMessages, messages))
  }, [])

  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      alwaysShowSend
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      user={{
        _id: 1,
      }}
    />
  )
}

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