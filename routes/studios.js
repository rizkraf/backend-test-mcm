const express = require('express');
const router = express.Router();
const studioController = require('../controllers/studioController');

router.post('/', studioController.create);
router.get('/', studioController.findAll);
router.get('/:id', studioController.findById);
router.put('/:id', studioController.update);
router.delete('/:id', studioController.delete);

module.exports = router;
