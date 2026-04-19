-- Create database if it doesn't exist
CREATE DATABASE IF NOT EXISTS student_management;

-- Use the database
USE student_management;

-- Create students table
CREATE TABLE IF NOT EXISTS students (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    age INT NOT NULL,
    course VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Insert some sample data (optional)
INSERT INTO students (name, email, age, course, phone) VALUES
('John Doe', 'john.doe@example.com', 20, 'Computer Science', '123-456-7890'),
('Jane Smith', 'jane.smith@example.com', 22, 'Information Technology', '234-567-8901'),
('Mike Johnson', 'mike.johnson@example.com', 21, 'Software Engineering', '345-678-9012')
ON DUPLICATE KEY UPDATE email=VALUES(email);
