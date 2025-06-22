<template>
  <form @submit.prevent="handleSubmit" class="card p-4 shadow-sm">
    <div class="mb-3">
      <label class="form-label">Patient Name</label>
      <input v-model="form.name" type="text" class="form-control" placeholder="Patient Name" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Date of Birth</label>
      <input v-model="form.dob" type="date" class="form-control" placeholder="YYYY-MM-DD" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Gender</label>
      <select v-model="form.gender" class="form-select" required>
        <option value="">Select Gender</option>
        <option>Male</option>
        <option>Female</option>
        <option>Other</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Contact</label>
      <input v-model="form.contact" type="text" class="form-control" placeholder="Contact" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Address</label>
      <input v-model="form.address" type="text" class="form-control" placeholder="Address" />
    </div>

    <div class="mb-3">
      <label class="form-label">Medical History</label>
      <textarea v-model="form.medical_history" class="form-control" placeholder="Medical History" rows="4"></textarea>
    </div>

    <button type="submit" class="btn btn-success">
      {{ isEditMode ? 'Update Patient' : 'Add Patient' }}
    </button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    patient: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        dob: '',
        gender: '',
        contact: '',
        address: '',
        medical_history: ''
      }
    };
  },
  computed: {
    isEditMode() {
      return !!this.patient;
    }
  },
  mounted() {
    if (this.patient) {
      this.form = { ...this.patient };
    }
  },
  methods: {
    async handleSubmit() {
      const token = localStorage.getItem('token');
      try {
        if (this.isEditMode) {
          await axios.put(`http://localhost:5000/api/patients/${this.patient.id}`, this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.$emit('updated');
        } else {
          await axios.post('http://localhost:5000/api/patients', this.form, {
            headers: { Authorization: `Bearer ${token}` }
          });
          this.$emit('added');
        }
      } catch (err) {
        console.error('Error submitting patient form:', err);
      }
    }
  }
};
</script>