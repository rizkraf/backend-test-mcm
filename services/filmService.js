const db = require('../models');
const { validateInput, validateId } = require('../validators/filmValidator');

const Film = db.Film;
const Studio = db.Studio;

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

    const studio = await Studio.findByPk(input.studioId);
    if (!studio) {
      return {
        success: false,
        statusCode: 404,
        message: 'Studio not found'
      };
    }

    const film = await Film.create({
      title: input.title,
      genre: input.genre,
      releaseDate: input.releaseDate,
      duration: parseInt(input.duration),
      director: input.director,
      synopsis: input.synopsis || null,
      rating: input.rating ? parseFloat(input.rating) : 0,
      studioId: parseInt(input.studioId)
    });

    const createdFilm = await Film.findByPk(film.id, {
      include: [{ model: Studio, as: 'studio' }]
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Film created successfully',
      data: createdFilm
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error creating film',
      error: error.message
    };
  }
};

const findAll = async (query = {}) => {
  try {
    const { title, genre, director, studioId } = query;

    const where = {};
    if (title) {
      where.title = {
        [db.Sequelize.Op.like]: `%${title}%`
      };
    }
    if (genre) {
      where.genre = {
        [db.Sequelize.Op.like]: `%${genre}%`
      };
    }
    if (director) {
      where.director = {
        [db.Sequelize.Op.like]: `%${director}%`
      };
    }
    if (studioId) {
      where.studioId = parseInt(studioId);
    }

    const films = await Film.findAll({
      where: where,
      include: [{ model: Studio, as: 'studio' }],
      order: [['createdAt', 'DESC']]
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Films retrieved successfully',
      data: films,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving films',
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

    const film = await Film.findByPk(id, {
      include: [{ model: Studio, as: 'studio' }]
    });

    if (!film) {
      return {
        success: false,
        statusCode: 404,
        message: 'Film not found'
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: 'Film retrieved successfully',
      data: film
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving film',
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

    const film = await Film.findByPk(id);

    if (!film) {
      return {
        success: false,
        statusCode: 404,
        message: 'Film not found'
      };
    }

    if (input.studioId && input.studioId !== film.studioId) {
      const studio = await Studio.findByPk(input.studioId);
      if (!studio) {
        return {
          success: false,
          statusCode: 404,
          message: 'Studio not found'
        };
      }
    }

    const updatedFilm = await film.update({
      title: input.title || film.title,
      genre: input.genre || film.genre,
      releaseDate: input.releaseDate || film.releaseDate,
      duration: input.duration ? parseInt(input.duration) : film.duration,
      director: input.director || film.director,
      synopsis: input.synopsis !== undefined ? input.synopsis : film.synopsis,
      rating: input.rating ? parseFloat(input.rating) : film.rating,
      studioId: input.studioId ? parseInt(input.studioId) : film.studioId
    });

    const responseFilm = await Film.findByPk(updatedFilm.id, {
      include: [{ model: Studio, as: 'studio' }]
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Film updated successfully',
      data: responseFilm
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error updating film',
      error: error.message
    };
  }
};

const deleteFilm = async (id) => {
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

    const film = await Film.findByPk(id);

    if (!film) {
      return {
        success: false,
        statusCode: 404,
        message: 'Film not found'
      };
    }

    await film.destroy();

    return {
      success: true,
      statusCode: 200,
      message: 'Film deleted successfully',
      data: { id: id }
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error deleting film',
      error: error.message
    };
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteFilm
};
