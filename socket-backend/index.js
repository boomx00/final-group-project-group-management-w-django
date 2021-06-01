const httpServer = require("http").createServer();
const PORT = 3005
const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
    },
});

// Models
const Notification = require('./database/models/Notification')

// Controllers
const notificationController = require("./controllers/notificationController")


let users = []

const onConnection = async (socket) => {
    console.log('ss')

    const { userId } = socket.handshake.query
    const isExists = users.some(user => {
        if (user.userId == userId) {
            user.socketId = socket.id
            return true
        } else {
            return false
        }
    })
    if (!isExists) {
        users.push({ socketId: socket.id, userId })

    }
    const notifications = await Notification.find({ receiverId: userId, status: "SENDING" })
    if (notifications.length == 0) {

    } else {
        socket.emit("notification:unreceived", notifications, async (res) => {
            console.log(res)
            if (res) {
                await Notification.updateMany({ receiverId: userId }, { $set: { status: 'RECEIVED' } })
            } else {

            }
        })
    }
    socket.on("disconnect", (payload) => {
        const newUsers = users.filter(user => user.socketId != socket.id)
        users = newUsers
        console.log(users)
    })
    notificationController(socket, io, users)
}
io.on("connection", onConnection);

httpServer.listen(PORT, () => {
    console.log(`Server is started at port ${PORT}`)
});

// Mongoose
//Import the mongoose module
const mongoose = require('mongoose');

//Set up default mongoose connection
var mongoDB = 'mongodb://127.0.0.1/group-management-app';
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

//Get the default connection
var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
db.on('error', console.error.bind(console, 'MongoDB connection error:'));