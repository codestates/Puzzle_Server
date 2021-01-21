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
    return queryInterface.bulkInsert("users", [{
      id: 1,
      name: "홍길동",
      email: "hong@mail.com",//password: 1234
      password: "0977937a4d4e174e49b792a1ef521e6c346ebde25626a5830efa08667d9c037d",
      phone: "01012345678",
      profileImg: null,
      usercode: "abcd",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      name: "이순신",
      email: "lee@mail.com",//password: qwer
      password: "a340a4eb98c3c8814b214121a630da6155d6d59d62ce5f4efe66b676e7fe4e60",
      phone: "01012345678",
      profileImg: null,
      usercode: "defg",
      createdAt: new Date(),
      updatedAt: new Date(),
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
    return queryInterface.bulkDelete("users", null, {})
  }
};
