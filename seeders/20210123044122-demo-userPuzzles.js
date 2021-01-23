'use strict';

const { query } = require("express");

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
    return queryInterface.bulkInsert('userPuzzles', [{
      id: 1,
      userId: 1,
      puzzleId: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      userId: 2,
      puzzleId: 2,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      userId: 1,
      puzzleId: 3,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      userId: 2,
      puzzleId: 4,
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
    return queryInterface.bulkDelete('userPuzzles', null, {})
  }

};
