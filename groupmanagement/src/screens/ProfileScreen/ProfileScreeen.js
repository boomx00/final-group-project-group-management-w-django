import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, Text, View, } from 'react-native'
import { Avatar, Title, Caption } from 'react-native-paper';
import colors from '../../../assets/colors/colors'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const ProfileScreen = ({ user }) => {
  const navigation = useNavigation();


  return (

    <SafeAreaView style={styles.container}>

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
            style={{ color: 'orange', marginTop: 15, marginLeft: 100 }}
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

    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  grouptxt: {

    alignSelf: 'center'
  },
  groupInfo: {
    marginTop: 10,
    borderBottomColor: 'grey',
    borderTopColor: 'grey',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: 50,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    marginTop: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  userImg: {
    height: 150,
    width: 150,
    borderRadius: 75,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 10,
  },
  aboutUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    textAlign: 'center',
    marginBottom: 10,
  },
  userBtnWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 10,
  },
  userBtn: {
    borderColor: '#2e64e5',
    borderWidth: 2,
    borderRadius: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  userBtnTxt: {
    color: '#2e64e5',
  },
  userInfoWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginVertical: 20,
  },
  userInfoItem: {
    borderTopColor: 'grey',
    borderTopWidth: 3,
    justifyContent: 'center',
    marginTop: 15,
  },
  userInfoTitle: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  userInfoSubTitle: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
})
const mapStateToProps = (state) => ({
  user: state.auth.user
})
export default connect(mapStateToProps, null)(ProfileScreen)