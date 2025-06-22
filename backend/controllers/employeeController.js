const Employee = require('../models/Employee');

// Get all employees
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.findAll();  // Fetch all employees
    res.json(employees);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching employees' });
  }
};

// Create a new employee
exports.createEmployee = async (req, res) => {
  const { name, role, contact, department } = req.body;
  try {
    const employee = await Employee.create({
      name,
      role,
      contact,
      department
    });
    res.status(201).json(employee);  // Return newly created employee
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error creating employee' });
  }
};

// Get employee by ID (Add this method)
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);  // Find employee by primary key (ID)
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching employee' });
  }
};

// Update an employee
exports.updateEmployee = async (req, res) => {
  const { name, role, contact, department } = req.body;
  try {
    const employee = await Employee.findByPk(req.params.id);  // Find employee by ID
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.update({ name, role, contact, department });
    res.json(employee);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error updating employee' });
  }
};

// Delete an employee
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByPk(req.params.id);  // Find employee by ID
    if (!employee) {
      return res.status(404).json({ message: 'Employee not found' });
    }

    await employee.destroy();  // Delete the employee
    res.json({ message: 'Employee deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error deleting employee' });
  }
};