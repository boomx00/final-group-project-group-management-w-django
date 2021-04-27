import React, { useEffect } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'

import Req from './req'

//Redux
import { connect, useDispatch } from 'react-redux'
import {
    getOwnGroupAction,
    getOwnJoinRequestAction,
    getJoinGroupReqAction
} from '../../redux/slices/groupSlices'

const renderItemR = ({ item }) => {

    return <Req
        key={item.id}
        id={item.id}
        firstName={item.applicant.profile.firstName}
        lastName={item.applicant.profile.lastName}
        studentId={item.applicant.studentId}
        approved={item.approved}
        confirm={item.confirm}
    />
}
//passing
const ReqList = ({ joinList, owner }) => {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getJoinGroupReqAction())
    }, [])
    return (
        <>
            {owner ?
                <View style={styles.reqList}>
                    {joinList.length == 0 ? <Text>No Request</Text> :
                        <FlatList
                            nestedScrollEnabled={true}
                            data={joinList}
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


