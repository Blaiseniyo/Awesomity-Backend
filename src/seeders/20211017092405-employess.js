'use strict';
import {hashPassword} from "../utls/auth"
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const pass= hashPassword("12345")
    return queryInterface.bulkInsert("Employees", [
      {
        code: "fb94de4d-47ff-4079-89e8-b0186c0a3be8",
        name: "JOHN Doe",
        nationalId: "1199880080898",
        phoneNumber: "0788888666",
        email: "john@gmail.com",
        DOB: "2003-12-08",
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "ACTIVE",
        position: "MANAGER",
        password: pass
    },
    {
      code:"122a0d86-8b78-4bb8-b28f-8e5f7811c456",
      name: "JOHN Doe 2",
      nationalId: "1199880080800",
      phoneNumber: "0788888000",
      email: "johndoe@gmail.com",
      DOB: "2003-12-08",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "ACTIVE",
      position: "MANAGER",
      password: pass
  }
    ]);
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },
  down: async (queryInterface, Sequelize) => queryInterface.bulkDelete('Employees', null, {})
};
