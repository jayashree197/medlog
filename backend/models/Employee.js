// models/Employee.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Sequelize connection

const Employee = sequelize.define('Employee', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.STRING,
    allowNull: false
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: false
  },
  department: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = Employee;