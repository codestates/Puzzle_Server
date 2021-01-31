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
    return queryInterface.bulkInsert('socials', [
      {
        id: '1',
        name: '홍길동',
        userId: 1,
        corporation: 'google',
        socialId: 'hong@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        name: '이순신',
        userId: 2,
        corporation: 'google',
        socialId: 'lee@gmail.com',
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
    return queryInterface.bulkDelete('socials', null, {})
  }
};
