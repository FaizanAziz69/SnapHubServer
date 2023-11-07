'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addConstraint('Images', {
      fields: ['userId'],
      type: 'foreign key',
      references: {
        table: 'Users',
        field: 'id',
      },
      onDelete: 'cascade', // Add these options
      onUpdate: 'cascade', // Add these options
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeConstraint('Images', 'fk_user_id'); // Specify the name of the existing foreign key here
  }
};
