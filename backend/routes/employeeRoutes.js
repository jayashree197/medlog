const express = require('express');
const employeeController = require('../controllers/employeeController');  // Import controller
const router = express.Router();

// Get all employees
router.get('/', employeeController.getAllEmployees);

// Add a new employee
router.post('/', employeeController.createEmployee);

// Get employee by ID
router.get('/:id', employeeController.getEmployeeById);  

// Update an employee by ID
router.put('/:id', employeeController.updateEmployee);

// Delete an employee by ID
router.delete('/:id', employeeController.deleteEmployee);

module.exports = router;