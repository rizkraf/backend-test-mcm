'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('studios', [
      {
        name: 'CGV Paris Van Java',
        location: 'Jl. Sukajadi No.137-139, Cipedes, Kec. Sukajadi, Kota Bandung, Jawa Barat 40162',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Ciwalk XXI',
        location: 'Jl. Cihampelas No.160 Lt. 2, Cipaganti, Kecamatan Coblong, Kota Bandung, Jawa Barat 40131',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Braga XXI',
        location: 'Jl. Braga No.99-101, Braga, Kec. Sumur Bandung, Kota Bandung, Jawa Barat 40111',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Cinépolis Istana Plaza',
        location: 'Jl. Pasir Kaliki No.121-123, Pamoyanan, Kec. Cicendo, Kota Bandung, Jawa Barat 40173',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'XXI & IMAX Summarecon Mall Bandung',
        location: 'Jl. Bulevar Raya Barat No.75 89 Lt. 1 unit 1F-Unit A & A1, RW.Summarecon, Cisaranten Kidul, Gedebage, Bandung City, West Java 40295',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('studios', null, {});
  }
};
