const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Student_records', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a schema for the student
const studentSchema = new mongoose.Schema({
  id: String,
  name: String,
  age: Number
});

// Use the correct collection name (Mongoose will use "Students" collection)
const Student = mongoose.model('Student', studentSchema, 'Students'); // 'Students' is the collection name

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// API Endpoints

// Get all students
app.get('/students', async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Add a new student
app.post('/students', async (req, res) => {
  const newStudent = new Student(req.body);
  try {
    await newStudent.save();
    res.status(201).send(newStudent);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Get a student by ID
app.get('/students/:id', async (req, res) => {
    try {
      const student = await Student.findOne({ id: req.params.id }); // Make sure to use 'id' field, not '_id'
      if (!student) {
        return res.status(404).send('Student not found');
      }
      res.json(student);
    } catch (err) {
      res.status(500).send(err);
    }
  });

// Update a student by ID
app.put('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndUpdate(
      { id: req.params.id },
      req.body,
      { new: true }
    );
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.json(student);
  } catch (err) {
    res.status(500).send(err);
  }
});

// Delete a student by ID
app.delete('/students/:id', async (req, res) => {
  try {
    const student = await Student.findOneAndDelete({ id: req.params.id });
    if (!student) {
      return res.status(404).send('Student not found');
    }
    res.status(204).send();
  } catch (err) {
    res.status(500).send(err);
  }
});

// Start server
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
