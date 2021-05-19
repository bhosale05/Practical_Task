const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true,`The username field is required!`],
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        required: [true,`The password field is required!`],
        minlength: 5
    }
})

module.exports = mongoose.model('user', userSchema)