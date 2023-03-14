const mongoose = require('mongoose')

const codeSavingSchema = mongoose.Schema({
    user: {
        required: true,
        type: String,
    },
    roomId: {
        required: true,
        type: String,
    },
    code: {
        required: true,
        type: String,
    },
    date: {
        required: true,
        type: String,
    },
})

const projectCode = mongoose.model('codeHistory', codeSavingSchema)

module.exports = projectCode;