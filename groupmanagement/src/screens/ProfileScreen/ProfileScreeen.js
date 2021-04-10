import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Text, View, TouchableOpacity, } from 'react-native'
import { Avatar, Title, Caption } from 'react-native-paper';
//import colors from '../../../assets/colors/colors'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

import { useDispatch } from 'react-redux'
import { logoutAction } from '../../redux/slices/authSlices'

const ProfileScreen = ({ user }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()

  return (

    <SafeAreaView style={styles.container}>
              <View style={styles.header}>
            <Text style={styles.text}>MY PROFILE</Text>
            </View>
      <View style={styles.things}>
      <View style={styles.userInfoTitle}>
        <View style={{ flexDirection: 'row', marginTop: 10 }}>
          <Avatar.Image source={{
            uri: 'https://www.pexels.com/photo/people-talking-seating-on-chair-705674/',
          }}
            size={80}
          />
          <View style={{ marginTop: 10, marginLeft: 20 }}>
            <Title styles={styles.Title}>{user.firstName + " " + user.lastName}</Title>
            <Caption style={styles.Caption}>{user.studentID}</Caption>

          </View>
          <Ionicons name="create-outline" size={20}
            style={{ color: 'black', marginTop: 15, marginLeft: 100 }}
            onPress={() => navigation.navigate('Edit')}
          ></Ionicons>

        </View>
      </View>

      <View style={styles.userInfoItem}>
        <View style={styles.row}>
          <Ionicons name="mail-outline" size={20} style={{ marginRight: 10 }} ></Ionicons>
          <Text>{user.email}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="school-outline" size={20} style={{ marginRight: 10 }}></Ionicons>
          <Text>{user.major}</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="calendar-outline" size={20} style={{ marginRight: 10 }}></Ionicons>
          <Text>SD123</Text>
        </View>
        <View style={styles.row}>
          <Ionicons name="chatbox-outline" size={20} style={{ marginRight: 10 }}></Ionicons>
          <Text>{user.interestedIn}</Text>
        </View>
      </View>
      <TouchableOpacity style={{ borderWidth: 5 }} onPress={() => { dispatch(logoutAction()) }}>
        <Text>Log out</Text>
      </TouchableOpacity>
      </View>
    </SafeAreaView>

  )
}
const styles = StyleSheet.create({

  things:{
    margin : 20
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
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  container: {
    flex: 1,
  },
  userInfoItem: {
    justifyContent: 'center',
    marginTop: 15,
  },
  userInfoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  Title:{
    textTransform: 'uppercase'
  }
})
const mapStateToProps = (state) => ({
  user: state.auth.user
})
export default connect(mapStateToProps, null)(ProfileScreen)