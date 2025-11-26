let mongoose = require('mongoose')
let Schema = mongoose.Schema

let userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['patient', 'doctor', 'shopkeeper', 'admin'],
        default: 'patient'
    },
    specialization: {
        type: String
    }
} , {timestamps : true})

module.exports = mongoose.model('User', userSchema)
