<template>
  <div class="container mt-4">
    <h2>Edit Patient</h2>
         <!-- Back Button -->
    <div class="mb-3">
      <button class="btn btn-secondary" @click="goToPatientPortal">
        ← Back to Patient Portal
      </button>
    </div>
    <div v-if="patient">
      <AddPatient :patient="patient" @updated="goBack" />
    </div>
    <div v-else class="alert alert-warning">Loading patient details...</div>
  </div>
</template>

<script>
import axios from 'axios';
import AddPatient from '../components/AddPatient.vue';

export default {
  components: { AddPatient },
  data() {
    return {
      patient: null
    };
  },
  async mounted() {
    const id = this.$route.params.id;
    const token = localStorage.getItem('token');
    try {
      const res = await axios.get(`http://localhost:5000/api/patients/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.patient = res.data;
    } catch (err) {
      console.error('Failed to fetch patient', err);
    }
  },
  methods: {
    goBack() {
     this.$router.push({ path: '/patient-portal', query: { message: 'Patient updated successfully!' } });
    },
     goToPatientPortal() {
      this.$router.push('/patient-portal');
    }
  }
}
</script>