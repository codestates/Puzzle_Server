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
    return queryInterface.bulkInsert('puzzles', [{
      id: 1,
      title: "퍼즐1",
      description: "퍼즐1 작업내용",
      isFinish: true,
      projectId: 1,
      particle: 1,//1번째 퍼즐 조각
      progress: 100,//완성도는 작업내용에 따라 직접 입력. 100이라고 하면 isFinish true 표시
      puzzleImg: "https://puzzleimg.s3.ap-northeast-2.amazonaws.com/puzzleimg/puzzle.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: "퍼즐2",
      description: "퍼즐2 작업내용",
      isFinish: false,
      projectId: 1,
      particle: 2,//2번째 퍼즐 조각
      progress: 30,
      puzzleImg: "https://puzzleimg.s3.ap-northeast-2.amazonaws.com/puzzleimg/puzzle.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      title: "퍼즐3",
      description: "퍼즐3 작업내용",
      isFinish: false,
      projectId: 2,//프로젝트 2의 퍼즐조각
      particle: 3,//3번째 퍼즐조각
      progress: 50,
      puzzleImg: "https://puzzleimg.s3.ap-northeast-2.amazonaws.com/puzzleimg/puzzle.png",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      title: "퍼즐4",
      description: "퍼즐4 작업내용",
      isFinish: false,
      projectId: 2,//프로젝트2의 퍼즐조각
      particle: 9,// 9번째 퍼즐조각, 
      progress: 0,
      puzzleImg: "https://puzzleimg.s3.ap-northeast-2.amazonaws.com/puzzleimg/puzzle.png",
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
    return queryInterface.bulkDelete('puzzles', null, {})
  }
};
