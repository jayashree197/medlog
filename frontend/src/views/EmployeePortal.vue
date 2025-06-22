<template>
  <div class="container mt-4">
    <!-- Employee Portal Heading (Top) -->
    <div class="mb-4 text-center">
      <h2>Employee Portal</h2>
    </div>

    <!-- Header Row: Back, Search, Add -->
    <div class="d-flex justify-content-between align-items-center mb-4">
      <!-- Back to Dashboard Button -->
      <button class="btn btn-secondary me-2" @click="goToDashboard">Back to Dashboard</button>

      <!-- Search Input -->
      <div class="d-flex justify-content-center" style="flex-grow: 1;">
        <input
          v-model="searchQuery"
          type="text"
          class="form-control"
          placeholder="Search by name, role, contact, or department"
          style="max-width: 500px;"
        />
      </div>

      <!-- Add Employee Button -->
      <button class="btn btn-primary ms-2" @click="goToAddPage">➕ Add New Employee</button>
    </div>

    <!-- Toast Message -->
    <div v-if="toastMessage" class="toast-container position-fixed top-0 end-0 p-3" style="z-index: 1050;">
      <div class="toast show bg-success text-white">
        <div class="toast-body">{{ toastMessage }}</div>
      </div>
    </div>

    <!-- No Employees -->
    <div v-if="paginatedEmployees.length === 0" class="alert alert-info">
      No employees found.
    </div>

    <!-- Employee Table (from component) -->
    <EmployeeList
      :employees="paginatedEmployees"
      @edit="editEmployee"
      @delete="confirmDelete"
    />

    <!-- Total Employees Count -->
    <div class="mt-3 text-end">
      <p class="mb-0"><strong>Total Employees:</strong> {{ filteredEmployees.length }}</p>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center align-items-center mt-3 gap-3">
      <button class="btn btn-outline-primary" :disabled="currentPage === 1" @click="currentPage--">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button class="btn btn-outline-primary" :disabled="currentPage === totalPages" @click="currentPage++">Next</button>
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
            Are you sure you want to delete <strong>{{ employeeToDelete.name }}</strong>?
          </div>
          <div class="modal-footer">
            <button class="btn btn-secondary" @click="closeModal">Cancel</button>
            <button class="btn btn-danger" @click="deleteEmployee">Delete</button>
          </div>
        </div>
      </div>
    </div>
    <div v-if="showDeleteModal" class="modal-backdrop fade show"></div>
  </div>
</template>

<script>
import axios from 'axios';
import EmployeeList from '@/components/EmployeeList.vue';

export default {
  components: {
    EmployeeList
  },
  data() {
    return {
      employees: [],
      toastMessage: '',
      searchQuery: '',
      showDeleteModal: false,
      employeeToDelete: null,
      currentPage: 1,
      perPage: 10
    };
  },
  computed: {
    filteredEmployees() {
      const query = this.searchQuery.toLowerCase();
      return this.employees.filter(emp =>
        emp.name.toLowerCase().includes(query) ||
        emp.role.toLowerCase().includes(query) ||
        emp.contact.toLowerCase().includes(query) ||
        emp.department.toLowerCase().includes(query)
      );
    },
    totalPages() {
      return Math.max(1, Math.ceil(this.filteredEmployees.length / this.perPage));
    },
    paginatedEmployees() {
      const start = (this.currentPage - 1) * this.perPage;
      return this.filteredEmployees.slice(start, start + this.perPage);
    }
  },
  watch: {
    searchQuery() {
      this.currentPage = 1;
    }
  },
  mounted() {
    this.loadEmployees();
    if (this.$route.query.message) {
      this.toastMessage = this.$route.query.message;
      setTimeout(() => {
        this.toastMessage = '';
        this.$router.replace({ query: null });
      }, 3000);
    }
  },
  methods: {
    async loadEmployees() {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/employees', {
        headers: { Authorization: `Bearer ${token}` }
      });
      this.employees = res.data;
    },
    goToDashboard() {
      this.$router.push('/dashboard');
    },
    goToAddPage() {
      this.$router.push('/employee-portal/add');
    },
    editEmployee(id) {
      this.$router.push(`/employee-portal/edit/${id}`);
    },
    confirmDelete(employee) {
      this.employeeToDelete = employee;
      this.showDeleteModal = true;
    },
    closeModal() {
      this.employeeToDelete = null;
      this.showDeleteModal = false;
    },
    async deleteEmployee() {
      const token = localStorage.getItem('token');
      try {
        await axios.delete(`http://localhost:5000/api/employees/${this.employeeToDelete.id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        this.loadEmployees();
        this.showSuccessToast(`${this.employeeToDelete.name} deleted successfully`);
        this.closeModal();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    },
    showSuccessToast(message) {
      this.toastMessage = message;
      setTimeout(() => {
        this.toastMessage = '';
      }, 3000);
    }
  }
};
</script>

<style scoped>
input.form-control {
  max-width: 400px;
}
</style>