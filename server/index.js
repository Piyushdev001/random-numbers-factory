require('dotenv').config()
const path = require('path')
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const { Server } = require('socket.io')

const app = express()

//Middleware
app.use(express.json())
app.use(cors())
mongoose.connect(process.env.MONGODB_URL || "mongodb+srv://piyushdev:7es71234@cluster0.azzva.mongodb.net/treenodes?retryWrites=true&w=majority")
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.on('open', () => console.log('Connected to Database'))

const factoriesRouter = require('./routes/factories')
app.use('/api/factories', factoriesRouter)

const port = process.env.PORT || 3000

if(process.env.NODE_ENV === 'production') {
    app.use(express.static(__dirname + '/public'))

    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

const server = app.listen(port, console.log(`Server started on port:${port}`))

const io = new Server(server, {
    cors: {
        origin: '*'
    }
})
app.set('io', io)