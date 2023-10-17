const Student = require('../models/student.js')

async function addStudent(studentData){
    try{
        const student = new Student(studentData);
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
        return await Student.deleteOne({ _id: id });
    }
    catch(e){
        throw Error("Error while deleting a student record");
    }
}

async function updateStudent(data){
    try{
        await Student.findOneAndUpdate(
            { _id: data._id },
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