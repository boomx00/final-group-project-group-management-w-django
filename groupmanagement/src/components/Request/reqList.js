import React from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import normalize from 'react-native-normalize'
import { connect } from 'react-redux'
import colors from '../../../assets/colors/colors'

import Req from './req'

const renderItemR = ({ item }) => {

    return <Req
        key={item.id}
        id={item.id}
        firstName={item.applicant.profile.firstName}
        lastName={item.applicant.profile.lastName}
        studentId={item.applicant.studentId}
        approved={item.approved}
    />
}
//passing
const ReqList = ({ joinList, owner }) => {
    return (
        <>
            {owner ?
                <View style={styles.reqList}>
                    {joinList.length == 0 ? <Text>No Request</Text> : <FlatList data={joinList}
                        keyExtractor={item => item.id}
                        renderItem={renderItemR}
                    />}
                </View>
                :
                <View style={{
                    marginTop: normalize(50),
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignContent: 'center',
                }}>
                    <Image source={require('../../../assets/images/Humans1.png')} />
                    <Text
                        style={{
                            fontFamily: 'Roboto-Bold',
                            fontSize: normalize(30),
                            textAlign: 'center',
                            color: colors.textMedium
                        }}
                    >YOU ARE NOT THE GROUP OWNER</Text>
                    <Text
                        style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: normalize(18),
                            textAlign: 'center',
                            color: colors.textMedium
                        }}
                    >PLEASE CONTACT YOUR GROUP OWNER TO ACCEPT THE JOIN REQUEST</Text>
                </View>
            }
        </>
    )
}


const styles = StyleSheet.create({
    reqList: {
        backgroundColor: colors.white
    },
})
const mapStateToProps = (state) => ({
    joinList: state.group.joinGroupRequest
})

export default connect(mapStateToProps, null)(ReqList)


