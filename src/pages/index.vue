<script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useStudentStore } from '@/stores/student';
  import Button from 'primevue/button';
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  
  const studentStore = useStudentStore();
  const students = ref([]);

  const fetchStudents = async () => {
    await studentStore.fetchStudents();
    students.value = studentStore.students;
  };

  const deleteStudent = async (id: number) => {
    await studentStore.removeStudent(id);
    fetchStudents();
  };

  onMounted(fetchStudents);
</script>

<style scoped>
/* Add any necessary styles */
</style>

<template>
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-6">Student List</h1>
      <Button @click="$router.push('/students/create')" class="mb-4" label="Add Student" />
      
      <!-- DataTable Component -->
      <DataTable :value="students" class="w-full">
        <Column field="name" header="Name"></Column>
        <Column field="age" header="Age"></Column>
      </DataTable>
    </div>
</template>
