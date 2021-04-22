import React from 'react'

//  Stylings
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import colors from '../../../assets/colors/colors'
import normalize from 'react-native-normalize'
import Ionicons from 'react-native-vector-icons/Ionicons';

// Navigation
import { useNavigation } from '@react-navigation/native';
import { joinGroupAction } from '../../redux/slices/groupSlices';

const NoGroup = () => {
    const navigation = useNavigation()
    return (
        <View style={styles.container}>
            <Ionicons name="people-outline" size={normalize(110)} color={colors.textDark} />
            <Text style={styles.textHeading}>YOU ARE NOT REGISTERED IN ANY GROUP</Text>
            <View style={{ marginTop: normalize(25) }}>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("Home")}>
                    <Text style={styles.textButton}>FIND A GROUP</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateGroup")}>
                    <Text style={styles.textButton}>CREATE A NEW GROUP</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: normalize(100)
    },
    textHeading: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(30),
        textAlign: 'center',
        width: normalize(200)
    },
    button: {
        backgroundColor: '#008BFF',
        borderRadius: normalize(10),
        height: normalize(50),
        width: normalize(250),
        margin: normalize(10),
        elevation: normalize(5),
        alignItems: 'center',
        justifyContent: 'center'
    },
    textButton: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
        color: colors.white,
        textAlign: 'center'
    }
})
export default NoGroup
