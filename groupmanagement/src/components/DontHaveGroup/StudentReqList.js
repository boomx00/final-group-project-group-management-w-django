import React, { useEffect } from 'react'
import { SafeAreaView, View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native'
import normalize from 'react-native-normalize';
import colors from '../../../assets/colors/colors';

import { connect, useDispatch } from 'react-redux'
import { confirmJoinAction, cancelJoinAction } from '../../redux/slices/groupSlices'

const StudentReqList = ({ ownJoinReq, groupList,user }) => {
    const dispatch = useDispatch()
    const renderItem = ({ item }) => {
        const group = groupList.find(x => x.id == item.groupname_id)
        console.log(item)
        const confirmjoin = () =>{
            // console.log(item)
            dispatch(confirmJoinAction(item.userid,item.groupname_id,user.firstName, user.applied))
            // navigation.navigate('Home')
        }
        return (
            <View style={styles.card} key={item.id}>
                <View style={{
                    flexDirection: 'row',
                    alignContent: 'center',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <View style={{
                        margin: normalize(20)
                    }}>
                        <Text style={styles.textBold}>JOIN GROUP:</Text>
                        <Text style={styles.textRegular}>{group.topic}</Text>
                    </View>
                    <View style={styles.statusBox}>

                        <Text style={styles.textRegular}>{item.status == "tbd" ? "PENDING"
                            : item.status == "accepted"
                                ? "ACCEPTED"
                                : "DECLINED"}</Text>
                    </View>
                </View>
                <View style={{ justifyContent: 'center' }}>
                    {item.status == "accepted" ?
                        item.confirmed == "accepted" || item.confirm == "declined" ? null :
                            <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                                <TouchableOpacity onPress={() => confirmjoin()}
                                    style={styles.joinBox}>
                                    <Text style={styles.textRegular}>JOIN</Text>
                                </TouchableOpacity>
                            </View>
                        : null
                    }
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                nestedScrollEnabled={true}
                data={ownJoinReq}
                renderItem={renderItem}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
    },
    card: {
        backgroundColor: colors.white,
        margin: normalize(20),
        borderRadius: normalize(20),
        elevation: normalize(20),
        height: normalize(140),
        flexDirection: 'column',
    },
    statusBox: {
        borderRadius: normalize(10),
        borderWidth: 0.5,
        padding: normalize(10),
        marginRight: normalize(20)
    },
    joinBox: {
        borderRadius: normalize(10),
        borderWidth: 0.5,
        padding: normalize(10),
        width: normalize(300),
    },
    textBold: {
        fontFamily: 'Roboto-Bold',
        fontSize: normalize(20),
    },
    textRegular: {
        fontFamily: 'Roboto-Regular',
        fontSize: normalize(18),
        textAlign: 'center'
    },
    textLight: {
        fontFamily: 'Roboto-Light',
        fontSize: normalize(15),
    }
})

const mapStateToProps = (state) => ({
    groupList: state.group.list,
    user : state.auth.user
})

export default connect(mapStateToProps, null)(StudentReqList)
