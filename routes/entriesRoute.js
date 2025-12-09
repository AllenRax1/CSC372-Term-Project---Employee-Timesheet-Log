const express = require('express');
const controller = require('../controllers/entriesController');

const router = express.Router();

router.get('/', ...controller.getAllEntries);
router.post('/', ...controller.createEntry);
router.put('/:id', ...controller.updateEntry);
router.delete('/:id', ...controller.deleteEntry);

module.exports = router;