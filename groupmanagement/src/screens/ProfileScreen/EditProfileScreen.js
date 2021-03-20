import React, { useState } from 'react'
import {Alert,StyleSheet,SafeAreaView,Text, View,TouchableOpacity, TextInput} from 'react-native'
import colors from '../../../assets/colors/colors'
import { connect } from 'react-redux'
import { useNavigation } from '@react-navigation/native';


const EditScreen = () => {
    const [Group, setGroup] = useState()
    const [Description, setDesc] = useState()

    return (
        <SafeAreaView >
 <View style={styles.panel}>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.title}>Upload Photo</Text>
        <Text style={styles.subtitle}>Choose Your Profile Picture</Text>
      </View>

    </View>                       
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
      title: {
        fontSize: 25,
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