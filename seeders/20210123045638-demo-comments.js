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
    return queryInterface.bulkInsert('comments', [
      {
        id: 1,
        userId: 1,
        puzzleId: 1,//자신의 퍼즐 작업상황을 알리고 싶을 때 puzzleId로 퍼즐 이름을 부를 수 있다.
        description: '유저1은 퍼즐 1을 하고 있습니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        userId: 2,
        puzzleId: 2,
        description: '유저2는 퍼즐 2를 하고 있습니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        userId: 1,
        puzzleId: 3,
        description: '유저1은 퍼즐 3을 하고 있습니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 4,
        userId: 2,
        puzzleId: 4,
        description: '유저2는 퍼즐 4를 아직 안했습니다.',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        userId: 1,
        puzzleId: 1,//자신의 퍼즐 작업상황을 알리고 싶을 때 puzzleId로 퍼즐 이름을 부를 수 있다.
        description: '유저1은 퍼즐 1을 완료 했습니다.',
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
    return queryInterface.bulkDelete('comments', null, {})
  }
};
