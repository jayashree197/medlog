<template>
  <div class="container mt-4">
    <h2>Edit Employee</h2>

    <div class="mb-3">
      <button class="btn btn-secondary" @click="goToEmployeePortal">Back to Employee Portal</button>
    </div>

    <div v-if="employee">
      <EmployeeForm :form="form" :isEdit="true" @submit="updateEmployee" />
    </div>

    <div v-else class="alert alert-warning">Loading employee details...</div>
  </div>
</template>

<script>
import axios from 'axios';
import EmployeeForm from '@/components/EmployeeForm.vue';

export default {
  components: { EmployeeForm },
  data() {
    return {
      employee: null,
      form: {
        name: '',
        role: '',
        contact: '',
        department: ''
      }
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:5000/api/employees/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.employee = res.data;
      this.form = { ...res.data };
    } catch (err) {
      console.error('Failed to fetch employee details:', err);
    }
  },
  methods: {
    async updateEmployee(updatedForm) {
      const token = localStorage.getItem('token');
      try {
        await axios.put(`http://localhost:5000/api/employees/${this.employee.id}`, updatedForm, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.$router.push({ path: '/employee-portal', query: { message: 'Employee updated successfully!' } });
      } catch (err) {
        console.error('Error updating employee:', err);
      }
    },
    goToEmployeePortal() {
      this.$router.push('/employee-portal');
    }
  }
};
</script>