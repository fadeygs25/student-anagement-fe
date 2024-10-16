<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStudentStore } from '@/stores/student';
import { useForm } from 'vee-validate';
import { z } from 'zod';
import { Input, Button } from '@shadcn/ui';

const route = useRoute();
const router = useRouter();
const studentStore = useStudentStore();
const form = ref({ name: '', age: '' });

const studentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(1, 'Age must be positive'),
});

const { handleSubmit, errors } = useForm({
  validationSchema: studentSchema,
});

const fetchStudent = async () => {
  const student = await studentStore.getStudent(route.params.id);
  form.value = { name: student.name, age: student.age };
};

const submitForm = handleSubmit(async () => {
  await studentStore.updateStudent(route.params.id, form.value);
  router.push('/students');
});

onMounted(fetchStudent);
</script>

<style scoped>
/* Add any necessary styles */
</style>


<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Student Details</h1>
      <form @submit.prevent="submitForm" class="space-y-4">
        <Input v-model="form.name" placeholder="Name" label="Name" />
        <span v-if="errors.name" class="text-red-500">{{ errors.name }}</span>
        
        <Input v-model="form.age" type="number" placeholder="Age" label="Age" />
        <span v-if="errors.age" class="text-red-500">{{ errors.age }}</span>
        
        <Button type="submit" variant="primary">Update Student</Button>
      </form>
    </div>
  </template>
