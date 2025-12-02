'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('showtimes', [
      {
        filmId: 1,
        showDate: new Date('2025-12-05'),
        showTime: '14:00:00',
        screen: 'Screen 1',
        availableSeats: 45,
        totalSeats: 100,
        ticketPrice: 85000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 1,
        showDate: new Date('2025-12-05'),
        showTime: '19:00:00',
        screen: 'Screen 2',
        availableSeats: 30,
        totalSeats: 100,
        ticketPrice: 95000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 1,
        showDate: new Date('2025-12-06'),
        showTime: '10:00:00',
        screen: 'Screen 5',
        availableSeats: 60,
        totalSeats: 100,
        ticketPrice: 80000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 2,
        showDate: new Date('2025-12-05'),
        showTime: '15:30:00',
        screen: 'Screen 3',
        availableSeats: 50,
        totalSeats: 100,
        ticketPrice: 85000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 2,
        showDate: new Date('2025-12-06'),
        showTime: '18:00:00',
        screen: 'Screen 2',
        availableSeats: 25,
        totalSeats: 100,
        ticketPrice: 95000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 3,
        showDate: new Date('2025-12-07'),
        showTime: '13:00:00',
        screen: 'Screen 1',
        availableSeats: 70,
        totalSeats: 100,
        ticketPrice: 80000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 3,
        showDate: new Date('2025-12-07'),
        showTime: '20:00:00',
        screen: 'Screen 2',
        availableSeats: 40,
        totalSeats: 100,
        ticketPrice: 90000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        filmId: 4,
        showDate: new Date('2025-12-08'),
        showTime: '16:00:00',
        screen: 'Screen 3',
        availableSeats: 55,
        totalSeats: 100,
        ticketPrice: 85000.00,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('showtimes', null, {});
  }
};
