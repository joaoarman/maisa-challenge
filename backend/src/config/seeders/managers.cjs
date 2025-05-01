'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('manager', null, { truncate: true, cascade: true })
      .catch(error => {
        console.log('Error cleaning manager table or table is empty:', error.message);
      });

    const saltRounds = 10;
    const adminPassword = await bcrypt.hash('admin123', saltRounds);
    const managerPassword = await bcrypt.hash('manager123', saltRounds);
    const manager2Password = await bcrypt.hash('manager2', saltRounds);

    await queryInterface.bulkInsert('manager', [
      {
        name: 'Admin User',
        email: 'admin@example.com',
        password: adminPassword,
        isAdmin: 1,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Regular Manager',
        email: 'manager@example.com',
        password: managerPassword,
        isAdmin: 0,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Admin Manager',
        email: 'manager2@example.com',
        password: manager2Password,
        isAdmin: 1,
        isActive: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('manager', null, {});
  }
}; 