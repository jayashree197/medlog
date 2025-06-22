<template>
  <div class="table-responsive">
    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>DOB</th>
          <th>Gender</th>
          <th>Contact</th>
          <th>Address</th>
          <th>Medical History</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="p in patients" :key="p.id">
          <td>{{ p.name }}</td>
          <td>{{ formatDate(p.dob) }}</td>
          <td>{{ p.gender }}</td>
          <td>{{ p.contact }}</td>
          <td>{{ p.address }}</td>
          <td>{{ p.medical_history }}</td>
          <td>
            <button class="btn btn-sm btn-info me-2" @click="$emit('edit', p.id)">✏️ Edit</button>
            <button class="btn btn-sm btn-danger" @click="$emit('delete', p)">🗑️ Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['patients'],
  methods: {
    formatDate(date) {
      return date ? new Date(date).toLocaleDateString('en-AU') : '';
    }
  }
};
</script>