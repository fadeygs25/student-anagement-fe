import { z } from 'zod';

export const studentSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  age: z.number().min(1, 'Age must be positive'),
});
