import React, { useState } from 'react'
import { KeyboardAvoidingView, ScrollView,StyleSheet,Text, View,TouchableOpacity, TextInput, Modal} from 'react-native'
import { Avatar} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
//import normalize from 'react-native-normalize';

const EditScreen = ({ user }) => {
  const navigation = useNavigation();
  const [modal,setModal] = useState(false);
    return (
  
        <View style={{flex:1}}>
             <Ionicons name="arrow-back-outline"
              size={30} style={styles.arrow }
              onPress={() =>navigation.navigate('Profile')}>
             </Ionicons>

              <Modal visible={modal}
                transparent ={true}
                animationType='slide'>
              <View style={styles.modalbg} >
                <View style ={styles.modalcontent}>
                <View style ={styles.formmodal}>
                <TouchableOpacity
              onPress={() =>setModal(false)}>
                <Text style={styles.titlemodal}>Camera</Text>
            </TouchableOpacity>
            </View>
            <View style={styles.formmodal} >
             <TouchableOpacity
              onPress={() =>setModal(false)}>
                <Text style={styles.titlemodal}>Select Photo</Text>
            </TouchableOpacity>
            </View>                
                <TouchableOpacity
              onPress={() =>setModal(false)}>
                <Text style={styles.titlemodal}>close</Text>
            </TouchableOpacity>
            </View>
              </View>
            </Modal>
        <KeyboardAvoidingView style={{flex:1}} behavior='height'>
        <ScrollView>
             <View style={styles.profile}>
                 <View style={styles.picture}>
                   <Avatar.Image
                   resizeMode='cover'
                   source= {{
                    uri: 'https://www.pexels.com/photo/people-talking-seating-on-chair-705674/',

                   }}
                   style={{width: '100%',
                   height: '100%',
                   flex: 1 }} 
                   >
                    </Avatar.Image >
                   </View>
             </View>

      <View style={{alignItems: 'center', justifyContent:'center', marginTop: 5}}>
      <TouchableOpacity
              onPress={() =>setModal(true)}>
                <Text style={styles.title}>Change Profile Photo</Text>
            </TouchableOpacity>
    
        <View style ={styles.form}>
            <Ionicons name="person-outline" size={20} style={{marginRight:10}} ></Ionicons>
            <TextInput
            placeholder= 'Username'
            placeholderTextColor='grey' 
            autoCorrect= {false}
            returnKeyType='done'
            style ={{fontSize:15}}
            >      
            </TextInput>
        </View>
        <View style ={styles.form}>
            <Ionicons name="mail-outline" size={20} style={{marginRight:10}} ></Ionicons>
            <TextInput
            placeholder= 'E-mail'
            keyboardType ='email-address'
            placeholderTextColor='grey'
            autoCorrect= {false}
            returnKeyType='done'
            style ={{fontSize:15}}
            >    
            </TextInput>
        </View>
        <View style ={styles.form}>
            <Ionicons name="school-outline" size={20} style={{marginRight:10}} ></Ionicons>
            <TextInput
            placeholder= 'Major'
            placeholderTextColor='grey'
            autoCorrect= {false}
            returnKeyType='done'
            style ={{fontSize:15}}
            >    
            </TextInput>
        </View>
        <View style ={styles.form}>
            <Ionicons name="chatbox-outline" size={20} style={{marginRight:10}} ></Ionicons>
            <TextInput
            placeholder= 'Bio'
            placeholderTextColor='grey'
            autoCorrect= {true}
            multiline={true}
            scrollEnabled ={true}
            editable={true}
            returnKeyType='next'
            style ={{fontSize:15}}
            >    
            </TextInput>
        </View>
        <TouchableOpacity
        style={styles.submit}
                    onPress={() => {}}>
                    <Text style={styles.susbmittxt}>Submit</Text>
                </TouchableOpacity>
     </View>
      
      <View style={{marginTop: 10}}>
      </View>
      </ScrollView>
      </KeyboardAvoidingView>
       </View>
    )
}

const styles = StyleSheet.create({
  arrow:{
    marginTop: 10,
    marginLeft:10

  },
  submit:{
    marginTop: 20,
    width:150,
    height:40,
    borderRadius:10,
    borderWidth:1,
    backgroundColor:'orange',
    justifyContent:'center',
    alignItems:'center'

  },
  susbmittxt:{
    fontSize:15,
    fontWeight:'bold',
    color:'white',

  },
  modalbg:{
    flex:1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent:'center',
    alignItems:'center',
  },
  modalcontent:{
    backgroundColor:'white',
    alignItems:'center',
    justifyContent:'center',
    borderRadius:15,
    width:300,
    height:150,
  },
  panelHeader: {
    alignItems: 'center',
  },
      Header:{
        backgroundColor: '#FFFFFF',
        shadowColor: '#333333',
        shadowOffset: {width: -1, height: -3},
        shadowRadius: 2,
        shadowOpacity: 0.4,
        paddingTop: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
      },
      panelHandle: {
        width: 40,
        height: 8,
        borderRadius: 4,
        backgroundColor: '#00000040',
        marginBottom: 10,
      },
      form:{
        borderBottomColor:'grey',
        borderBottomWidth:1,
        width:'90%',
        flexDirection:'row',
        alignItems:'center',
        marginLeft:15

      },
      formmodal:{
        marginTop:10,
        marginBottom:10,
        borderBottomColor:'grey',
        justifyContent:'center',
        borderBottomWidth:1,
        width:'100%',
        flexDirection:'row',
        alignItems:'center',

      },
      profile:{
        alignContent:'center', 
        alignItems:'center',
        marginTop: 5,
        marginBottom:20,
        flex:1
      },
      picture:{
        height:100,
        width:100,
        justifyContent:'center',
        alignItems:'center',
      },
      titlemodal: {
        fontSize: 20,
        marginBottom:10,
      },
      title: {
        fontSize: 20,
        height: 30,
      },
      subtitle: {
        fontSize: 12,
        color: 'gray',
        height: 35,
        marginBottom: 10,
      },
      
})

export default EditScreen