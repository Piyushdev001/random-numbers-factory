require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const http = require('http')
const socketIO = require('socket.io')

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

const server = http.createServer(app)

server.listen(port, console.log(`Server started on port:${port}`))

const io = socketIO(server, {
    cors: {
        origin: '*'
    }
})
io.on('connection', socket => {
    console.log("User connected: "+socket.id)
    socket.on('factoryAdded', name => {
        socket.broadcast.emit('factoryAdded', name)
    })
    socket.on('factoryUpdated', name => {
        socket.broadcast.emit('factoryUpdated', name)
    })
    socket.on('factoryDeleted', name => {
        console.log('in delete')
        socket.broadcast.emit('factoryDeleted', name)
    })
})
app.set('io', io)