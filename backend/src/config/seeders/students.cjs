'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('student', null, { truncate: true, cascade: true })
      .catch(error => {
        console.log('Error cleaning student table or table is empty:', error.message);
      });
      
    const students = [];

    for (let i = 1; i <= 30; i++) {
      students.push({
        ra: `RA${String(i).padStart(4, '0')}`,                       
        cpf: `${Math.floor(10_000_000_000 + Math.random() * 89_999_999_999)}`,
        name: `Student ${i}`,                                         
        email: `student${i}@example.com`,                            
        isActive: 1,
        createdOn: new Date(),                                       
        updatadeOn: new Date()
      });
    }

    await queryInterface.bulkInsert('student', students, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('student', null, {});
  }
};
