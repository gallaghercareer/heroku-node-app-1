const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add a name']
    },  
    email: {
        type: String,
        required: [true, 'Please add a email']
    },  
    password: {
        type: String,
        required: [true, 'Please add a password']
    },  
    name: {
        type: String,
        required: [true, 'Please add a name']
    },  

   
},{
 timestamps: true})

module.exports = mongoose.model('User', userSchema)