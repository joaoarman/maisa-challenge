import * as studentService from '../services/studentService.js';
import { createStudentModel, updateStudentModel } from '../models/Student.js';
import { ZodError } from 'zod';

export const getAllStudents = async (req, res, next) => {
  try {
    const students = await studentService.getAllStudents();
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
    const studentId = req.params.id;
    if (!studentId) {
      throw new AppError('Student ID is required', 400);
    }

    const student = await studentService.getStudentById(studentId);
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
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "Student ID is required"
            });
        }

        const student = updateStudentModel.parse(req.body);
        await studentService.updateStudent(studentId, student);

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
        const studentId = req.params.id;
        if (!studentId) {
            return res.status(400).json({
                success: false,
                message: "ID do aluno é obrigatório"
            });
        }

        await studentService.deleteStudent(studentId);

        res.status(200).json({
            success: true,
            message: "Aluno deletado com sucesso"
        });
    } catch (error) {
        next(error);
    }
};