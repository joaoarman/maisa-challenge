import { z } from 'zod';

const createStudentModel = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    ra: z.string().min(1),
    cpf: z.string().regex(/^[0-9]{11}$/)
});

const updateStudentModel = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email()
});

export { createStudentModel, updateStudentModel };