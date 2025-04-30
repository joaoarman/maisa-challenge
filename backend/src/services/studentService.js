import * as studentRepository from '../repositories/studentRepository.js';

export const getAllStudents = async () => {
  const students = await studentRepository.getAllStudents();
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
