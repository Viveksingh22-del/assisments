// routes/studentRoutes.js
import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

// POST /students → Add new student
router.post("/", async (req, res) => {
  try {
    const { id, name, cgpa } = req.body;
    const newStudent = new Student({ id, name, cgpa });
    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", student: newStudent });
  } catch (error) {
    res.status(500).json({ message: "Error adding student", error });
  }
});

// GET /students → View all students
router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ message: "Error fetching students", error });
  }
});

// GET /students/:id → View one student
router.get("/:id", async (req, res) => {
  try {
    const student = await Student.findOne({ id: req.params.id });
    if (!student) return res.status(404).json({ message: "Student not found" });
    res.json(student);
  } catch (error) {
    res.status(500).json({ message: "Error fetching student", error });
  }
});

// PUT /students/:id → Update student
router.put("/:id", async (req, res) => {
  try {
    const updatedStudent = await Student.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!updatedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student updated", student: updatedStudent });
  } catch (error) {
    res.status(500).json({ message: "Error updating student", error });
  }
});

// DELETE /students/:id → Delete student
router.delete("/:id", async (req, res) => {
  try {
    const deletedStudent = await Student.findOneAndDelete({ id: req.params.id });
    if (!deletedStudent) return res.status(404).json({ message: "Student not found" });
    res.json({ message: "Student deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting student", error });
  }
});

export default router;
