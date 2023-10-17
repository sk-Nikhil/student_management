const express = require("express");
const router = new express.Router();
const studentController = require('../controllers/studentControllers.js');
const verifyToken = require('../middleware/verifyToken.js');

router.post("/addStudent", verifyToken, studentController.addStudent);
router.get("/getStudents",verifyToken, studentController.getStudents);
router.get("/filterSearch/:searchTerm", verifyToken, studentController.filterSearch);
router.delete("/removeStudent/:id", verifyToken, studentController.deleteStudent);
router.patch("/updateStudent", verifyToken, studentController.updateStudent);

module.exports = router;
