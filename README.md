
# MedLog – Patient Health Record & Medication Tracker

A simple full-stack application built with Node.js, Express, Vue.js, and MySQL to manage patients and employees in a healthcare setting.

## Features

- Patient Portal (Add, Edit, Delete, Search, Paginate)
- Employee Portal (Add, Edit, Delete, Search, Paginate)
- Role-based registration (Admin, Staff)
- JWT-based Authentication
- Responsive UI with Bootstrap

## Tech Stack

- **Frontend**: Vue.js (CLI-based project)
- **Backend**: Node.js + Express
- **Database**: MySQL
- **Authentication**: JWT

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/jayashree197/medlog.git
cd medlog
```

### 2. Backend Setup

```bash
cd backend
npm install
```


Create a `.env` file in the backend directory with the following content:

```
DB_NAME=medlog_db
DB_USER=root
DB_PASS=yourpassword
DB_HOST=localhost
JWT_SECRET=yoursecretkey
```


#### Run Backend Server

```bash
node server.js
# or for auto-reload:
npx nodemon server.js
```

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run serve
```

### 4. MySQL Setup

Create a database in MySQL:

```sql
CREATE DATABASE medlog_db;
```


### 5. Access the App

- **Frontend**: http://localhost:8080
- **Backend**: http://localhost:5000

---

### Additional Notes:
- Make sure both **Frontend** and **Backend** servers are running.
- Ensure that the frontend is set up to make requests to `http://localhost:5000` for backend API calls.

