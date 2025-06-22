const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');

// Routes
const authRoutes = require('./routes/authRoutes');
const patientRoutes = require('./routes/patientRoutes');
const employeeRoutes = require('./routes/employeeRoutes'); // Import employees route

const app = express();

// MIDDLEWARES
app.use(cors());
app.use(express.json());

// ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/employees', employeeRoutes); // Add this route for employees

// DB sync + start server
sequelize.sync({ alter: true }).then(() => {
  console.log('DB Synced');
  app.listen(5000, () => console.log('Server running on http://localhost:5000'));
}).catch(err => console.error('Connection error:', err));