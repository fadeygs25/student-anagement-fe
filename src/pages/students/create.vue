<!-- pages/students/create.vue -->
  
<script setup lang="ts">
import { ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useForm } from 'vee-validate';
import { studentSchema } from '@/schemas/studentSchema'; // Import schema từ file riêng
import { Input, Button } from '@shadcn/ui';

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
        <Input v-model="form.name" placeholder="Name" label="Name" />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
        
        <Input v-model="form.age" type="number" placeholder="Age" label="Age" />
        <span v-if="errors.age" class="text-red-500">{{ errors.age }}</span>
        
        <Button type="submit" variant="primary">Add Student</Button>
      </form>
    </div>
  </template>
