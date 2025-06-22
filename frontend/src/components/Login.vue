<template>
  <div class="d-flex justify-content-center align-items-center vh-100 bg-light">
    <div class="card shadow-lg p-5" style="max-width: 400px; width: 100%;">
      <div class="card-body">
        <h3 class="text-center mb-4">🔐 Login to MedLog</h3>

        <form @submit.prevent="login">
          <div class="mb-3">
            <input
              v-model="form.email"
              type="email"
              class="form-control"
              placeholder="Email"
              required
            />
          </div>
          <div class="mb-3">
            <input
              v-model="form.password"
              type="password"
              class="form-control"
              placeholder="Password"
              required
            />
          </div>
          <div class="d-grid">
            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
        </form>

        <p v-if="message" class="text-danger text-center mt-3">
          {{ message }}
        </p>

        <!-- 👇 Register link for new users -->
        <p class="text-center mt-3">
          Don't have an account?
          <router-link to="/register">Register here</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'LoginPage',
  data() {
    return {
      form: { email: '', password: '' },
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const res = await axios.post('http://localhost:5000/api/auth/login', this.form);
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('userName', res.data.user.name); 
        this.$router.push('/dashboard');
      } catch (err) {
        this.message = err.response?.data?.message || 'Login failed';
      }
    }
  }
}
</script>