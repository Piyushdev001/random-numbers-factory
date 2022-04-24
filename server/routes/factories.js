const express = require('express')
const router = express.Router()
const Factory = require('../models/factory')

//Getting all Nodes
router.get('/', async (req, res) => {
    try {
        const factories = await Factory.find()
        res.json(factories)
    } catch(err) {
        res.status(500).json({ message: err.message })
    }
})

//Getting one node
router.get('/:id', getFactory, (req, res) => {
    res.json(res.factory)
})

//Creating one node
router.post('/', async (req, res) => {
    const randomNums = getRandomNums(
        req.body.randomNumCount,
        req.body.randomNumInBound,
        req.body.randomNumOutBound
    )
    if(!randomNums.success) {
        return res.status(400).json({ message: randomNums.message })
    }
    const factory = new Factory({
        name: req.body.name,
        randomNumCount: req.body.randomNumCount,
        randomNumInBound: req.body.randomNumInBound,
        randomNumOutBound: req.body.randomNumOutBound,
        randomNums: randomNums.randomNums
    })

    try {
        const newFactory = await factory.save()
        res.status(201).json(newFactory)
        const io = req.app.get('io')
        io.on('connection', socket => {
            socket.broadcast.emit('factoryAdded', {
                name: req.body.name
            })
        })
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

//Updating one node
router.patch('/:id', getFactory, async (req, res) => {
    const randomNums = getRandomNums(
        req.body.randomNumCount,
        req.body.randomNumInBound,
        req.body.randomNumOutBound
    )
    if(!randomNums.success) {
        return res.status(400).json({ message: randomNums.message })
    }
    res.factory.name = req.body.name
    res.factory.randomNumCount = req.body.randomNumCount
    res.factory.randomNumInBound = req.body.randomNumInBound
    res.factory.randomNumOutBound = req.body.randomNumOutBound
    res.factory.randomNums = randomNums.randomNums

    try {
        const updatedFactory = await res.factory.save()
        res.status(200).json(updatedFactory)
        const io = req.app.get('io')
        io.on('connection', socket => {
            socket.broadcast.emit('factoryUpdated', {
                name: req.body.name
            })
        })
    } catch(err) {
        res.status(400).json({ message: err.message })
    }
})

//Deleting one node
router.delete('/:id', getFactory, async (req, res) => {
    try {
        await res.factory.remove()
        res.json({ message: 'Factory Deleted', name: res.factory.name });
        const io = req.app.get('io')
        io.on('connection', socket => {
            socket.broadcast.emit('factoryDeleted', {
                name: res.factory.name
            })
        })
    } catch {
        res.status(500).json({ message: err.message })
    }
})

async function getFactory(req, res, next) {
    let factory
    try {
        factory = await Factory.findById(req.params.id)
        if(factory == null) {
            return res.status(404).json( { message: 'Cannot find the factory' })
        }
    } catch(err) {
        res.status(500).json( { message: err.message })
    }
    res.factory = factory
    next()
}

function getRandomNums(count, inBound, outBound) {
    if(count < 1) return { "success": false, "message": "Random numbers count should be greater than '0'" }
    if(count > 15) return { "success": false, "message": "Random numbers count should be less than or equal to '15'" }
    if(outBound < inBound) return { "success": false, "message": "Out-bound number should be greated than or eqaul to in-bound number" }
    let randomNums = []
    for(let i = 0; i < count; i++) {
        randomNums.push(Math.floor(Math.random() * (outBound - inBound + 1)) + inBound)
    }
    return { "success": true, "randomNums": randomNums };
}

module.exports = router