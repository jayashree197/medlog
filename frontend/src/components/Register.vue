<template>
  <div class="container mt-5" style="max-width: 500px;">
    <!-- Card Wrapper -->
    <div class="card shadow-sm p-4">
      <h3 class="text-center mb-4">👤 Register Account</h3>

      <!-- Success/Error Message -->
      <div v-if="message" class="alert" :class="messageClass" role="alert">
        {{ message }}
      </div>

      <!-- Register Form -->
      <form @submit.prevent="register">
        <div class="mb-3">
          <label class="form-label">Full Name</label>
          <input
            v-model="form.name"
            type="text"
            class="form-control"
            placeholder="Enter your name"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Email</label>
          <input
            v-model="form.email"
            type="email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>

        <div class="mb-3">
          <label class="form-label">Password</label>
          <input
            v-model="form.password"
            type="password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>

        <div class="mb-4">
          <label class="form-label">Role</label>
          <select v-model="form.role" class="form-select" required>
            <option value="staff">Staff</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary w-100">Register</button>
      </form>

      <!-- Login Link -->
      <div class="text-center mt-3">
        Already have an account?
        <router-link to="/">Login here</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'RegisterPage',
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        role: 'staff'
      },
      message: '',
      isError: false
    };
  },
  computed: {
    messageClass() {
      return this.isError ? 'alert-danger' : 'alert-success';
    }
  },
  methods: {
    async register() {
      try {
        await axios.post('http://localhost:5000/api/auth/register', this.form);
        this.message = '🎉 Registered successfully!';
        this.isError = false;

        // Optionally reset form
        this.form = {
          name: '',
          email: '',
          password: '',
          role: 'staff'
        };
      } catch (err) {
        this.message = err.response?.data?.message || '⚠️ Registration failed.';
        this.isError = true;
      }
    }
  }
};
</script>

<style scoped>
/* Optional additional spacing or styling */
</style>