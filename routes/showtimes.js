const express = require('express');
const router = express.Router();
const showtimeController = require('../controllers/showtimeController');

router.post('/', showtimeController.create);
router.get('/', showtimeController.findAll);
router.get('/film/:filmId', showtimeController.findByFilmId);
router.get('/:id', showtimeController.findById);
router.put('/:id', showtimeController.update);
router.delete('/:id', showtimeController.delete);

module.exports = router;
