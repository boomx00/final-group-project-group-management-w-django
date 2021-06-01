const mongoose = require('mongoose')
const Schema = mongoose.Schema
const notificationSchema = new Schema({
    senderId: {
        type: String, require: true
    },
    receiverId: {
        type: String, require: true
    },
    notification_type: {
        type: String,
    },
    message: {
        type: String
    },
    status: {
        type: String
    }
})

module.exports = mongoose.model('Notification', notificationSchema)