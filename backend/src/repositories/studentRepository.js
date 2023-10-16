const Student = require('../models/student.js')

async function addStudent(req){
    try{
        const student = new Student({...req.body});
        return await student.save();
    }
    catch(e){
        throw Error("unable to add Student");
    }
}

async function countStudents(){
    try{
        return await Student.countDocuments();
    }
    catch(e){
        throw Error("unable to parse student collection");
    }
}

async function getStudents(skip, limit){
    try{
        var students = await Student.find().skip(skip).limit(limit);
        return students;
    }
    catch(e){
        throw Error("unable to fetch student records");
    }
}

async function filteredStudents(searchQuery, skip, limit){
    try{
        var students = await Student.find(searchQuery).skip(skip).limit(limit);
        return students;
    }
    catch(e){
        throw Error("unable to find students")
    }
}

async function deleteStudent(id){
    try{
        return await Student.deleteOne({ S_No: id });
    }
    catch(e){
        throw Error("Error while deleting a student record");
    }
}

async function updateStudent(data){
    try{
        await Student.findOneAndUpdate(
            { S_No: data.S_No },
            { class: data.class, address:data.address, contact:data.contact }
        );
        return;
    }
    catch(e){
        throw Error("unable to update student data",e)
    }
}

module.exports = {
    addStudent,
    getStudents,
    countStudents,
    filteredStudents,
    deleteStudent,
    updateStudent
}