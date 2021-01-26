'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('projects', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      isFinish: { //프로젝트 완료여부
        type: Sequelize.BOOLEAN
      },
      projectImg: { //프로젝트 이미지(=전체 퍼즐 모인 그림)
        type: Sequelize.STRING
      },
      puzzleNum: {  //총 퍼즐의 갯수
        type: Sequelize.INTEGER
      },
      puzzleFinished: {  //총 퍼즐 중에 완료된 퍼즐의 갯수
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('projects');
  }
};