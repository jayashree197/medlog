const express = require('express');
const router = express.Router();
const {
  createPatient,
  getPatients,
  getPatientById,
  updatePatient,
  deletePatient
} = require('../controllers/patientController');


const Patient = require('../models/Patient'); 

// POST: Add new patient
router.post('/', createPatient);

// GET: Get all patients
router.get('/', getPatients);

// GET: Get one patient by ID
router.get('/:id', getPatientById);

// PUT: Update patient
router.put('/:id', updatePatient);

// DELETE: Delete patient
router.delete('/:id', async (req, res) => {
  try {
    const patient = await Patient.findByPk(req.params.id);
    if (!patient) return res.status(404).json({ message: 'Not found' });

    await patient.destroy();
    res.json({ message: 'Deleted' });
  } catch (err) {
    console.error('Error deleting patient:', err);
    res.status(500).json({ message: 'Server error while deleting patient' });
  }
});

module.exports = router;