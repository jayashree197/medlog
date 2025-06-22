<template>
  <div class="container mt-4">

    <!-- Heading -->
    <h2>Add New Patient</h2>
     <!-- Back Button -->
    <div class="mb-3">
      <button class="btn btn-secondary" @click="goToPatientPortal">
        ← Back to Patient Portal
      </button>
    </div>

    <!-- Add Patient Form -->
    <AddPatient @added="goBack" />
  </div>
</template>

<script>
import AddPatient from '../components/AddPatient.vue';

export default {
  components: { AddPatient },
  methods: {
    goBack() {
      this.$router.push({
        path: '/patient-portal',
        query: { message: 'Patient added successfully!' }
      });
    },
    goToPatientPortal() {
      this.$router.push('/patient-portal');
    }
  }
};
</script>