'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
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
      name: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: true
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
      updatadeOn: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      }
    }, {
      indexes: [
        { unique: true, fields: ['ra'],    name: 'ra_UNIQUE'    },
        { unique: true, fields: ['cpf'],   name: 'cpf_UNIQUE'   },
        { unique: true, fields: ['email'], name: 'email_UNIQUE' }
      ]
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('student');
  }
};
