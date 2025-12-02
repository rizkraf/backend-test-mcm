'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('tickets', [
      {
        showtimeId: 1,
        customerName: 'Ahmad Rizki',
        customerEmail: 'ahmad@example.com',
        customerPhone: '081234567890',
        seatNumber: 'A1,A2',
        quantity: 2,
        totalPrice: 100000.00,
        bookingDate: new Date('2025-12-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        showtimeId: 1,
        customerName: 'Siti Nurhaliza',
        customerEmail: 'siti@example.com',
        customerPhone: '081234567891',
        seatNumber: 'B1,B2,B3',
        quantity: 3,
        totalPrice: 150000.00,
        bookingDate: new Date('2025-12-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        showtimeId: 2,
        customerName: 'Budi Santoso',
        customerEmail: 'budi@example.com',
        customerPhone: '081234567892',
        seatNumber: 'C5',
        quantity: 1,
        totalPrice: 50000.00,
        bookingDate: new Date('2025-12-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        showtimeId: 2,
        customerName: 'Dewi Lestari',
        customerEmail: 'dewi@example.com',
        customerPhone: '081234567893',
        seatNumber: 'D1,D2',
        quantity: 2,
        totalPrice: 100000.00,
        bookingDate: new Date('2025-12-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        showtimeId: 3,
        customerName: 'Eka Pratama',
        customerEmail: 'eka@example.com',
        customerPhone: '081234567894',
        seatNumber: 'E1,E2,E3,E4',
        quantity: 4,
        totalPrice: 200000.00,
        bookingDate: new Date('2025-12-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        showtimeId: 3,
        customerName: 'Fahri Maulana',
        customerEmail: 'fahri@example.com',
        customerPhone: '081234567895',
        seatNumber: 'F1',
        quantity: 1,
        totalPrice: 50000.00,
        bookingDate: new Date('2025-12-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        showtimeId: 4,
        customerName: 'Gita Kusuma',
        customerEmail: 'gita@example.com',
        customerPhone: '081234567896',
        seatNumber: 'G1,G2,G3',
        quantity: 3,
        totalPrice: 150000.00,
        bookingDate: new Date('2025-12-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        showtimeId: 4,
        customerName: 'Hendra Wijaya',
        customerEmail: 'hendra@example.com',
        customerPhone: '081234567897',
        seatNumber: 'H1,H2',
        quantity: 2,
        totalPrice: 100000.00,
        bookingDate: new Date('2025-12-02'),
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('tickets', null, {});
  }
};
