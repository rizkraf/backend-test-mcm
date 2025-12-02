const db = require('../models');
const { validateInput, validateId } = require('../validators/studioValidator');

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

    const existingStudio = await Studio.findOne({
      where: { name: input.name }
    });

    if (existingStudio) {
      return {
        success: false,
        statusCode: 400,
        message: 'Studio with this name already exists'
      };
    }

    const studio = await Studio.create({
      name: input.name,
      location: input.location,
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Studio created successfully',
      data: studio
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error creating studio',
      error: error.message
    };
  }
};

const findAll = async (query) => {
  try {
    const { name, location } = query;

    const where = {};
    if (name) {
      where.name = {
        [db.Sequelize.Op.like]: `%${name}%`
      };
    }
    if (location) {
      where.location = {
        [db.Sequelize.Op.like]: `%${location}%`
      };
    }

    const studios = await Studio.findAll({
      where: where
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Studios retrieved successfully',
      data: studios,
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving studios',
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

    const studio = await Studio.findByPk(id);

    if (!studio) {
      return {
        success: false,
        statusCode: 404,
        message: 'Studio not found'
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: 'Studio retrieved successfully',
      data: studio
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving studio',
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

    const studio = await Studio.findByPk(id);

    if (!studio) {
      return {
        success: false,
        statusCode: 404,
        message: 'Studio not found'
      };
    }

    if (input.name && input.name !== studio.name) {
      const existingStudio = await Studio.findOne({
        where: { name: input.name }
      });

      if (existingStudio) {
        return {
          success: false,
          statusCode: 400,
          message: 'Studio with this name already exists'
        };
      }
    }

    const updatedStudio = await studio.update({
      name: input.name || studio.name,
      location: input.location || studio.location,
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Studio updated successfully',
      data: updatedStudio
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error updating studio',
      error: error.message
    };
  }
};

const deleteStudio = async (id) => {
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

    const studio = await Studio.findByPk(id);

    if (!studio) {
      return {
        success: false,
        statusCode: 404,
        message: 'Studio not found'
      };
    }

    await studio.destroy();

    return {
      success: true,
      statusCode: 200,
      message: 'Studio deleted successfully',
      data: { id: id }
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error deleting studio',
      error: error.message
    };
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteStudio,
};
