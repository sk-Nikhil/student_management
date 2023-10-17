// const Student = require("../models/student");
const studentService = require('../services/student.service.js')

async function addStudent(req,res){
    try {
        await studentService.addStudent(req.body)
        res.status(201).send("student added successfully");
      } catch (e) {
        res.status(400).send(e);
      }
};

async function getStudents(req,res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;

  try {
    // fetching total no of students present in the collection
    const totalStudents = await studentService.countStudents();
    
    // fetching students to be displayed according to the page no and the limit
    const students = await studentService.getStudents(page, limit);
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
    res.send(student);
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// filtering student based on searchTerm 
async function filterSearch(req,res){
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const searchTerm = req.params.searchTerm;

  try {
    const students = await studentService.filteredStudents(searchTerm, page, limit);
    const student = {
      students,
      currentPage: page,
      totalPages: Math.ceil(students.length / limit) + 1,
    };

    res.send(student);
  } catch (e) {
    console.log(e)
    res.status(401).send(e);
  }
};


async function deleteStudent(req,res){
    const id = req.params.id;
  try {
    const removeStudent = await studentService.deleteStudent(id);
    res.status(201).send(removeStudent);
  } catch (e) {
    res.status(400).send(e);
  }
}


// updating student
// finding student with S_No which is unique id for student records
async function updateStudent(req,res){
  try {
    await studentService.updateStudent(req.body);
    res.status(201).send("updated successfully");
  } catch (e) {
    res.status(400).send(e);
  }
  res.send();
}

module.exports = {
    addStudent,
    getStudents,
    filterSearch,
    deleteStudent,
    updateStudent
}