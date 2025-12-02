'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Studio extends Model {
    static associate(models) {
      Studio.hasMany(models.Film, {
        foreignKey: 'studioId',
        as: 'films',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Studio.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          msg: 'Studio name cannot be empty'
        },
        len: {
          args: [1, 100],
          msg: 'Studio name must be between 1 and 100 characters'
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Location cannot be empty'
        },
        len: {
          args: [1, 255],
          msg: 'Location must be between 1 and 255 characters'
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Studio',
    tableName: 'studios',
    timestamps: true
  });

  return Studio;
};
