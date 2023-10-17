const studentRepository = require('../repositories/studentRepository.js')

async function addStudent(studentData){
    return studentRepository.addStudent(studentData);
}

async function getStudents(page, limit){
    const skip = (page - 1) * limit;
    return studentRepository.getStudents(skip, limit);
};

// count no of students in the collection
async function countStudents(){
    return studentRepository.countStudents();
}

// filter students based on the search query
async function filteredStudents(searchTerm, page, limit){

    // searchQuery, to filter data based on the searchTerm from named fields
    const searchQuery = {
        $or: [
            // { S_No: { $eq: parseInt(searchTerm) } },
            { name: { $regex: searchTerm, $options: "i" } },
            { parent: { $regex: searchTerm, $options: "i" } },
            { class: { $regex: searchTerm, $options: "i" } },
            { address: { $regex: searchTerm, $options: "i" } },
            { contact: { $regex: searchTerm, $options: "i" } },
        ],
    };
    const skip = (page - 1) * limit;
    return studentRepository.filteredStudents(searchQuery, skip, limit);
}

async function deleteStudent(id){
    return studentRepository.deleteStudent(id);
}

async function updateStudent(studentData){
    return studentRepository.updateStudent(studentData);
}

module.exports = {
    addStudent,
    getStudents,
    countStudents,
    filteredStudents,
    deleteStudent,
    updateStudent
}