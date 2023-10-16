const express = require("express");
const router = new express.Router();
const studentController = require('../controllers/studentControllers.js')
const verifyToken = require('../middleware/verifyToken.js')
const Student = require('../models/student.js')

router.get("/getStudentId", verifyToken, async (req, res) => {
  try {
    let newId = 0;
    const student = await Student.find().sort({ S_No: -1 }).limit(1);
    
    if (!student || student.length === 0) {
      newId = 1;
    }
    else {
      newId = (student[0].S_No + 1)
    }
    res.status(201).send(newId.toString());
  } catch (e) {
    res.status(401).send(e);
  }
});

router.post("/addStudent", verifyToken, studentController.addStudent);
router.get("/getStudents",verifyToken, studentController.getStudents);
router.get("/filterSearch/:searchTerm", verifyToken, studentController.filterSearch);
router.delete("/removeStudent/:S_No", verifyToken, studentController.deleteStudent);
router.patch("/updateStudent", verifyToken, studentController.updateStudent);

module.exports = router;
