import { z } from 'zod';

const createStudentModel = z.object({
    name: z.string().min(3).max(100),
    email: z.string().email(),
    ra: z.string().min(1),
    cpf: z.string().regex(/^[0-9]{11}$/)
});

const updateStudentModel = z.object({
    id: z.string().min(1, { message: "ID é obrigatório" }),
    name: z.string().min(3).max(100),
    email: z.string().email()
});

const deleteStudentModel = z.object({
    id: z.string().min(1, { message: "ID do aluno é obrigatório" })
});

const idModel = z.object({
    id: z.string().min(1, { message: "ID é obrigatório" })
});

export { createStudentModel, updateStudentModel, deleteStudentModel, idModel };