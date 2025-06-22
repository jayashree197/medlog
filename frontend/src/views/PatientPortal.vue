<template>
  <div class="container mt-4">
    <!-- Top Header: Centered Title -->
    <div class="text-center mb-3">
      <h2>Patient Portal</h2>
    </div>

    <!-- Action Row: Back | Search | Add -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <!-- Back to Dashboard -->
      <button class="btn btn-secondary" @click="goToDashboard">
        Back to Dashboard
      </button>

      <!-- Search Box -->
      <input
        v-model="searchQuery"
        type="text"
        class="form-control"
        placeholder="Search name, contact, gender, address, etc."
        style="max-width: 500px;"
      />

      <!-- Add New Patient -->
      <button class="btn btn-primary" @click="goToAddPage">
        ➕ Add New Patient
      </button>
    </div>

    <!-- Toast Notification -->
    <div v-if="toastMessage" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1050;">
      <div class="toast show bg-success text-white">
        <div class="toast-body">{{ toastMessage }}</div>
      </div>
    </div>

    <!-- No Records Found -->
    <div v-if="paginatedPatients.length === 0" class="alert alert-info">
      No patients found.
    </div>

    <!-- Patient List Component -->
    <PatientList
      :patients="paginatedPatients"
      @edit="editPatient"
      @delete="confirmDelete"
    />

    <!-- Total Patients -->
    <div class="d-flex justify-content-end mb-2">
      <p class="mb-0"><strong>Total Patients:</strong> {{ filteredPatients.length }}</p>
    </div>

    <!-- Centered Pagination Controls -->
    <div class="d-flex justify-content-center align-items-center mt-3 gap-3">
      <button class="btn btn-outline-primary" :disabled="currentPage === 1" @click="currentPage--">
        Previous
      </button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-outline-primary" :disabled="currentPage === totalPages" @click="currentPage++">
        Next
      </button>
    </div>

    <!-- Delete Confirmation Modal -->
    <div class="modal fade show" tabindex="-1" style="display: block;" v-if="showDeleteModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm Delete</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            Are you sure you want to delete <strong>{{ patientToDelete.name }}</strong>?
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button class="btn btn-danger" @click="deletePatient">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios';
import PatientList from '../components/PatientList.vue';

export default {
  data() {
    return {
      patients: [],
      searchQuery: '',
      toastMessage: '',
      showDeleteModal: false,
      patientToDelete: null,
      currentPage: 1,
      perPage: 10
    };
  },
  computed: {
    filteredPatients() {
      const query = this.searchQuery.toLowerCase().trim();
      if (!query) return this.patients;

      return this.patients.filter(p =>
        p.name.toLowerCase().includes(query) ||
        p.contact.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.gender.toLowerCase().includes(query) ||
        (p.medical_history && p.medical_history.toLowerCase().includes(query))
      );
    },
    totalPages() {
      return Math.ceil(this.filteredPatients.length / this.perPage);
    },
    paginatedPatients() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredPatients.slice(start, start + this.perPage);
    }
  },
  mounted() {
    this.loadPatients();

    const success = this.$route.query.message;
    if (success) {
      this.toastMessage = success;

      setTimeout(() => {
        this.toastMessage = '';
        this.$router.replace({ query: null });
      }, 3000);
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1; // Reset to first page on new search
    }
  },
  methods: {
    async loadPatients() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/patients', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.patients = res.data;
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    goToAddPage() {
      this.$router.push('/patient-portal/add');
    },
    editPatient(id) {
      this.$router.push(`/patient-portal/edit/${id}`);
    },
    confirmDelete(patient) {
      this.patientToDelete = patient;
      this.showDeleteModal = true;
    },
    closeModal() {
      this.patientToDelete = null;
      this.showDeleteModal = false;
    },
    async deletePatient() {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/patients/${this.patientToDelete.id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.toastMessage = `${this.patientToDelete.name} deleted successfully`;
      this.closeModal();
      this.loadPatients();
      setTimeout(() => (this.toastMessage = ''), 3000);
    }
  },
  components: {
    PatientList
  }
};
</script>