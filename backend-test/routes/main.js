require('dotenv').config()
const app = require('express').Router();

// Routers
const authRouter = require('./authRouter')
const profileRouter = require('./profileRouter')
const groupRouter = require('./groupRouter')

app.use("/auth", authRouter)
app.use("/profile", profileRouter)
app.use("/group", groupRouter)

module.exports = app;