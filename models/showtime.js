'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Showtime extends Model {
    static associate(models) {
      Showtime.belongsTo(models.Film, {
        foreignKey: 'filmId',
        as: 'film',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Showtime.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    filmId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Film ID cannot be null'
        }
      }
    },
    showDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Show date cannot be null'
        },
        isDate: {
          msg: 'Show date must be a valid date'
        }
      }
    },
    showTime: {
      type: DataTypes.TIME,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Show time cannot be null'
        }
      }
    },
    screen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Screen cannot be empty'
        },
        len: {
          args: [1, 50],
          msg: 'Screen must be between 1 and 50 characters'
        }
      }
    },
    availableSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: 'Available seats cannot be negative'
        }
      }
    },
    totalSeats: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 100,
      validate: {
        min: {
          args: [1],
          msg: 'Total seats must be at least 1'
        }
      }
    },
    ticketPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        min: {
          args: [0],
          msg: 'Ticket price cannot be negative'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Showtime',
    tableName: 'showtimes',
    timestamps: true,
    underscored: false
  });

  return Showtime;
};
