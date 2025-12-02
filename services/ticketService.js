const db = require('../models');
const { validateInput, validateId } = require('../validators/ticketValidator');

const Ticket = db.Ticket;
const Showtime = db.Showtime;

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

    const showtime = await Showtime.findByPk(input.showtimeId);
    if (!showtime) {
      return {
        success: false,
        statusCode: 404,
        message: 'Showtime not found'
      };
    }

    const ticket = await Ticket.create({
      showtimeId: parseInt(input.showtimeId),
      customerName: input.customerName,
      customerEmail: input.customerEmail,
      customerPhone: input.customerPhone,
      seatNumber: input.seatNumber,
      quantity: parseInt(input.quantity),
      totalPrice: parseFloat(input.totalPrice),
      bookingDate: input.bookingDate || new Date()
    });

    const createdTicket = await Ticket.findByPk(ticket.id, {
      include: [{ model: Showtime, as: 'showtime' }]
    });

    return {
      success: true,
      statusCode: 201,
      message: 'Ticket created successfully',
      data: createdTicket
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error creating ticket',
      error: error.message
    };
  }
};

const findAll = async (query = {}) => {
  try {
    const { showtimeId, customerName } = query;

    const where = {};
    if (showtimeId) {
      where.showtimeId = parseInt(showtimeId);
    }
    if (customerName) {
      where.customerName = {
        [db.Sequelize.Op.like]: `%${customerName}%`
      };
    }

    const tickets = await Ticket.findAll({
      where: where,
      include: [{ model: Showtime, as: 'showtime' }],
      order: [['createdAt', 'DESC']]
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Tickets retrieved successfully',
      data: tickets
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving tickets',
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

    const ticket = await Ticket.findByPk(id, {
      include: [{ model: Showtime, as: 'showtime' }]
    });

    if (!ticket) {
      return {
        success: false,
        statusCode: 404,
        message: 'Ticket not found'
      };
    }

    return {
      success: true,
      statusCode: 200,
      message: 'Ticket retrieved successfully',
      data: ticket
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error retrieving ticket',
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

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return {
        success: false,
        statusCode: 404,
        message: 'Ticket not found'
      };
    }

    if (input.showtimeId && input.showtimeId !== ticket.showtimeId) {
      const showtime = await Showtime.findByPk(input.showtimeId);
      if (!showtime) {
        return {
          success: false,
          statusCode: 404,
          message: 'Showtime not found'
        };
      }
    }

    const updatedTicket = await ticket.update({
      showtimeId: input.showtimeId ? parseInt(input.showtimeId) : ticket.showtimeId,
      customerName: input.customerName || ticket.customerName,
      customerEmail: input.customerEmail || ticket.customerEmail,
      customerPhone: input.customerPhone || ticket.customerPhone,
      seatNumber: input.seatNumber || ticket.seatNumber,
      quantity: input.quantity !== undefined ? parseInt(input.quantity) : ticket.quantity,
      totalPrice: input.totalPrice !== undefined ? parseFloat(input.totalPrice) : ticket.totalPrice,
      bookingDate: input.bookingDate || ticket.bookingDate
    });

    const responseTicket = await Ticket.findByPk(updatedTicket.id, {
      include: [{ model: Showtime, as: 'showtime' }]
    });

    return {
      success: true,
      statusCode: 200,
      message: 'Ticket updated successfully',
      data: responseTicket
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error updating ticket',
      error: error.message
    };
  }
};

const deleteTicket = async (id) => {
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

    const ticket = await Ticket.findByPk(id);

    if (!ticket) {
      return {
        success: false,
        statusCode: 404,
        message: 'Ticket not found'
      };
    }

    await ticket.destroy();

    return {
      success: true,
      statusCode: 200,
      message: 'Ticket deleted successfully',
      data: { id: id }
    };
  } catch (error) {
    return {
      success: false,
      statusCode: 500,
      message: 'Error deleting ticket',
      error: error.message
    };
  }
};

module.exports = {
  create,
  findAll,
  findById,
  update,
  deleteTicket
};
