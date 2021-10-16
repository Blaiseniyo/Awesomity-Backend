'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("Employees", [
      {
        name: "JOHN Doe",
        nationId: "1199880080898",
        phoneNumber: "0788888666",
        email: "john@gmail.com",
        DOB: "2003-12-08",
        createdAt: new Date(),
        updatedAt: new Date(),
        status: "ACTIVE",
        position: "MANAGER"
    },
    {
      name: "JOHN Doe 2",
      nationId: "1199880080800",
      phoneNumber: "0788888000",
      email: "johndoe@gmail.com",
      DOB: "2003-12-08",
      createdAt: new Date(),
      updatedAt: new Date(),
      status: "ACTIVE",
      position: "MANAGER"
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
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Employees', null, {})
  //down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
 // }
};

// module.exports = {
//   up: (queryInterface, Sequelize) => {
//     return queryInterface.bulkInsert('Employees', [{
//       name: "john@gmail.com",
//       nationId: "1199880080898",
//       phoneNumber: "0788888666",
//       email: "john@gmail.com",
//       DOB: "2003-12-08",
//       createdAt: new Date(),
//       updatedAt: new Date(),
//       status: "ACTIVE",
//       position: "MANAGER"
//     }]);
//   },
//   down: (queryInterface, Sequelize) => {
//     return queryInterface.bulkDelete('Employees', null, {});
//   }
// };
