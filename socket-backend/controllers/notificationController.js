// Models
const Notification = require('../database/models/Notification')

module.exports = async (socket, io, users) => {
    const joinGroupController = async (payload) => {
        try {
            const user = users.filter(user => {
                return user.userId == payload.recvId
            })
            if (user.length == 0) {
                const queuedMessage = new Notification({
                    senderId: payload.sndrId,
                    receiverId: payload.recvId,
                    notification_type: payload.type,
                    message: payload.msg,
                    status: "SENDING"
                })
                await queuedMessage.save()
            } else {
                io.to(user[0].socketId).emit("notification:newNotification", payload)
            }

        } catch (err) {

        }
    }
    const proposalController = async (payload) => {
        try {
            payload.recvId.map(receiver => {
                if (users.some(user => user.userId == receiver.id)) {
                    const user = users.filter(user => {
                        return user.userId == receiver.id
                    })
                    io.to(user[0].socketId).emit("notification:newNotification", payload)
                } else {
                    const queuedMessage = new Notification({
                        senderId: payload.sndrId,
                        receiverId: receiver.id,
                        notification_type: payload.type,
                        message: payload.msg,
                        status: "SENDING"
                    })
                    queuedMessage.save()
                }
            })
            if (user.length == 0) {
                const queuedMessage = new Notification({
                    senderId: payload.sndrId,
                    receiverId: payload.recvId,
                    notification_type: payload.type,
                    message: payload.msg,
                    status: "SENDING"
                })
                await queuedMessage.save()
            } else {
                io.to(user[0].socketId).emit("notification:newNotification", payload)
            }

        } catch (err) {

        }
    }

    socket.on("notification:accept-join-group", joinGroupController)
    socket.on("notification:decline-join-group", joinGroupController)
    socket.on("notification:accept-group-proposal", proposalController)
}