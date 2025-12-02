'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable('showtimes', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      filmId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'films',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      showDate: {
        type: Sequelize.DATE,
        allowNull: false
      },
      showTime: {
        type: Sequelize.TIME,
        allowNull: false
      },
      screen: {
        type: Sequelize.STRING,
        allowNull: false
      },
      availableSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      totalSeats: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 100
      },
      ticketPrice: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
        defaultValue: 0.00
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('showtimes');
  }
};
