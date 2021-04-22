import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, } from 'react-native'
import colors from '../../../assets/colors/colors'
import Ionicons from 'react-native-vector-icons/Ionicons';

// Navigation
import { useNavigation, useFocusEffect } from '@react-navigation/native';

//  Redux
import { connect } from 'react-redux'
import { useDispatch } from 'react-redux'
import { logoutAction } from '../../redux/slices/authSlices'
import normalize from 'react-native-normalize';

const ProfileScreen = ({ user, ownGroup }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch()
  const [groupName, setGroupName] = useState("")
  useEffect(() => {
    if (ownGroup != null) {
      setGroupName(ownGroup.name)
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {

    }, [])
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Bookmark")}
          style={{ right: normalize(70) }}>
          <Ionicons name="heart-outline" size={normalize(35)} color={colors.textDark} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>MY PROFILE</Text>
        <TouchableOpacity style={{ left: normalize(70) }} onPress={() => dispatch(logoutAction())}>
          <Ionicons name="arrow-forward-circle-outline" size={normalize(35)} color={colors.textDark} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <View style={styles.pictName}>
          <View style={{ margin: normalize(5) }}>
            <Ionicons name="person-circle-outline" size={normalize(100)} />
          </View>
          <View style={{ margin: normalize(5) }}>
            <Text style={styles.textName}>NAMA SAYA</Text>
            <Text style={styles.textId}>1825819</Text>
          </View>
        </View>
        <View style={styles.profileDetails}>
          <View style={styles.eachInfo}>
            <Ionicons name="newspaper-outline" size={normalize(25)} color={colors.textDark} />
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.textHeading}>My Description</Text>
              <Text style={styles.textInfo}>Lorem ipsum, bla bla bla, bla bla bla, bla bla bla. Lorem ipsum, bla bla bla, bla bla bla, bla bla bla.</Text>
            </View>
          </View>

          <View style={styles.eachInfo}>
            <Ionicons name="mail-outline" size={normalize(25)} color={colors.textDark} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textInfo}>{user.email}</Text>
            </View>
          </View>

          <View style={styles.eachInfo}>
            <Ionicons name="library-outline" size={normalize(25)} color={colors.textDark} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textInfo}>{user.major}</Text>
            </View>
          </View>

          <View style={styles.eachInfo}>
            <Ionicons name="people-outline" size={normalize(25)} color={colors.textDark} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textInfo}>{groupName}</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.eachInfo}
            onPress={() => navigation.navigate("ChangePassword")}>
            <Ionicons name="key-outline"
              size={normalize(25)}
              color={colors.textDark} />
            <View style={{ flexDirection: 'row' }}>
              <Text style={styles.textInfo}>CHANGE PASSWORD</Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center'
  },
  header: {
    marginTop: normalize(20),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignContent: 'center',
    alignItems: 'center'
  },
  headerTitle: {
    fontFamily: 'Roboto-Bold',
    fontSize: normalize(20)
  },
  card: {
  },
  pictName: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  profileDetails: {
    width: normalize(300),
  },
  eachInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: normalize(30)
  },
  textHeading: {
    fontFamily: 'Roboto-Bold',
    fontSize: normalize(20)
  },
  textInfo: {
    fontFamily: 'Roboto-Regular',
    fontSize: normalize(15),
    marginLeft: normalize(10)
  },
  textName: {
    fontFamily: 'Roboto-Bold',
    fontSize: normalize(25)
  },
  textId: {
    fontFamily: 'Roboto-Light',
    fontSize: normalize(20)
  }

})
const mapStateToProps = (state) => ({
  user: state.auth.user,
  ownGroup: state.group.ownGroup
})
export default connect(mapStateToProps, null)(ProfileScreen)