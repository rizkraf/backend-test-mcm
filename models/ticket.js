'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    static associate(models) {
      Ticket.belongsTo(models.Showtime, {
        foreignKey: 'showtimeId',
        as: 'showtime',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Ticket.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    showtimeId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Showtime ID cannot be null'
        }
      }
    },
    customerName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Customer name cannot be empty'
        },
        len: {
          args: [1, 150],
          msg: 'Customer name must be between 1 and 150 characters'
        }
      }
    },
    customerEmail: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Customer email cannot be empty'
        },
        isEmail: {
          msg: 'Customer email must be a valid email'
        }
      }
    },
    customerPhone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Customer phone cannot be empty'
        },
        len: {
          args: [1, 20],
          msg: 'Customer phone must be between 1 and 20 characters'
        }
      }
    },
    seatNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Seat number cannot be empty'
        },
        len: {
          args: [1, 50],
          msg: 'Seat number must be between 1 and 50 characters'
        }
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
      validate: {
        min: {
          args: [1],
          msg: 'Quantity must be at least 1'
        }
      }
    },
    totalPrice: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
      defaultValue: 0.00,
      validate: {
        min: {
          args: [0],
          msg: 'Total price cannot be negative'
        }
      }
    },
    bookingDate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      validate: {
        isDate: {
          msg: 'Booking date must be a valid date'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Ticket',
    tableName: 'tickets',
    timestamps: true,
    underscored: false
  });

  return Ticket;
};
