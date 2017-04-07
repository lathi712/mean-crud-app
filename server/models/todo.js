const mongoose = require('mongoose');

var Todo = mongoose.model('Todo',{
    todo:{
      type:String,
      required:true,
      trim:true,
      minlength:1
    },
    isCompleted:{
      type:Boolean,
      default:false
    }
});

module.exports ={Todo};
