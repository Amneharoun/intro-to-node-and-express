const studentModel = require("../models/studentModel");

// Get all students
const getStudents = async (req, res) => {
  const students = await studentModel.find();

  res.send({
    students,
  });
};

// Get a single student by its ID
const getSingleStudent = async (req, res) => {
  const id = req.params.id;

  const student = await studentModel.findById(id); // .find({_id: studentId})

  if (!student) {
    res.status(404).send({
      message: "Student not found.",
    });
    return;
  }

  res.send({ student });
};

// Add a new students
const addStudent = async (req, res) => {
  const student = req.body;
  //   console.log(student);

  try {
    await studentModel.create(student);
  } catch (error) {
    res.send({
      message: error.message,
    });
    return;
  }

  res.send({
    message: "Student added successfully",
    student,
  });
};

// Update a student
const updateStudent = async (req, res) => {
  const id = req.params.id;
  const { name, age } = req.body;

  const studentExists = await studentModel.findById(id);

  if (!studentExists) {
    res.status(404).send("Student does not exist");
    return;
  }

  const updatedStudent = await studentModel.findByIdAndUpdate(
    id,
    {
      name,
      age,
    },
    {
      new: true,
    }
  );

  res.send({
    message: "Student updated successfully",
    updatedStudent,
  });
};

// Delete a student
const deleteStudent = async (req, res) => {
  const id = req.params.id;

  const deletedStudent = await studentModel.findByIdAndDelete(id);

  if (!deletedStudent) {
    res.status(401).send({
      message: "Forbidden action",
    });
    return;
  }
  res.send({
    message: "Student deleted successfully",
    deletedStudent,
  });
};

module.exports = {
  getStudents,
  getSingleStudent,
  addStudent,
  updateStudent,
  deleteStudent,
};
