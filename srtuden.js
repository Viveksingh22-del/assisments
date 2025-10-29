// models/Student.js
import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  cgpa: { type: String, required: true },
});

export default mongoose.model("Student", studentSchema);
