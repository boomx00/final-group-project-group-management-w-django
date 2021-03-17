import React from 'react'
import { StyleSheet, View, Text } from 'react-native'
import normalize from 'react-native-normalize'

import colors from '../../../assets/colors/colors'

const Group = ({ name, description, logo, tags }) => {
    return (
        <View style={styles.groupCard}>
            <View style={styles.insideCard}>
                <Text style={styles.textTitle}>
                    {name}
                </Text>
                <Text>
                    {description}
                </Text>
                <Text>
                    {tags}
                </Text></View>

        </View>
    )
}

const styles = StyleSheet.create({
    groupCard: {
        borderRadius: 10,
        elevation: 5,
        margin: 5,
        backgroundColor: colors.teal
    },
    insideCard: {
        margin: 5
    },
    textTitle: {
        fontFamily: 'Roboto-Bold',
        fontSize: 25
    }
})

export default Group
