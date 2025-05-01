'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    
    await queryInterface.dropTable('manager', { force: true, cascade: true }).catch(error => {
      console.log('Table manager does not exist or was successfully dropped');
    });
    
    await queryInterface.createTable('manager', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      isAdmin: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 0
      },
      isActive: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
      }
    }, {
      indexes: [
        {
          unique: true,
          fields: ['email'],
          name: 'email_UNIQUE'
        }
      ]
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('manager');
  }
};
