const studentRepository = require('../repositories/studentRepository.js');

async function addStudent(studentData){
    return studentRepository.addStudent(studentData);
}

async function getStudents(page){
    const limit=5
    const skip = (page - 1) * limit;

    try{
        // fetching total no of students present in the collection
        const totalStudents = await studentRepository.countStudents()
        const students =  await studentRepository.getStudents(skip, limit);
        // storing data under variable student that is to be used
        // students -> students records that is to be shown
        // currentPage -> 
        // totalPages ->  for pagination purpose
        // totalEntries -> total records available in the database , use to display out of what amount of data we are displaying records
        const student = {
            students,
            currentPage: page,
            totalPages: Math.ceil(totalStudents / limit),
            totalEntries:totalStudents
        };
        // console.log(student)
        return student;
    }
    catch(err){
        return err
    }


};

// count no of students in the collection
async function countStudents(){
    return studentRepository.countStudents();
};

// filter students based on the search query
async function filteredStudents(searchTerm, page){
    const limit = 5;
    const skip = (page - 1) * limit;

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
    try{
        const students =  await studentRepository.filteredStudents(searchQuery, skip, limit);
        const student = {
            students,
            currentPage: page,
            totalPages: Math.ceil(students.length / limit) + 1,
        };
        return student
    }
    catch(err){
        return err
    }

};

async function deleteStudent(id){
    return studentRepository.deleteStudent(id);
};

async function updateStudent(studentData){
    return studentRepository.updateStudent(studentData);
};

module.exports = {
    addStudent,
    getStudents,
    countStudents,
    filteredStudents,
    deleteStudent,
    updateStudent
};