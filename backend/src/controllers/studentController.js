import * as studentService from '../services/studentService.js';
import { createStudentModel, updateStudentModel, deleteStudentModel, idModel, paginationModel } from '../models/Student.js';
import { ZodError } from 'zod';

export const getTotalStudents = async (req, res, next) => {
  try {
    const result = await studentService.getTotalStudents();
    res.status(200).json({
      success: true,
      data: result,
      message: 'Total de alunos recuperado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

export const getAllStudents = async (req, res, next) => {
  try {
    const { page, limit, search } = paginationModel.parse({
      page: parseInt(req.query.page) || 1,
      limit: parseInt(req.query.limit) || 10,
      search: req.query.search || ''
    });

    const students = await studentService.getAllStudents(page, limit, search);
    res.status(200).json({
      success: true,
      data: students,
      message: 'Alunos recuperados com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

export const getStudentById = async (req, res, next) => {
  try {
    const { id } = idModel.parse({ id: req.params.id });

    const student = await studentService.getStudentById(id);
    res.status(200).json({
      success: true,
      data: student,
      message: 'Aluno recuperado com sucesso'
    });
  } catch (error) {
    next(error);
  }
};

export const createStudent = async (req, res, next) => {
    try {
        const student = createStudentModel.parse(req.body);
        await studentService.createStudent(student);
        res.status(201).json({
            success: true,
            message: 'Aluno criado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

export const updateStudent = async (req, res, next) => {
    try {
        const updateData = {
            id: req.params.id,
            ...req.body
        };
        
        const validatedData = updateStudentModel.parse(updateData);
        
        await studentService.updateStudent(validatedData.id, {
            name: validatedData.name, 
            email: validatedData.email
        });

        res.status(200).json({
            success: true,
            message: 'Aluno atualizado com sucesso'
        });
    } catch (error) {
        next(error);
    }
};

export const deleteStudent = async (req, res, next) => {
    try {
        const { id } = deleteStudentModel.parse({ id: req.params.id });
        
        await studentService.deleteStudent(id);

        res.status(200).json({
            success: true,
            message: 'Aluno excluído com sucesso'
        });
    } catch (error) {
        next(error);
    }
};