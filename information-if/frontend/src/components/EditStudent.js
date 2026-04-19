import React, { useState } from 'react';
import axios from 'axios';

const EditStudent = ({ student, onUpdate, onCancel }) => {
  const [formData, setFormData] = useState({
    name: student.name,
    email: student.email,
    age: student.age,
    course: student.course,
    phone: student.phone
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(
        `http://localhost:5000/api/students/${student.id}`, 
        formData
      );
      onUpdate(response.data);
    } catch (error) {
      setMessage('Error updating student. Please try again.');
      console.error('Error updating student:', error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  return (
    <div className="container">
      <h2>Edit Student</h2>
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
            value={formData.name}
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
            value={formData.email}
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
            value={formData.age}
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
            value={formData.course}
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
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn">Update Student</button>
        <button type="button" className="btn btn-danger" onClick={onCancel}>
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditStudent;
