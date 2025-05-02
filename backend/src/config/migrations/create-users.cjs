'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.dropTable('student', { force: true, cascade: true }).catch(error => {
      console.log('Table student does not exist or was successfully dropped');
    });
    
    await queryInterface.createTable('student', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true
      },
      ra: {
        type: Sequelize.STRING(45),
        allowNull: false
      },
      cpf: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      isActive: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1
      },
      createdOn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedOn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    });

    await queryInterface.addConstraint('student', {
      fields: ['ra'],
      type: 'unique',
      name: 'ra_UNIQUE'
    });

    await queryInterface.addConstraint('student', {
      fields: ['cpf'],
      type: 'unique',
      name: 'cpf_UNIQUE'
    });

    await queryInterface.addConstraint('student', {
      fields: ['email'],
      type: 'unique',
      name: 'email_UNIQUE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('student');
  }
};
