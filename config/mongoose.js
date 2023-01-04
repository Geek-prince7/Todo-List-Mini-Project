const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/todo_list')


const db=mongoose.connection;
//ignoring errors
console.log("connected to db ")

module.exports=db;