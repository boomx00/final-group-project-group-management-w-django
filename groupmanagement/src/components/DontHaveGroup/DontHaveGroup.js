import React, { useEffect } from 'react'

// Stylings
import { View, Text, Image } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'

const DontHaveGroup = () => {
    return (
        <View style={{
        }}>
            <Image source={require('../../../assets/images/Humans1.png')} />
            <Text
                style={{
                    fontFamily: 'Roboto-Bold',
                    fontSize: normalize(30),
                    textAlign: 'center',
                    color: colors.textDark
                }}
            >YOU DONT HAVE A GROUP</Text>
            <Text
                style={{
                    fontFamily: 'Roboto-Regular',
                    fontSize: normalize(18),
                    textAlign: 'center',
                    color: colors.textDark
                }}
            >GO TO HOME PAGE TO JOIN A GROUP OR CREATE NEW GROUP</Text>
        </View>
    )
}

export default DontHaveGroup
