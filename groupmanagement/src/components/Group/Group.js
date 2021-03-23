// Stylings
import React, { useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import normalize from 'react-native-normalize'
import colors from '../../../assets/colors/colors'
import { Modal, Portal } from 'react-native-paper';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';

//Redux
import { connect } from 'react-redux'

const Group = ({ name, description, topic, tags, memberNumber, likesID, user }) => {
    const [visible, setVisible] = React.useState(false);

    const showModal = () => setVisible(true);
    const hideModal = () => setVisible(false);

    const containerStyle = { backgroundColor: 'white', padding: 0 };
    return (
        <View style={styles.groupCard}>
            <Portal>
                <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
                    <Text>Example Modal.  Click outside this area to dismiss.</Text>
                </Modal>
            </Portal>
            <View style={styles.insideCard}>
                <Text style={styles.textTitle}>
                    {topic}
                </Text>
                <Text style={styles.textSubtitle}>
                    {name}
                </Text>
                <Text>
                    Members: {memberNumber} / 7
                    </Text>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: normalize(20) }}>
                    <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
                        <Ionicons
                            style={
                                likesID.includes(user.id) ? { color: colors.red } : {}
                            }
                            name={
                                likesID.includes(user.id) ? "heart" : "heart-outline"
                            } size={30} />
                    </TouchableOpacity>
                    <TouchableOpacity style={{ alignSelf: 'flex-end' }} onPress={() => { showModal() }}>
                        <Ionicons name="ellipsis-vertical-outline" size={30} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    groupCard: {
        margin: normalize(5),
        elevation: normalize(5),
        height: normalize(150),
        borderRadius: 10,
        backgroundColor: colors.white
    },
    insideCard: {
        margin: normalize(10)
    },
    textTitle: {
        fontFamily: 'Roboto-Bold',
        color: colors.red,
        fontSize: normalize(23),
        borderBottomWidth: normalize(4),
        borderBottomColor: colors.teal,
        margin: normalize(5)
    },
    textSubtitle: {
        fontFamily: 'Roboto-Regular',
        color: colors.orange,
        fontSize: normalize(25)
    },
    textParagraph: {

    }
})

const mapStateToProps = (state) => ({
    user: state.auth.user
})

export default connect(mapStateToProps, null)(Group)
