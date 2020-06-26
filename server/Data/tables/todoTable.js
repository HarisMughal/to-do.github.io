const mongoose = require("mongoose");
var Schema = mongoose.Schema;
var ObjectIdSchema = Schema.ObjectId;

const TodoSchema = new mongoose.Schema({
    task:{
        type: String,
        required: true
    },
    userId: {
        type: Number,
        required: true

    },
    complete:{
        type:Boolean,
        required: true
    }

})

const Todo = mongoose.model('Todo',TodoSchema);

module.exports = {Todo}