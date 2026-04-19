# Student Management System

A full-stack web application for managing student records with complete CRUD operations.

## Features
- ✅ Add student details
- ✅ Update student information  
- ✅ Delete student records
- ✅ View student list
- ✅ Responsive design
- ✅ Form validation
- ✅ Error handling

## Technologies
- **Frontend**: React 18, HTML5, CSS3, Axios
- **Backend**: Node.js, Express.js, CORS
- **Database**: MySQL
- **Development**: Nodemon (backend), Create React App (frontend)

## Project Structure
```
student-management-system/
├── frontend/                 # React frontend application
│   ├── public/              # Static files
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── AddStudent.js
│   │   │   ├── StudentList.js
│   │   │   └── EditStudent.js
│   │   ├── App.js          # Main App component
│   │   ├── App.css         # App styles
│   │   ├── index.js        # Entry point
│   │   └── index.css       # Global styles
│   └── package.json
├── backend/                 # Node.js/Express backend
│   ├── config/
│   │   └── database.js     # Database configuration
│   ├── routes/
│   │   └── students.js     # Student API routes
│   ├── .env                # Environment variables
│   ├── database_setup.sql  # Database schema
│   ├── server.js           # Express server
│   └── package.json
└── README.md               # This file
```

## Prerequisites
- Node.js (v14 or higher)
- MySQL Server
- npm or yarn

## Setup Instructions

### 1. Database Setup
1. Install MySQL Server on your system
2. Open MySQL command line or MySQL Workbench
3. Run the database setup script:
   ```bash
   mysql -u root -p < backend/database_setup.sql
   ```
4. Verify the database and table were created:
   ```sql
   USE student_management;
   SHOW TABLES;
   ```

### 2. Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Configure the database connection in `.env` file:
   ```
   PORT=5000
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_mysql_password
   DB_NAME=student_management
   ```
4. Start the backend server:
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:5000`

### 3. Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the React development server:
   ```bash
   npm start
   ```
   The application will be available at `http://localhost:3000`

## API Endpoints

### Students API
- `GET /api/students` - Get all students
- `GET /api/students/:id` - Get a specific student
- `POST /api/students` - Create a new student
- `PUT /api/students/:id` - Update a student
- `DELETE /api/students/:id` - Delete a student

### Test Endpoint
- `GET /api/test` - Test database connection

## Usage

1. **Adding Students**: Fill out the form at the top of the page and click "Add Student"
2. **Viewing Students**: All students are displayed in a table below the form
3. **Editing Students**: Click the "Edit" button next to any student record
4. **Deleting Students**: Click the "Delete" button next to any student record (with confirmation)

## Database Schema

The `students` table includes the following fields:
- `id` (INT, AUTO_INCREMENT, PRIMARY KEY)
- `name` (VARCHAR(255), NOT NULL)
- `email` (VARCHAR(255), NOT NULL, UNIQUE)
- `age` (INT, NOT NULL)
- `course` (VARCHAR(255), NOT NULL)
- `phone` (VARCHAR(20), NOT NULL)
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)
- `updated_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP)

## Development

### Running in Development Mode
- Backend: `npm run dev` (uses nodemon for auto-restart)
- Frontend: `npm start` (React development server)

### Building for Production
- Frontend: `npm run build` (creates optimized build in `build/` folder)

## Troubleshooting

### Common Issues
1. **Database Connection Error**: Check MySQL service is running and credentials are correct
2. **Port Already in Use**: Change the PORT in `.env` file or kill the process using the port
3. **CORS Error**: Ensure backend is running when frontend makes API calls
4. **Module Not Found**: Run `npm install` in both frontend and backend directories

### Database Issues
- If you encounter database errors, verify:
  - MySQL server is running
  - Database `student_management` exists
  - User has proper permissions
  - Connection details in `.env` are correct

## License
This project is open source and available under the [MIT License](LICENSE).
