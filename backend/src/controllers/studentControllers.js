const studentService = require('../services/student.service.js')

async function addStudent(req,res){
  try {
      await studentService.addStudent(req.body);
      res.status(201).send("student added successfully");
    }
  catch (err) {
    res.status(400).send({error:err.message});
  }
};

async function getStudents(req,res) {
  const page = parseInt(req.query.page) || 1;

  try {
    // fetching students to be displayed according to the page no and the limit
    const students = await studentService.getStudents(page);
    res.send(students);
  }
  catch(err){
    console.log(err.message);
    res.send(err.message);
  }
};

// filtering student based on searchTerm 
async function filterSearch(req,res){
  const page = parseInt(req.query.page) || 1;
  const searchTerm = req.params.searchTerm;
  try {
    const students = await studentService.filteredStudents(searchTerm, page);
    res.send(students);
  }
  catch(err) {
    console.log(err.message);
    res.status(401).send(err.message);
  }
};


async function deleteStudent(req,res){
  const id = req.params.id;
  try {
    const removeStudent = await studentService.deleteStudent(id);
    res.status(201).send(removeStudent);
  }
  catch (err) {
    res.status(400).send(err.message);
  }
}

// updating student
// finding student with S_No which is unique id for student records
async function updateStudent(req,res){
  try {
    await studentService.updateStudent(req.body);
    res.send("updated successfully");
  }
  catch (err) {
    res.status(400).send({error:err.message});
  }
  res.send();
}

module.exports = {
    addStudent,
    getStudents,
    filterSearch,
    deleteStudent,
    updateStudent
};