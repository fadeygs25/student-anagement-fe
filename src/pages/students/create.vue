<!-- pages/students/create.vue -->

<script setup lang="ts">
import { ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useForm } from 'vee-validate';
import { studentSchema } from '@/schemas/studentSchema'; // Import schema từ file riêng
import InputText from 'primevue/inputtext';
import InputNumber from 'primevue/inputnumber';
import Button from 'primevue/button';

const form = ref({ name: '', age: '' });
const studentStore = useStudentStore();

const { handleSubmit, errors } = useForm({
  validationSchema: studentSchema,
});

const submitForm = handleSubmit(async () => {
  await studentStore.addStudent(form.value);
});
</script>

<style scoped>
/* Add any necessary styles */
</style>

<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-6">Add New Student</h1>
    <form @submit.prevent="submitForm" class="space-y-4">
      <!-- Input for Name -->
      <div class="field">
        <label for="name">Name</label>
        <InputText type="text" v-model="form.name" id="name" placeholder="Name" class="w-full" />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
      </div>
      
      <!-- Input for Age -->
      <div class="field">
        <label for="age">Age</label>
        <InputNumber v-model="form.age" id="age" placeholder="Age" class="w-full" />
        <span v-if="errors.age" class="text-red-500">{{ errors.age }}</span>
      </div>
      <!-- Submit Button -->
      <Button type="submit" label="Add Student" class="p-button-primary" />
    </form>
  </div>
</template>
