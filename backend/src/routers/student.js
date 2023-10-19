const express = require("express");
const router = new express.Router();
const studentController = require('../controllers/studentControllers.js');
const verifyToken = require('../middleware/verifyToken.js');

router.post("/addStudent", verifyToken, studentController.addStudent);
router.get("/getStudents",verifyToken, studentController.getStudents);
router.get("/filterSearch/:searchTerm", verifyToken, studentController.filterSearch);
router.delete("/removeStudent/:id", verifyToken, studentController.deleteStudent);
router.patch("/updateStudent", verifyToken, studentController.updateStudent);


router.get('/secret1', (req,res)=>{
    console.log('secret1');
})
router.get('/secret', (req,res)=>{
    res.redirect('/secret1');
})

module.exports = router;
