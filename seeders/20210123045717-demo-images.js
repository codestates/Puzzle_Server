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
    return queryInterface.bulkInsert('images', [{
      id: 1,
      puzzleImg: null, //전체 퍼즐 이미지 testImg폴더 이미지로 저장함 어떻게 저장하지?
      puzzleNum: 16, //퍼즐 조각의 총 갯수(3x3, 5x5 등의 기본값 있고 커스텀도 가능) 
      puzzleFinished: 0,//완료된 퍼즐(태스크) 개수
      projectId: 1, //프로젝트 1의 이미지
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      puzzleImg: null, //전체 퍼즐 이미지 
      puzzleNum: 9,  //퍼즐 조각의 총 갯수(3x3, 5x5 등의 기본값 있고 커스텀도 가능) 
      puzzleFinished: 0,//완료된 퍼즐(태스크) 개수
      projectId: 2,
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
    return queryInterface.bulkDelete('images', null, {})
  }
};
