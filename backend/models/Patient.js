const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Patient = sequelize.define('Patient', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  dob: {
    type: DataTypes.DATEONLY,
  },
  gender: {
    type: DataTypes.STRING,
  },
  contact: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  medical_history: {
    type: DataTypes.TEXT,
  }
});

module.exports = Patient;