import React, { useEffect,useState } from 'react'
import { View, Text, StyleSheet, FlatList, Image } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
import { Dialog, Portal, Button, Provider } from 'react-native-paper';

import Req from './req'

//Redux
import { connect, useDispatch } from 'react-redux'
import {
    getOwnGroupAction,
    getOwnJoinRequestAction,
    getJoinGroupReqAction
} from '../../redux/slices/groupSlices'


//passing
const ReqList = ({ joinList, owner, user,ownGroup,full,socket }) => {
    const [visible, setVisible] = useState(false);
    const showDialog = () => setVisible(true);
    const hideDialog = () => setVisible(false);
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getJoinGroupReqAction(user.groupId))
    }, [])
    const [clickedUser, setClickedUser] = useState({
        userids:{
            firstName:"",
            username:"",
            bio:"",
            major:""
        }
    });
    // console.log(ownGroup.members.length)
    const renderItemR = ({ item }) => {
        
        return <Req
            key={item.id}
            id={item.groupname.id}
            firstName={item.firstName}
            lastName={item.lastName}
            studentId={item.userid}
            approved={item.status}
            confirm = {item.confirmed}
            socket={socket}
            clickedUser={() => {
                setClickedUser(item)
                // console.log(clickedUser.userids.major)
                showDialog()
            }}
        />
    }
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
            full
            ?
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
                    >YOUR GROUP IS FULL</Text>
                    <Text
                        style={{
                            fontFamily: 'Roboto-Regular',
                            fontSize: normalize(18),
                            textAlign: 'center',
                            color: colors.textMedium
                        }}
                    >REMOVE MEMBERS IF YOU WOULD LIKE TO FIND NEW ONES</Text>
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
            <Portal>
                <Dialog visible={visible} onDismiss={hideDialog}>
                    <Dialog.Title>User Details</Dialog.Title>
                    <Dialog.Content>
                        <Text style={styles.textHead}>Name:</Text>
                        <Text style={styles.textReg}>{clickedUser.firstName} {clickedUser.lastName}</Text>
                        <Text style={styles.textHead}>Student ID:</Text>
                        <Text style={styles.textReg}>{clickedUser.userid}</Text>
                        <Text style={styles.textHead}>Major:</Text>
                        <Text style={styles.textReg}>{clickedUser.userids.major}</Text>
                        <Text style={styles.textHead}>Description:</Text>
                        <Text style={styles.textReg}>{clickedUser.userids.bio}</Text>
                    </Dialog.Content>
                    <Dialog.Actions>
                        <Button onPress={hideDialog}>Done</Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>
        </>
    )
}


const styles = StyleSheet.create({
    reqList: {
        backgroundColor: colors.white
    },
})
const mapStateToProps = (state) => ({
    joinList: state.group.joinGroupRequest,
    user: state.auth.user,
    ownGroup:state.group.ownGroup
})

export default connect(mapStateToProps, null)(ReqList)


