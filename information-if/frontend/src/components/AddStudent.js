import React, { useState } from 'react';
import axios from 'axios';

const AddStudent = ({ onStudentAdded }) => {
  const [student, setStudent] = useState({
    name: '',
    email: '',
    age: '',
    course: '',
    phone: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/students', student);
      setMessage('Student added successfully!');
      setStudent({
        name: '',
        email: '',
        age: '',
        course: '',
        phone: ''
      });
      if (onStudentAdded) {
        onStudentAdded(response.data);
      }
      setTimeout(() => setMessage(''), 3000);
    } catch (error) {
      setMessage('Error adding student. Please try again.');
      console.error('Error adding student:', error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="container">
      <h2>Add New Student</h2>
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
            min="1"
            max="100"
          />
        </div>
        <div className="form-group">
          <label htmlFor="course">Course:</label>
          <input
            type="text"
            id="course"
            name="course"
            value={student.course}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={student.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Add Student</button>
      </form>
    </div>
  );
};

export default AddStudent;
