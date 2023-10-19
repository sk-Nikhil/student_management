const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    id:{
        type:String,
        required:true,
        trim:true
    },
    name:{
        type:String,
        required:true,
        trim:true
    },
    parent:{
        type:String,
        required:true,
        trim:true
    },
    class:{
        type:String,
        required:true,
        trim:true
    },
    address:{
        type:String,
        required:false,
        trim:true
    },
    contact:{
        type:String,
        required:true,
        trim:true
    }
});


const Student = mongoose.model('student', studentSchema);
module.exports = Student;