const express = require('express');
const router = express.Router();
const db = require('../config/database');

// GET all students
router.get('/', async (req, res) => {
  try {
    const students = await db.query('SELECT * FROM students ORDER BY id DESC');
    res.json(students);
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Failed to fetch students' });
  }
});

// GET student by ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const students = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    
    if (students.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    res.json(students[0]);
  } catch (error) {
    console.error('Error fetching student:', error);
    res.status(500).json({ error: 'Failed to fetch student' });
  }
});

// POST (create) new student
router.post('/', async (req, res) => {
  try {
    const { name, email, age, course, phone } = req.body;
    
    // Validate required fields
    if (!name || !email || !age || !course || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if email already exists
    const existingStudents = await db.query('SELECT id FROM students WHERE email = ?', [email]);
    if (existingStudents.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    const result = await db.query(
      'INSERT INTO students (name, email, age, course, phone) VALUES (?, ?, ?, ?, ?)',
      [name, email, age, course, phone]
    );
    
    // Get the newly created student
    const newStudent = await db.query('SELECT * FROM students WHERE id = ?', [result.insertId]);
    
    res.status(201).json(newStudent[0]);
  } catch (error) {
    console.error('Error creating student:', error);
    res.status(500).json({ error: 'Failed to create student' });
  }
});

// PUT (update) student by ID
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, age, course, phone } = req.body;
    
    // Validate required fields
    if (!name || !email || !age || !course || !phone) {
      return res.status(400).json({ error: 'All fields are required' });
    }
    
    // Check if student exists
    const existingStudents = await db.query('SELECT id FROM students WHERE id = ?', [id]);
    if (existingStudents.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    // Check if email already exists for another student
    const emailCheck = await db.query('SELECT id FROM students WHERE email = ? AND id != ?', [email, id]);
    if (emailCheck.length > 0) {
      return res.status(400).json({ error: 'Email already exists' });
    }
    
    await db.query(
      'UPDATE students SET name = ?, email = ?, age = ?, course = ?, phone = ? WHERE id = ?',
      [name, email, age, course, phone, id]
    );
    
    // Get the updated student
    const updatedStudent = await db.query('SELECT * FROM students WHERE id = ?', [id]);
    
    res.json(updatedStudent[0]);
  } catch (error) {
    console.error('Error updating student:', error);
    res.status(500).json({ error: 'Failed to update student' });
  }
});

// DELETE student by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if student exists
    const existingStudents = await db.query('SELECT id FROM students WHERE id = ?', [id]);
    if (existingStudents.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }
    
    await db.query('DELETE FROM students WHERE id = ?', [id]);
    
    res.json({ message: 'Student deleted successfully' });
  } catch (error) {
    console.error('Error deleting student:', error);
    res.status(500).json({ error: 'Failed to delete student' });
  }
});

module.exports = router;
