'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */

    return queryInterface.bulkInsert("userPermissions", [
      {
        id: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        projectId: 1,
      },
      {
        id: 2,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        projectId: 1,
      },
      {
        id: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        projectId: 2,
      },
      {
        id: 4,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        projectId: 2,
      },
      {
        id: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 3,
        projectId: 3
      },
      {
        id: 6,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 1,
        projectId: 3
      },
      {
        id: 7,
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: 2,
        projectId: 3
      }
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('userPermissions', null, {})
  }
};
