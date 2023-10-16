const Student = require("../models/student.js");
const studentRepository = require('../repositories/studentRepository.js')

async function addStudent(req){
    return studentRepository.addStudent(req);
}

async function getStudents(skip, limit){
    return studentRepository.getStudents(skip, limit)
};

// count no of students in the collection
async function countStudents(){
    return studentRepository.countStudents()
}

// filter students based on the search query
async function filteredStudents(searchQuery, skip, limit){
    return studentRepository.filteredStudents(searchQuery, skip, limit)
}

async function deleteStudent(id){
    return studentRepository.deleteStudent(id)
}

async function updateStudent(studentData){
    return studentRepository.updateStudent(studentData  )
}

module.exports = {
    addStudent,
    getStudents,
    countStudents,
    filteredStudents,
    deleteStudent,
    updateStudent
}