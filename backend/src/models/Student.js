import { z } from 'zod';

const createStudentModel = z.object({
    name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
        .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
    email: z.string().email({ message: "Email inválido" }),
    ra: z.string().min(1, { message: "RA é obrigatório" }),
    cpf: z.string().regex(/^[0-9]{11}$/, { message: "CPF deve conter 11 dígitos numéricos" })
});

const updateStudentModel = z.object({
    id: z.string().min(1, { message: "ID é obrigatório" }),
    name: z.string().min(3, { message: "Nome deve ter pelo menos 3 caracteres" })
        .max(100, { message: "Nome deve ter no máximo 100 caracteres" }),
    email: z.string().email({ message: "Email inválido" })
});

const deleteStudentModel = z.object({
    id: z.string().min(1, { message: "ID do aluno é obrigatório" })
});

const idModel = z.object({
    id: z.string().min(1, { message: "ID é obrigatório" })
});

const paginationModel = z.object({
    page: z.number().int().min(1, { message: "O número da página deve ser maior que 0" }),
    limit: z.number().int().min(1, { message: "O limite deve ser maior que 0" })
        .max(100, { message: "O limite deve ser menor que 100" }),
    search: z.string().optional()
});

export { 
    createStudentModel, 
    updateStudentModel, 
    deleteStudentModel, 
    idModel,
    paginationModel 
};