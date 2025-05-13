import { jest } from '@jest/globals';

const mockGetAllStudents = jest.fn();
const mockGetStudentById = jest.fn();
const mockCreateStudent = jest.fn();
const mockUpdateStudent = jest.fn();
const mockDeleteStudent = jest.fn();

jest.unstable_mockModule('../../../src/services/studentService.js', () => ({
  getAllStudents: mockGetAllStudents,
  getStudentById: mockGetStudentById,
  createStudent: mockCreateStudent,
  updateStudent: mockUpdateStudent,
  deleteStudent: mockDeleteStudent,
  default: {
    getAllStudents: mockGetAllStudents,
    getStudentById: mockGetStudentById,
    createStudent: mockCreateStudent,
    updateStudent: mockUpdateStudent,
    deleteStudent: mockDeleteStudent
  }
}));

const studentController = await import('../../../src/controllers/studentController.js');

describe('Student Controller', () => {
  let mockReq;
  let mockRes;
  let mockNext;

  beforeEach(() => {
    mockReq = {
      params: {},
      body: {},
      query: {}
    };
    mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    mockNext = jest.fn();
    
    jest.clearAllMocks();
  });

  describe('getAllStudents', () => {
    it('should return all students successfully', async () => {
      const mockStudents = [
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Doe', email: 'jane@example.com' }
      ];

      mockReq.query = {
        page: '1',
        limit: '10',
        search: ''
      };

      mockGetAllStudents.mockResolvedValue(mockStudents);

      await studentController.getAllStudents(mockReq, mockRes, mockNext);

      expect(mockGetAllStudents).toHaveBeenCalledWith(1, 10, '');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockStudents,
        message: 'Alunos recuperados com sucesso'
      });
    });

    it('should handle errors and call next', async () => {
      mockReq.query = {
        page: '1',
        limit: '10',
        search: ''
      };

      const mockError = new Error('Erro ao buscar alunos');
      mockGetAllStudents.mockRejectedValue(mockError);

      await studentController.getAllStudents(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('getStudentById', () => {
    it('should return a student by id successfully', async () => {
      const mockStudent = { id: 1, name: 'John Doe', email: 'john@example.com' };
      mockReq.params.id = '1';

      mockGetStudentById.mockResolvedValue(mockStudent);

      await studentController.getStudentById(mockReq, mockRes, mockNext);

      expect(mockGetStudentById).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        data: mockStudent,
        message: 'Aluno recuperado com sucesso'
      });
    });
  });

  describe('createStudent', () => {
    it('should create a student successfully with valid data', async () => {
      const mockStudentData = {
        name: 'New Student',
        email: 'new@example.com',
        ra: '123456',
        cpf: '12345678901'
      };
      mockReq.body = mockStudentData;

      await studentController.createStudent(mockReq, mockRes, mockNext);

      expect(mockCreateStudent).toHaveBeenCalledWith(mockStudentData);
      expect(mockRes.status).toHaveBeenCalledWith(201);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Aluno criado com sucesso'
      });
    });

    it('should handle validation errors when creating student', async () => {
      const invalidStudentData = {
        name: '',
        email: 'invalid-email',
        ra: '',
        cpf: '123'
      };
      mockReq.body = invalidStudentData;

      await studentController.createStudent(mockReq, mockRes, mockNext);

      expect(mockCreateStudent).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle service errors when creating student', async () => {
      const mockStudentData = {
        name: 'New Student',
        email: 'new@example.com',
        ra: '123456',
        cpf: '12345678901'
      };
      mockReq.body = mockStudentData;
      const mockError = new Error('Erro ao criar aluno');
      mockCreateStudent.mockRejectedValue(mockError);

      await studentController.createStudent(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('updateStudent', () => {
    it('should update a student successfully with valid data', async () => {
      const mockUpdateData = {
        name: 'Updated Student',
        email: 'updated@example.com'
      };
      mockReq.params.id = '1';
      mockReq.body = mockUpdateData;

      await studentController.updateStudent(mockReq, mockRes, mockNext);

      expect(mockUpdateStudent).toHaveBeenCalledWith('1', {
        name: mockUpdateData.name,
        email: mockUpdateData.email
      });
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Aluno atualizado com sucesso'
      });
    });

    it('should handle validation errors when updating student', async () => {
      const invalidUpdateData = {
        name: '',
        email: 'invalid-email'
      };
      mockReq.params.id = '1';
      mockReq.body = invalidUpdateData;

      await studentController.updateStudent(mockReq, mockRes, mockNext);

      expect(mockUpdateStudent).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle service errors when updating student', async () => {
      const mockUpdateData = {
        name: 'Updated Student',
        email: 'updated@example.com'
      };
      mockReq.params.id = '1';
      mockReq.body = mockUpdateData;
      const mockError = new Error('Erro ao atualizar aluno');
      mockUpdateStudent.mockRejectedValue(mockError);

      await studentController.updateStudent(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });

  describe('deleteStudent', () => {
    it('should delete a student successfully', async () => {
      mockReq.params.id = '1';

      await studentController.deleteStudent(mockReq, mockRes, mockNext);

      expect(mockDeleteStudent).toHaveBeenCalledWith('1');
      expect(mockRes.status).toHaveBeenCalledWith(200);
      expect(mockRes.json).toHaveBeenCalledWith({
        success: true,
        message: 'Aluno excluído com sucesso'
      });
    });

    it('should handle validation errors when deleting student', async () => {
      mockReq.params.id = '';

      await studentController.deleteStudent(mockReq, mockRes, mockNext);

      expect(mockDeleteStudent).not.toHaveBeenCalled();
      expect(mockNext).toHaveBeenCalled();
    });

    it('should handle service errors when deleting student', async () => {
      mockReq.params.id = '1';
      const mockError = new Error('Erro ao deletar aluno');
      mockDeleteStudent.mockRejectedValue(mockError);

      await studentController.deleteStudent(mockReq, mockRes, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });
  });
}); 