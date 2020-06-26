const mongoose = require("mongoose");
var Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: Number,
        required: true

    },
    id:{
        type:Number,
        required:true
    }

})

const User = mongoose.model('User',UserSchema);

module.exports = {User}