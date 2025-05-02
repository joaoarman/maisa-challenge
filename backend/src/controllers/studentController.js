import * as studentService from '../services/studentService.js';
import { createStudentModel, updateStudentModel, deleteStudentModel, idModel } from '../models/Student.js';
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
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const search = req.query.search || '';

    if (page < 1) {
      return res.status(400).json({
        success: false,
        message: 'Page number must be greater than 0'
      });
    }

    if (limit < 1 || limit > 100) {
      return res.status(400).json({
        success: false,
        message: 'Limit must be between 1 and 100'
      });
    }

    const students = await studentService.getAllStudents(page, limit, search);
    res.status(200).json({
      success: true,
      data: students,
      message: 'Students retrieved successfully'
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
      message: 'Student retrieved successfully'
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
            message: "Aluno atualizado com sucesso"
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
            message: "Aluno deletado com sucesso"
        });
    } catch (error) {
        next(error);
    }
};