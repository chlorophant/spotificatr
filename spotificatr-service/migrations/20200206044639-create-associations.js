'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint('PlaylistNotes', ['userId'], {
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'userId'
      }
    })
  },
  down: (queryInterface, Sequelize) => {}
}
