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
    return queryInterface.bulkInsert("projects", [{
      id: 1,
      title: "프로젝트1",
      description: "프로젝트1을 하는 곳이다.",
      isFinish: false,
      projectImg: null,
      puzzleNum: 9,
      puzzleFinished: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "프로젝트2",
      description: "프로젝트2가 진행중이다.",
      isFinish: false,
      projectImg: null,
      puzzleNum: 16,
      puzzleFinished: 0,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id:3,
      title: "Project for guest",
      description: "게스트용 예시 프로젝트입니다",
      isFinish: false,
      projectImg: null,
      puzzleNum: 9,
      puzzleFinished: 0,
      createdAt: new Date(),
      updatedAt: new Date()
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
    return queryInterface.bulkDelete("projects", null, {})
  }
};
