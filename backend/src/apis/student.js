const express = require("express");
const router = new express.Router();
const Student = require("../models/student");

router.post("/addStudent", async (req, res) => {
  const student = new Student({
    ...req.body,
  });


  try {
    await student.save();
    res.status(201).send("student added successfully");
  } catch (e) {
    console.log(e.name);
    res.status(400).send(e);
  }
});

router.get("/getStudentId", async (req, res) => {
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


router.get("/getStudents", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  try {
    const totalStudents = await Student.countDocuments();
    const students = await Student.find().skip(skip).limit(limit);

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
});

router.get("/filterSearch/:searchTerm", async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;

  const query = req.params.searchTerm;

  const searchQuery = {
    $or: [
        { S_No: { $eq: parseInt(query) } },
        { name: { $regex: query, $options: "i" } },
        { parent: { $regex: query, $options: "i" } },
        { class: { $regex: query, $options: "i" } },
        { address: { $regex: query, $options: "i" } },
        { contact: { $regex: query, $options: "i" } },
    ],
  };

  try {
    const students = await Student.find(searchQuery).skip(skip).limit(limit);

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
});


router.delete("/removeStudent/:S_No", async (req, res) => {
  const id = req.params.S_No;
  try {
    const removeStudent = await Student.deleteOne({ S_No: id });
    res.status(201).send(removeStudent);
  } catch (e) {
    res.status(400).send(e);
  }
});

router.patch("/updateStudent", async (req, res) => {
  const { address, contact } = { ...req.body };
  try {
    await Student.findOneAndUpdate(
      { S_No: req.body.S_No },
      { class: req.body.class, address, contact }
    );
    res.status(201).send("updated successfully");
  } catch (e) {
    res.status(400).send(e);
  }
  res.send();
});

module.exports = router;
