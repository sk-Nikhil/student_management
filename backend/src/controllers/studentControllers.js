// const Student = require("../models/student");
const studentService = require('../services/student.service.js')

async function addStudent(req,res){
    try {
        await studentService.addStudent(req)
        res.status(201).send("student added successfully");
      } catch (e) {
        res.status(400).send(e);
      }
};

async function getStudents(req,res) {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const totalStudents = await studentService.countStudents();
    const students = await studentService.getStudents(skip, limit);

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

async function filterSearch(req,res){
    const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const query = req.params.searchTerm;

  const searchQuery = {
    $or: [
        // { S_No: { $eq: parseInt(query) } },
        { name: { $regex: query, $options: "i" } },
        { parent: { $regex: query, $options: "i" } },
        { class: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { contact: { $regex: query, $options: "i" } },
    ],
  };

  try {
    const students = await studentService.filteredStudents(searchQuery, skip, limit);

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
    const id = req.params.S_No;
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