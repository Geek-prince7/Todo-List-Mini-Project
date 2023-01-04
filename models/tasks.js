const mongoose=require('mongoose');


const todoSchema=new mongoose.Schema({
    description:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    due_date:{
        type:Date,
        required:true
    }
})


const todoList=mongoose.model('todo',todoSchema)
module.exports=todoList;