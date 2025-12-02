'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Film extends Model {
    static associate(models) {
      Film.belongsTo(models.Studio, {
        foreignKey: 'studioId',
        as: 'studio',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
      Film.hasMany(models.Showtime, {
        foreignKey: 'filmId',
        as: 'showtimes',
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      });
    }
  }

  Film.init({
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Film title cannot be empty'
        },
        len: {
          args: [1, 200],
          msg: 'Film title must be between 1 and 200 characters'
        }
      }
    },
    genre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Genre cannot be empty'
        },
        len: {
          args: [1, 50],
          msg: 'Genre must be between 1 and 50 characters'
        }
      }
    },
    releaseDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: {
          msg: 'Release date must be a valid date'
        }
      }
    },
    duration: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Duration must be an integer'
        },
        min: {
          args: [1],
          msg: 'Duration must be at least 1 minute'
        },
        max: {
          args: [500],
          msg: 'Duration cannot exceed 500 minutes'
        }
      }
    },
    director: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Director cannot be empty'
        },
        len: {
          args: [1, 150],
          msg: 'Director name must be between 1 and 150 characters'
        }
      }
    },
    synopsis: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: {
          args: [0, 2000],
          msg: 'Synopsis cannot exceed 2000 characters'
        }
      }
    },
    rating: {
      type: DataTypes.DECIMAL(3, 1),
      allowNull: true,
      defaultValue: 0,
      validate: {
        isDecimal: {
          msg: 'Rating must be a valid decimal'
        },
        min: {
          args: [0],
          msg: 'Rating must be at least 0'
        },
        max: {
          args: [10],
          msg: 'Rating cannot exceed 10'
        }
      }
    },
    studioId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {
          msg: 'Studio ID must be an integer'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Film',
    tableName: 'films',
    timestamps: true
  });

  return Film;
};
