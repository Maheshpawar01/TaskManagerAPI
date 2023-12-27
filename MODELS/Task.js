const mongoose = require('mongoose');
// const bcrypt = require('bcrypt');

const taskSchema = new mongoose.Schema({
    description: {type: String, require:true},
    completed: { type: Boolean, default:false},
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        rquired: true,
        ref: "User"
    }
},{
    timestamps : true
});


const Task = mongoose.model("Task", taskSchema);
module.exports = Task;