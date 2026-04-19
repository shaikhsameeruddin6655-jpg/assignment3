import React from 'react';
import './App.css';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Student Management System</h1>
      </header>
      <main className="App-main">
        <AddStudent />
        <StudentList />
      </main>
    </div>
  );
}

export default App;
