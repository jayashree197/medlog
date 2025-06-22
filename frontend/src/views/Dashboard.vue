<template>
  <div class="container mt-5">
    <!-- Header Row -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h2>🏥 MedLog Dashboard</h2>
      <div class="text-end">
        <p class="mb-1 text-muted">Welcome, {{ userName }} 👋</p>
        <button class="btn btn-outline-danger" @click="logout">Logout</button>
      </div>
    </div>

    <!-- Totals Section -->
    <div class="row mb-4">
      <div class="col-md-6">
        <div class="card shadow-sm border-success">
          <div class="card-body text-center">
            <h5 class="card-title text-success">👥 Total Employees</h5>
            <h2>{{ totalEmployees }}</h2>
          </div>
        </div>
      </div>

      <div class="col-md-6">
        <div class="card shadow-sm border-primary">
          <div class="card-body text-center">
            <h5 class="card-title text-primary">🧑‍🦽 Total Patients</h5>
            <h2>{{ totalPatients }}</h2>
          </div>
        </div>
      </div>
    </div>

    <!-- Portal Navigation -->
    <div class="text-center">
      <button class="btn btn-primary me-3" @click="goToEmployeePortal">
        👥 Go to Employee Portal
      </button>
      <button class="btn btn-success" @click="goToPatientPortal">
        🏥 Go to Patient Portal
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'DashboardPage',
  data() {
    return {
      userName: '', 
      patients: [],
      employees: [],
      totalPatients: 0,
      totalEmployees: 0
    };
  },
  mounted() {
    this.userName = localStorage.getItem('userName');
    this.loadPatients();
    this.loadEmployees();
  },
  methods: {
    async loadPatients() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/patients', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.patients = res.data;
        this.updateTotals();
      } catch (err) {
        console.error('Error loading patients:', err);
      }
    },
    async loadEmployees() {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/employees', {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.employees = res.data;
        this.updateTotals();
      } catch (err) {
        console.error('Error loading employees:', err);
      }
    },
    updateTotals() {
      this.totalPatients = this.patients.length;
      this.totalEmployees = this.employees.length;
    },
    goToEmployeePortal() {
      this.$router.push('/employee-portal');
    },
    goToPatientPortal() {
      this.$router.push('/patient-portal');
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    }
  }
}
</script>

<style scoped>
.card {
  transition: transform 0.2s ease-in-out;
}
.card:hover {
  transform: scale(1.02);
}
</style>