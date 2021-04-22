const express = require('express')
const app = express();
const PORT = 3002
var cors = require('cors')

const mainRouter = require('./routes/main')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}));

app.use("/api/v1", mainRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

