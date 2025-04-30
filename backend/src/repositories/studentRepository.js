import db from '../config/connection.js';
import { AppError } from '../errors/AppError.js';
import { ERRORS } from '../errors/Errors.js';

export const getAllStudents = async () => {
    try {
        const [rows] = await db.query(`
            SELECT 
                student.id,
                student.name, 
                student.RA, 
                student.cpf, 
                student.email
            FROM student
            WHERE 
                isActive = 1
        `);

        return rows;
    } catch (error) {
        throw new AppError('Erro ao buscar alunos', 500, ERRORS.INTERNAL_SERVER_ERROR);
    }
};

export const getStudentById = async (studentId) => {
    try {
        const [rows] = await db.query(`
            SELECT 
                student.name, 
                student.RA, 
                student.cpf, 
                student.email
            FROM student 
            WHERE 
                id = ? 
                AND isActive = 1`, 
            [studentId]
        );
        
        if (rows.length === 0) {
            throw new AppError('Aluno não encontrado', 404, ERRORS.STUDENT_NOT_FOUND);
        }
        
        return rows[0];
    } catch (error) {
        throw new AppError('Erro ao buscar aluno', 500, ERRORS.INTERNAL_SERVER_ERROR);
    }
};

export const createStudent = async (student) => {
    try {
        const [result] = await db.query('INSERT INTO student SET ?', student);
        return result.insertId;
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {

            // Evita consultar o banco de dados para cada tipo de erro
            if(error.message.toLowerCase().includes('cpf_unique')) {
                throw new AppError('CPF já cadastrado', 409, ERRORS.CPF_DUPLICATED);
            }
            if(error.message.toLowerCase().includes('email_unique')) {
                throw new AppError('Email já cadastrado', 409, ERRORS.EMAIL_DUPLICATED);
            }
            if(error.message.toLowerCase().includes('ra_unique')) {
                throw new AppError('RA já cadastrado', 409, ERRORS.RA_DUPLICATED);
            }

            throw new AppError('Erro ao criar aluno', 500, ERRORS.INTERNAL_SERVER_ERROR);
        }
    }
};

export const updateStudent = async (studentId, student) => {
    try {
        const [result] = await db.query(`
            UPDATE student 
                SET ? 
            WHERE id = ?
                AND isActive = 1`, 
            [student, studentId]
        );
        
        if (result.affectedRows === 0) {
            throw new AppError('Aluno não encontrado', 404, ERRORS.STUDENT_NOT_FOUND);
        }
        
        return { studentId, ...student };
    } catch (error) {
        if (error.code === 'ER_DUP_ENTRY') {

            if(error.message.toLowerCase().includes('email_unique')) {
                throw new AppError('Email já cadastrado', 409, ERRORS.EMAIL_DUPLICATED);
            }
            
            throw new AppError('Erro ao atualizar aluno', 500, ERRORS.INTERNAL_SERVER_ERROR);
        }
    }
};

export const deleteStudent = async (studentId) => {
    try {
        const [result] = await db.query('UPDATE student SET isActive = 0 WHERE id = ?', [studentId]);
        return result.affectedRows;
    } catch (error) {
        throw new AppError('Erro ao deletar aluno', 500, ERRORS.INTERNAL_SERVER_ERROR);
    }
};

