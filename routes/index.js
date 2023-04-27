const express = require('express');

const router = express.Router();
const mainController = require('../controllers');

router.get('/', mainController.index);
router.use('/contacts', require('./contacts'));

module.exports = router;
