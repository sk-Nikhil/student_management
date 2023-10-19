const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://taskapp:Nikhil29@clusters.yst9fuj.mongodb.net/student_management?retryWrites=true&w=majority', {
    useNewUrlParser: true
})
.then(()=>{
    console.log("database connected successfully");
}).catch((err)=>{
    console.log(err);
});
