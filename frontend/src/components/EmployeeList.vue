<template>
  <div class="table-responsive">
    <table class="table table-bordered align-middle">
      <thead class="table-light">
        <tr>
          <th>Name</th>
          <th>Role</th>
          <th>Contact</th>
          <th>Department</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="employee in employees" :key="employee.id">
          <td>{{ employee.name }}</td>
          <td>{{ employee.role }}</td>
          <td>{{ employee.contact }}</td>
          <td>{{ employee.department }}</td>
          <td>
            <button class="btn btn-sm btn-info me-2" @click="$emit('edit', employee.id)">✏️ Edit</button>
            <button class="btn btn-sm btn-danger" @click="$emit('delete', employee)">🗑️ Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['employees']
};
</script>