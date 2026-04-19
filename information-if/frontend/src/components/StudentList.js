import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditStudent from './EditStudent';

const StudentList = () => {
  const [students, setStudents] = useState([]);
  const [editingStudent, setEditingStudent] = useState(null);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/students');
      setStudents(response.data);
    } catch (error) {
      setMessage('Error fetching students');
      console.error('Error fetching students:', error);
      setTimeout(() => setMessage(''), 3000);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await axios.delete(`http://localhost:5000/api/students/${id}`);
        setMessage('Student deleted successfully!');
        setStudents(students.filter(student => student.id !== id));
        setTimeout(() => setMessage(''), 3000);
      } catch (error) {
        setMessage('Error deleting student');
        console.error('Error deleting student:', error);
        setTimeout(() => setMessage(''), 3000);
      }
    }
  };

  const handleEdit = (student) => {
    setEditingStudent(student);
  };

  const handleUpdate = (updatedStudent) => {
    setStudents(students.map(student => 
      student.id === updatedStudent.id ? updatedStudent : student
    ));
    setEditingStudent(null);
    setMessage('Student updated successfully!');
    setTimeout(() => setMessage(''), 3000);
  };

  const handleCancelEdit = () => {
    setEditingStudent(null);
  };

  return (
    <div className="container">
      <h2>Student List</h2>
      {message && (
        <div className={`message ${message.includes('Error') ? 'error' : 'success'}`}>
          {message}
        </div>
      )}
      
      {editingStudent ? (
        <EditStudent 
          student={editingStudent} 
          onUpdate={handleUpdate}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          {students.length === 0 ? (
            <p>No students found. Add a new student to get started.</p>
          ) : (
            <table className="student-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Age</th>
                  <th>Course</th>
                  <th>Phone</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map(student => (
                  <tr key={student.id}>
                    <td>{student.id}</td>
                    <td>{student.name}</td>
                    <td>{student.email}</td>
                    <td>{student.age}</td>
                    <td>{student.course}</td>
                    <td>{student.phone}</td>
                    <td>
                      <div className="actions">
                        <button 
                          className="btn btn-warning" 
                          onClick={() => handleEdit(student)}
                        >
                          Edit
                        </button>
                        <button 
                          className="btn btn-danger" 
                          onClick={() => handleDelete(student.id)}
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </>
      )}
    </div>
  );
};

export default StudentList;
