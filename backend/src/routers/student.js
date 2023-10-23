const express = require("express");
const router = new express.Router();
const studentController = require('../controllers/studentControllers.js');
const verifyToken = require('../middleware/verifyToken.js');

const passport = require('passport')

router.post("/addStudent", verifyToken, studentController.addStudent);
router.get("/filterSearch/:searchTerm", verifyToken, studentController.filterSearch);
router.delete("/removeStudent/:id", verifyToken, studentController.deleteStudent);
router.patch("/updateStudent", verifyToken, studentController.updateStudent);
router.get("/getStudents",verifyToken, studentController.getStudents);

// router.get("/getStudents",passport.authenticate('jwt', {session:false}), studentController.getStudents);
module.exports = router;
