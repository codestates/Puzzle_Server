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
    return queryInterface.bulkInsert('puzzleLabels', [{
      id: 1,
      puzzleId: 1,
      labelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      puzzleId: 1,
      labelId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      puzzleId: 2,
      labelId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      puzzleId: 2,
      labelId: 4,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      puzzleId: 3,
      labelId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      puzzleId: 3,
      labelId: 6,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 7,
      puzzleId: 4,
      labelId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 8,
      puzzleId: 4,
      labelId: 5,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    ])
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('puzzleLabels', null, {})

  }
};
