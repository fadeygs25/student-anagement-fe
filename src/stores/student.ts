// stores/student.ts
import { defineStore } from 'pinia';
import { ref } from 'vue';


export const useStudentStore = defineStore('student', () => {
  const students = ref([]);
  const { get, post, put, del } = useApiClient();

  const fetchStudents = async () => {
    students.value = await get('admin/students');
  };

  const getStudent = async (id: number) => {
    return await get(`admin/students/${id}`);
  };

  const addStudent = async (student) => {
    await post('admin/students', student);
    fetchStudents();
  };

  const updateStudent = async (id: number, student) => {
    await put(`admin/students/${id}`, student);
    fetchStudents();
  };

  const removeStudent = async (id: number) => {
    await del(`admin/students/${id}`);
    fetchStudents();
  };

  return { students, fetchStudents, getStudent, addStudent, updateStudent, removeStudent };
});
