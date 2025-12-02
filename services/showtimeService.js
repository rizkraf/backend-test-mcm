const db = require('../models');
const { validateInput, validateId } = require('../validators/showtimeValidator');

const Showtime = db.Showtime;
const Film = db.Film;

const create = async (input) => {
  try {
    const validation = validateInput(input, 'create');
    if (!validation.success) {
      return {
        success: false,
        statusCode: 400,
        message: 'Validation failed',
        errors: validation.errors
      };
    }

    const film = await Film.findByPk(input.filmId);
    if (!film) {
      return {
        success: false,
        statusCode: 404,
        message: 'Film not found'
      };
    }

    const showtime = await Showtime.create({
      filmId: parseInt(input.filmId),
      showDate: input.showDate,
      showTime: input.showTime,
      screen: input.screen,
      availableSeats: parseInt(input.availableSeats),
      totalSeats: parseInt(input.totalSeats),
      ticketPrice: parseFloat(input.ticketPrice)
    });

    const createdShowtime = await Showtime.findByPk(showtime.id, {
      include: [{ model: Film, as: 'film' }]
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Showtime created successfully',
      data: createdShowtime
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error creating showtime',
      error: error.message
    };
  }
};

const findAll = async (query = {}) => {
  try {
    const { filmId, screen } = query;

    const where = {};
    if (filmId) {
      where.filmId = parseInt(filmId);
    }
    if (screen) {
      where.screen = {
        [db.Sequelize.Op.like]: `%${screen}%`
      };
    }

    const showtimes = await Showtime.findAll({
      where: where,
      include: [{ model: Film, as: 'film' }],
      order: [['showDate', 'ASC'], ['showTime', 'ASC']]
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Showtimes retrieved successfully',
      data: showtimes
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving showtimes',
      error: error.message
    };
  }
};

const findById = async (id) => {
  try {
    const validation = validateId(id);
    if (!validation.success) {
      return {
        success: false,
        statusCode: 400,
        message: 'Invalid ID',
        errors: validation.errors
      };
    }

    const showtime = await Showtime.findByPk(id, {
      include: [{ model: Film, as: 'film' }]
    });

    if (!showtime) {
      return {
        success: false,
        statusCode: 404,
        message: 'Showtime not found'
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: 'Showtime retrieved successfully',
      data: showtime
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving showtime',
      error: error.message
    };
  }
};

const findByFilmId = async (filmId) => {
  try {
    const validation = validateId(filmId);
    if (!validation.success) {
      return {
        success: false,
        statusCode: 400,
        message: 'Invalid Film ID',
        errors: validation.errors
      };
    }

    const film = await Film.findByPk(filmId);
    if (!film) {
      return {
        success: false,
        statusCode: 404,
        message: 'Film not found'
      };
    }

    const showtimes = await Showtime.findAll({
      where: { filmId: parseInt(filmId) },
      include: [{ model: Film, as: 'film' }],
      order: [['showDate', 'ASC'], ['showTime', 'ASC']]
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Showtimes for film retrieved successfully',
      data: showtimes
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving showtimes for film',
      error: error.message
    };
  }
};

const update = async (id, input) => {
  try {
    const idValidation = validateId(id);
    if (!idValidation.success) {
      return {
        success: false,
        statusCode: 400,
        message: 'Invalid ID',
        errors: idValidation.errors
      };
    }

    const validation = validateInput(input, 'update');
    if (!validation.success) {
      return {
        success: false,
        statusCode: 400,
        message: 'Validation failed',
        errors: validation.errors
      };
    }

    const showtime = await Showtime.findByPk(id);

    if (!showtime) {
      return {
        success: false,
        statusCode: 404,
        message: 'Showtime not found'
      };
    }

    if (input.filmId && input.filmId !== showtime.filmId) {
      const film = await Film.findByPk(input.filmId);
      if (!film) {
        return {
          success: false,
          statusCode: 404,
          message: 'Film not found'
        };
      }
    }

    const updatedShowtime = await showtime.update({
      filmId: input.filmId ? parseInt(input.filmId) : showtime.filmId,
      showDate: input.showDate || showtime.showDate,
      showTime: input.showTime || showtime.showTime,
      screen: input.screen || showtime.screen,
      availableSeats: input.availableSeats !== undefined ? parseInt(input.availableSeats) : showtime.availableSeats,
      totalSeats: input.totalSeats !== undefined ? parseInt(input.totalSeats) : showtime.totalSeats,
      ticketPrice: input.ticketPrice !== undefined ? parseFloat(input.ticketPrice) : showtime.ticketPrice
    });

    const responseShowtime = await Showtime.findByPk(updatedShowtime.id, {
      include: [{ model: Film, as: 'film' }]
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Showtime updated successfully',
      data: responseShowtime
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error updating showtime',
      error: error.message
    };
  }
};

const deleteShowtime = async (id) => {
  try {
    const validation = validateId(id);
    if (!validation.success) {
      return {
        success: false,
        statusCode: 400,
        message: 'Invalid ID',
        errors: validation.errors
      };
    }

    const showtime = await Showtime.findByPk(id);

    if (!showtime) {
      return {
        success: false,
        statusCode: 404,
        message: 'Showtime not found'
      };
    }

    await showtime.destroy();

    return {
      success: true,
      statusCode: 200,
      message: 'Showtime deleted successfully',
      data: { id: id }
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error deleting showtime',
      error: error.message
    };
  }
};

module.exports = {
  create,
  findAll,
  findById,
  findByFilmId,
  update,
  deleteShowtime
};
