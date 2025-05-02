import * as studentRepository from '../repositories/studentRepository.js';

export const getTotalStudents = async () => {
    const total = await studentRepository.getTotalStudents();
    return { total };
};

export const getAllStudents = async (page = 1, limit = 10, search = '') => {
  const students = await studentRepository.getAllStudents(page, limit, search);
  return students;
};

export const getStudentById = async (studentId) => {
  const student = await studentRepository.getStudentById(studentId);
  return student;
};

export const createStudent = async (student) => {
  const newStudent = await studentRepository.createStudent(student);
  return newStudent;
};

export const updateStudent = async (studentId, student) => {
  const updatedStudent = await studentRepository.updateStudent(studentId, student);
  return updatedStudent;
};

export const deleteStudent = async (studentId) => {
  const deletedStudent = await studentRepository.deleteStudent(studentId);
  return deletedStudent;
};
