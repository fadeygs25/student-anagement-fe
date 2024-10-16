
<script setup lang="ts">
import { ref } from 'vue';
import { useStudentStore } from '@/stores/student';
import { useField, useForm } from 'vee-validate';
import { studentSchema } from '@/plugins/vee-validate';

const form = ref({ name: '', age: '' });
const studentStore = useStudentStore();

const submitForm = async () => {
  await studentStore.addStudent(form.value);
  form.value = { name: '', age: '' };
};
</script>

<template>
    <form @submit.prevent="submitForm">
      <Input v-model="form.name" placeholder="Name" />
      <Input v-model="form.age" type="number" placeholder="Age" />
      <Button type="submit">Add Student</Button>
    </form>
  </template>
  