const { default: mongoose } = require('mongoose')
const mongoos = require('mongoose')

const factorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    randomNumCount: {
        type: Number,
        required: true
    },
    randomNumInBound: {
        type: Number,
        required: true
    },
    randomNumOutBound: {
        type: Number,
        required: true
    },
    randomNums: {
        type: Array,
        required: false
    }
})

module.exports = mongoos.model('Factory', factorySchema)