<template>
  <div class="container mt-4">
    <h2>Add New Employee</h2>

    <div class="mb-3">
      <button class="btn btn-secondary" @click="goToEmployeePortal">Back to Employee Portal</button>
    </div>

    <EmployeeForm :form="form" @submit="addEmployee" />
  </div>
</template>

<script>
import axios from 'axios';
import EmployeeForm from '@/components/EmployeeForm.vue';

export default {
  components: { EmployeeForm },
  data() {
    return {
      form: {
        name: '',
        role: '',
        contact: '',
        department: ''
      }
    };
  },
  methods: {
    async addEmployee(submittedForm) {
      const token = localStorage.getItem('token');
      try {
        await axios.post('http://localhost:5000/api/employees', submittedForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.$router.push({ path: '/employee-portal', query: { message: 'Employee added successfully!' } });
      } catch (err) {
        console.error('Error adding employee:', err);
      }
    },
    goToEmployeePortal() {
      this.$router.push('/employee-portal');
    }
  }
};
</script>