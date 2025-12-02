const express = require('express');
const router = express.Router();
const filmController = require('../controllers/filmController');

router.post('/', filmController.create);
router.get('/', filmController.findAll);
router.get('/:id', filmController.findById);
router.put('/:id', filmController.update);
router.delete('/:id', filmController.delete);

module.exports = router;
