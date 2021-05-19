const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    name : String,
    age : Number,
    phone_number : Number,
    date_of_birth : Date
})

module.exports = mongoose.model('Student', studentSchema)