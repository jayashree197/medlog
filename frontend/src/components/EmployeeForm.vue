<template>
  <form @submit.prevent="handleSubmit" class="card p-4 shadow-sm">
    <div class="mb-3">
      <label class="form-label">Employee Name</label>
      <input v-model="localForm.name" type="text" class="form-control" placeholder="Employee Name" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Role</label>
      <input v-model="localForm.role" type="text" class="form-control" placeholder="Role" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Contact</label>
      <input v-model="localForm.contact" type="text" class="form-control" placeholder="Contact" required />
    </div>

    <div class="mb-3">
      <label class="form-label">Department</label>
      <input v-model="localForm.department" type="text" class="form-control" placeholder="Department" required />
    </div>

    <button type="submit" class="btn btn-success">
      {{ isEdit ? 'Update' : 'Add' }} Employee
    </button>
  </form>
</template>

<script>
export default {
  props: {
    form: Object,
    isEdit: {
      type: Boolean,
      default: false
    }
  },
  emits: ['submit'],
  data() {
    return {
      localForm: { ...this.form }
    };
  },
  watch: {
    form: {
      handler(newForm) {
        this.localForm = { ...newForm };
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('submit', this.localForm);
    }
  }
};
</script>