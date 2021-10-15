'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Employees', {
      // id: {
      //   allowNull: false,
      //   autoIncrement: true,
      //   primaryKey: true,
      //   type: Sequelize.INTEGER
      // },
      code: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
        //type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nationId: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true,
        validate: {
          isEmail: true,
        }
      },
      DOB: {
        type: Sequelize.DATE,
      },
      status: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['ACTIVE', 'INACTIVE']],
        }

      },
      position: {
        type: Sequelize.STRING,
        validate: {
          isIn: [['MANAGER', 'DEVELOPER', 'DESIGNER', 'TESTER', 'DEVOPS']],
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Employees');
  }
};