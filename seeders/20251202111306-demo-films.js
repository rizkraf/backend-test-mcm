'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('films', [
      {
        title: 'Chainsaw Man - The Movie: Reze Arc',
        genre: 'Action, Fantasy',
        releaseDate: new Date('2025-09-26'),
        duration: 101,
        director: 'Tatsuya Yoshihara',
        synopsis: 'In a brutal war between devils, hunters, and secret enemies, a mysterious girl named Reze has stepped into Denji\'s world, and he faces his deadliest battle yet, fueled by love in a world where survival knows no rules.',
        rating: 9.1,
        studioId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Jujutsu Kaisen: Hidden Inventory/Premature Death - The Movie',
        genre: 'Action, Supernatural',
        releaseDate: new Date('2025-09-05'),
        duration: 111,
        director: 'Shouta Goshozono',
        synopsis: 'The Strongest Duo, Irretrievable Youth.',
        rating: 8.1,
        studioId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: '100 METERS',
        genre: 'Drama, Sports',
        releaseDate: new Date('2025-11-07'),
        duration: 106,
        director: 'Kenji Iwaisawa',
        synopsis: 'A distance of 100 meters can define some people’s lives.',
        rating: 8.1,
        studioId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        title: 'Princess Mononoke',
        genre: 'Fantasy, Adventure',
        releaseDate: new Date('2025-08-27'),
        duration: 133,
        director: 'Hayao Miyazaki',
        synopsis: 'The tale of Princess Mononoke is a fantasy adventure: an epic struggle between humanity and nature.',
        rating: 8.6,
        studioId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('films', null, {});
  }
};
