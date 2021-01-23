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
    return queryInterface.bulkInsert('labels', [{
      id: 1,
      name: '프론트엔드',
      description: '프론트엔드 작업 표시',
      color: '#8d192b',  //헥스 컬러 코드 장미색 
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: '백엔드',
      description: '백엔드 작업 표시',
      color: '#008d62',  //헥스 컬러 코드 에메랄드 그린
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 3,
      name: 'react',
      description: '리엑트 작업 표시',
      color: '#0099a4',  //헥스 컬러 코드 울트라마린
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 4,
      name: 'express',
      description: '익스프레스 작업 표시',
      color: '#fbceb1',  //헥스 컬러 코드 살구색
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 5,
      name: 'mysql',
      description: 'mysql 작업 표시',
      color: '#f89b00',  //헥스 컬러 코드 귤색
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 6,
      name: 'css',
      description: 'css 작업 표시',
      color: '#660099',  //헥스 컬러 코드 자주색
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
    return queryInterface.bulkDelete('labels', null, {})
  }
};
