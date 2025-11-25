const express = require('express');
const controller = require('../controllers/entriesController');

const router = express.Router();

router.get('/', controller.getAllEntries);
router.post('/', controller.createEntry);

module.exports = router;