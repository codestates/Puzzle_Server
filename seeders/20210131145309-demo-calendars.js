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
    return queryInterface.bulkInsert('calendars', [
      {
        id: '1',
        year: 2021,
        month: 2,
        day: 1,
        log: 'project1에서 puzzle1을 생성함',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        year: 2021,
        month: 2,
        day: 1,
        log: 'project1에서 puzzle1을 수정함',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        year: 2021,
        month: 2,
        day: 1,
        log: 'project1에서 puzzle1을 완성함',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '4',
        year: 2021,
        month: 2,
        day: 1,
        log: 'project1에서 puzzle1을 제거함',
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('calendars', null, {})

  }
};
